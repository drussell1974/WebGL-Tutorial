"use strict"
var gGL = null;

function initializeGL() {
    var canvas = document.getElementById("GLCanvas");
    var gGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    
    if (gGL != null) {
        gGL.clearColor(0.0, 0.8, 0.0, 1.0) // set colour to be cleared
    
        // initialise vertex buffers
        initSquareBuffer(); // Defined in VertexBuffer.js
        // Now load and compile the vertex and fragment shaders
        initSimpleShader("VertexShader", "FragmentShader"); // Defined in the index.html
    } else {
        document.write("<br><b>WebGL is not supported</b>");
    }
}

function drawSquare() {
    gGL.clear(gl.COLOR_BUFFER_BIT); // clear colours

    // Activate Shader to use
    gGL.useProgram(gSimpleShader);
    // Enable vertex position
    gGL.enableVertexAttribArray(gShaderVertexPositionAttribute);
    // Draw with the above settings
    gGL.drawArrays(gGL.TRIANGLE_STRIP, 0, 4);
}

function doGLDraw() {
    initializeGL();
    drawSquare();
}