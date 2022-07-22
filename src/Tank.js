class Tank extends Sprite {
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

  /**
   * @param {MouseEvent} e
   * @return {void}
   */

  async onMouseDown(e) {
    if (this.selected) {
      drawDashedLine(
        this.ctx,
        this.x + this.w / 2,
        this.y + this.h / 2,
        e.clientX,
        e.clientY
      );
    }
  }
}