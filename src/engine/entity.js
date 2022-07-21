class Character extends GameObject {
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
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.s = s;
    this.id = id;
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
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.id = id;
    this.s = s;
  }
}

class MouseObject extends GameObject {
  zIndex = 999;
  selected = false;
  down = false;

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

  onMouseDown(e) {
    console.log("e ->", mouse);
    this.x = e.clientX;
    this.y = e.clientY;

    this.w = 0;
    this.h = 0;

    this.selected = true;
    this.down = true;
    this.stop = true;
  }

  onMouseMove(e) {
    this.w = e.clientX - this.x;
    this.h = e.clientX - this.y;

    this.x = e.clientX;
    this.y = e.clientY;
    this.stop = false;
  }

  onMouseUp(e) {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.selected = false;
    this.stop = false;
    this.down = false;
  }

  draw(context) {
    if (this.ctx && this.selected) {
      if (this.dImage && this.dImage.src && this.imgs.length > 0) {
        this.ctx.drawImage(this.dImage.src, this.dImage.x, this.dImage.y);
      } else {
        if (this.stop) {
          drawX(this.ctx, this.x - 10, this.y - 10, 10, 3);
        } else {
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
