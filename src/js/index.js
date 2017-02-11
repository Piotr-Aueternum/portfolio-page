import main from './functions/main';
import './modules/initNav';
import DrawBalls from './modules/DrawBalls';
import Fullpage from './modules/Fullpage';

if (window.matchMedia('(min-width: 1199px)').matches) {
  const fullpage = new Fullpage({
    container: 'fullpage',
    section: '.section',
    delay: 700,
    onStart(index) {
      if (index === 0) {
        main.toggle();
      } else {
        main.pause = true;
      }
    },
    onLeave(index) {
      if (index === 0) {
        main.toggle();
      } else {
        main.pause = true;
      }
    },
  });
  fullpage.init();
}

const blurredBalls = new DrawBalls('blurred-dots', {
  multiply: 1.5,
  min: 5,
  max: 8,
});
const dots = new DrawBalls('dots');

main(() => {
  dots.draw();
  blurredBalls.draw();
}, 30);
