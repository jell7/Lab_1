import { setupCanvas } from '/render/canvas.js';
import { createInput } from './input.js';
import { createShip, integrate } from '/sim/ship.js';
import { wrapPosition } from '/sim/arena.js';
import { createCollectibleManager } from '/sim/collectibles.js'; 
import { createLoop } from './loop.js';
import { drawShip, drawCollectibles, drawHud } from '/render/draw.js';

const canvas = document.getElementById('gameCanvas');
const { ctx, width, height } = setupCanvas(canvas);
const input = createInput();

let currentShip = createShip(window.innerWidth / 2, window.innerHeight / 2);
let prevShip = { ...currentShip };

const collectibleManager = createCollectibleManager();

const loop = createLoop({
  step: 1 / 60,
  simulate: (dt) => {
    prevShip = { ...currentShip };
    
    integrate(currentShip, input, dt, width(), height());
    wrapPosition(currentShip, width(), height());

    collectibleManager.update(dt, width(), height());
    collectibleManager.checkCollisions(currentShip);
    
    input.clear();
  },
  render: (alpha, stats) => {
    const renderX = prevShip.x + (currentShip.x - prevShip.x) * alpha;
    const renderY = prevShip.y + (currentShip.y - prevShip.y) * alpha;
    let renderAngle = prevShip.angle + (currentShip.angle - prevShip.angle) * alpha;

    const interpolatedShip = {
      ...currentShip,
      x: renderX,
      y: renderY,
      angle: renderAngle
    };

    ctx.fillStyle = '#0b0f19';
    ctx.fillRect(0, 0, width(), height());

    drawCollectibles(ctx, collectibleManager.items);
    drawShip(ctx, interpolatedShip);
    
    drawHud(ctx, stats, collectibleManager.score);
  }
});

loop.start();