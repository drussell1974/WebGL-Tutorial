"use strict"
var gGL = null;

function initializeGL() {
    var canvas = document.getElementById("GLCanvas");
    var gGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (gGL != null) {
        gGL.clearColor(0.0, 0.8, 0.0, 1.0) // set colour to be cleared
    } else {
        document.write("<br><b>WebGL is not supported</b>");
    }
}

function clearCanvas() {
    gGL.clear(gl.COLOR_BUFFER_BIT); // clear colours
}

function doGLDraw() {
    initializeGL();
    clearCanvas();
}