"use strict";
exports.__esModule = true;
function getClientPos(e) {
    var pageX;
    var pageY;
    if (e.touches) {
        pageX = e.touches[0].pageX;
        pageY = e.touches[0].pageY;
    }
    else {
        pageX = e.pageX;
        pageY = e.pageY;
    }
    return {
        x: pageX,
        y: pageY
    };
}
exports["default"] = getClientPos;
