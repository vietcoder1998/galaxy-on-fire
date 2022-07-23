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

  sensor(range) {
    const { x, y } = this._pos;
    const list = [];

    this._objects
      .filter((ob) => ob.name !== this.name)
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
  onMouseDown(e) {
    const { x, y, w, h } = this;
    const detect = detectOver({ x, y, w, h }, [[this._mouse.x, this._mouse.y]]);

    if (detect) {
      this.selected = true;
    } else {
      this.selected = false;
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

    if (e.key === "s") {
      this.vector = {
        x: 0,
        y: 0,
      };
    }

    if (e.key === "Escape") {
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
