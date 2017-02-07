import Circle from '../class/Circle';
import randomNumber from '../functions/randomNumber';


/**
 * Select canvas html id
 * @export
 * @param {element.id} canvasId
 */
export default class DrawBalls {
  constructor(canvasId, { multiply, min, max } = { multiply: 1, min: 10, max: 15 }) {
    this.canvas = document.getElementById(canvasId);
    this.canvasFullscreen();
    this.ctx = this.canvas.getContext('2d');
    this.balls = [];
    this.min = min;
    this.max = max;
    this.multiply = multiply;
    window.addEventListener('resize', () => { this.resize(); });
    this.getBalls();
  }
  getBalls() {
    const windowWidth = Math.floor(window.innerWidth / 100);
    for (let i = 1; i < windowWidth * randomNumber(this.min, this.max); i += 1) {
      const size = Math.random();
      const canvas = this.canvas;
      const ctx = this.ctx;
      const ball = new Circle({
        ctx,
        canvas,
        pos: {
          x: this.canvas.width * Math.random(),
          y: this.canvas.height * Math.random(),
        },
        vector: {
          vx: 0.2 * size * this.multiply,
          vy: 0.2 * size * this.multiply,
        },
        property: {
          radius: 3 * size * this.multiply,
          color: `rgba(
            ${randomNumber(240, 255)},
            ${randomNumber(240, 255)},
            ${randomNumber(240, 255)},
            ${randomNumber(50, 100) / 1000})`,
        },
      });
      window.addEventListener('dblclick', () => {
        if (ball.gravity === false) {
          ball.gravity = true;
        } else {
          ball.gravity = false;
        }
      });
      this.balls.push(ball);
    }
  }
  draw() {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.balls.forEach((ball) => {
      ball.move();
    });
    this.ctx.restore();
  }
  canvasFullscreen() {
    this.canvas.width = document.body.clientWidth;
    this.canvas.height = window.innerHeight;
  }
  resize() {
    this.draw();
  }
}
