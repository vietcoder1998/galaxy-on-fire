/// _global define
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
};

/// end

function listenEvent(_global, _instance) {
  const { mouse, canvas } = _global;

  canvas.onmousemove = (e) => {
    Object.entries(_instance).forEach(([key, value]) => {
      if (value) {
        onMouseMove(e);
      }
    });
    mouse.onMouseMove(e);
  };

  // mouse up
  canvas.onmouseup = (e) => {
    Object.entries(_instance).forEach(([key, value]) => {
      if (value) {
        onMouseUp(e);
      }
    });
    mouse.onMouseUp(e);
  };

  // mouse down
  canvas.onmousedown = (e) => {
    Object.entries(_instance).forEach(([key, value]) => {
      if (value) {
        onMouseDown(e);
      }
    });
    mouse.onMouseDown(e);
  };

  document.addEventListener("keyup", (e) => {
    Object.entries(_instance).forEach(([key, value]) => {
      if (value) {
        onKeyUp(e);
      }
    });
    mouse.onKeyDown(e);
  });

  document.addEventListener("keydown", (e) => {
    Object.entries(_global).forEach(([key, value]) => {
      if (value) {
        onKeyDown(e);
      }
    });
    mouse.onKeyDown(e);
  });
}

///

class Behavior {
  /**
   * @param {MouseEvent} e
   * @return {void}
   */

  onMouseDown(e) {}
  onMouseMove(e) {}
  onKeyDown(e) {}
  onKeyUp(e) {}
  onMouseUp(e) {}
  init(e) {}
  keyListen = [];

  constructor() {
    this.init();
  }
}
class Component extends Behavior {
  x;
  y;
  w;
  h;
  s;
  id;
  vector = {
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
    return this.this._objects;
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

  set _ctx(ctx) {
    this._global.ctx = ctx;
  }

  get _pos() {
    return {
      x: this.x + this.w / 2,
      y: this.y + this.h / 2,
    };
  }

  set _vector(vector) {
    this.vector = {
      x: vector.x ?? 0,
      y: vector.y ?? 0,
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
    this._vector = { x: 0, y: 0 };
  }

  // before life cycle
  beforeDraw(context) {}

  // action in loop range
  loop(context) {}

  // action in draw
  draw(context, cb) {
    if (this.dImage && this.dImage.src && this.imgs.length > 0) {
      this._ctx.drawImage(this.dImage.src, init.x);
    } else {
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

  // clear
  clear() {
    if (this._ctx && this._ctx !== {}) {
      this._ctx.clearRect(this.x, this.y, this.w, this.h);
    }
  }
}

class Scene extends Component {
  fps = 60;
  frame = 0;
  timeMachine = 0;
  stop = false;
  action;
  selector = {};
  zIndex = 0;
  lastClick = { x: 0, y: 0 };
  detectList = [];
  time = 0;
  limit = {
    x: this.w,
    y: this.h,
  };

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

  init() {
    const canvas = document.querySelector("canvas#defaultGame");
    const ctx = canvas.getContext("2d");
    // init canvas
    canvas.width = this.w;
    canvas.height = this.h;
    canvas.style.top = this.x + "px";
    canvas.style.left = this.y + "px";

    this._ctx = ctx;
    this._canvas = canvas;
    this._mouse = new MouseObject("mouse", 0, 0, 0, 0, "mouse1", 0);
  }

  // add game object
  add(ob, name) {
    if (Object.keys(_instance).includes(name)) {
      this._instance[name].push(ob);
    }

    console.log(this._global, this._instance);
    listenEvent(this._global, this._instance);
  }

  addList(list, name) {
    if (list && list.length > 0) {
      list.map((item) => {
        this.add(item, name);
      });
    }
  }

  // render ( only scene render)
  render() {
    try {
      // render view
      if (!this.stop && this._global && this._instance) {
        // clear rect
        this.action = setInterval(() => {
          this.clear();
          this._cameras.map((item) => item.launch());
          this._tiles.map((item) => item.launch());
          this._objects.map((item) => item.launch());
          this._mouse.launch();

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

    // fill frame
    this._ctx.fillText("frame:" + this.frame, this.w - 100, 20);
    this._ctx.fillText("fps:" + this.fps, this.w - 100, 40);
    this._ctx.fillText("time: " + this.time, this.w - 100, 60);
    this._ctx.fillText("date: " + this.timeMachine, this.w - 100, 80);
  }
}

// Controller
class GameController extends Component {
  type = "mouse";

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

  collisions() {
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

class GameObject extends Component {
  x = 0;
  y = 0;
  w = 0;
  h = 0;
  s = 0;
  r = 0;
  fps;
  type;
  vector = {
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

  sensor(range) {
    const { x, y } = this._pos;
    const list = [];

    this._objects
      .filter(
        (item, id) =>
          item.name !== this.name &&
          item.type !== "mouse" &&
          item.type !== "camera"
      )
      .forEach((ob) => {
        const pX1 = ob._pos.x;
        const pY1 = ob._pos.y;

        const dx = Math.abs(pX1 - x);
        const dy = Math.abs(pY1 - y);

        if (Math.sqrt(dx * dx + dy * dy) < range) {
          list.push(ob);
        }
      });

    return list;
  }
}

class MouseObject extends Component {
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
      drawRawSelected(this._ctx, this.x, this.y, this.w, this.h);
    }
  }
}
