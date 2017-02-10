import main from './functions/main';
import './modules/initNav';
import DrawBalls from './modules/DrawBalls';
import fullPage from './modules/fullpage';

if (window.matchMedia(('(min-width: 991px)').matches)) {
  fullPage({
    container: 'fullpage',
    section: '.section',
    delay: 700,
    onSlide(index) {
      if (index === 0) {
        main.toggle();
      }
    },
    onLeave(index) {
      if (index === 0) {
        main.toggle();
      }
    },
  });
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
