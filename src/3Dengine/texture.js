class Texture {
    constructor(GL) {
        this._GL = GL
    }

    Load(src) {
        this._name = src;
        this._Load(src);
        return this;
    }

    _Load(src) {
        const img = new Image();
        img.src = src;
        img.onload = () => {
            this._texture = this.GL.createTexture();
            this.GL.bindTexture(this.GL.TEXTURE_2D, this._texture);
            this.GL.texImage2D(this.GL.TEXTURE_2D, 0, this.GL.RGBA, this.GL.RGBA, this.GL.UNSIGNED_BYTE, img);
            this.GL.generateMipmap(this.GL.TEXTURE_2D);
            this.GL.texParameteri(this.GL.TEXTURE_2D, this.GL.TEXTURE_MIN_FILTER, this.GL.LINEAR_MIPMAP_LINEAR);
            this.GL.texParameteri(this.GL.TEXTURE_2D, this.GL.TEXTURE_MAG_FILTER, this.GL.LINEAR);
            this.GL.bindTexture(this.GL.TEXTURE_2D, null);
        };
    }

    // Depreciate
    _Load2(src) {
        this._texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
      
        // Because images have to be downloaded over the internet
        // they might take a moment until they are ready.
        // Until then put a single pixel in the texture so we can
        // use it immediately. When the image has finished downloading
        // we'll update the texture with the contents of the image.
        const level = 0;
        const internalFormat = gl.RGBA;
        const width = 1;
        const height = 1;
        const border = 0;
        const srcFormat = gl.RGBA;
        const srcType = gl.UNSIGNED_BYTE;
        const pixel = new Uint8Array([0, 0, 255, 255]);  // opaque blue
        gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                      width, height, border, srcFormat, srcType,
                      pixel);
      
        const image = new Image();
        image.onload = () => {
          gl.bindTexture(gl.TEXTURE_2D, this._texture);
          gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                        srcFormat, srcType, image);
      
          // WebGL1 has different requirements for power of 2 images
          // vs non power of 2 images so check if the image is a
          // power of 2 in both dimensions.
          if (isPowerOf2(image.width) && isPowerOf2(image.height)) {
             // Yes, it's a power of 2. Generate mips.
             gl.generateMipmap(gl.TEXTURE_2D);
          } else {
             // No, it's not a power of 2. Turn off mips and set
             // wrapping to clamp to edge
             gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
             gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
             gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
          }
        };
        image.src = url;
        // TODO: remove Called in image onload
        //this.GL.bindTexture(this.GL.TEXTURE_2D, null);
    }

    Bind(index) {
        if(!this._texture) {
            return;
        }
        this.GL.activeTexture(this.GL.TEXTURE0 + index);
        this.GL.bindTexture(this.GL.TEXTURE_2D, this._texture);
    }

    Unbind() {
        this.GL.bindTexture(GL.TEXTURE_2D, null);
    }
}

function isPowerOf2(value) {
    return (value & (value - 1)) === 0;
}