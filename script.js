import {POS} from './position.js';
import {degToRad, joinWithCenter, drawCrossCenter} from './utils.js';
import {dotFactory} from './dotFactory.js';

const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
const reduceFactor = 0.22;
const copy = 4;
const speed = 10;
let frame = 0;
let dots = [];

function setup() {
    frame = 0;
    dots = [];
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.centerX  =  canvas.width / 2;
    canvas.centerY  =  canvas.height / 2;
    ctx.strokeStyle = "white";
    ctx.lineWidth = 1;

    for (let i = 0; i < copy; i++) {
        dots[i] = [];
        let factor = 1 - (reduceFactor * i);
        for ( let j = 0; j < POS.length; j++ ) {
            let mod = j%4;
            dots[i].push(dotFactory(POS[j].x * factor, POS[j].y * factor, (mod == 1 || mod == 3)));
            if(!!j) {
                dots[i][j].setPreviousDot(dots[i][j-1]);
            }
        }
        dots[i][0].setPreviousDot(dots[i][dots[i].length - 1]);
    }
}

function loop() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    // drawCrossCenter();
    frame++;
    
    for (let i = 0; i < dots.length; i++) {
        for ( let j = 0; j < POS.length; j++ ) {
            let angle = ((frame/speed) % 360);
            let mod = j%4;
            if(!(mod == 1 || mod == 3)){
                if (j == 0) angle -= degToRad(45);
                if (j == 2) angle -= degToRad(90);
                if (j == 4) angle -= degToRad(135);
                if (j == 6) angle -= degToRad(180);
                if (j == 8) angle -= degToRad(135) * -1;
                if (j == 10) angle -= degToRad(90) * -1;
                if (j == 12) angle -= degToRad(45) * -1;
                if (j == 14) angle *= -1;
                
                dots[i][j].setCoord(angle);
            }
            
            if(!dots[i][j].isFix())
                joinWithCenter(dots[i][j]);
            
            dots[i][j].join();
        }
    }
    requestAnimationFrame(loop);
}

window.addEventListener('resize', () => setup());
setup();
loop();