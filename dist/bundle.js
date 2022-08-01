/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./engine/base.js":
/*!************************!*\
  !*** ./engine/base.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("var __dirname = \"/\";\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Behavior\": () => (/* binding */ Behavior),\n/* harmony export */   \"Component\": () => (/* binding */ Component),\n/* harmony export */   \"GameController\": () => (/* binding */ GameController),\n/* harmony export */   \"GameObject\": () => (/* binding */ GameObject),\n/* harmony export */   \"MouseObject\": () => (/* binding */ MouseObject),\n/* harmony export */   \"Scene\": () => (/* binding */ Scene)\n/* harmony export */ });\n/// _global define\nconst path = __webpack_require__(Object(function webpackMissingModule() { var e = new Error(\"Cannot find module 'path'\"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));\n\nconst _instance = {\n  objects: [],\n  tiles: [],\n  cameras: [],\n  controllers: [],\n};\n\nconst _global = {\n  canvas: null,\n  ctx: null,\n  mouse: null,\n  scene: null,\n};\n\n// filter action\nconst info_game = document.querySelector(\"#info\");\nconst search_node = document.querySelector(\"input#searchKey\");\n\nsearch_node.onkeydown = (e) => filterInput();\n\nfunction filterInput() {\n  const value = search_node.value;\n  const children = info_game.childNodes;\n\n  children.forEach((child) => {\n    const name = child.id;\n    if (name.includes(value) || !value || value === \"\") {\n      child.style.display = \"\";\n    } else {\n      child.style.display = \"none\";\n    }\n  });\n}\n\nfunction listenEvent(_global, _instance) {\n  const { mouse, canvas } = _global;\n\n  canvas.onmousemove = (e) => {\n    mouse.onMouseMove(e);\n\n    Object.values(_instance).forEach((value) => {\n      if (value && value.length > 0) {\n        value.forEach((item) => item?.onMouseMove(e));\n      }\n    });\n  };\n\n  // mouse up\n  canvas.onmouseup = (e) => {\n    mouse.onMouseUp(e);\n\n    Object.values(_instance).forEach((value) => {\n      if (value && value.length > 0) {\n        value.forEach((item) => item?.onMouseUp(e));\n      }\n    });\n  };\n\n  // mouse down\n  canvas.onmousedown = (e) => {\n    mouse.onMouseDown(e);\n\n    Object.values(_instance).forEach((value) => {\n      if (value && value.length > 0) {\n        value.forEach((item) => item.onMouseDown(e));\n      }\n    });\n  };\n\n  document.addEventListener(\"keyup\", (e) => {\n    Object.values(_instance).forEach((value) => {\n      if (value && value.length > 0) {\n        value.forEach((item) => item.onKeyUp(e));\n      }\n    });\n  });\n\n  document.addEventListener(\"keydown\", (e) => {\n    Object.values(_instance).forEach((value) => {\n      if (value && value.length > 0) {\n        value.forEach((item) => item.onKeyDown(e));\n      }\n    });\n  });\n}\n///\nclass Behavior {\n  /**\n   * @param {MouseEvent} e\n   * @return {void}\n   */\n\n  onMouseDown(e) {}\n  onMouseMove(e) {}\n  onKeyDown(e) {}\n  onKeyUp(e) {}\n  onMouseUp(e) {}\n\n  keyListen = [];\n}\n\nclass Component extends Behavior {\n  x;\n  y;\n  w;\n  h;\n  s;\n  id;\n  velocity = {\n    x: 0,\n    y: 0,\n  };\n  name;\n  stop;\n  selected;\n  instance;\n  dImage;\n  imgs = [];\n\n  get _instance() {\n    return _instance;\n  }\n  get _global() {\n    return _global;\n  }\n  get _cameras() {\n    return this._instance.cameras;\n  }\n  get _objects() {\n    return this._instance.objects;\n  }\n  get _tiles() {\n    return this._instance.tiles;\n  }\n  get _controllers() {\n    return this._instance.controllers;\n  }\n  get _canvas() {\n    return this._global.canvas;\n  }\n  set _canvas(canvas) {\n    this._global.canvas = canvas;\n  }\n  get _mouse() {\n    return this._global.mouse;\n  }\n  set _mouse(mouse) {\n    this._global.mouse = mouse;\n  }\n  get _ctx() {\n    return this._global.ctx;\n  }\n  get _scene() {\n    return this._global.scene;\n  }\n  set _scene(scene) {\n    this._global.scene = scene;\n  }\n  set _ctx(ctx) {\n    this._global.ctx = ctx;\n  }\n  get _pos() {\n    return {\n      x: this.x + this.w / 2,\n      y: this.y + this.h / 2,\n    };\n  }\n  set _pos(pos) {\n    (this.x = pos - this.w / 2), (this.y = pos - this.h / 2);\n  }\n  set _velocity(velocity) {\n    this.velocity = {\n      x: velocity.x ?? 0,\n      y: velocity.y ?? 0,\n    };\n  }\n\n  constructor(name, x, y, w, h, s, id) {\n    super();\n    this.name = name;\n    this.x = x;\n    this.y = y;\n    this.w = w;\n    this.h = h;\n    this.id = id;\n    this.s = s;\n    this._velocity = { x: 0, y: 0 };\n    this.init();\n  }\n  init() {}\n\n  // add game object\n  add(ob, name) {\n    if (Object.keys(_instance).includes(name)) {\n      this._instance[name].push(ob);\n    }\n  }\n  addList(list, name) {\n    if (list && list.length > 0) {\n      list.map((item) => {\n        item.x += this.x;\n        item.y += this.y;\n        this.add(item, name);\n      });\n    }\n  }\n\n  // before life cycle\n  beforeDraw(context) {}\n\n  // binding ( can`t fix)\n  binding(e) {}\n\n  // action in loop range\n  loop(e) {}\n\n  // action in draw\n  draw(e) {\n    if (this.dImage && this.dImage.src && this.imgs.length > 0) {\n      this._ctx.drawImage(this.dImage.src, init.x);\n    } else {\n      this._ctx.restore();\n      this._ctx.fillStyle = this.color;\n      this._ctx.fillRect(this.x, this.y, this.w, this.h);\n\n      if (this.selected) {\n        drawCircle(this._ctx, this._pos.x, this._pos.y, this.s, \"#4eff1080\");\n      }\n\n      if (this.imgs.length && this.dImage.pos >= this.imgs.length) {\n        this.dImage = this.imgs[0];\n      } else {\n        this.imgFrame += 1;\n        this.dImage = this.imgs[this.imgFrame];\n      }\n    }\n  }\n\n  // action in after draw\n  afterDraw(context) {}\n\n  // launch\n  launch() {\n    try {\n      if (!this.stop) {\n        // Clear\n        this.binding(this);\n        this.beforeDraw(this);\n        this.loop(this);\n        this.draw(this);\n        this.afterDraw(this);\n      }\n\n      // End\n    } catch (error) {\n      console.log(\"error: \", error);\n      this.stop = true;\n      throw error;\n    }\n  }\n\n  destroy() {\n    delete this;\n  }\n\n  setInfo([key, value]) {\n    if (Array.isArray(key) && key.length === 2) {\n      if (this && this[key[0]]) {\n        this[[key[0]]][key[1]];\n      }\n    } else {\n      if (this[key] && value) {\n        this[key] = value;\n      }\n    }\n\n    this.logInfo();\n  }\n\n  logInfo() {\n    const ul = document.querySelector(\"#info\");\n    ul.innerHTML = \"\";\n    const data = JSON.stringify(this);\n    const jsonData = JSON.parse(data);\n\n    Object.entries(jsonData).forEach(([key, value]) => {\n      const li = document.createElement(\"li\");\n      const h4 = document.createElement(\"h4\");\n      const input = document.createElement(\"input\");\n\n      li.id = key;\n      h4.innerHTML = key;\n      h4.style.marginTop = \"5px\";\n      h4.style.marginBottom = \"5px\";\n\n      switch (typeof value) {\n        case \"boolean\":\n          const divB = document.createElement(\"div\");\n          const input1 = document.createElement(\"input\");\n          const input2 = document.createElement(\"input\");\n\n          const label1 = document.createElement(\"label\");\n          const label2 = document.createElement(\"label\");\n\n          const id1 = [key, \"true\"].join(\"_\");\n          const id2 = [key, \"false\"].join(\"_\");\n\n          label1.setAttribute(\"for\", id1);\n          label1.innerHTML = \"True\";\n\n          label2.setAttribute(\"for\", id2);\n          label2.innerHTML = \"False\";\n\n          input1.name = key;\n          input1.type = \"radio\";\n          input1.id = id1;\n          input1.defaultChecked = value;\n          input1.value = true;\n\n          input2.name = key;\n          input2.type = \"radio\";\n          input2.id = id2;\n          input2.defaultChecked = !value;\n          input2.value = false;\n\n          input1.onclick = (e) => {\n            this.setInfo([key, !this[key]]);\n          };\n\n          input2.onclick = (e) => {\n            this.setInfo([key, !this[key]]);\n          };\n\n          divB.style.display = \"flex\";\n          divB.append(input1, label1, input2, label2);\n\n          li.append(h4, divB);\n          break;\n\n        case \"string\":\n        case \"number\":\n          const div = document.createElement(\"div\");\n          const button = document.createElement(\"button\");\n          const type = typeof value === \"string\" ? \"text\" : \"number\";\n\n          input.value = value;\n          input.name = key;\n          input.type = type;\n          input.style.borderColor = type === \"number\" ? \"blue\" : \"\";\n          input.onkeydown = (e) => {\n            if (e.key === \"Enter\") {\n              this.setInfo([\n                key,\n                input.type === \"number\" ? parseFloat(input.value) : input.value,\n              ]);\n            }\n          };\n\n          button.innerHTML = \"save\";\n          button.onclick = () =>\n            this.setInfo([\n              key,\n              input.type === \"number\" ? parseFloat(input.value) : input.value,\n            ]);\n\n          div.style.display = \"flex\";\n          div.append(input, button);\n\n          li.append(h4, div);\n          break;\n\n        case \"object\":\n          const listItem = document.createElement(\"div\");\n          const mapItem =\n            typeof value === \"object\"\n              ? Object.entries(value)\n              : value.map((item, id) => [id, item]);\n\n          mapItem.map(([chKey, chValue]) => {\n            if (typeof chValue !== \"object\") {\n              const nInput = document.createElement(\"input\");\n              const container = document.createElement(\"div\");\n              const pItem = document.createElement(\"p\");\n              const button = document.createElement(\"button\");\n              const type = typeof chValue === \"string\" ? \"text\" : \"number\";\n\n              pItem.innerHTML = chKey;\n\n              nInput.value = chValue;\n              nInput.name = [key, chKey].join(\"_\");\n              nInput.type = type;\n              nInput.style.borderColor = type === \"number\" ? \"purple\" : \"\";\n              nInput.onkeydown = ({ key }) => {\n                if (key === \"Enter\") {\n                  this.setInfo([\n                    nInput,\n                    nInput.type === \"number\"\n                      ? parseFloat(nInput.value)\n                      : nInput.value,\n                  ]);\n                }\n              };\n\n              button.innerHTML = \"save\";\n              button.onclick = () =>\n                this.setInfo([\n                  nInput.name.split(\"_\"),\n                  nInput.type === \"number\"\n                    ? parseFloat(nInput.value)\n                    : nInput.value,\n                ]);\n\n              container.style.display = \"flex\";\n              container.append(nInput, button);\n              listItem.append(pItem, container);\n            } else {\n              if (typeof chValue === \"object\" && chValue[\"logInfo\"]) {\n                chValue.logInfo();\n              }\n            }\n          });\n\n          listItem.id = key;\n          listItem.style.margin = \"0px 0px 5px 5px\";\n          listItem.style.paddingLeft = \"10px\";\n\n          li.append(h4, listItem);\n          break;\n\n        default:\n          break;\n      }\n\n      ul.appendChild(li);\n    });\n\n    filterInput();\n  }\n\n  // clear\n  clear() {\n    if (this._ctx && this._ctx !== {}) {\n      this._ctx.clearRect(this.x, this.y, this.w, this.h);\n    }\n  }\n}\n\nclass Scene extends Component {\n  fps = 60;\n  frame = 0;\n  timeMachine = 0;\n  stop = false;\n  action;\n  selector = {};\n  zIndex = 0;\n  lastClick = { x: 0, y: 0 };\n  time = 0;\n  limit = {\n    x: this.w,\n    y: this.h,\n  };\n  type = \"scene\";\n  constructor(name, x, y, w, h, s, id) {\n    super(name, x, y, w, h, s, id);\n    this.name = name;\n    this.x = x;\n    this.y = y;\n    this.w = w;\n    this.h = h;\n    this.id = id;\n    this.s = s;\n  }\n\n  // render ( only scene render)\n  render() {\n    // add listen event\n    listenEvent(this._global, this._instance);\n\n    try {\n      // render view\n      if (!this.stop) {\n        // clear rect\n        this.action = setInterval(() => {\n          this.clear();\n          this._tiles.forEach((item) => {\n            item.launch();\n          });\n          this._objects.forEach((item) => {\n            item.launch();\n          });\n          this._cameras.forEach((item) => {\n            item.launch();\n          });\n\n          this._mouse && this._mouse.launch();\n\n          this.info();\n        }, 1000 / this.fps);\n      } else {\n        if (!this._ctx) {\n          console.log(\"Game CTX need be to define\");\n        }\n\n        console.log(\"____GAME STOP____\");\n      }\n    } catch (error) {\n      clearInterval(this.action);\n\n      console.log(\"error\", error);\n      throw error;\n    }\n  }\n\n  info(callback) {\n    // frame and write context\n    if (this.frame < this.fps) {\n      this.frame += 1;\n    } else {\n      this.frame = 0;\n      this.time += 1;\n    }\n    this.timeMachine = new Date().toLocaleDateString();\n    this._ctx.font = 20;\n    this._ctx.fillStyle = \"black\";\n    this._ctx.fillText(\"frame:\" + this.frame, this.w - 100, 20);\n    this._ctx.fillText(\"fps:\" + this.fps, this.w - 100, 40);\n    this._ctx.fillText(\"time: \" + this.time, this.w - 100, 60);\n    this._ctx.fillText(\"date: \" + this.timeMachine, this.w - 100, 80);\n  }\n}\n\n// Controller\nclass GameController extends Component {\n  type = \"gob\";\n\n  constructor(name, x, y, w, h, s, id) {\n    super(name, x, y, w, h, s, id);\n    this.name = name;\n    this.x = x;\n    this.y = y;\n    this.w = w;\n    this.h = h;\n    this.id = id;\n    this.s = s;\n  }\n\n  get _collisions() {\n    const list = [];\n    this._objects.forEach((ob, id) => {\n      const pX = ob._pos.x;\n      const pY = ob._pos.y;\n\n      this._objects.forEach((ob1, id1) => {\n        const pX1 = ob1._pos.x;\n        const pY1 = ob1._pos.y;\n        const dx = Math.abs(pX1 - pX);\n        const dy = Math.abs(pY1 - pY);\n\n        if (Math.sqrt(dx * dx + dy * dy) < ob.s + ob1.s) {\n          list.push([id, id1]);\n        }\n      });\n    });\n\n    return list;\n  }\n}\n\nclass GameObject extends Component {\n  x = 0;\n  y = 0;\n  w = 0;\n  h = 0;\n  s = 0;\n  r = 0;\n  src;\n  fps;\n  type;\n  velocity = {\n    x: 0,\n    y: 0,\n  };\n  speed = 1;\n  gravity = 0;\n  // imgs; frame: src: link, end: timestamp - ms\n  imgs = [];\n  dImage = {\n    src: null,\n    pos: 0,\n    end: 0,\n  };\n  imgFrame = 0;\n  state = \"active\";\n  selected = false;\n  zIndex = 1;\n  type = \"gameob\";\n\n  get _speed() {\n    this.speed / this.fps;\n  }\n\n  constructor(name, x, y, w, h, id, r, s) {\n    super(name, x, y, w, h, id, r, s);\n    this.name = name;\n    this.id = id;\n    this.x = x;\n    this.y = y;\n    this.w = w;\n    this.h = h;\n    this.s = s;\n  }\n\n  setImage(src) {\n    const img = new Image();\n    img.src = path.resolve(__dirname, \"mimic\", \"src\", `${src}`);\n    img.width = 400;\n    img.height = 400;\n\n    this.img = img;\n  }\n\n  onNoneDetect(e) {}\n  onDetect(e) {}\n  binding() {\n    if (this.gravity) {\n      this.y += this.velocity.y;\n      this.velocity.y += this.gravity;\n    }\n\n    this.checkCollision();\n  }\n  handleOnCollision(cpX, cpY) {\n    this.x -= cpX;\n    this.y -= cpY;\n    this._velocity = { x: 0, y: 0 };\n  }\n  checkCollision() {\n    const results = [];\n    this._objects\n      .filter((item) => item.name !== this.name)\n      .forEach((ob) => {\n        const dx = Math.abs(ob._pos.x - this._pos.x);\n        const dy = Math.abs(ob._pos.y - this._pos.y);\n\n        if (Math.sqrt(dx * dx + dy * dy) < Math.abs(ob.s + this.s) + 2) {\n          this.handleOnCollision(\n            this._pos.x < ob._pos.x,\n            this._pos.y < ob._pos.y\n          );\n        }\n      });\n\n    return results;\n  }\n}\nclass MouseObject extends Component {\n  zIndex = 999;\n  selected = false;\n  down = false;\n  type = \"mouse\";\n\n  constructor(name, x, y, w, h, s, id) {\n    super(name, x, y, w, h, s, id);\n    this.name = name;\n    this.id = id;\n    this.x = x;\n    this.y = y;\n    this.w = w;\n    this.h = h;\n    this.s = s;\n  }\n\n  onMouseDown(e) {\n    this.x = e.clientX;\n    this.y = e.clientY;\n    this.w = 0;\n    this.h = 0;\n\n    this.down = true;\n  }\n\n  onMouseMove(e) {\n    if (this.down) {\n      this.w = e.clientX - this.x;\n      this.h = e.clientY - this.y;\n    }\n  }\n\n  onMouseUp(e) {\n    this.w = 0;\n    this.h = 0;\n\n    this.down = false;\n  }\n\n  draw(context) {\n    if (!this.down) {\n      this.clear();\n      drawX(this._ctx, this.x - 10, this.y - 10, 10, 3);\n    } else {\n      drawRawSelected(this._ctx, this.x, this.y, this.w, this.h);\n    }\n  }\n}\n\n\n//# sourceURL=webpack://mimic/./engine/base.js?");

/***/ }),

/***/ "./engine/drawing.js":
/*!***************************!*\
  !*** ./engine/drawing.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"drawCircle\": () => (/* binding */ drawCircle),\n/* harmony export */   \"drawHealth\": () => (/* binding */ drawHealth),\n/* harmony export */   \"drawSelected\": () => (/* binding */ drawSelected)\n/* harmony export */ });\nfunction drawSelected(ctx, x, y, w, h) {\n  ctx.restore();\n\n  ctx.beginPath();\n  ctx.moveTo(x - 4, y - 4);\n  ctx.lineTo(x - 4, y + 4 + h);\n  ctx.lineTo(x + 4 + w, y + 4 + h);\n  ctx.lineTo(x + 4 + w, y + -4);\n  ctx.lineTo(x - 4, y - 4);\n  ctx.strokeStyle = \"#4eff00\";\n  ctx.lineWidth = 1;\n  ctx.stroke();\n}\n\nfunction drawSquare(ctx, x, y, w, h, color) {\n  ctx.restore();\n\n  ctx.beginPath();\n  ctx.lineWidth = 1;\n  ctx.moveTo(x, y);\n  ctx.lineTo(x, y + h);\n  ctx.lineTo(x + w, y + h);\n  ctx.lineTo(x + w, y);\n  ctx.lineTo(x, y);\n  ctx.strokeStyle = color ?? \"#4eff00\";\n  ctx.stroke();\n}\n\nfunction drawRawSelected(ctx, x, y, w, h) {\n  ctx.restore();\n\n  ctx.beginPath();\n  ctx.moveTo(x, y);\n  ctx.lineTo(x, y + h);\n  ctx.lineTo(x + w, y + h);\n  ctx.lineTo(x + w, y);\n  ctx.lineTo(x, y);\n  ctx.strokeStyle = \"#4eff00\";\n  ctx.lineWidth = 1;\n  ctx.stroke();\n}\n\nfunction detectRange(ctx, x, y, w, h) {\n  ctx.restore();\n\n  ctx.beginPath();\n  ctx.moveTo(x - 4, y - 4);\n  ctx.lineTo(x - 4, y + 4 + h);\n  ctx.lineTo(x + 4 + w, y + 4 + h);\n  ctx.lineTo(x + 4 + w, y + -4);\n  ctx.lineTo(x - 4, y - 4);\n  ctx.strokeStyle = \"#4eff00\";\n  ctx.lineWidth = 1;\n  ctx.stroke();\n}\n\nfunction drawX(ctx, x, y, s, w) {\n  ctx.restore();\n\n  ctx.beginPath();\n  ctx.strokeStyle = \"#4eff00\";\n  ctx.moveTo(x - (s ?? 20), y - (s ?? 20));\n  ctx.lineTo(x + (s ?? 20), y + (s ?? 20));\n  ctx.moveTo(x + (s ?? 20), y - (s ?? 20));\n  ctx.lineTo(x - (s ?? 20), y + (s ?? 20));\n  ctx.lineWidth = 1;\n  ctx.stroke();\n}\n\nfunction drawDashedLine(ctx, x, y, ex, ey) {\n  // Dashed line\n  ctx.restore();\n\n  ctx.beginPath();\n  ctx.strokeStyle = \"#4eff00\";\n\n  ctx.setLineDash([15, 3]);\n  ctx.moveTo(x, y);\n  ctx.lineTo(ex, ey);\n  ctx.stroke();\n  ctx.setLineDash([]);\n}\n\nfunction drawCircle(ctx, x, y, r, color) {\n  ctx.restore();\n\n  ctx.beginPath();\n  ctx.strokeStyle = color ?? \"#4eff0020\";\n  ctx.arc(x, y, r, 0, 2 * Math.PI);\n  ctx.stroke();\n}\n\nfunction drawHealth(ctx, x, y, percent) {\n  ctx.restore();\n\n  ctx.moveTo(x, y);\n  ctx.strokeStyle = \"#4eff00\";\n  ctx.lineTo(x + percent, y);\n  ctx.stroke();\n\n  ctx.moveTo(x + percent, y);\n  ctx.strokeStyle = \"#ec1e1e30\";\n  ctx.lineTo(x + 100, y);\n  ctx.stroke();\n}\n\n\n//# sourceURL=webpack://mimic/./engine/drawing.js?");

/***/ }),

/***/ "./engine/game-object.js":
/*!*******************************!*\
  !*** ./engine/game-object.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Button\": () => (/* binding */ Button),\n/* harmony export */   \"Camera\": () => (/* binding */ Camera),\n/* harmony export */   \"Sprite\": () => (/* binding */ Sprite),\n/* harmony export */   \"Tile\": () => (/* binding */ Tile),\n/* harmony export */   \"TitleMap\": () => (/* binding */ TitleMap),\n/* harmony export */   \"UI\": () => (/* binding */ UI)\n/* harmony export */ });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./engine/base.js\");\n\n\nclass Sprite extends _base__WEBPACK_IMPORTED_MODULE_0__.GameObject {\n  x = 0;\n  y = 0;\n  w = 0;\n  h = 0;\n  type = \"character\";\n  color = \"black\";\n  zIndex = 0;\n  type = \"sprite\";\n  selected = false;\n\n  constructor(name, x, y, w, h, s, id) {\n    super(name, x, y, w, h, s, id);\n    this.name = name;\n    this.id = id;\n    this.x = x;\n    this.y = y;\n    this.w = w;\n    this.h = h;\n    this.s = s;\n  }\n\n  onMouseDown(e) {\n    if (\n      this.x < e.clientX &&\n      this.x + this.w > e.clientX &&\n      this.y < e.clientY &&\n      this.y + this.h > e.clientY &&\n      this.type === \"sprite\"\n    ) {\n      this.selected = true;\n    }\n  }\n}\n\nclass Camera extends _base__WEBPACK_IMPORTED_MODULE_0__.GameObject {\n  x;\n  y;\n  w;\n  h;\n  color = \"#11111120\";\n  zIndex = -999;\n  type = \"camera\";\n  speed = 0;\n\n  constructor(name, x, y, w, h, id, s) {\n    super(name, x, y, w, h, id, s);\n    this.name = name;\n    this.id = id;\n    this.x = x;\n    this.y = y;\n    this.w = w;\n    this.h = h;\n    this.s = s;\n  }\n\n  onKeyDown(e) {\n    switch (e.key) {\n      case \"ArrowRight\":\n        this.x += this.speed;\n        break;\n\n      case \"ArrowLeft\":\n        this.x -= this.speed;\n        break;\n\n      case \"ArrowDown\":\n        this.y += this.speed;\n        break;\n\n      case \"ArrowUp\":\n        this.y -= this.speed;\n        break;\n\n      default:\n        break;\n    }\n  }\n}\n\nclass Tile extends _base__WEBPACK_IMPORTED_MODULE_0__.GameObject {\n  x;\n  y;\n  w;\n  h;\n  col;\n  row;\n  selected = false;\n  zIndex = 1;\n  active = false;\n\n  constructor(name, x, y, w, h, id, r, s) {\n    super(name, x, y, w, h, id, r, s);\n    this.name = name;\n    this.id = id;\n    this.x = x;\n    this.y = y;\n    this.w = w;\n    this.h = h;\n    this.s = s;\n  }\n\n  onMouseMove(e) {\n    const { x, y, w, h } = this;\n    const detect = detectOver({ x, y, w, h }, [[e.clientX, e.clientY]]);\n\n    if (detect && this.active) {\n      this.selected = true;\n    } else {\n      this.selected = false;\n    }\n  }\n\n  draw() {\n    if (this.dImage && this.dImage.src && this.imgs.length > 0) {\n      this._ctx.drawImage(this.dImage.src, init.x);\n    } else {\n      // fill rects\n      if (this.selected) {\n        drawSquare(this._ctx, this.x, this.y, this.w, this.h, \"#4eff0070\");\n      } else {\n        drawSquare(this._ctx, this.x, this.y, this.w, this.h, \"#4D118210\");\n      }\n\n      if (this.imgs.length && this.dImage.pos >= this.imgs.length) {\n        this.dImage = this.imgs[0];\n      } else {\n        this.imgFrame += 1;\n        this.dImage = this.imgs[this.imgFrame];\n      }\n    }\n  }\n}\n\nclass TitleMap extends _base__WEBPACK_IMPORTED_MODULE_0__.GameObject {\n  tiles = [];\n  color = \"whitesmoke\";\n  type = \"tilemap\";\n  column = 10;\n  row = 10;\n\n  constructor(name, x, y, w, h, id) {\n    super(name, x, y, w, h, id);\n    this.name = name;\n    this.id = id;\n    this.x = x;\n    this.y = y;\n    this.w = w;\n    this.h = h;\n  }\n\n  setTile([row, column]) {\n    const tiles = [];\n    const wTile = Math.abs(this.w - this.x) / column;\n    const hTile = Math.abs(this.h - this.y) / row;\n\n    for (let i = 0; i < row; i++) {\n      const tileRow = [];\n\n      const y = this.y + i * hTile;\n\n      for (let j = 0; j < column; j++) {\n        const x = this.x + j * hTile;\n        const tile = new Tile(`tile_${i + \"_\" + j}`, x, y, wTile, hTile);\n        tile.col = x;\n        tile.row = y;\n        tileRow.push(tile);\n      }\n\n      tiles.push(tileRow);\n    }\n\n    this.row = row;\n    this.column = column;\n    this.tiles = tiles;\n  }\n\n  onMouseDown(e) {\n    this.tiles.forEach((row) => {\n      row.forEach((item) => {\n        item.onMouseDown(e);\n      });\n    });\n  }\n\n  onMouseMove(e) {\n    this.tiles.forEach((row) => {\n      row.forEach((item) => {\n        item.onMouseMove(e);\n      });\n    });\n  }\n\n  draw() {\n    if (this.dImage && this.dImage.src && this.imgs.length > 0) {\n      this._ctx.drawImage(this.dImage.src, init.x);\n    } else {\n      // fill rects\n      this._ctx.fillStyle = \"#4eff0010\";\n      this._ctx.fillRect(this._ctx, this.x, this.y, this.w, this.h);\n\n      if (this.tiles && this.tiles.length > 0) {\n        this.tiles.forEach((tileRow) => {\n          tileRow.forEach((tile) => {\n            tile.launch();\n          });\n        });\n      }\n\n      if (this.imgs.length && this.dImage.pos >= this.imgs.length) {\n        this.dImage = this.imgs[0];\n      } else {\n        this.imgFrame += 1;\n        this.dImage = this.imgs[this.imgFrame];\n      }\n    }\n  }\n}\n\nclass UI extends _base__WEBPACK_IMPORTED_MODULE_0__.GameObject {\n  borderColor = \"black\";\n  binding() {\n    drawRawSelected(this._ctx, this.x, this.y, this.w, this.h);\n  }\n}\n\nclass Button extends _base__WEBPACK_IMPORTED_MODULE_0__.GameObject {\n  borderColor = \"red\";\n  fontColor = \"black\";\n  content = \"\";\n  binding() {\n    drawRawSelected(this._ctx, this.x, this.y, this.w, this.h);\n  }\n\n  onMouseDown(e) {\n    const { x, y, w, h } = this;\n    // detect one\n    const detect = detectOver({ x, y, w, h }, [[this._mouse.x, this._mouse.y]]);\n\n    if (detect) {\n      this.onClick(e);\n    }\n  }\n\n  onClick(e) {}\n\n  draw() {\n    this.clear();\n    this._ctx.fillStyle = this.fontColor;\n    this._ctx.font = \"15px Arial\";\n    this._ctx.fillText(this.content, this.x + 10, this.y + 10);\n  }\n}\n\n\n//# sourceURL=webpack://mimic/./engine/game-object.js?");

/***/ }),

/***/ "./engine/index.js":
/*!*************************!*\
  !*** ./engine/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Behavior\": () => (/* reexport safe */ _base__WEBPACK_IMPORTED_MODULE_1__.Behavior),\n/* harmony export */   \"Button\": () => (/* reexport safe */ _game_object__WEBPACK_IMPORTED_MODULE_2__.Button),\n/* harmony export */   \"Camera\": () => (/* reexport safe */ _game_object__WEBPACK_IMPORTED_MODULE_2__.Camera),\n/* harmony export */   \"Component\": () => (/* reexport safe */ _base__WEBPACK_IMPORTED_MODULE_1__.Component),\n/* harmony export */   \"GameController\": () => (/* reexport safe */ _base__WEBPACK_IMPORTED_MODULE_1__.GameController),\n/* harmony export */   \"GameObject\": () => (/* reexport safe */ _base__WEBPACK_IMPORTED_MODULE_1__.GameObject),\n/* harmony export */   \"Scene\": () => (/* reexport safe */ _base__WEBPACK_IMPORTED_MODULE_1__.Scene),\n/* harmony export */   \"Sprite\": () => (/* reexport safe */ _game_object__WEBPACK_IMPORTED_MODULE_2__.Sprite),\n/* harmony export */   \"Tile\": () => (/* reexport safe */ _game_object__WEBPACK_IMPORTED_MODULE_2__.Tile),\n/* harmony export */   \"TitleMap\": () => (/* reexport safe */ _game_object__WEBPACK_IMPORTED_MODULE_2__.TitleMap),\n/* harmony export */   \"UI\": () => (/* reexport safe */ _game_object__WEBPACK_IMPORTED_MODULE_2__.UI),\n/* harmony export */   \"drawCircle\": () => (/* reexport safe */ _drawing__WEBPACK_IMPORTED_MODULE_0__.drawCircle),\n/* harmony export */   \"drawHealth\": () => (/* reexport safe */ _drawing__WEBPACK_IMPORTED_MODULE_0__.drawHealth),\n/* harmony export */   \"drawSelected\": () => (/* reexport safe */ _drawing__WEBPACK_IMPORTED_MODULE_0__.drawSelected)\n/* harmony export */ });\n/* harmony import */ var _drawing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./drawing */ \"./engine/drawing.js\");\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ \"./engine/base.js\");\n/* harmony import */ var _game_object__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game-object */ \"./engine/game-object.js\");\n\n\n\n\n\n\n\n//# sourceURL=webpack://mimic/./engine/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
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
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./engine/index.js");
/******/ 	
/******/ })()
;