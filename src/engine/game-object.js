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

  onMouseDown(e) {
    if (
      this.x < e.clientX &&
      this.x + this.w > e.clientX &&
      this.y < e.clientY &&
      this.y + this.h > e.clientY &&
      this.type === "sprite"
    ) {
      this.selected = true;
    }
  }
}

class Camera extends GameObject {
  x;
  y;
  w;
  h;
  color = "#11111120";
  zIndex = -999;
  type = "camera";
  speed = 0;

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

  onKeyDown(e) {
    switch (e.key) {
      case "ArrowRight":
        this.x += this.speed;
        break;

      case "ArrowLeft":
        this.x -= this.speed;
        break;

      case "ArrowDown":
        this.y += this.speed;
        break;

      case "ArrowUp":
        this.y -= this.speed;
        break;

      default:
        break;
    }
  }
}

class Tile extends GameObject {
  x;
  y;
  w;
  h;
  col;
  row;
  selected = false;
  zIndex = 1;
  active = false;

  constructor(name, x, y, w, h, id, r, s) {
    super(name, x, y, w, h, id, r, s);
    this.name = name;
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.s = s;
  }

  onMouseMove(e) {
    const { x, y, w, h } = this;
    const detect = detectOver({ x, y, w, h }, [[e.clientX, e.clientY]]);

    if (detect && this.active) {
      this.selected = true;
    } else {
      this.selected = false;
    }
  }

  draw() {
    if (this.dImage && this.dImage.src && this.imgs.length > 0) {
      this._ctx.drawImage(this.dImage.src, init.x);
    } else {
      // fill rects
      if (this.selected) {
        drawSquare(this._ctx, this.x, this.y, this.w, this.h, "#4eff0070");
      } else {
        drawSquare(this._ctx, this.x, this.y, this.w, this.h, "#4D118210");
      }

      if (this.imgs.length && this.dImage.pos >= this.imgs.length) {
        this.dImage = this.imgs[0];
      } else {
        this.imgFrame += 1;
        this.dImage = this.imgs[this.imgFrame];
      }
    }
  }
}

class TitleMap extends GameObject {
  tiles = [];
  color = "whitesmoke";
  type = "tilemap";
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

  setTile([row, column]) {
    const tiles = [];
    const wTile = Math.abs(this.w - this.x) / column;
    const hTile = Math.abs(this.h - this.y) / row;

    for (let i = 0; i < row; i++) {
      const tileRow = [];

      const y = this.y + i * hTile;

      for (let j = 0; j < column; j++) {
        const x = this.x + j * hTile;
        const tile = new Tile(`tile_${i + "_" + j}`, x, y, wTile, hTile);
        tile.col = x;
        tile.row = y;
        tileRow.push(tile);
      }

      tiles.push(tileRow);
    }

    this.row = row;
    this.column = column;
    this.tiles = tiles;
  }

  onMouseDown(e) {
    this.tiles.forEach((row) => {
      row.forEach((item) => {
        item.onMouseDown(e);
      });
    });
  }

  onMouseMove(e) {
    this.tiles.forEach((row) => {
      row.forEach((item) => {
        item.onMouseMove(e);
      });
    });
  }

  draw() {
    if (this.dImage && this.dImage.src && this.imgs.length > 0) {
      this._ctx.drawImage(this.dImage.src, init.x);
    } else {
      // fill rects
      this._ctx.fillStyle = "#4eff0010";
      this._ctx.fillRect(this._ctx, this.x, this.y, this.w, this.h);

      if (this.tiles && this.tiles.length > 0) {
        this.tiles.forEach((tileRow) => {
          tileRow.forEach((tile) => {
            tile.launch();
          });
        });
      }

      if (this.imgs.length && this.dImage.pos >= this.imgs.length) {
        this.dImage = this.imgs[0];
      } else {
        this.imgFrame += 1;
        this.dImage = this.imgs[this.imgFrame];
      }
    }
  }
}

class UI extends GameObject {
  borderColor = "black";
  binding() {
    drawRawSelected(this._ctx, this.x, this.y, this.w, this.h);
  }
}

class Button extends GameObject {
  borderColor = "red";
  fontColor = "black";
  content = "";
  binding() {
    drawRawSelected(this._ctx, this.x, this.y, this.w, this.h);
  }

  onMouseDown(e) {
    const { x, y, w, h } = this;
    // detect one
    const detect = detectOver({ x, y, w, h }, [[this._mouse.x, this._mouse.y]]);

    if (detect) {
      this.onClick(e);
    }
  }

  onClick(e) {}

  draw() {
    this.clear();
    this._ctx.fillStyle = this.fontColor;
    this._ctx.font = "15px Arial";
    this._ctx.fillText(this.content, this.x + 10, this.y + 10);
  }
}
