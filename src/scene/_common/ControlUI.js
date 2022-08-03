import { UI } from "../engine";

class DashboardUI extends UI {
  color = "white";
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

  addButton(obs) {
    obs.forEach((ob, i) => {
      ob.x = this.x + i * 80;
      ob.y = this.y 
      ob.w = 60;
      ob.h = 40;
      this.add(ob, "objects");
    });
  }
}
