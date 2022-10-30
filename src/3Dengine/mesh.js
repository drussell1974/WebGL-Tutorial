class Mesh {
    constructor() {
        this._buffers = {}
        this._MakeCube();
    }

    _MakeCube() {
        this._BufferData({size: 3, data: get3DCubePositions()}, 'positions');
        this._BufferData({size: 2, data: getUVS()}, 'uvs');
        this._BufferData({data: getIndicesForEachTrainglesPosition()}, 'index');
    }

    _BufferData(info, bName) {
        if (bName == 'index') {
            // Use ELEMENT_ARRAY_BUFFER, Uint16
            info.buffer = GL.createBuffer();
            GL.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, info.Buffer);
            GL.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(info.data), GL.STATIC_DRAW);
        } else {
            // Use ELEMENT_ARRAY_BUFFER, Float32
            info.buffer = GL.createBuffer();
            GL.bindBuffer(gl.ARRAY_BUFFER, info.Buffer);
            GL.bufferData(gl.ARRAY_BUFFER, new Float32Array(info.data), GL.STATIC_DRAW);    
        }
        this._buffers[bName] = info;
    }    
    //
    // Bind the buffers - pull from the buffers
    //
    Bind(shader) {
        // index buffer
        GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this._buffers.index.buffer);;
        GL.bindBuffer(GL.ARRAY_BUFFER, this._buffers.positions.buffer);
        GL.vertexAttribPointer(shader._attribs.positions, b.size, GL.FLOAT, false, 0, 0);
        GL.enableVertexAttribArray(shader._attribs.positions);
        // UVS buffer
        GL.bindBuffer(GL.ARRAY_BUFFER, this._buffers.uvs.buffer);
        GL.vertexAttribPointer(shader._attribs.uvs, b.size, GL.FLOAT, false, 0, 0);
        GL.enableVertexAttribArray(shader._attribs.uvs);
    }
    //
    //
    //
    Draw() {
        const vertexCount = this._buffers.index.data.length;
        GL.drawElements(GL.TRIANGLES, vertexCount, GL.UNSIGNED_SHORT, 0);
    }
}

//
// create array of positions for the cube
//
// TODO: Refactor - create as global array - const positions
function get3DCubePositions() {
    // create array of positions for the cube
    
    return [
        // Front face
        -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,
        // Back face
        -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,
        // Top face
        -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,
        // Bottom face
        -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,
        // Right face
        1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,
        // Left face
        -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0,
    ];
  }

//
// This array defines the UVS for ????
//
// TODO: Refactor - create as global array - const uvs
function getUVS() {
    return [ 
        // Front face
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        // Back face
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        // Top face
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        // Bottom face
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        // Right face
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
        // Left face
        0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    ]    
}
//
// This array defines each face as two triangles, using the
// indices into the vertex array to specify each triangle's
// position.
//
// TODO: Refactor - create as global array - const indices
function getIndicesForEachTrainglesPosition() {
    // This array defines each face as two triangles, using the
    // indices into the vertex array to specify each triangle's
    // position.
  
    return [
      0, 1, 2,      0, 2, 3,    // front
      4, 5, 6,      4, 6, 7,    // back
      8, 9, 10,     8, 10, 11,  // top
      12, 13, 14,   12, 14, 15, // bottom
      16, 17, 18,   16, 18, 19, // right 
      20, 21, 22,   20, 22, 23, // left
    ]
  };
