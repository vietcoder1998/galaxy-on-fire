// Wallet
class Bullet extends Sprite {
  type = "sprite";
  speed = 2;
  velocity = {
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
    if (this.gravity && this.velocity) {
      this.y += this.velocity.y;
      this.velocity.y += this.gravity;
    }

    if (this.velocity && this.speed) {
      // moving with velocity
      this.x += this.velocity.x * this.speed;
      this.y += this.velocity.y * this.speed;
    }
  }
}
