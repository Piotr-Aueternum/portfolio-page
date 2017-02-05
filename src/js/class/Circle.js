import Point from './Point';

export default class Circle extends Point {
  constructor({
    ctx,
    canvas,
    pos: { x, y },
    velocity: { vx, vy },
    property: { radius, color },
  } = {}) {
    super({
      ctx,
      canvas,
      pos: { x, y },
      velocity: { vx, vy },
    });
    this.radius = radius;
    this.color = color;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
  borderPhysics() {
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
  move() {
    this.borderPhysics();
    if (this.gravity === true) {
      this.vy *= 0.99;
      this.vy += 0.25;
    }
    this.x += this.vx;
    this.y += this.vy;
    window.requestAnimationFrame(() => this.draw());
  }
}
