export default class Point {
  constructor({
    ctx,
    canvas,
    pos: { x, y },
    velocity: { vx, vy },
  } = {}) {
    if (ctx instanceof CanvasRenderingContext2D) {
      this.ctx = ctx;
    } else {
      throw new TypeError('Wrong context of canvas.');
    }
    if (canvas && canvas.nodeName && canvas.nodeName === 'CANVAS') {
      this.canvas = canvas;
    } else {
      throw new TypeError('Canvas node element is incorrect.');
    }
    this.x = x || 0;
    this.y = y || 0;
    this.vx = vx || 0;
    this.vy = vy || 0;
    this.gravity = false;
  }
  gravityToggle() {
    if (this.gravity === true) {
      this.gravity = false;
    } else {
      this.gravity = true;
    }
  }
  borderPhysics() {
    if (this.y + this.vy > this.canvas.height || this.y + this.vy < 0) {
      this.vy = -this.vy;
    }
    if (this.x + this.vx > this.canvas.width || this.x + this.vx < 0) {
      this.vx = -this.vx;
    }
  }
}
