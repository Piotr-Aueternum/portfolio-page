import nav from './modules/nav';
import Ball from './class/Ball';
import randomNumber from './functions/randomNumber';
import main from './functions/main';

nav.init();

const canvas = document.getElementById('dots');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const ballSet = [];
for (let i = 1; i < 10 * randomNumber(20, 50); i += 1) {
  const ball = new Ball({
    ctx,
    canvas,
    pos: {
      x: canvas.width * Math.random(),
      y: canvas.height * Math.random(),
    },
    velocity: {
      vx: Math.random(),
      vy: Math.random(),
    },
    property: {
      radius: 50 * Math.random(),
      color: `rgba(
        ${randomNumber(170, 255)},
        ${randomNumber(170, 255)},
        ${randomNumber(170, 255)},
        0.4)`,
    },
  });
  ballSet.push(ball);
}

main(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ballSet.forEach((el) => {
    el.move();
  });
}, 30);
