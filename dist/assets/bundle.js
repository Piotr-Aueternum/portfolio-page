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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Ball {
  constructor({
    ctx,
    canvas,
    pos: { x, y },
    velocity: { vx, vy },
    property: { radius, color },
  }) {
    this.ctx = ctx;
    this.canvas = canvas;
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
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
  move() {
    this.x = this.x + this.vx;
    this.y += this.vy;
    if (this.y + this.vy > this.canvas.height || this.y + this.vy < 0) {
      this.vy = -this.vy;
    }
    if (this.x + this.vx > this.canvas.width || this.x + this.vx < 0) {
      this.vx = -this.vx;
    }
    window.requestAnimationFrame(() => this.draw());
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Ball;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__class_Nav__ = __webpack_require__(2);


const nav = new __WEBPACK_IMPORTED_MODULE_0__class_Nav__["a" /* default */]('.nav');

/* harmony default export */ __webpack_exports__["a"] = nav;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Nav {
  constructor(nav) {
    this.nav = document.querySelector(nav);
    this.toggle = this.nav.querySelector(`${nav}__toggle`);
    this.list = this.nav.querySelector(`${nav}__list`);
  }
  expand() {
    this.list.classList.toggle('active');
    this.toggle.classList.toggle('active');
  }
  init() {
    this.toggle.addEventListener('click', () => {
      this.expand();
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Nav;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_nav__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__class_Ball__ = __webpack_require__(0);



__WEBPACK_IMPORTED_MODULE_0__modules_nav__["a" /* default */].init();
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
  const balld = new __WEBPACK_IMPORTED_MODULE_1__class_Ball__["a" /* default */]({
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


/***/ })
/******/ ]);