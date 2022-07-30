class CameraScene1 extends Camera {
  speed = 3;

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

  get _selectedList() {
    return this._objects.filter((item) => item.selected);
  }

  loop() {
    let x = 0;
    let y = 0;

    if (this._selectedList.length > 0) {
      this._selectedList.forEach((item) => {
        x += item.x;
        y += item.y;
      });

      this.x = x / this._selectedList.length - this.w / 2;
      this.y = y / this._selectedList.length - this.h / 2;
    }
  }
}
