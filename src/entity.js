class Sprite extends GameObject {
  x;
  y;
  w;
  h;
  type = "character";
  color = "black";
  zIndex = 0;
  speed = 0.1;

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

  async onMouseDown() {
    console.log('mouse in game', this.name)
  }
}

class ViewObject extends GameObject {
  x;
  y;
  w;
  h;
  type = "map";
  color = "gray";
  zIndex = -999;

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

class TileObject extends GameObject {
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

class TitleMapObject extends GameObject {
  matrix = [];
}
