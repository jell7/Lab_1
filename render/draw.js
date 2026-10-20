export function drawShip(ctx, ship) {
  ctx.save();
  ctx.translate(ship.x, ship.y);
  ctx.rotate(ship.angle);

  ctx.strokeStyle = '#bc0b0b';
  ctx.fillStyle = '#e1d60a';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(15, 0);
  ctx.lineTo(-12, -10);
  ctx.lineTo(-6, 0);
  ctx.lineTo(-12, 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  if (ship.thrusting) {
    ctx.strokeStyle = '#ffaa00';
    ctx.beginPath();
    ctx.moveTo(-8, -5);
    ctx.lineTo(-16, 0);
    ctx.lineTo(-8, 5);
    ctx.stroke();
  }

  ctx.restore();
}

export function drawHud(ctx, stats, score) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(10, 10, 220, 120);

  ctx.fillStyle = '#00ffcc';
  ctx.font = '14px monospace';
  ctx.fillText(`Steps/s (Phys): ${stats.stepsPerSecond}`, 20, 35);
  ctx.fillText(`Frames/s (Graf): ${stats.framesPerSecond}`, 20, 60);
  ctx.fillText(`Frame Time: ${stats.lastFrameMs.toFixed(2)} ms`, 20, 85);
  
  ctx.fillStyle = '#b9b92a';
  ctx.fillText(`Score (Очки): ${score}`, 20, 110);
}


export function drawCollectibles(ctx, items) {
  for (const item of items) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(item.x, item.y, item.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#00ff66';
    ctx.shadowColor = '#00ff66';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.restore();
  }
}
