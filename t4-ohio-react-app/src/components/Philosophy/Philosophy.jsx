import {useState} from "react";
import "./Philosophy.css";

// add transition
function Philosophy() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      key: 1,
      teacup: "public/img/philo-imgs/teacup/fill1.png",
      image: "public/img/philo-imgs/steps-imgs/step1.png",
      alt: "A drawing of a light green tea leaf",
      description: "The master accurately controls the temperature and humidity, and execute in the morning when there is no dew. After picking, the tea leaves are sent to sun withering field immediately.",
      style: {transform: "rotate(3deg)"},
    },
    {
      key: 2,
      teacup: "public/img/philo-imgs/teacup/fill2.png",
      image: "public/img/philo-imgs/steps-imgs/step2.png",
      alt: "change",
      description: "Sunlight plays a decisive role in this stage. Natural sunlight can reduce the moisture content of tea by 8-15%. The master flips the leaves from time to time to ensure that each piece of tea can be adequately taken care of.",
      style: {transform: "rotate(-120deg)"},
    },
    {
      key: 3,
      teacup: "public/img/philo-imgs/teacup/fill3.png",
      image: "public/img/philo-imgs/steps-imgs/step3.png",
      alt: "change",
      description: "In a constant temperature and humidity indoor environment, the tea is allowed to ferment steadily, and constantly stirred to promote the action of enzymes and polyphenols, remove the bitterness and raw taste in the tea, and control tea fermentation degree. Let it rest for another 8-10 hours to give the tea a special aroma and taste.",
      style: {transform: "rotate(-150deg)"},
      pStyle: {marginTop: "-5.5%", marginRight: "14%", fontSize: "1.1rem"}
    },
    {
      key: 4,
      teacup: "public/img/philo-imgs/teacup/fill4.png",
      image: "public/img/philo-imgs/steps-imgs/step4.png",
      alt: "change",
      description: "Place it in a frying furnace at a temperature of 300-350℃ and stir fry for 6-8 minutes, and begin initial rolling and drying, and fix the flavor. The master's frying usually takes a whole night to finish.",
      style: {transform: "rotate(-80deg)"},
      pStyle: {marginTop: "-4%", marginRight: "14%", marginLeft: "75.5%", fontSize: "1.3rem"}
    },
    {
      key: 5,
      teacup: "public/img/philo-imgs/teacup/fill5.png",
      image: "public/img/philo-imgs/steps-imgs/step5.png",
      alt: "change",
      description: "Each tea leaf must be rolled 32 times on average to form the unique ball shape of Taiwanese tea, and allow the tea to ferment again to make tea fragrance and aftertaste stronger.",
      style: {transform: "rotate(60deg)"},
      pStyle: {marginTop: "-4%"}
    },
    {
      key: 6,
      teacup: "public/img/philo-imgs/teacup/fill6.png",
      image: "public/img/philo-imgs/steps-imgs/step6.png",
      alt: "change",
      description: "Dry the tea at a temperature of 110~120℃ to remove the off-flavor of tea, and use the high temperature to stop the enzyme activity after frying, that the fermentation of tea will stop, and tea will end up with a special roasting aroma after drying.",
      pStyle: {marginTop: "-4%", marginRight: "14%", marginLeft: "75%", fontSize: "1.2rem"}
    },
  ]

  const handleNext = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  return (
    <div className="philosophy-section">
      <h1>Our Tea</h1>
      <img className="spilled-tea" alt="An organic shape with a brown gradient" src="public/img/philo-imgs/spilled-tea.png"/>
      <p
      style={steps[currentStep].pStyle}
      >{steps[currentStep].description}</p>
      <iframe className="tea-video" alt="A video of the tea making process, beginning with harvesting the leaves to serving the customer"
        // having the video loop & autoplay may hurt accessibility
        width="560" height="315" src="https://www.youtube.com/embed/fsqg5liM0bs?autoplay=1&mute=1&controls=0&loop=1&playlist=fsqg5liM0bs&si=kduHbUzAXSD8bLS1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <div className="leaf-images">
        <img className="leaf1" alt="A drawing of a light green tea leaf" src="public/img/philo-imgs/leaves/leaf1.png"/>
        <img className="leaf2" alt="A drawing of a dark green tea leaf" src="public/img/philo-imgs/leaves/leaf2.png"/>
      </div>
      <div className="steps">
        <img className="steps-shapes"
        alt={steps[currentStep].alt}
        src={steps[currentStep].image}
        style={steps[currentStep].style}/>
      </div>
      <div>
        <img className="teacup" alt="A drawing of a tea cup filling up with tea" src={steps[currentStep].teacup}/>
      </div>
      <i className="fa-solid fa-angle-right" onClick={handleNext}/>
      <h2>{steps[currentStep].key}</h2>
    </div>
  );
}

export default Philosophy;