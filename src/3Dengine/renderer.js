class Renderer {
    constructor(canvas, meshes) {
        this._Meshes = meshes;
        this._Init(canvas);
    }

    _Init(canvas) {
        // Initialize the GL context
        const gl = canvas.getContext("webgl2") || canvas.getContext("experimental-webgl");
        
        // Only continue if WebGL is available and working
        if (gl === null) {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }

        // TODO: 3D Engine - CreateScene for all meshes/objects
        this._CreateScene(this._Meshes[0]);
    }

    _CreateScene(mesh) {
        this._mesh = mesh;
    }

    Render(timeElapsed){
        
    }
}