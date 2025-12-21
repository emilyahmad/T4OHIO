/* Video controls */
const herovideo = document.getElementById('myVideo');
const pause = document.getElementById('pauseButton');
pause.addEventListener('click', pauseVideo);
const play = document.getElementById('playButton');
play.addEventListener('click', playVideo);
// hide play button first
play.hidden = true;
// track if playing or not
function pauseVideo() {
    pause.hidden = true;
    herovideo.pause();
    play.hidden = false;
}
function playVideo() {
    play.hidden = true;
    herovideo.play();
    pause.hidden = false;
}