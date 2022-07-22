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

  init() {}
}
class Component extends Behavior {
  x;
  y;
  w;
  h;
  id;
  vector = {
    x: 0,
    y: 0,
  };
  endPoint = {
    x: this.x,
    y: this.y,
  };
  name;
  stop;
  selected;
  instance;
  dImage;
  imgs = [];
  obList = [];

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

  constructor(name, x, y, w, h, id, s) {
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
        drawSelected(this.ctx, this.x, this.y, this.w, this.h);
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

  // clear
  clear(context) {
    this.ctx.clearRect(this.x, this.y, this.w, this.h);
  }

  // launch
  launch() {
    try {
      if (!this.stop) {
        // Clear
        this.beforeDraw(this);
        this.loop(this);
        this.draw(this);
        this.afterDraw(this);

        if (
          this._pos.x === this.endPoint.x ||
          this._pos.y === this.endPoint.y
        ) {
          this.vector = {
            x: 0,
            y: 0,
          };
        }

        // call direction
        if (this.g && this.vector) {
          this.y += this.vector.y;
          this.vector.y += this.g / 60;
        }

        if (this.vector && this.speed) {
          // moving with vector
          this.x += this.vector.x * this.speed;
          this.y += this.vector.y * this.speed;
        }
      }

      // End
    } catch (error) {
      console.log("error: ", error);
      this.stop = true;
      throw error;
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
  controller = {};
  camera = {};

  set _controller(controller) {
    controller.ctx = this.ctx;
    this.controller = controller;
  }

  set _camera(camera) {
    camera.ctx = this.ctx;
    this.camera = camera;
  }

  constructor(name, x, y, w, h, id, s) {
    super(name, x, y, w, h, id, s);
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

class GameController extends Component {
  obList = [new MouseObject("mouse", 0, 0, 0, 0, "mouse1", 0)];

  constructor(name, x, y, w, h, id, s) {
    super(name, x, y, w, h, id, s);
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
    });
    this.obList.unshift(ob);
  }

  // add multiple game object
  addList(...args) {
    if (args && args.length > 0) {
      args.forEach((ob) => this.add(ob));
    }
  }

  onMouseMove(e) {
    const { x, y, w, h, down } = this.obList.at(-1);

    if (down) {
      this.obList?.slice(0, -1).forEach((ob) => {
        const tX = x + w;
        const tY = y + h;

        const minX = tX > x ? x : tX;
        const maxX = tX < x ? x : tX;

        const minY = tY > y ? y : tY;
        const maxY = tY < y ? y : tY;

        const detect = [
          [ob.x, ob.y],
          [ob.x + ob.w, ob.y],
          [ob.x + ob.w, ob.y + ob.w],
          [ob.x, ob.y + ob.h],
        ];

        let inRange = false;

        detect.forEach((dt) => {
          if (dt[0] > minX && dt[0] < maxX && dt[1] > minY && dt[1] < maxY) {
            inRange = true;
          }
        });

        if (inRange && ob?.zIndex > -1) {
          ob.selected = true;
          this.detectList.push(ob);
        } else {
          ob.selected = false;
        }
      });

      if (this.detectList && this.detectList.length > 0) {
        this.detectList.forEach((item) => {
          item.selected = true;
        });
      }
    }
  }

  onMouseDown(e) {
    const { x, y, down } = this.obList.at(-1);
    this.detectList = [];
    // detect event in mouse change

    if (down) {
      this.obList?.slice(0, -1).forEach((ob) => {
        const minX = ob.x;
        const maxX = ob.x + ob.w;

        const minY = ob.y;
        const maxY = ob.y + ob.h;

        const detect = [[x, y]];

        let inRange = false;

        detect.forEach((dt) => {
          if (dt[0] > minX && dt[0] < maxX && dt[1] > minY && dt[1] < maxY) {
            inRange = true;
          }
        });

        if (inRange && ob?.zIndex > -1) {
          ob.selected = true;
        } else {
          if (ob.selected) {
            ob.selected = false;
          }
        }
      });
    }
  }
}

class GameObject extends Component {
  x = 0;
  y = 0;
  w = 0;
  h = 0;
  s = 0;
  r = 0;
  type;
  vector = {
    x: 0,
    y: 0,
  };
  speed = 0.1;
  g = 0;
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

  // add context to drive
}

class MouseObject extends Component {
  zIndex = 999;
  selected = false;
  down = false;
  type = "mouse";

  constructor(name, x, y, w, h, id, s) {
    super(name, x, y, w, h, id, s);
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
      drawX(this.ctx, this.x - 10, this.y - 10, 10, 3);
    } else {
      drawRawSelected(this.ctx, this.x, this.y, this.w, this.h);
    }
  }
}
