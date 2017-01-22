//=require lib/jquery.fullPage.js
//=require class/Nav.js
//=require modules/fullpage.js
//=require modules/nav.js
const canvas = document.getElementById('dots');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let raf;
class Ball {
  constructor({x, y, vx, vy, radius, color}) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.color = color;
    this.draw = this.draw.bind(this);
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  move() {
    this.x = this.x + this.vx;
    this.y += this.vy;
    if (this.y + this.vy > canvas.height || this.y + this.vy < 0) {
      this.vy = -this.vy;
    }
    if (this.x + this.vx > canvas.width || this.x + this.vx < 0) {
      this.vx = -this.vx;
    }
    raf = window.requestAnimationFrame(this.draw);
  }
}
function rand(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let ballSet = [];
for(let i = 1; i<10 * rand(20, 50); i++) {
  balld = new Ball({
    x: canvas.width * Math.random() + 1,
    y: canvas.height * Math.random() + 1,
    vx: 1 * Math.random() + 1,
    vy: 1 * Math.random() + 1,
    radius: 50 * Math.random() + 1,
    color: `rgba(
    ${rand(170, 255)},
    ${rand(170, 255)},
    ${rand(170, 255)},
    0.4)`
  });
  ballSet.push(balld);
}
function main() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  setTimeout(() => {
    ballSet.forEach(function(el) {
      el.move();
    });
    main();
  }, 1000 / 30)
}
main();