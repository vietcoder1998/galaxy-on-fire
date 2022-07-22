class Tank extends Sprite {
  type = "sprite";

  constructor(name, x, y, w, h, id, s) {
    super(name, x, y, w, h, id, s);
    this.name = name;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.s = s;
    this.id = id;
  }

  // loop(e) {
  //   if (this.selected) {
  //     drawDashedLine(
  //       this.ctx,
  //       this.x + this.w / 2,
  //       this.y + this.h / 2,
  //       e.clientX,
  //       e.clientY
  //     );
  //   }
  // }
}
