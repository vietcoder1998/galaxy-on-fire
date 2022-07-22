class Sprite extends GameObject {
  x = 0;
  y = 0;
  w = 0;
  h = 0;
  type = "character";
  color = "black";
  zIndex = 0;
  type = "sprite";
  selected = false;

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
    if (
      this.x < e.clientX &&
      this.x + this.w > e.clientX &&
      this.y < e.clientY &&
      this.y + this.h > e.clientY &&
      this.type === "sprite"
    ) {
      this.selected = true;
      console.log("selected", this.name);
    }
  }
}

class Camera extends GameObject {
  x;
  y;
  w;
  h;
  type = "map";
  color = "gray";
  zIndex = -999;
  type = "camera";

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
}

class Tile extends GameObject {
  x;
  y;
  w;
  h;
  draw(context) {
    if (this.ctx && !this.stop && this.selected) {
      if (this.dImage && this.dImage.src && this.imgs.length > 0) {
        this.ctx.drawImage(this.dImage.src, init.x);
      } else {
        //

        // clear
        drawRawSelected(this.ctx, this.x, this.y, this.w, this.h);

        if (this.imgs.length && this.dImage.pos >= this.imgs.length) {
          this.dImage = this.imgs[0];
        } else {
          this.imgFrame += 1;
          this.dImage = this.imgs[this.imgFrame];
        }
      }
    }
  }
}

class TitleMap extends GameObject {
  matrix = [];
}
