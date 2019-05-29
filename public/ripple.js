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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/lib/Frame.ts":
/*!**************************!*\
  !*** ./src/lib/Frame.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass Frame {\n    constructor(width, height, nVertices, shader, options = {}) {\n        this.width = width;\n        this.height = height;\n        this.nVertices = nVertices;\n        this.shader = shader;\n        this.mode = options.mode || WebGLRenderingContext.TRIANGLE_STRIP;\n        this.clearBeforeRender =\n            options.clearBeforeRender === undefined ?\n                true : options.clearBeforeRender;\n    }\n    getFrameBuffer() {\n        return this.frameBuffer;\n    }\n    getRenderBuffer() {\n        return this.renderBuffer;\n    }\n    getTexture() {\n        return this.texture;\n    }\n    init(gl) {\n        this.frameBuffer = gl.createFramebuffer();\n        this.initRenderBuffer(gl);\n        this.initTexture(gl);\n        this.shader.initShaderProgram(gl);\n        this.shader.sendAttributes(gl);\n        this.shader.sendUniforms(gl);\n    }\n    initRenderBuffer(gl) {\n        this.renderBuffer = gl.createRenderbuffer();\n        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);\n        gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);\n        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.width, this.height);\n        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderBuffer);\n        gl.bindFramebuffer(gl.FRAMEBUFFER, null);\n        gl.bindRenderbuffer(gl.RENDERBUFFER, null);\n    }\n    initTexture(gl) {\n        this.texture = gl.createTexture();\n        gl.bindTexture(gl.TEXTURE_2D, this.texture);\n        gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);\n        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.width, this.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);\n        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);\n        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);\n        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);\n        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);\n        gl.bindTexture(gl.TEXTURE_2D, null);\n        gl.bindFramebuffer(gl.FRAMEBUFFER, null);\n    }\n}\nexports.default = Frame;\n\n\n//# sourceURL=webpack:///./src/lib/Frame.ts?");

/***/ }),

/***/ "./src/lib/Scene.ts":
/*!**************************!*\
  !*** ./src/lib/Scene.ts ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst CLEAR_COLOR = [0, 0, 0, 1];\nconst FRAME_RATE = 60;\nfunction isPowerOfTwo(n) {\n    return (n & (n - 1)) === 0;\n}\nclass Scene {\n    constructor(canvas) {\n        this.frames = new Map();\n        this.isAnimating = false;\n        this.rendering = false;\n        this.textures = new Map();\n        this.gl =\n            canvas.getContext('webgl', { preserveDrawingBuffer: true }) ||\n                canvas.getContext('experimental-webgl', { preserveDrawingBuffer: true });\n        this.gl.enable(this.gl.DEPTH_TEST);\n        this.gl.depthFunc(this.gl.LEQUAL);\n    }\n    addFrame(key, frame) {\n        frame.init(this.gl);\n        this.frames.set(key, frame);\n    }\n    addTexture(key, src) {\n        const texture = this.gl.createTexture();\n        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);\n        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, src);\n        if (isPowerOfTwo(src.width) && isPowerOfTwo(src.height)) {\n            this.gl.generateMipmap(this.gl.TEXTURE_2D);\n        }\n        else {\n            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);\n            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);\n            this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);\n        }\n        this.textures.set(key, texture);\n        this.gl.bindTexture(this.gl.TEXTURE_2D, null);\n    }\n    bindFrameToTexture(key, activeTextureNumber) {\n        const frame = this.frames.get(key);\n        this.gl.activeTexture(activeTextureNumber);\n        this.gl.bindTexture(this.gl.TEXTURE_2D, frame.getTexture());\n    }\n    bindTexture(key, activeTextureNumber) {\n        this.gl.activeTexture(activeTextureNumber);\n        this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures.get(key));\n    }\n    getFrame(key) {\n        return this.frames.get(key);\n    }\n    renderFrame(frame, frameBuffer, renderBuffer) {\n        this.gl.useProgram(frame.shader.getProgram());\n        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, frameBuffer);\n        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, renderBuffer);\n        if (frame.clearBeforeRender) {\n            this.gl.clearColor.apply(this.gl, CLEAR_COLOR);\n            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);\n        }\n        this.gl.viewport(0, 0, frame.width, frame.height);\n        frame.shader.sendAttributes(this.gl);\n        frame.shader.sendUniforms(this.gl);\n        if (frame.drawElements) {\n            this.gl.drawElements(frame.mode, frame.nVertices, this.gl.UNSIGNED_SHORT, 0);\n        }\n        else {\n            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, frame.nVertices);\n        }\n        this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null);\n        this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null);\n    }\n    renderFrameAsTexture(key, activeTextureNumber) {\n        const frame = this.frames.get(key);\n        this.renderFrame(frame, frame.getFrameBuffer(), frame.getRenderBuffer());\n        this.gl.activeTexture(activeTextureNumber);\n        this.gl.bindTexture(this.gl.TEXTURE_2D, frame.getTexture());\n    }\n    renderFrameToCanvas(key) {\n        const frame = this.frames.get(key);\n        this.renderFrame(frame, null, null);\n    }\n    render(animate = false, drawScene = () => { }) {\n        this.isAnimating = animate;\n        this.renderFn = () => {\n            const now = Date.now();\n            if (this.rendering\n                || (this.lastRender\n                    && ((now - this.lastRender) < (1000 / FRAME_RATE)))) {\n                if (this.isAnimating) {\n                    this.requestAnimFrame = window.requestAnimationFrame(this.renderFn);\n                }\n                return;\n            }\n            this.rendering = true;\n            drawScene();\n            this.rendering = false;\n            this.lastRender = now;\n            if (this.isAnimating) {\n                this.requestAnimFrame = window.requestAnimationFrame(this.renderFn);\n            }\n        };\n        this.renderFn = this.renderFn.bind(this);\n        if (animate) {\n            window.requestAnimationFrame(this.renderFn);\n        }\n        else {\n            this.renderFn();\n        }\n    }\n    setFrame(key, frame) {\n        this.frames.set(key, frame);\n    }\n    toggleAnimation() {\n        this.isAnimating = !this.isAnimating;\n        if (this.isAnimating) {\n            this.renderFn();\n        }\n        else {\n            window.cancelAnimationFrame(this.requestAnimFrame);\n            this.requestAnimFrame = null;\n        }\n    }\n}\nexports.default = Scene;\n\n\n//# sourceURL=webpack:///./src/lib/Scene.ts?");

/***/ }),

/***/ "./src/lib/Shader.ts":
/*!***************************!*\
  !*** ./src/lib/Shader.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ShaderAttribute_1 = __webpack_require__(/*! ./ShaderAttribute */ \"./src/lib/ShaderAttribute.ts\");\nconst ShaderUniform_1 = __webpack_require__(/*! ./ShaderUniform */ \"./src/lib/ShaderUniform.ts\");\nclass Shader {\n    constructor(vertexShader, fragmentShader, attributes = {}, uniforms = {}) {\n        this.attributes = attributes;\n        this.uniforms = uniforms;\n        this.shaderSources = new Map();\n        this.hasSentAttributes = false;\n        this.shaderSources.set(WebGLRenderingContext.VERTEX_SHADER, vertexShader);\n        this.shaderSources.set(WebGLRenderingContext.FRAGMENT_SHADER, fragmentShader);\n    }\n    getProgram() {\n        return this.program;\n    }\n    initShaderProgram(gl) {\n        const shaders = [];\n        const program = gl.createProgram();\n        for (const [type, source] of this.shaderSources) {\n            const shader = this.compileShader(gl, source, type);\n            if (shader === null) {\n                throw new Error('Shader failed to compile. See error message for details.');\n            }\n            shaders[type] = shader;\n        }\n        gl.attachShader(program, shaders[gl.VERTEX_SHADER]);\n        gl.attachShader(program, shaders[gl.FRAGMENT_SHADER]);\n        gl.linkProgram(program);\n        this.program = program;\n        Object.keys(this.attributes).forEach((key) => {\n            const attribute = this.attributes[key];\n            attribute.setBuffer(gl.createBuffer());\n            if (attribute.hasIndices()) {\n                attribute.setIndicesBuffer(gl.createBuffer());\n            }\n            attribute.setLocation(gl.getAttribLocation(this.program, attribute.locationName));\n        });\n        Object.keys(this.uniforms).forEach((key) => {\n            const uniform = this.uniforms[key];\n            uniform.setLocation(gl.getUniformLocation(this.program, uniform.locationName));\n        });\n    }\n    compileShader(gl, source, type) {\n        const shader = gl.createShader(type);\n        gl.shaderSource(shader, source);\n        gl.compileShader(shader);\n        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {\n            console.error(`Shader failed to compile: ${gl.getShaderInfoLog(shader)}`);\n            return null;\n        }\n        return shader;\n    }\n    sendAttributes(gl) {\n        if (this.hasSentAttributes)\n            return;\n        this.hasSentAttributes = true;\n        Object.keys(this.attributes).forEach((key) => {\n            const attribute = this.attributes[key];\n            switch (attribute.constructor) {\n                case ShaderAttribute_1.Vector2Attribute:\n                    this.sendVectorAttribute(gl, 2, attribute);\n                    break;\n                case ShaderAttribute_1.Vector3Attribute:\n                    this.sendVectorAttribute(gl, 3, attribute);\n                    break;\n                case ShaderAttribute_1.Vector4Attribute:\n                    this.sendVectorAttribute(gl, 4, attribute);\n                    break;\n                default:\n                    throw new Error(`Invalid type provided for attribute ${key} provided.`);\n            }\n        });\n    }\n    sendVectorAttribute(gl, dimension, attribute) {\n        gl.bindBuffer(gl.ARRAY_BUFFER, attribute.getBuffer());\n        const location = attribute.getLocation();\n        gl.enableVertexAttribArray(location);\n        gl.vertexAttribPointer(location, dimension, gl.FLOAT, false, 0, 0);\n        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(attribute.getData()), gl.STATIC_DRAW);\n        if (attribute.hasIndices()) {\n            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, attribute.getIndicesBuffer());\n            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, attribute.getIndices(), gl.DYNAMIC_DRAW);\n        }\n    }\n    sendUniforms(gl) {\n        Object.keys(this.uniforms).forEach((key) => {\n            const uniform = this.uniforms[key];\n            switch (uniform.constructor) {\n                case ShaderUniform_1.BooleanUniform:\n                    gl.uniform1i(uniform.getLocation(), uniform.getData());\n                    break;\n                case ShaderUniform_1.FloatUniform:\n                    gl.uniform1f(uniform.getLocation(), uniform.getData());\n                    break;\n                case ShaderUniform_1.IntegerUniform:\n                    gl.uniform1i(uniform.getLocation(), uniform.getData());\n                    break;\n                case ShaderUniform_1.Matrix4Uniform:\n                    gl.uniformMatrix4fv(uniform.getLocation(), false, uniform.getData());\n                    break;\n                case ShaderUniform_1.Vector2Uniform:\n                    gl.uniform2fv(uniform.getLocation(), uniform.getData());\n                    break;\n                case ShaderUniform_1.Vector3Uniform:\n                    gl.uniform3fv(uniform.getLocation(), uniform.getData());\n                    break;\n                case ShaderUniform_1.Vector4Uniform:\n                    gl.uniform4fv(uniform.getLocation(), uniform.getData());\n                    break;\n                default:\n                    throw new Error(`Invalid type provided for uniform ${key} provided.`);\n            }\n        });\n    }\n    setAttributeData(gl, attrbuteName, data, indices) {\n        const attr = this.attributes[attrbuteName];\n        attr.setData(data);\n        if (indices) {\n            attr.setIndices(indices);\n            if (!attr.hasIndicesBuffer()) {\n                attr.setIndicesBuffer(gl.createBuffer());\n            }\n        }\n    }\n    setUniformData(uniformName, data) {\n        this.uniforms[uniformName].setData(data);\n    }\n}\nexports.default = Shader;\n\n\n//# sourceURL=webpack:///./src/lib/Shader.ts?");

/***/ }),

/***/ "./src/lib/ShaderAttribute.ts":
/*!************************************!*\
  !*** ./src/lib/ShaderAttribute.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __rest = (this && this.__rest) || function (s, e) {\n    var t = {};\n    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)\n        t[p] = s[p];\n    if (s != null && typeof Object.getOwnPropertySymbols === \"function\")\n        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)\n            t[p[i]] = s[p[i]];\n    return t;\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ShaderData_1 = __webpack_require__(/*! ./ShaderData */ \"./src/lib/ShaderData.ts\");\nclass ShaderAttribute extends ShaderData_1.default {\n    constructor(locationName, _a = {}) {\n        var { indices } = _a, opts = __rest(_a, [\"indices\"]);\n        super(locationName, opts);\n        this.locationName = locationName;\n        this.indices = indices;\n    }\n    setBuffer(buffer) {\n        this.buffer = buffer;\n    }\n    hasIndices() {\n        return Boolean(this.indices);\n    }\n    setIndicesBuffer(buffer) {\n        this.indicesBuffer = buffer;\n    }\n    setLocation(location) {\n        this.location = location;\n    }\n    getBuffer() {\n        return this.buffer;\n    }\n    getLocation() {\n        return this.location;\n    }\n    getIndicesBuffer() {\n        return this.indicesBuffer;\n    }\n    getIndices() {\n        return this.indices;\n    }\n    setIndices(indices) {\n        this.indices = indices;\n    }\n    hasIndicesBuffer() {\n        return Boolean(this.indicesBuffer);\n    }\n}\nexports.ShaderAttribute = ShaderAttribute;\nclass VectorAttribute extends ShaderAttribute {\n    getData() {\n        return this.data;\n    }\n}\nexports.VectorAttribute = VectorAttribute;\nclass Vector2Attribute extends VectorAttribute {\n    constructor(locationName, opts = {}) {\n        super(locationName, opts);\n        this.locationName = locationName;\n    }\n}\nexports.Vector2Attribute = Vector2Attribute;\nclass Vector3Attribute extends VectorAttribute {\n    constructor(locationName, opts = {}) {\n        super(locationName, opts);\n        this.locationName = locationName;\n    }\n}\nexports.Vector3Attribute = Vector3Attribute;\nclass Vector4Attribute extends VectorAttribute {\n    constructor(locationName, opts = {}) {\n        super(locationName, opts);\n        this.locationName = locationName;\n    }\n}\nexports.Vector4Attribute = Vector4Attribute;\n\n\n//# sourceURL=webpack:///./src/lib/ShaderAttribute.ts?");

/***/ }),

/***/ "./src/lib/ShaderData.ts":
/*!*******************************!*\
  !*** ./src/lib/ShaderData.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nclass ShaderData {\n    constructor(locationName, { data } = {}) {\n        this.locationName = locationName;\n        this.data = data;\n    }\n    getData() {\n        return this.data;\n    }\n    setData(data) {\n        this.data = data;\n    }\n}\nexports.default = ShaderData;\n\n\n//# sourceURL=webpack:///./src/lib/ShaderData.ts?");

/***/ }),

/***/ "./src/lib/ShaderUniform.ts":
/*!**********************************!*\
  !*** ./src/lib/ShaderUniform.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst ShaderData_1 = __webpack_require__(/*! ./ShaderData */ \"./src/lib/ShaderData.ts\");\nclass ShaderUniform extends ShaderData_1.default {\n    constructor(locationName, opts = {}) {\n        super(locationName, opts);\n        this.locationName = locationName;\n    }\n    setLocation(location) {\n        this.location = location;\n    }\n    getLocation() {\n        return this.location;\n    }\n}\nexports.ShaderUniform = ShaderUniform;\nclass BooleanUniform extends ShaderUniform {\n    constructor(locationName, opts = {}) {\n        super(locationName, opts);\n        this.locationName = locationName;\n    }\n}\nexports.BooleanUniform = BooleanUniform;\nclass FloatUniform extends ShaderUniform {\n    constructor(locationName, opts = {}) {\n        super(locationName, opts);\n        this.locationName = locationName;\n    }\n}\nexports.FloatUniform = FloatUniform;\nclass IntegerUniform extends ShaderUniform {\n    constructor(locationName, opts = {}) {\n        super(locationName, opts);\n        this.locationName = locationName;\n    }\n}\nexports.IntegerUniform = IntegerUniform;\nclass Matrix4Uniform extends ShaderUniform {\n    constructor(locationName, opts = {}) {\n        super(locationName, opts);\n        this.locationName = locationName;\n        if (opts.data && opts.data.length !== 16) {\n            throw new Error('Dimension mismatch with matrix4 uniform');\n        }\n    }\n}\nexports.Matrix4Uniform = Matrix4Uniform;\nclass Vector2Uniform extends ShaderUniform {\n    constructor(locationName, opts = {}) {\n        super(locationName, opts);\n        this.locationName = locationName;\n        if (opts.data && opts.data.length !== 2) {\n            throw new Error('Dimension mismatch with matrix4 uniform');\n        }\n    }\n}\nexports.Vector2Uniform = Vector2Uniform;\nclass Vector3Uniform extends ShaderUniform {\n    constructor(locationName, opts = {}) {\n        super(locationName, opts);\n        this.locationName = locationName;\n        if (opts.data && opts.data.length !== 3) {\n            throw new Error('Dimension mismatch with matrix4 uniform');\n        }\n    }\n}\nexports.Vector3Uniform = Vector3Uniform;\nclass Vector4Uniform extends ShaderUniform {\n    constructor(locationName, opts = {}) {\n        super(locationName, opts);\n        this.locationName = locationName;\n        if (opts.data && opts.data.length !== 4) {\n            throw new Error('Dimension mismatch with matrix4 uniform');\n        }\n    }\n}\nexports.Vector4Uniform = Vector4Uniform;\n\n\n//# sourceURL=webpack:///./src/lib/ShaderUniform.ts?");

/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst Scene_1 = __webpack_require__(/*! ./lib/Scene */ \"./src/lib/Scene.ts\");\nconst Frame_1 = __webpack_require__(/*! ./lib/Frame */ \"./src/lib/Frame.ts\");\nconst Shader_1 = __webpack_require__(/*! ./lib/Shader */ \"./src/lib/Shader.ts\");\nconst ShaderAttribute_1 = __webpack_require__(/*! ./lib/ShaderAttribute */ \"./src/lib/ShaderAttribute.ts\");\nconst ShaderUniform_1 = __webpack_require__(/*! ./lib/ShaderUniform */ \"./src/lib/ShaderUniform.ts\");\nconst VERTEX_SHADER = __webpack_require__(/*! ./shaders/vertex.glsl */ \"./src/shaders/vertex.glsl\");\nconst RIPPLE_FRAGMENT_SHADER = __webpack_require__(/*! ./shaders/ripple.fragment.glsl */ \"./src/shaders/ripple.fragment.glsl\");\nconst WINDOW_FRAGMENT_SHADER = __webpack_require__(/*! ./shaders/window.fragment.glsl */ \"./src/shaders/window.fragment.glsl\");\nconst WATER_FRAGMENT_SHADER = __webpack_require__(/*! ./shaders/water.fragment.glsl */ \"./src/shaders/water.fragment.glsl\");\nconst FULL_VIEW_PLANE_VERTICES = [-1, 1, -1, -1, 1, 1, 1, -1];\nconst FULL_PLANE_VIEW_TEX_COORDS = [0, 1, 0, 0, 1, 1, 1, 0];\nfunction onMouseMove(event, callback) {\n    const x = event.clientX / window.innerWidth;\n    const y = (window.innerHeight - event.clientY) / window.innerHeight;\n    callback(x, y);\n}\nfunction initCanvas() {\n    const canvas = document.createElement('canvas');\n    const w = canvas.width = window.innerWidth;\n    const h = canvas.height = window.innerHeight;\n    const ctx = canvas.getContext('2d');\n    ctx.fillStyle = 'rgba(122.5, 122.5, 122.5, 1)';\n    for (let x = 0; x < w; x++)\n        for (let y = 0; y < h; y++) {\n            ctx.fillRect(x, y, 1, 1);\n        }\n    return canvas;\n}\ndocument.body.onload = function main() {\n    const canvas = document.getElementById('canvas');\n    const w = canvas.width = window.innerWidth;\n    const h = canvas.height = window.innerHeight;\n    const scene = new Scene_1.default(canvas);\n    const rippleShader = new Shader_1.default(VERTEX_SHADER, RIPPLE_FRAGMENT_SHADER, {\n        aVertices: new ShaderAttribute_1.Vector2Attribute('a_Position', { data: FULL_VIEW_PLANE_VERTICES }),\n        aTextureCoord: new ShaderAttribute_1.Vector2Attribute('a_TextureCoord', { data: FULL_PLANE_VIEW_TEX_COORDS }),\n    }, {\n        uPreviousFrame0: new ShaderUniform_1.IntegerUniform('u_PreviousFrame0', { data: 0 }),\n        uPreviousFrame1: new ShaderUniform_1.IntegerUniform('u_PreviousFrame1', { data: 1 }),\n        uResolution: new ShaderUniform_1.Vector2Uniform('u_Resolution', { data: [w, h] }),\n        uInput: new ShaderUniform_1.IntegerUniform('u_Input', { data: 0 }),\n        uMousePosition: new ShaderUniform_1.Vector2Uniform('u_MousePosition', { data: [0, 0] }),\n    });\n    for (let i = 0; i < 3; i++) {\n        scene.addFrame(`ripple${i}`, new Frame_1.default(w, h, 4, rippleShader));\n    }\n    const waterShader = new Shader_1.default(VERTEX_SHADER, WATER_FRAGMENT_SHADER, {\n        aVertices: new ShaderAttribute_1.Vector2Attribute('a_Position', { data: FULL_VIEW_PLANE_VERTICES }),\n        aTextureCoord: new ShaderAttribute_1.Vector2Attribute('a_TextureCoord', { data: FULL_PLANE_VIEW_TEX_COORDS }),\n    }, {\n        uHeightMap: new ShaderUniform_1.IntegerUniform('u_HeightMap', { data: 0 }),\n        uTexture: new ShaderUniform_1.IntegerUniform('u_Texture', { data: 1 }),\n        uResolution: new ShaderUniform_1.Vector2Uniform('u_Resolution', { data: [w, h] }),\n    });\n    scene.addFrame('water', new Frame_1.default(w, h, 4, waterShader));\n    const windowShader = new Shader_1.default(VERTEX_SHADER, WINDOW_FRAGMENT_SHADER, {\n        aVertices: new ShaderAttribute_1.Vector2Attribute('a_Position', { data: FULL_VIEW_PLANE_VERTICES }),\n        aTextureCoord: new ShaderAttribute_1.Vector2Attribute('a_TextureCoord', { data: FULL_PLANE_VIEW_TEX_COORDS }),\n    }, {\n        uCurrentFrame: new ShaderUniform_1.IntegerUniform('u_CurrentFrame', { data: 0 }),\n    });\n    scene.addFrame('window', new Frame_1.default(w, h, 4, windowShader));\n    scene.addTexture('normal_dist', initCanvas());\n    scene.addTexture('pond', document.getElementById('pond-img'));\n    document.addEventListener('mousemove', (ev) => onMouseMove(ev, (x, y) => {\n        scene.getFrame('ripple2').shader.setUniformData('uInput', 1);\n        scene.getFrame('ripple2').shader.setUniformData('uMousePosition', [x, y]);\n    }));\n    document.addEventListener('mousedown', () => scene.toggleAnimation());\n    let epoch = 0;\n    scene.render(true, () => {\n        switch (epoch++) {\n            case 0:\n                scene.bindTexture('normal_dist', WebGLRenderingContext.TEXTURE0);\n                scene.bindTexture('normal_dist', WebGLRenderingContext.TEXTURE1);\n                scene.renderFrameAsTexture('ripple0', WebGLRenderingContext.TEXTURE0);\n                scene.bindTexture('pond', WebGLRenderingContext.TEXTURE1);\n                scene.renderFrameAsTexture('water', WebGLRenderingContext.TEXTURE0);\n                break;\n            case 1:\n                scene.bindTexture('normal_dist', WebGLRenderingContext.TEXTURE0);\n                scene.bindFrameToTexture('ripple0', WebGLRenderingContext.TEXTURE1);\n                scene.renderFrameAsTexture('ripple1', WebGLRenderingContext.TEXTURE0);\n                scene.bindTexture('pond', WebGLRenderingContext.TEXTURE1);\n                scene.renderFrameAsTexture('water', WebGLRenderingContext.TEXTURE0);\n                break;\n            default:\n                scene.bindFrameToTexture('ripple0', WebGLRenderingContext.TEXTURE0);\n                scene.bindFrameToTexture('ripple1', WebGLRenderingContext.TEXTURE1);\n                scene.renderFrameAsTexture('ripple2', WebGLRenderingContext.TEXTURE0);\n                scene.bindTexture('pond', WebGLRenderingContext.TEXTURE1);\n                scene.renderFrameAsTexture('water', WebGLRenderingContext.TEXTURE0);\n                const tmp = scene.getFrame('ripple0');\n                scene.setFrame('ripple0', scene.getFrame('ripple1'));\n                scene.setFrame('ripple1', scene.getFrame('ripple2'));\n                scene.setFrame('ripple2', tmp);\n                break;\n        }\n        scene.renderFrameToCanvas('window');\n    });\n};\n\n\n//# sourceURL=webpack:///./src/main.ts?");

/***/ }),

/***/ "./src/shaders/ripple.fragment.glsl":
/*!******************************************!*\
  !*** ./src/shaders/ripple.fragment.glsl ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"precision highp float;\\n#define GLSLIFY 1\\n\\nvarying vec2 v_TextureCoord;\\n\\nuniform sampler2D u_PreviousFrame0;\\nuniform sampler2D u_PreviousFrame1;\\nuniform vec2 u_Resolution;\\nuniform int u_Input;\\nuniform vec2 u_MousePosition;\\n\\nconst mat3 LAPLACIAN_KERNEL = mat3(\\n    0.25,  0.50, 0.25,\\n    0.50, -3.00, 0.50,\\n    0.25,  0.50, 0.25);\\nconst float DAMPING = 0.02;\\nconst float DISPLACEMENT_RADIUS = 0.01;\\n\\nfloat convoluteMatrices(mat3 A, mat3 B) {\\n  return dot(A[0], B[0]) + dot(A[1], B[1]) + dot(A[2], B[2]);\\n}\\n\\nfloat applyKernel(sampler2D textureSampler, vec2 textureCoord, vec2 resolution, mat3 kernel) {\\n  vec2 gradientStep = vec2(1.) / resolution;\\n  mat3 imgMat;\\n  for (int i = 0; i < 3; i++) {\\n    for (int j = 0; j < 3; j++) {\\n      vec2 ds = vec2(\\n          -gradientStep.x + (float(i) * gradientStep.x),\\n          -gradientStep.y + (float(j) * gradientStep.y));\\n      imgMat[i][j] = texture2D(\\n          textureSampler, clamp(textureCoord + ds, vec2(0.), vec2(1.))).x;\\n    }\\n  }\\n  return convoluteMatrices(kernel, imgMat);\\n}\\n\\nvoid main() {\\n  float u0 = texture2D(u_PreviousFrame0, v_TextureCoord).x;\\n  float u1 = texture2D(u_PreviousFrame1, v_TextureCoord).x;\\n\\n  float L = applyKernel(\\n      u_PreviousFrame1, v_TextureCoord, u_Resolution, LAPLACIAN_KERNEL);\\n  float damping = 0.0;\\n\\n  // Verlet integration step.\\n  float uf = 2.0 * u1 - u0 + L;\\n\\n  // Linear damping.\\n  uf = DAMPING * 0.5 + (1.0 - DAMPING) * uf;\\n\\n  float displacement = 0.0;\\n  vec2 ds = (v_TextureCoord - u_MousePosition) * vec2(1.0, u_Resolution.y / u_Resolution.x);\\n  if (u_Input != 0 && length(ds) <= DISPLACEMENT_RADIUS) {\\n    displacement -= 1.0;\\n  }\\n\\n  gl_FragColor = vec4(vec3(clamp(uf + displacement, 0.0, 1.0)), 1.0);\\n}\\n\"\n\n//# sourceURL=webpack:///./src/shaders/ripple.fragment.glsl?");

/***/ }),

/***/ "./src/shaders/vertex.glsl":
/*!*********************************!*\
  !*** ./src/shaders/vertex.glsl ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"precision mediump float;\\n#define GLSLIFY 1\\n\\nattribute vec2 a_Position;\\nattribute vec2 a_TextureCoord;\\n\\nvarying vec2 v_TextureCoord;\\n\\nvoid main() {\\n  gl_Position = vec4(a_Position, 0., 1.);\\n  v_TextureCoord = a_TextureCoord;\\n}\\n\"\n\n//# sourceURL=webpack:///./src/shaders/vertex.glsl?");

/***/ }),

/***/ "./src/shaders/water.fragment.glsl":
/*!*****************************************!*\
  !*** ./src/shaders/water.fragment.glsl ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"precision highp float;\\n#define GLSLIFY 1\\n\\nvarying vec2 v_TextureCoord;\\n\\nuniform sampler2D u_HeightMap;\\nuniform sampler2D u_Texture;\\nuniform vec2 u_Resolution;\\n\\nconst float DEPTH = 10.0;\\nconst float PERTURBANCE = 0.05;\\nconst vec3 VIEW_VECTOR = vec3(0.0, 0.0, -1.0);\\nconst vec3 LIGHT_POSITION = normalize(vec3(4.0, 6.0, 1.0));\\nconst float AMBIENT = 0.9;\\nconst float LAMBERTIAN = 0.4;\\nconst float REFRACTIVE_INDEX = 1.1;\\n\\nfloat getWaterHeight(float texHeight) {\\n  return DEPTH + (2.0 * texHeight - 1.0) * PERTURBANCE;\\n}\\n\\nvoid main() {\\n  float H = getWaterHeight(texture2D(u_HeightMap, v_TextureCoord).x);\\n\\n  // Compute normal.\\n  vec2 ds = vec2(10.0) / u_Resolution;\\n  float Hx = getWaterHeight(\\n      texture2D(u_HeightMap, v_TextureCoord + vec2(ds.x, 0.0)).x);\\n  vec3 dx = vec3(ds.x, 0.0, Hx - H);\\n  float Hy = getWaterHeight(\\n      texture2D(u_HeightMap, v_TextureCoord + vec2(0.0, ds.y)).x);\\n  vec3 dy = vec3(0.0, ds.y, Hy - H);\\n  vec3 normal = normalize(cross(dx, dy));\\n\\n  vec2 transformedTexCoord;\\n  if (normal == VIEW_VECTOR) {\\n    transformedTexCoord = v_TextureCoord;\\n  } else {\\n    vec3 axial = normalize(normal - VIEW_VECTOR);\\n    float sine = length(cross(normal, VIEW_VECTOR));\\n    sine *= REFRACTIVE_INDEX;\\n    float offset = tan(asin(sine)) * H;\\n    vec3 displacement = normalize(vec3(offset * axial.xy, H)) / 100.0;\\n    transformedTexCoord = v_TextureCoord + displacement.xy;\\n  }\\n\\n  // Lighting.\\n  float lambertian = dot(normal, LIGHT_POSITION);\\n  float lighting = AMBIENT;\\n  lighting +=  dot(normal, LIGHT_POSITION) * LAMBERTIAN;\\n  float specular = pow(dot(normal, LIGHT_POSITION), 200.0);\\n\\n  gl_FragColor = texture2D(u_Texture, transformedTexCoord) * lighting + specular;\\n}\\n\"\n\n//# sourceURL=webpack:///./src/shaders/water.fragment.glsl?");

/***/ }),

/***/ "./src/shaders/window.fragment.glsl":
/*!******************************************!*\
  !*** ./src/shaders/window.fragment.glsl ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = \"precision highp float;\\n\\nprecision mediump float;\\n#define GLSLIFY 1\\n\\nvarying vec2 v_TextureCoord;\\n\\nuniform sampler2D u_CurrentFrame;\\n\\nvoid main() {\\n  gl_FragColor = texture2D(u_CurrentFrame, v_TextureCoord);\\n}\\n\\n\"\n\n//# sourceURL=webpack:///./src/shaders/window.fragment.glsl?");

/***/ })

/******/ });