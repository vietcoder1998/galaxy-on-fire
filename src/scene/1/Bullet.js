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
