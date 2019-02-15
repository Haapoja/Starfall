/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/canvas.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/canvas.js":
/*!***********************!*\
  !*** ./src/canvas.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _utils = __webpack_require__(/*! ./utils */ "./src/utils.js");

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

var colors = ['#2185C5', '#7ECEFD', '#FFF6E5', '#FF7F66'];

// Event Listeners


addEventListener('resize', function () {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    init();
});

// Objects
function Star(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = "#" + ((1 << 24) * Math.random() | 0).toString(16); //color
    this.gravity = 1;
    this.friction = 0.8;
    this.vel = {
        x: _utils2.default.randomIntFromRange(-4, 4),
        y: 3
    };
}

Star.prototype.draw = function () {
    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.shadowColor = "#E3EAEF";
    c.shadowBlur = 20;
    c.fill();
    c.closePath();
    c.restore();
};

Star.prototype.update = function () {
    this.draw();
    //when ball hits bottom of screen
    if (this.y + this.radius + this.vel.y > canvas.height - groundHeight) {
        this.vel.y = -this.vel.y * this.friction;
        this.shatter();
    } else {
        this.vel.y += this.gravity;
    }

    //if hits side of screen
    if (this.x + this.radius + this.vel.x > canvas.width || this.x - this.radius <= 0) {
        this.vel.x = -this.vel.x;
        this.shatter();
    }
    this.x += this.vel.x;
    this.y += this.vel.y;
};

Star.prototype.shatter = function () {
    this.radius -= 1;
    for (var i = 0; i < 4; i++) {
        miniStars.push(new miniStar(this.x, this.y, 2));
    }
};

function miniStar(x, y, radius, color) {
    Star.call(this, x, y, radius, color);
    this.vel = {
        x: _utils2.default.randomIntFromRange(-5, 5),
        y: _utils2.default.randomIntFromRange(-15, 15)
    };
    this.friction = 0.8;
    this.gravity = 0.4;
    this.ttl = 100; //Time to Life
    this.opacity = 1;
    this.r = _utils2.default.randomIntFromRange(0, 300);
    this.g = _utils2.default.randomIntFromRange(0, 300);
    this.b = _utils2.default.randomIntFromRange(0, 300);
}
miniStar.prototype.draw = function () {

    c.save();
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.opacity + ')';
    c.shadowColor = "#E3EAEF";
    c.shadowBlur = 20;
    c.fill();
    c.closePath();
    c.restore();
};

miniStar.prototype.update = function () {
    this.draw();
    //when ball hits bottom of screen
    if (this.y + this.radius + this.vel.y > canvas.height - groundHeight) {
        this.vel.y = -this.vel.y * this.friction;
    } else {
        this.vel.y += this.gravity;
    }
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.ttl -= 1;
    this.opacity -= 1 / this.ttl;
};

function createMountainRange(mountainAmount, height, color) {
    for (var i = 0; i < mountainAmount; i++) {
        var mountainWidth = canvas.width / mountainAmount;
        c.beginPath();
        c.moveTo(i * mountainWidth, canvas.height);
        c.lineTo(i * mountainWidth + mountainWidth + 325, canvas.height);
        c.lineTo(i * mountainWidth + mountainWidth / 2, canvas.height - height);
        c.lineTo(i * mountainWidth - 325, canvas.height);
        c.fillStyle = color;
        c.fill();
        c.closePath();
    }
}

// Implementation
var backgroundGradient = c.createLinearGradient(0, 0, 0, canvas.height); //top to bottom
backgroundGradient.addColorStop(0, "#171e26");
backgroundGradient.addColorStop(1, "#3f586b");
var stars = void 0;
var miniStars = void 0;
var bgStars = void 0;
var ticker = 0;
var randomSpawnRate = 135;
var groundHeight = 70;
function init() {
    stars = [];
    miniStars = [];
    bgStars = [];
    for (var i = 0; i < 1; i++) {
        stars.push(new Star(canvas.width / 2, 30, 15, "#E3EAEF"));
    }
    for (var _i = 0; _i < 100; _i++) {
        var x = Math.random() * canvas.width;
        var y = Math.random() * canvas.height;
        var radius = Math.random() * 3;
        bgStars.push(new Star(x, y, radius, "white"));
    }
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = backgroundGradient;
    c.fillRect(0, 0, canvas.width, canvas.height);

    bgStars.forEach(function (bgStars) {
        bgStars.draw();
    });

    createMountainRange(1, canvas.height - 50, "#384551");
    createMountainRange(2, canvas.height - 100, "#2B3843");
    createMountainRange(3, canvas.height - 300, "#26333E");
    c.fillStyle = "#182028";
    c.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

    stars.forEach(function (star, index) {
        star.update();
        if (star.radius == 0) {
            stars.splice(index, 1);
        }
    });
    miniStars.forEach(function (miniStar, index) {
        miniStar.update();
        if (miniStar.ttl == 0) {
            miniStars.splice(index, 1);
        }
    });

    ticker++;

    if (ticker % randomSpawnRate == 0) {
        var radius = 15;
        var x = Math.max(radius, Math.random() * canvas.width - radius);

        stars.push(new Star(x, -100, radius, "white"));
        randomSpawnRate = _utils2.default.randomIntFromRange(75, 100);
    }
}

init();
animate();

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function distance(x1, y1, x2, y2) {
    var xDist = x2 - x1;
    var yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

module.exports = { randomIntFromRange: randomIntFromRange, randomColor: randomColor, distance: distance };

/***/ })

/******/ });
//# sourceMappingURL=canvas.bundle.js.map