import Circle from '../class/Circle';
import randomNumber from '../utilities/randomNumber';

export const canvas = document.getElementById('dots');

const ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth;
canvas.height = window.innerHeight;
const balls = [];
const windowWidth = Math.floor(window.innerWidth / 100);
for (let i = 1; i < windowWidth * (randomNumber(5, 10)); i += 1) {
  const size = Math.random();
  const ball = new Circle({
    canvas,
    pos: {
      x: canvas.width * Math.random(),
      y: canvas.height * Math.random(),
    },
    vector: {
      vx: (randomNumber(-20, 20) / 100) * size,
      vy: (randomNumber(-20, 20) / 100) * size,
    },
    property: {
      radius: 3 * size,
      color: `rgba(
        ${randomNumber(240, 255)},
        ${randomNumber(240, 255)},
        ${randomNumber(240, 255)},
        ${randomNumber(50, 150) / 1000})`,
    },
  });
  balls.push(ball);
}
function render(lagOffset) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => {
    ctx.save();
    ball.render(ctx, lagOffset);
    ctx.restore();
  });
}
function update() {
  balls.forEach((ball) => {
    ball.update();
  });
}
const fps = 60;
let lag = 0;
const frameDuration = 1000 / fps;
let start = Date.now();
export function gameLoop() {
  window.requestAnimationFrame(gameLoop, canvas);
  const current = Date.now();
  const elapsed = current - start;
  start = current;
  lag += elapsed;
  while (lag >= frameDuration) {
    update();
    lag -= frameDuration;
  }
  const lagOffset = lag / frameDuration;
  render(lagOffset);
}
