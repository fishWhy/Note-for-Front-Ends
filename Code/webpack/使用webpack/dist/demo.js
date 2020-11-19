/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./modules/a.js":
/*!**********************!*\
  !*** ./modules/a.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

eval("console.log('a')\r\nvar color = 'red';\n\n//# sourceURL=webpack:///./modules/a.js?");

/***/ }),

/***/ "./modules/b.js":
/*!**********************!*\
  !*** ./modules/b.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

eval("console.log('b')\r\nvar color = 'green';\n\n//# sourceURL=webpack:///./modules/b.js?");

/***/ }),

/***/ "./modules/c.js":
/*!**********************!*\
  !*** ./modules/c.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/***/ (() => {

eval("console.log('c')\r\nvar color = 'blue';\n\n//# sourceURL=webpack:///./modules/c.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
(() => {
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements: __webpack_require__ */
eval("//commonjs规范和服务器端开发一样\r\n__webpack_require__(/*! ./modules/a.js */ \"./modules/a.js\")\r\n__webpack_require__(/*! ./modules/b.js */ \"./modules/b.js\")\r\n__webpack_require__(/*! ./modules/c.js */ \"./modules/c.js\")\r\n\r\n\n\n//# sourceURL=webpack:///./main.js?");
})();

/******/ })()
;