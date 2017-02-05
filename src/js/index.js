import main from './functions/main';
import './modules/initNav';
import * as drawBalls from './modules/drawBalls';
import fullPage from './modules/fullpage';

fullPage({
  container: 'fullpage',
  section: '.section',
  delay: 700,
  onSlide(index) {
    if (index === 0) {
      if (main.pause === true) {
        main.pause = false;
      } else {
        main.pause = true;
      }
    }
  },
  onLeave(index) {
    if (index === 0) {
      if (main.pause === true) {
        main.pause = false;
      } else {
        main.pause = true;
      }
    }
  },
});

drawBalls.init();
main(() => {
  drawBalls.draw();
}, 30);
