import nav from './modules/nav';
import Ball from './class/Ball';

nav.init();
const canvas = document.getElementById('dots');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
function rand(getMin, getMax) {
  const min = Math.ceil(getMin);
  const max = Math.floor(getMax);
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}
const ballSet = [];
for (let i = 1; i < 10 * rand(20, 50); i += 1) {
  const balld = new Ball({
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
        ${rand(170, 255)},
        ${rand(170, 255)},
        ${rand(170, 255)},
        0.4)`,
    },
  });
  ballSet.push(balld);
}
function main() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  setTimeout(() => {
    ballSet.forEach((el) => {
      el.move();
    });
    main();
  }, 1000 / 30);
}main();
