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
  type = "sprite";
  speed = 2;
  vector = {
    x: 0,
    y: 0,
  };
  bullets = [];
  attRange = 100;
  health = [80, 100]

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

  afterDraw() {
    drawCir(this.ctx, this._pos.x, this._pos.y, this.attRange);
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
