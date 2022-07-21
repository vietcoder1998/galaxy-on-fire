class Character extends GameObject {
  type = "character";
  color = "black";
  zIndex = 0;

  constructor(name, x, y, w, h, id, s) {
    super(name, x, y, w, h, id, s);
  }
}

class GameController extends Component {}

class ViewObject extends GameObject {
  type = "map";
  color = "gray";
  zIndex = -999;

  constructor(name, x, y, w, h, id, s) {
    super(name, x, y, w, h, id, s);
  }
}

class MouseObject extends GameObject {
  zIndex = 999;
  selected = false;

  constructor(x, y, w, h, name, id, s) {
    super(x, y, w, h, name, id, s);
  }

  onMouseDown(e) {
    if (!this.selected) {
      this.x = e.x;
      this.y = e.y;
      this.w = 0;
      this.h = 0;

      this.selected = true;
    } else {
      this.x = e.x;
      this.y = e.y;
      this.w = 0;
      this.h = 0;
    }

    this.stop = true;
  }

  onMouseMove(e) {
    this.w = e.x - this.x;
    this.h = e.y - this.y;
    this.stop = false;
  }

  onMouseUp(e) {
    this.x = 0;
    this.y = 0;
    this.w = 0;
    this.h = 0;
    this.selected = false;
    this.stop = false;
  }

  draw(context) {
    if (this.ctx && this.selected) {
      if (this.dImage && this.dImage.src && this.imgs.length > 0) {
        this.ctx.drawImage(this.dImage.src, init.x);
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

        // clear
      }
    }
  }
}

class Tile extends GameObject {
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
