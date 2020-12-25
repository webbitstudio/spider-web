import {ctx} from './script.js';

export const degToRad = (a) => a * Math.PI / 180;

export const joinWithCenter = function(pt) {
    let ptPos = pt.getCoord();
    draw(canvas.centerX, canvas.centerY, ptPos.x, ptPos.y);
}

export const drawCrossCenter = function() {
    draw(0, canvas.centerY, canvas.width, canvas.centerY);
    draw(canvas.centerX, 0, canvas.centerX, canvas.height);
}

export const draw = function(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}