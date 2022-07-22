//mouse

// Game controller
class Scene1Controller extends GameController {
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

// Wallet
class Bullet extends Sprite {
  type = "sprite";
  speed = 2;
  vector = {
    x: 0,
    y: 0,
  };

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
    if (this.selected) {
      drawDashedLine(this.ctx, this._pos.x, this._pos.y, e.clientX, e.clientY);

      this.endPoint = {
        x: e.clientX,
        y: e.clientY,
      };

      this.vector = calculateVector2D(
        this._pos.x,
        this._pos.y,
        e.clientX - this.w / 2,
        e.clientY - this.h / 2,
        this.speed
      );

      console.log(this.endPoint, this.vector);
    }
  }

  onKeyDown(e) {}
}

// Tank
class Tank extends Sprite {
  speed = 2;
  vector = {
    x: 0,
    y: 0,
  };
  bullets = [];
  attRange = 100;
  percent = 80;
  heal = 1000;
  point = {
    x: 0,
    y: 0,
  };

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

  // draw before use
  afterDraw() {
    drawCircle(this.ctx, this._pos.x, this._pos.y, this.attRange);
    drawHealth(this.ctx, this.x, this.y - 20, this.percent);
  }

  // write action in here
  loop() {
    this.move();
  }

  move() {
    if (
      this.x <= this.point.x &&
      this.point.x <= this.x + 2 * this.w &&
      this.y <= this.point.y &&
      this.point.y <= this.y + 2 * this.h
    ) {
      this.vector = {
        x: 0,
        y: 0,
      };
    } else {
      if (this.gravity && this.vector) {
        this.y += this.vector.y;
        this.vector.y += this.gravity;
      }

      if (this.vector && this.speed) {
        // moving with vector
        this.x += this.vector.x * this.speed;
        this.y += this.vector.y * this.speed;
      }
    }
  }

  onMouseDown(e) {
    if (this.selected) {
      drawDashedLine(this.ctx, this._pos.x, this._pos.y, e.clientX, e.clientY);

      this.vector = calculateVector2D(
        this._pos.x,
        this._pos.y,
        e.clientX - this.w / 2,
        e.clientY - this.h / 2,
        this.speed
      );

      this.point = {
        x: e.clientX,
        y: e.clientY,
      };
    }
  }

  onKeyDown(e) {
    if (!this.keyListen.includes(e.key)) {
      this.keyListen?.unshift(e?.key);
    }

    if (this.keyListen.length === 3) {
      this.keyListen.pop();
    }

    if (this.keyListen?.includes("s")) {
      this.vector = {
        x: 0,
        y: 0,
      };
    }

    if (this.keyListen.includes("a") && this.keyListen.includes("Meta")) {
      this.selected = true;
    }
  }
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
