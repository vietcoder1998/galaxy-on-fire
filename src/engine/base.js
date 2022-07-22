const obList = [];
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

  obList = [];
  keyListen = [];

  constructor() {
    this.canvas = document.querySelector("canvas#defaultGame");
    this.ctx = this.canvas.getContext("2d");
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
  obList = [];
  collisions = [];

  get _instance() {
    return this.instance;
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

    this.init();
  }

  init() {}

  // before life cycle
  beforeDraw(context) {}

  // action in loop range
  loop(context) {}

  // action in draw
  draw(context, cb) {
    if (this.dImage && this.dImage.src && this.imgs.length > 0) {
      this.ctx.drawImage(this.dImage.src, init.x);
    } else {
      // fill color for background
      this.ctx.fillStyle = this.color;

      // fill rects
      this.ctx.fillRect(this.x, this.y, this.w, this.h);

      if (this.selected) {
        drawCircle(this.ctx, this._pos.x, this._pos.y, this.s, "#4eff1080");
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
  destroy(e) {
    delete this;
  }

  // clear
  clear(context) {
    this.ctx.clearRect(this.x, this.y, this.w, this.h);
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
  controller = {};
  camera = {};
  limit = {
    x: this.w,
    y: this.h,
  };

  set _controller(controller) {
    controller.ctx = this.ctx;
    controller.scene = this;
    this.controller = controller;
  }

  set _camera(camera) {
    camera.ctx = this.ctx;
    this.camera = camera;
  }

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
    // init canvas
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.canvas.style.top = this.x + "px";
    this.canvas.style.left = this.y + "px";
  }

  // render ( only scene render)
  render() {
    try {
      // render view
      if (!this.stop && this.ctx) {
        // clear rect
        this.action = setInterval(() => {
          this.clear();
          this.camera?.launch();
          if (this.controller && this.controller.obList.length > 0) {
            this.controller?.obList?.map((item) => {
              item && item.launch();
            });
          }
          this.info();
        }, 1000 / this.fps);
      } else {
        if (!this.ctx) {
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

    this.ctx.font = 20;
    this.ctx.fillStyle = "black";

    // fill frame
    this.ctx.fillText("frame:" + this.frame, this.w - 100, 20);
    this.ctx.fillText("fps:" + this.fps, this.w - 100, 40);
    this.ctx.fillText("time: " + this.time, this.w - 100, 60);
    this.ctx.fillText("date: " + this.timeMachine, this.w - 100, 80);
  }
}

// Controller
class GameController extends Component {
  obList = [new MouseObject("mouse", 0, 0, 0, 0, "mouse1", 0)];
  collision = [];
  type="mouse"

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
    this.canvas.onmousemove = (e) => {
      this.obList.forEach((ob) => {
        ob.onMouseMove(e);
      });
      this.onMouseMove(e);
    };

    this.canvas.onmouseup = (e) => {
      this.obList.forEach((ob) => {
        ob.onMouseUp(e);
      });
      this.onMouseUp(e);
    };

    this.canvas.onmousedown = (e) => {
      this.obList.forEach((ob) => {
        ob.onMouseDown(e);
      });
      this.onMouseDown(e);
    };

    document.addEventListener("keydown", (e) => {
      this.obList.forEach((ob) => {
        ob.onKeyDown(e);
      });
      this.onKeyDown(e);
    });

    document.addEventListener("keydown", (e) => {
      this.obList.forEach((ob) => {
        ob.onKeyUp(e);
      });

      this.onKeyUp(e);
    });
  }

  // add game object
  add(ob, name) {
    Object.assign(ob, {
      parentId: this.id,
      root: { x: this.x, y: this.y },
      ob: this.ctx,
      pid: this.obList.length,
    });
    this.obList.unshift(ob);
    obList.push(ob);
  }

  // add multiple game object
  addList(...args) {
    if (args && args.length > 0) {
      args.forEach((ob) => this.add(ob));
    }
  }

  collision() {
    const list = [];
    this.obList.splice(0, -2).forEach((ob, id) => {
      const pX = ob._pos.x;
      const pY = ob._pos.y;

      this.obList.splice(0, -2).forEach((ob1, id1) => {
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

  _collision() {
    const { x, y } = this._pos;
    const list = [];

    obList
      .filter((item) => item.name !== this.name)
      .forEach((ob) => {
        const pX1 = ob.x;
        const pY1 = ob.y;

        const dx = Math.abs(pX1 - x);
        const dy = Math.abs(pY1 - y);

        if (Math.sqrt(dx * dx + dy * dy) < ob.s + ob.s) {
          list.push(ob);
        }
      });

    return list;
  }

  _sensor(range) {
    const { x, y } = this._pos;
    const list = [];

    obList
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
