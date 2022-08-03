export function calculateVector2D(x, y, endX, endY, speed) {
  const vtX = endX - x;
  const vtY = endY - y;
  const cross = Math.sqrt(vtX * vtX + vtY * vtY);
  const rate = cross / speed;

  return {
    x: vtX/rate,
    y: vtY/ rate,
  };
}
