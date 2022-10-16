"use strict"
var gSquaredVertexBuffer = null;


function initSquareBuffer() {
    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];
    // Create buffer
    gSquaredVertexBuffer = gGL.createBuffer();
    // Activate vertexBuffer
    gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquaredVertexBuffer);
    // Load vertexOfSquare into vertexBuffer
    gGL.bufferData(gGL.ARRAY_BUFFER, new Float32Array(verticesOfSquare), gGL.STATIC_DRAW);
}