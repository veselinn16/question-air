import { TimelineLite, Elastic, Power3, SlowMo } from 'gsap';

function getRandom(min, max){
  return Math.random() * (max - min) + min;
}

export default function initBtn(button) {
  const filter = document.querySelectorAll('#filter-goo feGaussianBlur')[0];
  const particleCount = 12;
  const colors = ['#fa9b05', '#91f174', '#f9fe34', '#60c7da']

  button.addEventListener('click', function() {
    let particles = [];
    let tl = new TimelineLite({onUpdate: function() {
      filter.setAttribute('x', 0);
    }});
    
    tl.to(button.querySelectorAll('.btn-bg'), 0.6, { scaleX: 1.05 });
    tl.to(button.querySelectorAll('.btn-bg'), 0.9, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 0.6);

    for (let i = 0; i < particleCount; i++) {
      particles.push(document.createElement('span'));
      button.appendChild(particles[i]);

      particles[i].classList.add(i % 2 ? 'lefty' : 'righty');
      
      let dir = i % 2 ? '-' : '+';
      let r = i % 2 ? getRandom(-1, 1)*i/2 : getRandom(-1, 1)*i;
      let size = i < 2 ? 1 : getRandom(0.4, 0.8);
      let tl1 = new TimelineLite({ onComplete: function(i) {
        particles[i].parentNode.removeChild(particles[i]);
        this.kill();
      }, onCompleteParams: [i] });

      tl1.set(particles[i], { scale: size });
      tl1.to(particles[i], 0.6, { x: dir + 20, scaleX: 3, ease: SlowMo.ease.config(0.1, 0.7, false) });
      tl1.to(particles[i], 0.1, { scale: size, x: dir +'=25' }, '-=0.1');
      if(i >= 2) tl1.set(particles[i], { backgroundColor: colors[Math.round(getRandom(0, 3))] });
      tl1.to(particles[i], 0.6, { x: dir + getRandom(60, 100), y: r*10, scale: 0.1, ease: Power3.easeOut });
      tl1.to(particles[i], 0.2, { opacity: 0, ease: Power3.easeOut }, '-=0.2');
    }
  });
}