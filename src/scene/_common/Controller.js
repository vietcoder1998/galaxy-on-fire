//mouse

// Game controller
class Scene1Controller extends GameController {
  keyListen = [];

  onMouseMove(e) {
    const { x, y, w, h, down } = this._mouse;
    if (down) {
      this._objects?.forEach((ob) => {
        const tX = x + w;
        const tY = y + h;
        // map
        const minX = tX > x ? x : tX;
        const maxX = tX < x ? x : tX;
        const minY = tY > y ? y : tY;
        const maxY = tY < y ? y : tY;

        const detect = [
          [ob.x, ob.y],
          [ob.x + ob.w, ob.y],
          [ob.x + ob.w, ob.y + ob.w],
          [ob.x, ob.y + ob.h],
        ];

        let inRange = false;

        detect.forEach((dt) => {
          if (dt[0] > minX && dt[0] < maxX && dt[1] > minY && dt[1] < maxY) {
            inRange = true;
          }
        });

        if (inRange && ob?.zIndex > -1) {
          ob.onDetect(e);
        } else ob.onNoneDetect(e);
      });
    }
  }

  onMouseDown(e) {
    const { x, y, down } = this._objects.at(-1);

    if (down) {
      this._objects?.slice(0, -2).forEach((ob) => {
        const minX = ob.x;
        const maxX = ob.x + ob.w;
        const minY = ob.y;
        const maxY = ob.y + ob.h;
        const detect = [[x, y]];

        let inRange = false;

        detect.forEach((dt) => {
          if (dt[0] > minX && dt[0] < maxX && dt[1] > minY && dt[1] < maxY) {
            inRange = true;
          }
        });

        if (inRange && ob?.zIndex > -1) {
          ob.onDetect(e);
        } else {
          ob.onNoneDetect(e);
        }
      });
    }
  }
}
