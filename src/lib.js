function drawSelected(ctx, x, y, w, h) {
  ctx.restore();

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
  ctx.restore();

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
  ctx.restore();

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
  ctx.restore();

  ctx.beginPath();
  ctx.strokeStyle = "#4eff00";
  ctx.moveTo(x - (s ?? 20), y - (s ?? 20));
  ctx.lineTo(x + (s ?? 20), y + (s ?? 20));
  ctx.moveTo(x + (s ?? 20), y - (s ?? 20));
  ctx.lineTo(x - (s ?? 20), y + (s ?? 20));
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawDashedLine(ctx, x, y, ex, ey) {
  // Dashed line
  ctx.restore();

  ctx.beginPath();
  ctx.strokeStyle = "#4eff00";

  ctx.setLineDash([15, 3]);
  ctx.moveTo(x, y);
  ctx.lineTo(ex, ey);
  ctx.stroke();
  ctx.setLineDash([]);

}

function drawCir(ctx, x, y, r) {
  ctx.restore();

  ctx.beginPath();
  ctx.strokeStyle = "#ec1e1e90";
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawHeal(ctx, x, y, percent) {
  ctx.restore();

  ctx.strokeStyle = "#4eff00";
  ctx.moveTo(x, y);
  ctx.lineTo(x + percent, y);
  ctx.stroke();

  ctx.strokeStyle = "#ec1e1e90";
  ctx.moveTo(x + percent, y);
  ctx.lineTo(x + 100, y);
  ctx.stroke();
}
