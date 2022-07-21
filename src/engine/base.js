class Component {
  id;
  name;
  stop = false;
  ctx;

  constructor(name, x, y, w, h) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
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

  // behavior
  onMouseDown(e, cb) {}
  onMouseMove(e, cb) {}
  onKeyPress(e, cb) {}
  onMouseUp(e, cb) {}

  // clear
  clear(context) {
    this.ctx.clearRect(this.x, this.y, this.w, this.h);
  }
}

class Scene extends Component {
  w = 0;
  h = 0;
  x = 0;
  y = 0;
  name;
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

  constructor(name, x, y, w, h, fps) {
    super(name, x, y, w, h);
    this.fps = fps ?? 60;
  }

  // init
  init(context) {
    // init canvas
    console.log("run init");

    this.mouse = new MouseObject(0, 0, 0, 0, "mouse", "mouse", 0);
    const canvas = document.createElement("canvas");

    canvas.id = this.name;
    canvas.width = this.w;
    canvas.height = this.h;
    canvas.style.top = this.x + "px";
    canvas.style.left = this.y + "px";

    const body =
      document.querySelector("body") ?? document.createElement("body");

    if (!body) {
      document.append(body);
    }

    body.append(canvas);

    // init detail for canvas
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.mouse.ctx = this.ctx;

    // listen event
    this.canvas.onmousemove = (e) => {
      const x = e.clientX - this.x;
      const y = e.clientY - this.y;

      // behavior on mouse move
      this.onMouseMove(x, y);
      this.mouse.onMouseMove({ ...e, x, y });
      this.obList?.forEach((ob) => ob?.onMouseMove({ ...e, x, y }));
    };

    // binding data for event with mousedown
    this.canvas.onmousedown = (e) => {
      const x = e.clientX - this.x;
      const y = e.clientY - this.y;

      // behavior on click
      this.onMouseDown({ ...e, x, y });
      this.mouse.onMouseDown({ ...e, x, y });
      this.obList?.forEach((ob) => ob?.onMouseDown({ ...e, x, y }));
    };
    this.canvas.onkeypress = (e) => {
      const x = e.clientX - this.x;
      const y = e.clientY - this.y;

      this.obList?.forEach((ob) => ob?.onKeyPress({ ...e, x, y }));
    };
    this.canvas.onmouseup = (e) => {
      const x = e.clientX - this.x;
      const y = e.clientY - this.y;
      this.mouse.onMouseUp({ ...e, x, y });
      this.obList?.forEach((ob) => ob?.onMouseUp({ ...e, x, y }));
    };

    // calculator time
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

  render(callback) {
    try {
      // render view
      if (!this.stop) {
        console.log(this.x, this.y, this.w, this.h);

        // clear
        this.action = setInterval(() => {
          // clear object
          this.clear();

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
        console.log("____GAME STOP____");
      }
    } catch (error) {
      clearInterval(this.action);

      console.log("error", error);
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

  onMouseDown(e) {
    const { x, y } = e;
    this.detectList = [];
    this.obList?.forEach((ob) => {
      const inX = ob?.x < x && x < ob?.x + ob?.w;
      const inY = ob?.y < y && y < ob?.y + ob?.h;

      if (inX && inY && ob?.zIndex > -1) {
        ob.selected = !ob.selected;
        this.detectList.push(ob);
      }
    });

    if (this.detectList && this.detectList.length > 0) {
      this.detectList.forEach((item) => {
        item.selected = true;
      });
    }
  }

  onMouseMove(e) {
    const { x, y, w, h, selected, stop } = this.mouse;
    this.detectList = [];

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

  // clear view
  clear() {
    this.ctx.clearRect(this.x, this.y, this.w, this.h);
  }
}

// init game base

// GameObject for Game render
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
    super(name);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
    this.r = r;
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
