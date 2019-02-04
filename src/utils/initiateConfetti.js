import { Color, Vector3 } from 'three';
import Engine from './EngineForResults';
import AnimatedText3D from './Animated3DText';
import LineGenerator from './LineGenerator';

import getRandomFloat from './getRandomFloat';
import getRandomItem from './getRandomItem';

import HandleCameraOrbit from './HandleCameraOrbit';
import FullScreenInBackground from './FullScreenInBackground';

import { TimelineLite, Power3 } from 'gsap';

import app from './app';

export default function releaseConfetti(score) {
    /**
 * * *******************
 * * ENGINE
 * * *******************
 */

@FullScreenInBackground
@HandleCameraOrbit({ x: 4, y: 4 })
class CustomEngine extends Engine {}

const engine = new CustomEngine();


/**
 * * *******************
 * * TITLE
 * * *******************
 */

const text = new AnimatedText3D(score, { color: '#0f070a', size: app.isMobile ? 0.5 : 0.8 });
text.position.x -= text.basePosition * 0.5;
// text.position.y -= 0.5;
engine.add(text);


/**
 * * *******************
 * * LIGNES
 * * *******************
 */
// ['#fd7690', '#ceea8a', '#f4ff88', '#aae4b7', '#f0caca']
// ['#0084ff', '#44bec7', '#ffc300', '#fa4f5d', '#d696bb'] ['#d4def3', '#e3f4f2', '#ffdfdf', '#d5ecd2', '#d4c3e6']
const COLORS = ['#d4def3', '#e3f4f2', '#ffdfdf', '#d5ecd2', '#dcf0ad'].map((col) => new Color(col));
const STATIC_PROPS = {
  width: 0.1,
  nbrOfPoints: 5,
};

class CustomLineGenerator extends LineGenerator {
  // start() {
  //   const currentFreq = this.frequency;
  //   this.frequency = 1;
  //   setTimeout(() => {
  //     this.frequency = currentFreq;
  //   }, 1000);
  //   super.start();
  // }

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
      color: getRandomItem(COLORS),
    });
  }
}
const lineGenerator = new CustomLineGenerator({
  frequency: 0.5
}, STATIC_PROPS);
engine.add(lineGenerator);

/**
 * * *******************
 * * START
 * * *******************
 */
// Show
engine.start();
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
