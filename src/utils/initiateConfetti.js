import { Color, Vector3 } from 'three';
import Engine from './EngineForResults';
import LineGenerator from './LineGenerator';

import getRandomFloat from './getRandomFloat';
import getRandomItem from './getRandomItem';

import HandleCameraOrbit from './HandleCameraOrbit';
import FullScreenInBackground from './FullScreenInBackground';

import { TimelineLite, Power3 } from 'gsap';

import app from './app';

const colors = ['#d4def3', '#e3f4f2', '#ffdfdf', '#d5ecd2', '#dcf0ad'].map((col) => new Color(col));

const staticProps = {
  width: 0.1,
  nbrOfPoints: 5,
};

export default function releaseConfetti(text) {

  @FullScreenInBackground
  @HandleCameraOrbit({ x: 4, y: 4 })
  class CustomEngine extends Engine {}

  const engine = new CustomEngine();

  engine.add(text);

  const lineGenerator = createLineGenerator();

  engine.add(lineGenerator);

  engine.start();

  texto(text, engine, lineGenerator);

  return engine;
}

function createLineGenerator() {
  class CustomLineGenerator extends LineGenerator {
    addLine() {
      super.addLine({
        length: getRandomFloat(8, 15),
        visibleLength: getRandomFloat(0.05, 0.2),
        position: new Vector3(
          (Math.random() - 0.5) * 1.5,
          Math.random() - 1,
          (Math.random() - 0.5) * 2,
        ).multiplyScalar(getRandomFloat(5, 20)),
        turbulence: new Vector3(
          getRandomFloat(-2, 2),
          getRandomFloat(0, 2),
          getRandomFloat(-2, 2),
        ),
        orientation: new Vector3(
          getRandomFloat(-0.8, 0.8),
          1,
          1,
        ),
        speed: getRandomFloat(0.004, 0.008),
        color: getRandomItem(colors),
      });
    }
  }

  const lineGenerator = new CustomLineGenerator({
    frequency: 0.5
  }, staticProps);

  return lineGenerator;
}

function texto(text, engine, lineGenerator) {
  const tlShow = new TimelineLite({ delay: 0.2, onStart: () => {
      lineGenerator.start();
  }});
    tlShow.to('.overlay', 0.6, { autoAlpha: 0 });
    tlShow.fromTo(engine.lookAt, 3, { y: -4 }, { y: 0, ease: Power3.easeOut }, '-=0.4');
    tlShow.add(text.show, '-=2');
    
    // Hide
    app.onHide((onComplete) => {
      const tlHide = new TimelineLite();
      tlHide.to(engine.lookAt, 2, { y: -6, ease: Power3.easeInOut });
      tlHide.add(text.hide, 0);
      tlHide.add(lineGenerator.stop);
      tlHide.to('.overlay', 0.5, { autoAlpha: 1, onComplete }, '-=1.5');
    });    
}