/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// script path function
/******/ 	function jsonpScriptSrc(chunkId) {
/******/ 		return __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".bundle.js"
/******/ 	}
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var promises = [];
/******/
/******/
/******/ 		// JSONP chunk loading for javascript
/******/
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData !== 0) { // 0 means "already installed".
/******/
/******/ 			// a Promise means "currently loading".
/******/ 			if(installedChunkData) {
/******/ 				promises.push(installedChunkData[2]);
/******/ 			} else {
/******/ 				// setup Promise in chunk cache
/******/ 				var promise = new Promise(function(resolve, reject) {
/******/ 					installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 				});
/******/ 				promises.push(installedChunkData[2] = promise);
/******/
/******/ 				// start chunk loading
/******/ 				var head = document.getElementsByTagName('head')[0];
/******/ 				var script = document.createElement('script');
/******/ 				var onScriptComplete;
/******/
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.src = jsonpScriptSrc(chunkId);
/******/
/******/ 				onScriptComplete = function (event) {
/******/ 					// avoid mem leaks in IE.
/******/ 					script.onerror = script.onload = null;
/******/ 					clearTimeout(timeout);
/******/ 					var chunk = installedChunks[chunkId];
/******/ 					if(chunk !== 0) {
/******/ 						if(chunk) {
/******/ 							var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 							var realSrc = event && event.target && event.target.src;
/******/ 							var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
/******/ 							error.type = errorType;
/******/ 							error.request = realSrc;
/******/ 							chunk[1](error);
/******/ 						}
/******/ 						installedChunks[chunkId] = undefined;
/******/ 					}
/******/ 				};
/******/ 				var timeout = setTimeout(function(){
/******/ 					onScriptComplete({ type: 'timeout', target: script });
/******/ 				}, 120000);
/******/ 				script.onerror = script.onload = onScriptComplete;
/******/ 				head.appendChild(script);
/******/ 			}
/******/ 		}
/******/ 		return Promise.all(promises);
/******/ 	};
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
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~main"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/accordion/accordion.config.js":
/*!******************************************************!*\
  !*** ./src/components/accordion/accordion.config.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var uniqid = __webpack_require__(/*! uniqid */ \"./node_modules/uniqid/index.js\");\n\nmodule.exports = {\n  title: 'Accordion component',\n  status: 'wip',\n  context: {\n    label: 'Example accordion',\n    accordions: [{\n      title: 'Will I earn frequent flier points?',\n      content: '<p><a role=\"link\" href=\"http://www.google.com\">asdasd</a> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam lobortis nec diam sed ornare. Praesent tempus magna non porttitor ullamcorper. Phasellus est arcu, hendrerit at finibus quis, tempor eu dolor. Ut fermentum neque vel massa lacinia, ac ornare ligula eleifend. Pellentesque in suscipit lacus. Aenean nec lectus sodales, convallis dui at, facilisis ante.</p> <p>Maecenas fermentum, augue lacinia porttitor ultricies, mauris tellus scelerisque tellus, et lobortis tortor justo ut ipsum. Vestibulum nulla enim, volutpat eget justo sed, aliquam sagittis nisl.</p>',\n      uuidTab: uniqid(),\n      uuidContent: uniqid()\n    }, {\n      title: 'How is my fare calculated?',\n      content: '<p>Sed sit amet est semper, varius velit eu, gravida velit. Cras quis elit accumsan, maximus nisi placerat, luctus urna. Nunc aliquet est quis mi pharetra elementum. In ultrices ipsum sem. Praesent fermentum consequat condimentum. Aenean neque ligula, laoreet sed pulvinar eu, vehicula et odio. Ut egestas augue mi, at mollis est efficitur ut. Curabitur eu fermentum sapien. Cras nec suscipit justo. Vivamus a felis cursus sapien rhoncus bibendum non a ipsum. Quisque at aliquet odio. Cras velit diam, vehicula fermentum tellus in, aliquet lacinia massa.</p> <p>Curabitur condimentum, massa quis accumsan ullamcorper, ligula enim semper erat, eget rutrum massa mi ut arcu. Nulla facilisi. Quisque eleifend felis eu varius egestas. Vestibulum gravida, nulla non ultricies pretium, tellus diam hendrerit ligula, nec volutpat velit sem eu enim. Curabitur pellentesque augue elit, eget finibus tortor viverra et. Aenean dapibus semper est, et luctus lacus dignissim ac. Maecenas nec lorem sagittis, dictum odio et, facilisis enim. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean pretium sapien nec orci suscipit varius.</p>',\n      uuidTab: uniqid(),\n      uuidContent: uniqid()\n    }]\n  }\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9hY2NvcmRpb24vYWNjb3JkaW9uLmNvbmZpZy5qcy5qcyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3NyYy9jb21wb25lbnRzL2FjY29yZGlvbi9hY2NvcmRpb24uY29uZmlnLmpzPzMwODIiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgdW5pcWlkID0gcmVxdWlyZSgndW5pcWlkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICB0aXRsZTogJ0FjY29yZGlvbiBjb21wb25lbnQnLFxuICBzdGF0dXM6ICd3aXAnLFxuICBjb250ZXh0OiB7XG4gICAgbGFiZWw6ICdFeGFtcGxlIGFjY29yZGlvbicsXG4gICAgYWNjb3JkaW9uczogW1xuICAgICAge1xuICAgICAgICB0aXRsZTogJ1dpbGwgSSBlYXJuIGZyZXF1ZW50IGZsaWVyIHBvaW50cz8nLFxuICAgICAgICBjb250ZW50OiAnPHA+PGEgcm9sZT1cImxpbmtcIiBocmVmPVwiaHR0cDovL3d3dy5nb29nbGUuY29tXCI+YXNkYXNkPC9hPiBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBOYW0gbG9ib3J0aXMgbmVjIGRpYW0gc2VkIG9ybmFyZS4gUHJhZXNlbnQgdGVtcHVzIG1hZ25hIG5vbiBwb3J0dGl0b3IgdWxsYW1jb3JwZXIuIFBoYXNlbGx1cyBlc3QgYXJjdSwgaGVuZHJlcml0IGF0IGZpbmlidXMgcXVpcywgdGVtcG9yIGV1IGRvbG9yLiBVdCBmZXJtZW50dW0gbmVxdWUgdmVsIG1hc3NhIGxhY2luaWEsIGFjIG9ybmFyZSBsaWd1bGEgZWxlaWZlbmQuIFBlbGxlbnRlc3F1ZSBpbiBzdXNjaXBpdCBsYWN1cy4gQWVuZWFuIG5lYyBsZWN0dXMgc29kYWxlcywgY29udmFsbGlzIGR1aSBhdCwgZmFjaWxpc2lzIGFudGUuPC9wPiA8cD5NYWVjZW5hcyBmZXJtZW50dW0sIGF1Z3VlIGxhY2luaWEgcG9ydHRpdG9yIHVsdHJpY2llcywgbWF1cmlzIHRlbGx1cyBzY2VsZXJpc3F1ZSB0ZWxsdXMsIGV0IGxvYm9ydGlzIHRvcnRvciBqdXN0byB1dCBpcHN1bS4gVmVzdGlidWx1bSBudWxsYSBlbmltLCB2b2x1dHBhdCBlZ2V0IGp1c3RvIHNlZCwgYWxpcXVhbSBzYWdpdHRpcyBuaXNsLjwvcD4nLFxuICAgICAgICB1dWlkVGFiOiB1bmlxaWQoKSxcbiAgICAgICAgdXVpZENvbnRlbnQ6IHVuaXFpZCgpXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ0hvdyBpcyBteSBmYXJlIGNhbGN1bGF0ZWQ/JyxcbiAgICAgICAgY29udGVudDogJzxwPlNlZCBzaXQgYW1ldCBlc3Qgc2VtcGVyLCB2YXJpdXMgdmVsaXQgZXUsIGdyYXZpZGEgdmVsaXQuIENyYXMgcXVpcyBlbGl0IGFjY3Vtc2FuLCBtYXhpbXVzIG5pc2kgcGxhY2VyYXQsIGx1Y3R1cyB1cm5hLiBOdW5jIGFsaXF1ZXQgZXN0IHF1aXMgbWkgcGhhcmV0cmEgZWxlbWVudHVtLiBJbiB1bHRyaWNlcyBpcHN1bSBzZW0uIFByYWVzZW50IGZlcm1lbnR1bSBjb25zZXF1YXQgY29uZGltZW50dW0uIEFlbmVhbiBuZXF1ZSBsaWd1bGEsIGxhb3JlZXQgc2VkIHB1bHZpbmFyIGV1LCB2ZWhpY3VsYSBldCBvZGlvLiBVdCBlZ2VzdGFzIGF1Z3VlIG1pLCBhdCBtb2xsaXMgZXN0IGVmZmljaXR1ciB1dC4gQ3VyYWJpdHVyIGV1IGZlcm1lbnR1bSBzYXBpZW4uIENyYXMgbmVjIHN1c2NpcGl0IGp1c3RvLiBWaXZhbXVzIGEgZmVsaXMgY3Vyc3VzIHNhcGllbiByaG9uY3VzIGJpYmVuZHVtIG5vbiBhIGlwc3VtLiBRdWlzcXVlIGF0IGFsaXF1ZXQgb2Rpby4gQ3JhcyB2ZWxpdCBkaWFtLCB2ZWhpY3VsYSBmZXJtZW50dW0gdGVsbHVzIGluLCBhbGlxdWV0IGxhY2luaWEgbWFzc2EuPC9wPiA8cD5DdXJhYml0dXIgY29uZGltZW50dW0sIG1hc3NhIHF1aXMgYWNjdW1zYW4gdWxsYW1jb3JwZXIsIGxpZ3VsYSBlbmltIHNlbXBlciBlcmF0LCBlZ2V0IHJ1dHJ1bSBtYXNzYSBtaSB1dCBhcmN1LiBOdWxsYSBmYWNpbGlzaS4gUXVpc3F1ZSBlbGVpZmVuZCBmZWxpcyBldSB2YXJpdXMgZWdlc3Rhcy4gVmVzdGlidWx1bSBncmF2aWRhLCBudWxsYSBub24gdWx0cmljaWVzIHByZXRpdW0sIHRlbGx1cyBkaWFtIGhlbmRyZXJpdCBsaWd1bGEsIG5lYyB2b2x1dHBhdCB2ZWxpdCBzZW0gZXUgZW5pbS4gQ3VyYWJpdHVyIHBlbGxlbnRlc3F1ZSBhdWd1ZSBlbGl0LCBlZ2V0IGZpbmlidXMgdG9ydG9yIHZpdmVycmEgZXQuIEFlbmVhbiBkYXBpYnVzIHNlbXBlciBlc3QsIGV0IGx1Y3R1cyBsYWN1cyBkaWduaXNzaW0gYWMuIE1hZWNlbmFzIG5lYyBsb3JlbSBzYWdpdHRpcywgZGljdHVtIG9kaW8gZXQsIGZhY2lsaXNpcyBlbmltLiBPcmNpIHZhcml1cyBuYXRvcXVlIHBlbmF0aWJ1cyBldCBtYWduaXMgZGlzIHBhcnR1cmllbnQgbW9udGVzLCBuYXNjZXR1ciByaWRpY3VsdXMgbXVzLiBBZW5lYW4gcHJldGl1bSBzYXBpZW4gbmVjIG9yY2kgc3VzY2lwaXQgdmFyaXVzLjwvcD4nLFxuICAgICAgICB1dWlkVGFiOiB1bmlxaWQoKSxcbiAgICAgICAgdXVpZENvbnRlbnQ6IHVuaXFpZCgpXG4gICAgICB9XG4gICAgXVxuICB9XG59O1xuIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFKQTtBQU9BO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFUQTtBQUhBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/accordion/accordion.config.js\n");

/***/ }),

/***/ "./src/components/main.js":
/*!********************************!*\
  !*** ./src/components/main.js ***!
  \********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! core-js/modules/es.object.assign */ \"./node_modules/core-js/modules/es.object.assign.js\");\n/* harmony import */ var core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_assign__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! core-js/modules/es.object.to-string */ \"./node_modules/core-js/modules/es.object.to-string.js\");\n/* harmony import */ var core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_object_to_string__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! core-js/modules/es.promise */ \"./node_modules/core-js/modules/es.promise.js\");\n/* harmony import */ var core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(core_js_modules_es_promise__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _verndale_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @verndale/core */ \"./node_modules/@verndale/core/lib/index.js\");\n/* harmony import */ var _verndale_core__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_verndale_core__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\n/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_5__);\n\n\n\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\nvar components = [{\n  name: 'Accordion',\n  loader: function loader() {\n    return Promise.all(/*! import() */[__webpack_require__.e(0), __webpack_require__.e(1)]).then(__webpack_require__.bind(null, /*! ./accordion/Accordion */ \"./src/components/accordion/Accordion.js\"));\n  },\n  render: function render(Accordion, el) {\n    var config = __webpack_require__(/*! ./accordion/accordion.config */ \"./src/components/accordion/accordion.config.js\");\n\n    Object(_verndale_core__WEBPACK_IMPORTED_MODULE_3__[\"render\"])(el, function (accordion) {\n      react_dom__WEBPACK_IMPORTED_MODULE_5___default.a.render(react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(Accordion, _extends({}, accordion.dataset, {\n        config: config\n      })), accordion);\n    });\n  }\n}];\ndocument.addEventListener('DOMContentLoaded', function () {\n  _verndale_core__WEBPACK_IMPORTED_MODULE_3___default()(components);\n});//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvY29tcG9uZW50cy9tYWluLmpzLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvbWFpbi5qcz81NjdkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjcmVhdGUsIHsgcmVuZGVyIH0gZnJvbSAnQHZlcm5kYWxlL2NvcmUnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERvbSBmcm9tICdyZWFjdC1kb20nO1xuXG5jb25zdCBjb21wb25lbnRzID0gW1xuICB7XG4gICAgbmFtZTogJ0FjY29yZGlvbicsXG4gICAgbG9hZGVyOiAoKSA9PiBpbXBvcnQoJy4vYWNjb3JkaW9uL0FjY29yZGlvbicpLFxuICAgIHJlbmRlcihBY2NvcmRpb24sIGVsKSB7XG4gICAgICBjb25zdCBjb25maWcgPSByZXF1aXJlKCcuL2FjY29yZGlvbi9hY2NvcmRpb24uY29uZmlnJyk7XG5cbiAgICAgIHJlbmRlcihlbCwgYWNjb3JkaW9uID0+IHtcbiAgICAgICAgUmVhY3REb20ucmVuZGVyKDxBY2NvcmRpb257Li4uYWNjb3JkaW9uLmRhdGFzZXR9IGNvbmZpZz17Y29uZmlnfS8+LCBhY2NvcmRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5dO1xuXG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gIGNyZWF0ZShjb21wb25lbnRzKTtcbn0pO1xuIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQVRBO0FBY0E7QUFDQTtBQUNBIiwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/components/main.js\n");

/***/ }),

/***/ 0:
/*!**************************************!*\
  !*** multi ./src/components/main.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./src/components/main.js */"./src/components/main.js");


/***/ })

/******/ });