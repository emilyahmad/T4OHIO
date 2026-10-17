import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import "./BobaCursor.css";

// The pearls, in order: the first follows the cursor, each next one follows the pearl before it.
// size: canvas size in CSS pixels (the pearl fills about 60% of it)
// speed: how quickly it catches up (higher = less delay)
// offset: where it rests relative to what it follows, so it sits beside it instead of behind it
const PEARLS = [
  { size: 80, speed: 7, offset: { x: 0, y: 0 } },
  { size: 58, speed: 5, offset: { x: 44, y: 14 } },
];
// How far (px) each pearl gently bobs as it hovers
const HOVER = 4;
// How much a pearl stretches when it moves fast
const MAX_STRETCH = 0.35;

// Draws one glossy pearl into its own small canvas. Small canvases that move with the pearls,
// rather than one full-screen canvas, keep this cheap to draw.
function createPearl(canvas, size) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(size, size, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;

  const scene = new THREE.Scene();
  // Soft studio reflections give the pearl its glossy look
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = environment;

  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 10);
  camera.position.z = 4;

  // Near-black, glossy tapioca with a hint of brown and a clear coat on top
  const material = new THREE.MeshPhysicalMaterial({
    color: 0x0d0805,
    roughness: 0.4,
    clearcoat: 0.6,
    clearcoatRoughness: 0.15,
    envMapIntensity: 0.7,
    sheen: 0.3,
    sheenColor: new THREE.Color(0x3a2416),
  });
  const geometry = new THREE.SphereGeometry(0.62, 48, 48);
  const mesh = new THREE.Mesh(geometry, material);

  // The pearl sits in a group that turns to face the direction of travel, so stretching
  // the group along x makes it squash and stretch along its path
  const group = new THREE.Group();
  group.add(mesh);
  scene.add(group);

  const light = new THREE.DirectionalLight(0xffffff, 1.8);
  light.position.set(-2, 3, 4);
  scene.add(light);

  return {
    draw(dx, dy, dt) {
      const speed = Math.hypot(dx, dy) / Math.max(dt, 0.001);
      const stretch = Math.min(speed / 4000, MAX_STRETCH);
      if (speed > 1) group.rotation.z = -Math.atan2(dy, dx);
      group.scale.set(1 + stretch, 1 - stretch * 0.5, 1 - stretch * 0.5);
      // Roll a little as it moves, so the highlight shifts
      mesh.rotation.y += dx * 0.02;
      mesh.rotation.x += dy * 0.02;
      renderer.render(scene, camera);
    },
    dispose() {
      geometry.dispose();
      material.dispose();
      environment.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}

// Shiny boba pearls that trail behind the cursor, one after the other
function BobaCursor() {
  const canvasRefs = useRef([]);

  useEffect(() => {
    const canvases = canvasRefs.current;
    // Some browsers can't do WebGL (old hardware, or it's turned off); just skip the pearls there
    let pearls;
    try {
      pearls = PEARLS.map((config, i) => ({ ...config, canvas: canvases[i], renderer: createPearl(canvases[i], config.size), position: null }));
    } catch {
      return;
    }

    let cursor = null;
    let lastTime = performance.now();
    let frame;

    const onMove = (e) => {
      cursor = { x: e.clientX, y: e.clientY };
      pearls.forEach((p) => {
        if (!p.position) p.position = { ...cursor };
        p.canvas.classList.add("boba-visible");
      });
    };
    const onLeave = () => pearls.forEach((p) => p.canvas.classList.remove("boba-visible"));

    const tick = (now) => {
      frame = requestAnimationFrame(tick);
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      if (!cursor) return;

      let ahead = cursor;
      for (const [i, p] of pearls.entries()) {
        // Each pearl hovers near what it follows, bobbing a little on its own rhythm
        const t = now / 1000 + i * 1.7;
        const target = {
          x: ahead.x + p.offset.x + Math.cos(t * 1.3) * HOVER * 0.5,
          y: ahead.y + p.offset.y + Math.sin(t * 2) * HOVER,
        };
        // Ease toward the target; the gap between the two is the delay
        const ease = 1 - Math.exp(-p.speed * dt);
        const dx = (target.x - p.position.x) * ease;
        const dy = (target.y - p.position.y) * ease;
        p.position.x += dx;
        p.position.y += dy;
        p.canvas.style.transform = `translate3d(${p.position.x - p.size / 2}px, ${p.position.y - p.size / 2}px, 0)`;
        p.renderer.draw(dx, dy, dt);
        ahead = p.position;
      }
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      pearls.forEach((p) => p.renderer.dispose());
    };
  }, []);

  return PEARLS.map((config, i) => (
    <canvas key={i} ref={(el) => { canvasRefs.current[i] = el; }}
    className="boba-cursor" aria-hidden="true"
    width={config.size} height={config.size}
    style={{ width: config.size, height: config.size, zIndex: 9999 - i }}/>
  ));
}

export default BobaCursor;
