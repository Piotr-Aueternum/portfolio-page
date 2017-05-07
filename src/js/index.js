import './modules/initNav';
import Muview from './modules/Muview';
import { gameLoop, canvas } from './functions/gameLoop';

if (window.matchMedia('(min-width: 1199px)').matches) {
  const muview = new Muview({
    container: 'muview',
    section: '.section',
    delay: 700,
    onResize: () => setTimeout(() => {
      canvas.height = document.querySelector('.muview__wrapper > .section').offsetHeight;
    }),
  });
  muview.init();
}

gameLoop();
