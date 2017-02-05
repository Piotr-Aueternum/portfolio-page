import Circle from '../class/Circle';
import randomNumber from '../functions/randomNumber';

let canvas;
let ctx;
let balls;
export function init() {
  canvas = document.getElementById('dots');
  canvas.width = document.body.clientWidth;
  canvas.height = window.innerHeight;
  ctx = canvas.getContext('2d');
  balls = [];
  for (let i = 1; i < Math.floor(window.innerWidth / 100) * randomNumber(15, 25); i += 1) {
    const ball = new Circle({
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
    canvas.addEventListener('click', () => {
      ball.gravityToggle();
    });
    balls.push(ball);
  }
}
export function draw() {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => {
    ball.move();
  });
  ctx.restore();
}
export function resize() {
  canvas.width = document.body.clientWidth;
  canvas.height = window.innerHeight;
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => {
    ball.move();
  });
  ctx.restore();
}
window.addEventListener('resize', resize, false);
