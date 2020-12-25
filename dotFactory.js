import {draw} from './utils.js';

export const dotFactory = function(x, y, fix = false) {
    const baseLength = 45;
    const centerX = x + canvas.centerX;
    const centerY = y + canvas.centerY;
    let _x = centerX;
    let _y = centerY;
    let _prev = null;

    if (!fix) {
        let pos = getPosition(0);
        _x = centerX + pos.x;
        _y = centerY + pos.y;
    }

    function getPosition(angle, length = baseLength) {
        return {
            x: parseInt(length * Math.cos(angle)),
            y: parseInt(length * Math.sin(angle))
        };
    }

    return {
        isFix: () => fix,
        getCoord: () => ({ x: _x, y: _y }),
        setCoord: (angle) => {
            if(!fix) {
                let pos = getPosition(angle)
                _x = centerX + pos.x;
                _y = centerY + pos.y;
            }
        },
        getPreviousDot: () => _prev,
        setPreviousDot: (prev) => _prev = prev,
        join: () => {
            let previousPos = _prev.getCoord();
            draw(_x, _y, previousPos.x, previousPos.y);
        }
    }
}
