// init for sharp
CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r, color) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;

  this.beginPath();
  this.moveTo(x + r, y);
  this.arcTo(x + w, y, x + w, y + h, r);
  this.arcTo(x + w, y + h, x, y + h, r);
  this.arcTo(x, y + h, x, y, r);
  this.arcTo(x, y, x + w, y, r);
  this.closePath();
  if (color) {
    this.fillStyle = color;
    this.fill();
  }
  return this;
};

function drawSelected(ctx, x, y, w, h) {
  ctx.beginPath();
  ctx.moveTo(x - 4, y - 4);
  ctx.lineTo(x - 4, y + 4 + h);
  ctx.lineTo(x + 4 + w, y + 4 + h);
  ctx.lineTo(x + 4 + w, y + -4);
  ctx.lineTo(x - 4, y - 4);
  ctx.strokeStyle = "#4eff00";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawRawSelected(ctx, x, y, w, h) {
  ctx.beginPath();
  ctx.fillStyle = "#ffffff00";
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + h);
  ctx.lineTo(x + w, y + h);
  ctx.lineTo(x + w, y);
  ctx.lineTo(x, y);
  ctx.strokeStyle = "#4eff00";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function detectRange(ctx, x, y, w, h) {
  ctx.beginPath();
  ctx.moveTo(x - 4, y - 4);
  ctx.lineTo(x - 4, y + 4 + h);
  ctx.lineTo(x + 4 + w, y + 4 + h);
  ctx.lineTo(x + 4 + w, y + -4);
  ctx.lineTo(x - 4, y - 4);
  ctx.strokeStyle = "#4eff00";
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawX(ctx, x, y, s, w) {
  ctx.beginPath();
  ctx.moveTo(x - (s ?? 20), y - (s ?? 20));
  ctx.lineTo(x + (s ?? 20), y + (s ?? 20));
  ctx.moveTo(x + (s ?? 20), y - (s ?? 20));
  ctx.lineTo(x - (s ?? 20), y + (s ?? 20));
  ctx.lineWidth = 1;
  ctx.stroke();

  return { x, y };
}

function drawDashedLine(ctx, x, y, ex, ey) {
  // Dashed line
  ctx.beginPath();
  ctx.strokeStyle = "#4eff00";
  ctx.setLineDash([15, 3]);
  ctx.moveTo(x, y);
  ctx.lineTo(ex, ey);
  ctx.stroke();
  ctx.restore();
}
