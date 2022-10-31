
// TODO: 3DEngine - remove - Use Shader class
const _SIMPLE_VS = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void) {
        gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
        vTextureCoord = aTextureCoord;

        // Apply lighting effect
        
        highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
        highp vec3 directionalLightColor = vec3(1, 1, 1);
        highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

        highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

        highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
        vLighting = ambientLight + (directionalLightColor * directional);
    }
`;

// Fragment shader program

/* Too use color faces */
// varying lowp vec4 vColor;
// gl_FragColor =  vColor; 

// TODO: 3DEngine - remove - Use Shader class
const _SIMPLE_FS = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    uniform sampler2D uSampler;

    void main(void) {
        highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

        gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    }
`;

class Shader {
    constructor(GL, vsrc, fsrc) {
        this.GL = GL;
        this._Init(vsrc, fsrc);
    }

    _Init(vsrc, fsrc) {
        this._vsSource = vsrc;
        this._fsSource = fsrc;

        this._vsProgram = this._Load(this.GL.VERTEX_SHADER, vsrc);
        this._fsProgram = this._Load(this.GL.FRAGMENT_SHADER, fsrc);

        // Create shader program
        this._shader = this.GL.createProgram();
        this.GL.attachShader(this._shader, this._vsProgram);
        this.GL.attachShader(this._shader, this._fsProgram);
        this.GL.linkProgram(this._shader);

        // If creating the shader program failed, alert
        if (!this.GL.getProgramParameter(this._shader, this.GL.LINK_STATUS)) {
            alert(`Unable to initialize the shader program: ${gl.getProgramInfoLog(shaderProgram)}`);
            return null;
        }
    }

    _Load(type, source) {
        const shader = this.GL.createShader(type);

        // Send the source to the shader object
        this.GL.shaderSource(shader, source);
        // Compile the shader program
        this.GL.compileShader(shader);
      
        // See if it compiled successfully
        if (!this.GL.getShaderParameter(shader, this.GL.COMPILE_STATUS)) {
            alert(`An error occurred compiling the shaders: ${gl.getShaderInfoLog(shader)}`);
            gl.deleteShader(shader);
            return null;
        }
      
        return shader;
    }

    Bind(constants, shader) {
        shader.Bind();

        const modelMatrix = mat4.create();
        mat4.fromTranslation(modelMatrix, vec3.fromValues(0, 0, -10));

        const viewMatrix = mat4.create();
        const modelViewMatrix = mat4.create();
        mat4.multiply(modelViewMatrix, viewMatrix, modelMatrix);

        this.GL.uniformMatrix4fv(shader.uniforms.modelViewMatrix.location, false, modelViewMatrix);
        this.GL.uniformMatrix4fv(shader.uniforms.projectionMatrix.location, false, constants.projectionMatrix);
        // TODO: Complete ?????
    }
}