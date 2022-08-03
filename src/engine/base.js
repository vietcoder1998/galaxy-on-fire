import { drawX, drawSelected, drawCircle } from "./drawing";

/// _global define
const path = require("path");

const _instance = {
  objects: [],
  tiles: [],
  cameras: [],
  controllers: [],
};

const _global = {
  canvas: null,
  ctx: null,
  mouse: null,
  scene: null,
};

// filter action
const info_game = document.querySelector("#info");
const search_node = document.querySelector("input#searchKey");

search_node.onkeydown = (e) => filterInput();

function filterInput() {
  const value = search_node.value;
  const children = info_game.childNodes;

  children.forEach((child) => {
    const name = child.id;
    if (name.includes(value) || !value || value === "") {
      child.style.display = "";
    } else {
      child.style.display = "none";
    }
  });
}

function listenEvent(_global, _instance) {
  const { mouse, canvas } = _global;

  canvas.onmousemove = (e) => {
    mouse.onMouseMove(e);

    Object.values(_instance).forEach((value) => {
      if (value && value.length > 0) {
        value.forEach((item) => item?.onMouseMove(e));
      }
    });
  };

  // mouse up
  canvas.onmouseup = (e) => {
    mouse.onMouseUp(e);

    Object.values(_instance).forEach((value) => {
      if (value && value.length > 0) {
        value.forEach((item) => item?.onMouseUp(e));
      }
    });
  };

  // mouse down
  canvas.onmousedown = (e) => {
    mouse.onMouseDown(e);

    Object.values(_instance).forEach((value) => {
      if (value && value.length > 0) {
        value.forEach((item) => item.onMouseDown(e));
      }
    });
  };

  document.addEventListener("keyup", (e) => {
    Object.values(_instance).forEach((value) => {
      if (value && value.length > 0) {
        value.forEach((item) => item.onKeyUp(e));
      }
    });
  });

  document.addEventListener("keydown", (e) => {
    Object.values(_instance).forEach((value) => {
      if (value && value.length > 0) {
        value.forEach((item) => item.onKeyDown(e));
      }
    });
  });
}
///
export class Behavior {
  /**
   * @param {MouseEvent} e
   * @return {void}
   */

  onMouseDown(e) {}
  onMouseMove(e) {}
  onKeyDown(e) {}
  onKeyUp(e) {}
  onMouseUp(e) {}

  keyListen = [];
}

export class Component extends Behavior {
  x;
  y;
  w;
  h;
  s;
  id;
  velocity = {
    x: 0,
    y: 0,
  };
  name;
  stop;
  selected;
  instance;
  dImage;
  imgs = [];

  get _instance() {
    return _instance;
  }
  get _global() {
    return _global;
  }
  get _cameras() {
    return this._instance.cameras;
  }
  get _objects() {
    return this._instance.objects;
  }
  get _tiles() {
    return this._instance.tiles;
  }
  get _controllers() {
    return this._instance.controllers;
  }
  get _canvas() {
    return this._global.canvas;
  }
  set _canvas(canvas) {
    this._global.canvas = canvas;
  }
  get _mouse() {
    return this._global.mouse;
  }
  set _mouse(mouse) {
    this._global.mouse = mouse;
  }
  get _ctx() {
    return this._global.ctx;
  }
  get _scene() {
    return this._global.scene;
  }
  set _scene(scene) {
    this._global.scene = scene;
  }
  set _ctx(ctx) {
    this._global.ctx = ctx;
  }
  get _pos() {
    return {
      x: this.x + this.w / 2,
      y: this.y + this.h / 2,
    };
  }
  set _pos(pos) {
    (this.x = pos - this.w / 2), (this.y = pos - this.h / 2);
  }
  set _velocity(velocity) {
    this.velocity = {
      x: velocity.x ?? 0,
      y: velocity.y ?? 0,
    };
  }

  constructor(name, x, y, w, h, s, id) {
    super();
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
    this.s = s;
    this._velocity = { x: 0, y: 0 };
    this.init();
  }
  init() {}

  // add game object
  add(ob, name) {
    if (Object.keys(_instance).includes(name)) {
      this._instance[name].push(ob);
    }
  }
  addList(list, name) {
    if (list && list.length > 0) {
      list.map((item) => {
        item.x += this.x;
        item.y += this.y;
        this.add(item, name);
      });
    }
  }

  // before life cycle
  beforeDraw(context) {}

  // binding ( can`t fix)
  binding(e) {}

  // action in loop range
  loop(e) {}

  // action in draw
  draw(e) {
    if (this.dImage && this.dImage.src && this.imgs.length > 0) {
      this._ctx.drawImage(this.dImage.src, init.x);
    } else {
      this._ctx.restore();
      this._ctx.fillStyle = this.color;
      this._ctx.fillRect(this.x, this.y, this.w, this.h);

      if (this.selected) {
        drawCircle(this._ctx, this._pos.x, this._pos.y, this.s, "#4eff1080");
      }

      if (this.imgs.length && this.dImage.pos >= this.imgs.length) {
        this.dImage = this.imgs[0];
      } else {
        this.imgFrame += 1;
        this.dImage = this.imgs[this.imgFrame];
      }
    }
  }

  // action in after draw
  afterDraw(context) {}

  // launch
  launch() {
    try {
      if (!this.stop) {
        // Clear
        this.binding(this);
        this.beforeDraw(this);
        this.loop(this);
        this.draw(this);
        this.afterDraw(this);
      }

      // End
    } catch (error) {
      console.log("error: ", error);
      this.stop = true;
      throw error;
    }
  }

  destroy() {
    delete this;
  }

  setInfo([key, value]) {
    if (Array.isArray(key) && key.length === 2) {
      if (this && this[key[0]]) {
        this[[key[0]]][key[1]];
      }
    } else {
      if (this[key] && value) {
        this[key] = value;
      }
    }

    this.logInfo();
  }

  logInfo() {
    const ul = document.querySelector("#info");
    ul.innerHTML = "";
    const data = JSON.stringify(this);
    const jsonData = JSON.parse(data);

    Object.entries(jsonData).forEach(([key, value]) => {
      const li = document.createElement("li");
      const h4 = document.createElement("h4");
      const input = document.createElement("input");

      li.id = key;
      h4.innerHTML = key;
      h4.style.marginTop = "5px";
      h4.style.marginBottom = "5px";

      switch (typeof value) {
        case "boolean":
          const divB = document.createElement("div");
          const input1 = document.createElement("input");
          const input2 = document.createElement("input");

          const label1 = document.createElement("label");
          const label2 = document.createElement("label");

          const id1 = [key, "true"].join("_");
          const id2 = [key, "false"].join("_");

          label1.setAttribute("for", id1);
          label1.innerHTML = "True";

          label2.setAttribute("for", id2);
          label2.innerHTML = "False";

          input1.name = key;
          input1.type = "radio";
          input1.id = id1;
          input1.defaultChecked = value;
          input1.value = true;

          input2.name = key;
          input2.type = "radio";
          input2.id = id2;
          input2.defaultChecked = !value;
          input2.value = false;

          input1.onclick = (e) => {
            this.setInfo([key, !this[key]]);
          };

          input2.onclick = (e) => {
            this.setInfo([key, !this[key]]);
          };

          divB.style.display = "flex";
          divB.append(input1, label1, input2, label2);

          li.append(h4, divB);
          break;

        case "string":
        case "number":
          const div = document.createElement("div");
          const button = document.createElement("button");
          const type = typeof value === "string" ? "text" : "number";

          input.value = value;
          input.name = key;
          input.type = type;
          input.style.borderColor = type === "number" ? "blue" : "";
          input.onkeydown = (e) => {
            if (e.key === "Enter") {
              this.setInfo([
                key,
                input.type === "number" ? parseFloat(input.value) : input.value,
              ]);
            }
          };

          button.innerHTML = "save";
          button.onclick = () =>
            this.setInfo([
              key,
              input.type === "number" ? parseFloat(input.value) : input.value,
            ]);

          div.style.display = "flex";
          div.append(input, button);

          li.append(h4, div);
          break;

        case "object":
          const listItem = document.createElement("div");
          const mapItem =
            typeof value === "object"
              ? Object.entries(value)
              : value.map((item, id) => [id, item]);

          mapItem.map(([chKey, chValue]) => {
            if (typeof chValue !== "object") {
              const nInput = document.createElement("input");
              const container = document.createElement("div");
              const pItem = document.createElement("p");
              const button = document.createElement("button");
              const type = typeof chValue === "string" ? "text" : "number";

              pItem.innerHTML = chKey;

              nInput.value = chValue;
              nInput.name = [key, chKey].join("_");
              nInput.type = type;
              nInput.style.borderColor = type === "number" ? "purple" : "";
              nInput.onkeydown = ({ key }) => {
                if (key === "Enter") {
                  this.setInfo([
                    nInput,
                    nInput.type === "number"
                      ? parseFloat(nInput.value)
                      : nInput.value,
                  ]);
                }
              };

              button.innerHTML = "save";
              button.onclick = () =>
                this.setInfo([
                  nInput.name.split("_"),
                  nInput.type === "number"
                    ? parseFloat(nInput.value)
                    : nInput.value,
                ]);

              container.style.display = "flex";
              container.append(nInput, button);
              listItem.append(pItem, container);
            } else {
              if (typeof chValue === "object" && chValue["logInfo"]) {
                chValue.logInfo();
              }
            }
          });

          listItem.id = key;
          listItem.style.margin = "0px 0px 5px 5px";
          listItem.style.paddingLeft = "10px";

          li.append(h4, listItem);
          break;

        default:
          break;
      }

      ul.appendChild(li);
    });

    filterInput();
  }

  // clear
  clear() {
    if (this._ctx && this._ctx !== {}) {
      this._ctx.clearRect(this.x, this.y, this.w, this.h);
    }
  }
}

export class Scene extends Component {
  fps = 60;
  frame = 0;
  timeMachine = 0;
  stop = false;
  action;
  selector = {};
  zIndex = 0;
  lastClick = { x: 0, y: 0 };
  time = 0;
  limit = {
    x: this.w,
    y: this.h,
  };
  type = "scene";
  constructor(name, x, y, w, h, s, id) {
    super(name, x, y, w, h, s, id);
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
    this.s = s;
  }

  // render ( only scene render)
  render() {
    // add listen event
    listenEvent(this._global, this._instance);

    try {
      // render view
      if (!this.stop) {
        // clear rect
        this.action = setInterval(() => {
          this.clear();
          this._tiles.forEach((item) => {
            item.launch();
          });
          this._objects.forEach((item) => {
            item.launch();
          });
          this._cameras.forEach((item) => {
            item.launch();
          });

          this._mouse && this._mouse.launch();

          this.info();
        }, 1000 / this.fps);
      } else {
        if (!this._ctx) {
          console.log("Game CTX need be to define");
        }

        console.log("____GAME STOP____");
      }
    } catch (error) {
      clearInterval(this.action);

      console.log("error", error);
      throw error;
    }
  }

  info(callback) {
    // frame and write context
    if (this.frame < this.fps) {
      this.frame += 1;
    } else {
      this.frame = 0;
      this.time += 1;
    }
    this.timeMachine = new Date().toLocaleDateString();
    this._ctx.font = 20;
    this._ctx.fillStyle = "black";
    this._ctx.fillText("frame:" + this.frame, this.w - 100, 20);
    this._ctx.fillText("fps:" + this.fps, this.w - 100, 40);
    this._ctx.fillText("time: " + this.time, this.w - 100, 60);
    this._ctx.fillText("date: " + this.timeMachine, this.w - 100, 80);
  }
}

// Controller
export class GameController extends Component {
  type = "gob";

  constructor(name, x, y, w, h, s, id) {
    super(name, x, y, w, h, s, id);
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
    this.s = s;
  }

  get _collisions() {
    const list = [];
    this._objects.forEach((ob, id) => {
      const pX = ob._pos.x;
      const pY = ob._pos.y;

      this._objects.forEach((ob1, id1) => {
        const pX1 = ob1._pos.x;
        const pY1 = ob1._pos.y;
        const dx = Math.abs(pX1 - pX);
        const dy = Math.abs(pY1 - pY);

        if (Math.sqrt(dx * dx + dy * dy) < ob.s + ob1.s) {
          list.push([id, id1]);
        }
      });
    });

    return list;
  }
}

export class GameObject extends Component {
  x = 0;
  y = 0;
  w = 0;
  h = 0;
  s = 0;
  r = 0;
  src;
  fps;
  type;
  velocity = {
    x: 0,
    y: 0,
  };
  speed = 1;
  gravity = 0;
  // imgs; frame: src: link, end: timestamp - ms
  imgs = [];
  dImage = {
    src: null,
    pos: 0,
    end: 0,
  };
  imgFrame = 0;
  state = "active";
  selected = false;
  zIndex = 1;
  type = "gameob";

  get _speed() {
    this.speed / this.fps;
  }

  constructor(name, x, y, w, h, id, r, s) {
    super(name, x, y, w, h, id, r, s);
    this.name = name;
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.s = s;
  }

  setImage(src) {
    const img = new Image();
    img.src = path.resolve(__dirname, "mimic", "src", `${src}`);
    img.width = 400;
    img.height = 400;

    this.img = img;
  }

  onNoneDetect(e) {}
  onDetect(e) {}
  binding() {
    if (this.gravity) {
      this.y += this.velocity.y;
      this.velocity.y += this.gravity;
    }

    this.checkCollision();
  }
  handleOnCollision(cpX, cpY) {
    this.x -= cpX;
    this.y -= cpY;
    this._velocity = { x: 0, y: 0 };
  }
  checkCollision() {
    const results = [];
    this._objects
      .filter((item) => item.name !== this.name)
      .forEach((ob) => {
        const dx = Math.abs(ob._pos.x - this._pos.x);
        const dy = Math.abs(ob._pos.y - this._pos.y);

        if (Math.sqrt(dx * dx + dy * dy) < Math.abs(ob.s + this.s) + 2) {
          this.handleOnCollision(
            this._pos.x < ob._pos.x,
            this._pos.y < ob._pos.y
          );
        }
      });

    return results;
  }
}
export class MouseObject extends Component {
  zIndex = 999;
  selected = false;
  down = false;
  type = "mouse";

  constructor(name, x, y, w, h, s, id) {
    super(name, x, y, w, h, s, id);
    this.name = name;
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.s = s;
  }

  onMouseDown(e) {
    this.x = e.clientX;
    this.y = e.clientY;
    this.w = 0;
    this.h = 0;

    this.down = true;
  }

  onMouseMove(e) {
    if (this.down) {
      this.w = e.clientX - this.x;
      this.h = e.clientY - this.y;
    }
  }

  onMouseUp(e) {
    this.w = 0;
    this.h = 0;

    this.down = false;
  }

  draw(context) {
    if (!this.down) {
      this.clear();
      drawX(this._ctx, this.x - 10, this.y - 10, 10, 3);
    } else {
      drawSelected(this._ctx, this.x, this.y, this.w, this.h);
    }
  }
}
