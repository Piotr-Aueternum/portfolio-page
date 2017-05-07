import Point from './Point';
import randomNumber from '../utilities/randomNumber';

export default class Circle extends Point {
  constructor({
    canvas,
    pos: { x, y },
    vector: { vx, vy },
    property: { radius, color },
  } = {}) {
    super({
      pos: { x, y },
      vector: { vx, vy },
    });
    this.canvas = canvas;
    this.radius = radius;
    this.color = color;
  }
  render(getCtx, lagOffset) {
    this.renderX = ((this.x - this.oldX) * lagOffset) + this.oldX;
    this.renderY = ((this.y - this.oldY) * lagOffset) + this.oldY;
    const ctx = getCtx;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    this.oldX = this.x;
    this.oldY = this.y;
  }
  boundary() {
    if ((this.y + this.vy) + this.radius > this.canvas.height
      || (this.y + this.vy) - this.radius < 0) {
      this.vy = -this.vy;
    }
    if ((this.x + this.vx) + this.radius > this.canvas.width
      || (this.x + this.vx) - this.radius < 0) {
      this.vx = -this.vx;
    }
    if ((this.y + this.vy) + this.radius > this.canvas.height) {
      this.y -= 0.25;
    }
    if ((this.y + this.vy) - this.radius < 0) {
      this.y += 0.25;
    }
    if ((this.x + this.vx) + this.radius > this.canvas.width) {
      this.x -= 0.25;
    }
    if ((this.x + this.vx) - this.radius < 0) {
      this.x += 0.25;
    }
  }
  update() {
    this.boundary();
    this.x += this.vx * (randomNumber(-100, 100) / 100);
    this.y += this.vy * (randomNumber(-100, 100) / 100);
    this.x += this.vx;
    this.y += this.vy;
  }
}
