//mouse

// Game controller
class Scene1Controller extends GameController {
  onMouseMove(e) {
    const { x, y, w, h, down } = _global.mouse
    const { objects } = this._instance;

    if (down) {
      objects?.forEach((ob) => {
        const tX = x + w;
        const tY = y + h;

        // map
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
        }
      });
    }
  }

  onMouseDown(e) {
    const { x, y, down } = this._objects.at(-1);
    this.detectList = [];
    // detect event in mouse change

    if (down) {
      this._objects?.slice(0, -2).forEach((ob) => {
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
          ob.selected = !ob.selected;
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
  limit = {
    x: [-20, 200],
    y: [-20, 200],
  };

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

  loop() {
    if (
      (this.x < this.limit.x[0] && this.x > this.limit.x[1]) ||
      (this.y < this.limit.y[0] && this.y > this.limit.y[1])
    ) {
      this.destroy();
    }

    this.move();
  }

  move() {
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

// Tank
class Tank extends Sprite {
  speed = 2;
  vector = {
    x: 0,
    y: 0,
  };
  bullets = [];
  attRange = 100;
  heal = 1000;
  remainHeal = 1000;
  point = {
    x: 0,
    y: 0,
  };
  limitBullet = 10;
  isAttack = false;
  alive = true;

  get percent() {
    return (this.remainHeal / this.heal) * 100;
  }

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

  // draw before use
  afterDraw() {}

  // write action in here
  loop() {
    if (this.alive) {
      if (this.selected || this.isAttack) {
        drawHealth(_global.ctx, this.x, this.y - 20, this.percent);
        drawCircle(
          _global.ctx,
          this._pos.x,
          this._pos.y,
          this.attRange,
          "#4eff0030"
        );
      }

      this.checkEnemy();
      this.move();
    } else {
      this.color = "whitesmoke";
    }
  }

  checkEnemy() {
    const enemyList = this.sensor(this.attRange);
    enemyList.forEach((enemy) => {
      if (enemy.alive) {
        enemy.isAttack = true;
        this.shoot(enemy);
      }
    });
  }

  shoot(enemy) {
    const bullet = new Bullet("", this._pos.x, this._pos.y, 1, 1, "", 2);
    bullet.color = "yellow";
    bullet.vector = calculateVector2D(
      this._pos.x,
      this._pos.y,
      enemy._pos.x,
      enemy._pos.y,
      5
    );
    bullet.speed = 3;

    if (enemy.remainHeal > 0) {
      enemy.remainHeal -= 1;
    } else {
      enemy.alive = false;
    }

    if (this.limitBullet < this.bullets.length) {
      this.bullets.pop();
    } else {
      this.bullets?.unshift(bullet);
      this.bullets?.forEach((item) => item?.launch());
    }
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
      drawDashedLine(
        _global.ctx,
        this._pos.x,
        this._pos.y,
        e.clientX,
        e.clientY
      );

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

    if (this.keyListen?.includes("b")) {
      this.shoot();
    }

    if (this.keyListen?.includes("Escape")) {
      this.selected = false;
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
