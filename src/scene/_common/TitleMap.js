class TitleMapScene1 extends TitleMap {
  column = 10;
  row = 10;

  constructor(name, x, y, w, h, id) {
    super(name, x, y, w, h, id);
    this.name = name;
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
}
