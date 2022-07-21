class Behavior {
  /**
   * @param {MouseEvent} e
   * @return {void}
   */

  constructor() {
    try {
      document.onmousemove = async (e) => await this.onMouseMove(e);
      document.onmouseup = async (e) => await this.onMouseUp(e);
      document.onmousedown = async (e) => await this.onMouseDown(e);
      document.onkeydown = async (e) => await this.onKeyDown(e);
      document.onkeyup = async (e) => await this.onKeyUp(e);
    } catch (error) {
      console.log("error in behavior", error);
    }
  }

  async onMouseDown(e) {}
  async onMouseMove(e) {}
  async onKeyDown(e) {}
  async onKeyUp(e) {}
  async onMouseUp(e) {}
}

class Component extends Behavior {
  x;
  y;
  w;
  h;
  id;
  name;
  stop;
  ctx;
  selected;

  constructor(name, x, y, w, h, id, s) {
    super();
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
    this.s = s;

    // listen event

    this.init();
  }

  // init() start on game
  async init(context, cb) {}

  // launch
  async launch() {
    try {
      if (this.g) {
        this.y += this.vector.y;
        this.vector.y += this.g / 60;
      }

      // Clear
      // Action to render
      this.beforeDraw(this);
      this.loop(this);
      this.draw(this);
      this.afterDraw(this);
      // End
    } catch (error) {
      alert("error: ", error);
      throw error;
    }
  }

  // before life cycle
  async beforeDraw(context) {}

  // action in loop range
  async loop(context) {}

  // action in draw
  async draw(context, cb) {
    if (this.ctx && !this.stop) {
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
  }

  // action in after draw
  afterDraw(context) {}

  // clear
  clear(context) {
    this.ctx.clearRect(this.x, this.y, this.w, this.h);
  }
}

class MouseObject extends Component {
  zIndex = 999;
  selected = false;
  down = false;

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

  async onMouseDown(e) {
    console.log("mouse listen", e);
    this.x = e.clientX;
    this.y = e.clientY;

    this.w = 0;
    this.h = 0;

    this.selected = true;
    this.down = true;
    this.stop = true;
  }

  async onMouseMove(e) {
    this.w = e.clientX - this.x;
    this.h = e.clientX - this.y;
    this.x = e.clientX;
    this.y = e.clientY;

    this.stop = false;
  }

  async onMouseUp(e) {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.selected = false;
    this.stop = false;
    this.down = false;
  }

  async draw(context) {
    if (this.ctx && this.selected) {
      if (this.dImage && this.dImage.src && this.imgs.length > 0) {
        this.ctx.drawImage(this.dImage.src, this.dImage.x, this.dImage.y);
      } else {
        if (this.stop) {
          drawX(this.ctx, this.x - 10, this.y - 10, 10, 3);
        } else {
          drawRawSelected(this.ctx, this.x, this.y, this.w, this.h);

          if (this.imgs.length && this.dImage.pos >= this.imgs.length) {
            this.dImage = this.imgs[0];
          } else {
            this.imgFrame += 1;
            this.dImage = this.imgs[this.imgFrame];
          }
        }
      }
    }
  }
}

// base component
class Scene extends Component {
  fps = 60;
  frame = 0;
  canvas;
  stop = false;
  obList = [];
  action;
  selector = {};
  zIndex = 0;
  lastClick = { x: 0, y: 0 };
  detectList = [];
  mouse;

  constructor(name, x, y, w, h, id, s) {
    super(name, x, y, w, h, id, s);
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
    this.s = s;

    this.start();
  }

  // init
  start() {
    // init canvas
    const canvas = document.querySelector("canvas#defaultGame");
    const ctx = canvas.getContext("2d");
    canvas.id = this.name;
    canvas.width = this.w;
    canvas.height = this.h;
    canvas.style.top = this.x + "px";
    canvas.style.left = this.y + "px";

    // map canvas
    this.canvas = canvas;
    this.ctx = ctx;
    this.mouse = new MouseObject(0, 0, 0, 0, "mouse", "mouse", 0);
    this.mouse.ctx = ctx;
    this.timeMachine = setInterval(() => (this.time += 1), 1000);
  }

  // add game object
  add(ob, isHead) {
    if (ob) {
      Object.assign(ob, {
        ctx: this.ctx,
        parentId: this.id,
        root: { x: this.x, y: this.y },
      });

      if (isHead) {
        this.obList.unshift(ob);
      }
      this.obList.push(ob);
    }
  }

  // add multiple game object
  addList(obs) {
    if (obs && obs.length > 0) {
      obs.forEach((ob) => this.add(ob));
    }
  }

  // render ( only scene render)
  render(callback) {
    try {
      // render view
      if (!this.stop && this.ctx) {
        // clear rect
        this.action = setInterval(() => {
          // clear object
          this.ctx.clearRect(this.x, this.y, this.w, this.h);

          // render object list
          if (this.obList.length > 0) {
            this?.obList?.forEach((item) => {
              item.launch();
            });
          }

          // render mouse
          this.mouse.launch();
        }, 1000 / this.fps);
      } else {
        if (!this.ctx) {
          console.log("Game CTX need be to define");
        }

        console.log("____GAME STOP____");
      }
    } catch (error) {
      clearInterval(this.action);

      ole.log("error", error);
      throw error;
    }
  }

  loop(callback) {
    // frame and write context
    if (this.frame < this.fps) {
      this.frame += 1;
    } else {
      this.frame = 0;
    }

    this.ctx.font = 20;
    this.ctx.fillStyle = "black";
    // fill frame
    this.ctx.fillText("frame:" + this.frame, 400, 10);
    this.ctx.fillText("fps:" + this.fps, 400, 20);
  }

  async onMouseMove(e) {
    console.log("scene mouse event", e);
    const { x, y, w, h, selected, stop } = this.mouse;
    this.detectList = [];

    // detect event in mouse change

    if (selected && !stop) {
      this.obList?.forEach((ob) => {
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

          console.log(this.detectList);
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

  async onMouseDown(e) {
    console.log("mouse down", e);
    const [x, y] = [e.clientX, e.clientY];

    this.detectList = [];
    this.obList?.forEach((ob) => {
      const inX = ob?.x < x && x < ob?.x + ob?.w;
      const inY = ob?.y < y && y < ob?.y + ob?.h;

      if (inX && inY && ob?.zIndex > -1) {
        ob.selected = true;

        console.log(ob);
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

  // clear view
  clear() {
    this.ctx.clearRect(this.x, this.y, this.w, this.h);
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
  // imgs; frame: src: link, end: timestamp - ms
  imgs = [];
  dImage = {
    src: null,
    pos: 0,
    end: 0,
  };
  imgFrame = 0;
  state = "active";

  constructor(name, x, y, w, h, id, r, s) {
    super(name, x, y, w, h, id, r, s);
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
    this.s = s;
  }

  // add context to drive
  draw(context) {
    if (this.ctx && !this.stop) {
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
  }
}

class GameController extends Component {}
