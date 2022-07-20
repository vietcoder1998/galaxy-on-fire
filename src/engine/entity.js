class Character extends GameObject {
  type = "character";
  color = "black";
  zIndex = 0;
}

class ViewObject extends GameObject {
  type = "map";
  color = "gray";
  zIndex = -1;

  loop() {
    // frame and write context
    if (this.frame < this.fps) {
      this.frame += 1;
    } else {
      this.frame = 0;
    }
    this.ctx.font = 20;
    this.ctx.fillStyle = "black";
    // fill frame
    this.ctx.fillText("frame:" + this.frame, this.w - 20, 20);
    this.ctx.fillText("fps:" + this.fps, this.w - 20, 40);
  }
}

class Mouse extends GameObject {
  zIndex = 999;
  selected = false;
  stop = false;

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
  }

  draw(context) {
    if (this.ctx && !this.stop && this.selected) {
      if (this.dImage && this.dImage.src && this.imgs.length > 0) {
        this.ctx.drawImage(this.dImage.src, init.x);
      } else {
        //
        if (this.stop) {
          drawX(this.ctx, this.x, this.y);
        }

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
