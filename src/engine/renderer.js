class Renderer {
    constructor(canvas) {
        this._Init(canvas);
    }

    _Init(canvas) {
        // Initialize the GL context
        const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        
        // Only continue if WebGL is available and working
        if (gl === null) {
            alert("Unable to initialize WebGL. Your browser or machine may not support it.");
            return;
        }
    }

    Render(timeElapsed){
    }
}