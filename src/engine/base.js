class ObjectBehavior {
  selected;

  onMouseDown(e, cb) {}
  onMouseMove(e, cb) {}
  onKeyPress(e, cb) {}
  onMouseUp(e, cb) {}
}

class Component extends ObjectBehavior {
  props = {};
  x;
  y;
  w;
  h;
  s;
  r;
  name;
  id;
  color;
  stop = false;
  fps = 60;
  frame = 0;

  constructor(x, y, w, h, name, id, s) {
    super();
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
    this.name = name;
    this.s = s;
    this.init(this);
  }

  // init() start on game
  init(context, cb) {}
}

// init game base
class GameController extends Component {
  fps = 60;
  frame = 0;
  stop = false;
  canvas = {};
  ctx = {};
  obList = [];
  action;
  selector = {};
  zIndex = 0;
  lastClick = { x: 0, y: 0 };
  detectList = [];
  color = "black";
  mouse = new Mouse(0, 0, 0, 0, "mouse", "mouse", 0);
  time = 0;
  timeMachine;

  constructor(x, y, w, h, name, id, s) {
    super(x, y, w, h, name, id, s);
    this.start();
  }

  start() {
    const body =
      document.querySelector("body") ?? document.createElement("body");

    if (!body) {
      document.append(body);
    }

    this.canvas = document.createElement("canvas");
    this.canvas.id = this.id;
    this.canvas.style.position = "absolute";
    this.canvas.width = this.w;
    this.canvas.height = this.h;
    this.canvas.style.top = this.x + "px";
    this.canvas.style.left = this.y + "px";
    this.ctx = this.canvas.getContext("2d");
    this.mouse.ctx = this.ctx;

    // listen event
    this.canvas.onmousemove = (e) => {
      const x = e.clientX - this.x;
      const y = e.clientY - this.y;

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

    body.appendChild(this.canvas);
    // calculator time
    this.timeMachine = setInterval(() => (this.time += 1), 1000);
  }

  end() {
    clearInterval(this.timeMachine);
  }

  onMouseDown(e) {
    const { x, y } = e;
    this.detectList = [];

    this.obList?.forEach((ob) => {
      const inX = ob?.x < x && x < ob?.x + ob?.w;
      const inY = ob?.y < y && y < ob?.y + ob?.h;

      if (inX && inY && ob?.zIndex > -1) {
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

  onMouseMove(e) {
    const { x, y, w, h, selected, stop } = this.mouse;
    this.detectList = [];

    if (selected && stop) {
      this.obList?.forEach((ob) => {
        const range = [
          [x, y],
          [x + w, y],
          [x + w, y],
          [x, y + h],
        ];

        const detect = [
          [ob.x, ob.y],
          [ob.x + ob.w, ob.y],
          [ob.x + ob.w, ob.y],
          [ob.x + ob.w, ob.y + ob.h],
        ];

        const r0 =
          detect[0][0] < range[3][0] &&
          detect[0][0] > range[0][0] &&
          detect[0][1] > range[3][1] &&
          detect[0][1] < range[0][1];

        const r1 =
          detect[1][0] < range[3][0] &&
          detect[1][0] > range[0][0] &&
          detect[1][1] > range[3][1] &&
          detect[1][1] < range[0][1];

        const r2 =
          detect[2][0] < range[3][0] &&
          detect[2][0] > range[0][0] &&
          detect[2][1] > range[3][1] &&
          detect[2][1] < range[0][1];

        const r3 =
          detect[3][0] < range[3][0] &&
          detect[3][0] > range[0][0] &&
          detect[3][1] > range[3][1] &&
          detect[3][1] < range[0][1];

        if ((r0 || r1 || r2 || r3) && ob?.zIndex > -1) {
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

  render() {
    this.doAction(() => {
      if (this.obList.length > 0) {
        this?.obList?.forEach((item) => {
          item.launch();
        });
      }

      // mouse render and detect
      this.mouse.draw();
    });
  }

  doAction(callback) {
    try {
      if (!this.stop && callback) {
        this.action = setInterval(() => {
          // auto clear
          this.ctx.clearRect(0, 0, this.w, this.h);
          if (callback) {
            callback();
          }
        }, 1000 / this.fps);
      } else {
        console.log("game stop");
      }
    } catch (error) {
      setTimeout(() => {
        clearInterval(this.action);
      }, time * 1000);
      throw error;
    }
  }
}

// GameObject for Game render
class GameObject extends Component {
  // pos
  ctx = {};
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

  constructor(x, y, w, h, name, id, s) {
    super(x, y, w, h, name, id, s);
  }
  launch() {
    try {
      if (this.g) {
        this.y += this.vector.y;
        this.vector.y += this.g / 60;
      }
      this.beforeDraw(this);
      this.loop(this);
      this.draw(this);
      this.afterDraw(this);
    } catch (error) {
      alert("error: ", error);
      this.end;
      throw error;
    }
  }

  // loop action
  loop(context) {}

  // before draw
  beforeDraw(context) {}

  // add context to drive
  draw(context) {
    if (this.ctx && !this.stop) {
      if (this.dImage && this.dImage.src && this.imgs.length > 0) {
        this.ctx.drawImage(this.dImage.src, init.x);
      } else {
        // clear
        this.ctx.clearRect(this.x, this.y, this.w, this.h);
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
  afterDraw(context) {}
}
