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
    const { x, y, w, h } = this._mouse;
    const detect = detectOver({ x, y, w, h }, [
      [this.x, this.y],
      [this.x + this.w, this.y],
      [this.x + this.w, this.y + this.h],
      [this.x, this.y + this.h],
    ]);

    if (detect) {
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
