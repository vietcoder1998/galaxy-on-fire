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
      console.log("selected", this.name);
    }
  }
}

class Camera extends GameObject {
  x;
  y;
  w;
  h;
  color = "gray";
  zIndex = -999;
  type = "camera";

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
}

class Tile extends GameObject {
  x;
  y;
  w;
  h;
  selected = true;
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

  draw() {
    if (this.dImage && this.dImage.src && this.imgs.length > 0) {
      this.ctx.drawImage(this.dImage.src, init.x);
    } else {
      // fill rects
      if (this.selected) {
        drawSquare(this.ctx, this.x, this.y, this.w, this.h, "#4D118220");
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
  column = 10;
  row = 10;
  tiles = [];

  constructor(name, x, y, w, h, id, r, s) {
    super(name, x, y, w, h, id, r, s);
    this.name = name;
    this.id = id;
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.s = s;

    const column = 12;
    const row = 8;
    const tiles = [];
    const wTile = Math.abs(this.w - this.x) / column;
    const hTile = Math.abs(this.h - this.y) / row;

    for (let i = 0; i < row; i++) {
      const tileRow = [];

      const y = this.y + i * hTile;

      for (let j = 0; j < column;  j++) {
        const x = this.x + j * hTile;

        const tile = new Tile(`tile_${i + "_" + j}`, x, y, wTile, hTile);

        tileRow.push(tile);
      }

      tiles.push(tileRow);
    }

    this.tiles = tiles;
    console.log(this.tiles);
  }

  draw() {
    if (this.dImage && this.dImage.src && this.imgs.length > 0) {
      this.ctx.drawImage(this.dImage.src, init.x);
    } else {
      // fill rects
      this.ctx.fillRect(this.x, this.y, this.w, this.h, "green");

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
