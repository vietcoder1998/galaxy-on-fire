export function detectOver(compare, detect) {
  let inRange = false;

  const { x, w, y, h } = compare;
  const tX = x + w;
  const tY = y + h;

  const minX = tX > x ? x : tX;
  const maxX = tX < x ? x : tX;

  const minY = tY > y ? y : tY;
  const maxY = tY < y ? y : tY;

  detect.forEach((dt) => {
    if (dt[0] > minX && dt[0] < maxX && dt[1] > minY && dt[1] < maxY) {
      inRange = true;
    }
  });

  return inRange;
}
