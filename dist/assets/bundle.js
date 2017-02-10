/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = main;
function main(fn, fps = 30) {
  setTimeout(() => {
    if (main.pause === false) {
      fn();
    }
    main(fn, fps);
  }, 1000 / fps);
}

main.pause = false;
main.toggle = () => {
  if (main.pause === true) {
    main.pause = false;
  } else {
    main.pause = true;
  }
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__class_Circle__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__functions_randomNumber__ = __webpack_require__(6);



class DrawBalls {
  /**
   * Creates an instance of DrawBalls.
   * @param {string} canvasId
   * @param {any} [{ multiply, min, max }={ multiply: 1, min: 10, max: 15 }]
   * @memberOf DrawBalls
   */
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
    for (let i = 1; i < windowWidth * __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__functions_randomNumber__["a" /* default */])(this.min, this.max); i += 1) {
      const size = Math.random();
      const canvas = this.canvas;
      const ctx = this.ctx;
      const ball = new __WEBPACK_IMPORTED_MODULE_0__class_Circle__["a" /* default */]({
        ctx,
        canvas,
        pos: {
          x: this.canvas.width * Math.random(),
          y: this.canvas.height * Math.random(),
        },
        vector: {
          vx: (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__functions_randomNumber__["a" /* default */])(-20, 20) / 100) * size * this.multiply,
          vy: (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__functions_randomNumber__["a" /* default */])(-20, 20) / 100) * size * this.multiply,
        },
        property: {
          radius: 3 * size * this.multiply,
          color: `rgba(
            ${__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__functions_randomNumber__["a" /* default */])(240, 255)},
            ${__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__functions_randomNumber__["a" /* default */])(240, 255)},
            ${__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__functions_randomNumber__["a" /* default */])(240, 255)},
            ${__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__functions_randomNumber__["a" /* default */])(50, 150) / 1000})`,
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
/* harmony export (immutable) */ __webpack_exports__["a"] = DrawBalls;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = fullPage;
function fullPage({
  container = 'fullpage',
  section = '.section',
  delay = 700,
  onSlide,
  onLeave,
}) {
  const fullpage = document.getElementById(container);
  const wrapperHeight = fullpage.clientHeight;

  let transform = 0;
  function prepareContainer() {
    document.body.style.overflow = 'hidden';
    fullpage.classList.add('fullpage');
    fullpage.style.transitionDuration = `${delay}ms`;
    fullpage.style.transform = `translate3d(0, ${transform}px, 0)`;
  }

  let sectionHeight;
  function prepareSections() {
    if (section) {
      const sections = fullpage.querySelectorAll(section);
      const sectionAmount = sections.length;
      sectionHeight = wrapperHeight / sectionAmount;
      for (let i = 0; i < sections.length; i += 1) {
        sections[i].style.height = `${sectionHeight}px`;
      }
    } else {
      throw new TypeError('Section elements not found.');
    }
  }
  prepareContainer();
  prepareSections();
  let time = Date.now();
  window.addEventListener('wheel', (e) => {
    const direction = e.deltaY < 0 ? 'up' : 'down';
    if (((time + delay) - Date.now()) < 0) {
      onSlide(fullPage.index);
      if (direction === 'up' && transform < 0) {
        fullPage.index -= 1;
        transform += sectionHeight;
      } else if (direction === 'down' && -transform < wrapperHeight - sectionHeight) {
        fullPage.index += 1;
        transform -= sectionHeight;
      }
      fullpage.style.transform = `translate3d(0, ${transform}px, 0)`;
      time = Date.now();
      if (onLeave && typeof onLeave === 'function') {
        onLeave(fullPage.index);
      }
    }
  });
}
fullPage.index = 0;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

function initNav(nodeNav) {
  const nav = document.querySelector(nodeNav);
  const toggle = nav.querySelector(`${nodeNav}__toggle`);
  const list = nav.querySelector(`${nodeNav}__list`);
  function expand() {
    list.classList.toggle('active');
    toggle.classList.toggle('active');
  }
  toggle.addEventListener('click', () => {
    expand();
  });
}
initNav('.nav');


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Point__ = __webpack_require__(5);


class Circle extends __WEBPACK_IMPORTED_MODULE_0__Point__["a" /* default */] {
  constructor({
    ctx,
    canvas,
    pos: { x, y },
    vector: { vx, vy },
    property: { radius, color },
  } = {}) {
    super({
      ctx,
      canvas,
      pos: { x, y },
      vector: { vx, vy },
    });
    this.radius = radius;
    this.color = color;
    this.gravity = false;
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Circle;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Point {
  constructor({
    ctx,
    canvas,
    pos: { x, y },
    vector: { vx, vy },
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Point;



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = randomNumber;
function randomNumber(getMin, getMax) {
  const min = Math.ceil(getMin);
  const max = Math.floor(getMax);
  return Math.floor(Math.random() * ((max - min) + 1)) + min;
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__functions_main__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_initNav__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_initNav___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__modules_initNav__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_DrawBalls__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_fullpage__ = __webpack_require__(2);





if (window.matchMedia(('(min-width: 991px)').matches)) {
  __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__modules_fullpage__["a" /* default */])({
    container: 'fullpage',
    section: '.section',
    delay: 700,
    onSlide(index) {
      if (index === 0) {
        __WEBPACK_IMPORTED_MODULE_0__functions_main__["a" /* default */].toggle();
      }
    },
    onLeave(index) {
      if (index === 0) {
        __WEBPACK_IMPORTED_MODULE_0__functions_main__["a" /* default */].toggle();
      }
    },
  });
}

const blurredBalls = new __WEBPACK_IMPORTED_MODULE_2__modules_DrawBalls__["a" /* default */]('blurred-dots', {
  multiply: 1.5,
  min: 5,
  max: 8,
});
const dots = new __WEBPACK_IMPORTED_MODULE_2__modules_DrawBalls__["a" /* default */]('dots');
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__functions_main__["a" /* default */])(() => {
  dots.draw();
  blurredBalls.draw();
}, 30);


/***/ })
/******/ ]);