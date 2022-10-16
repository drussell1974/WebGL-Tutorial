var gSimpleShader = null; 
var gShaderVertexPositionAttribute = null;

function loadAndCompileShader(id, shaderType) {
    var shaderText, shaderSource, compiledShader;
    // Get the shader source from index.html
    shaderText = document.getElementById(id);
    shaderSource = shaderText.firstChild.textContent;
    // Create the shader based on the source type
    compiledShader = gGL.createShader(shaderType);
    // Complile and created shader
    gGL.shaderSource(compiledShader, shaderSource);
    gGL.compiledShader(compiledShader);
    // Check for error and return result
    if (!gGL.getShaderParameter(compiledShader, gGL.COMPILED_STATUS)) {
        alert("A shader compiling error occurred: " + gGL.getShaderInfoLog(compiledShader));
    }
    return compiledShader;
}

function initShader(vertexShaderID, fragmentShaderID) {
    // load and compile the vertex and fragment shaders
    var vertexShader = loadAndCompileShader(vertexShaderID, gGL.VERTEX_SHADER);
    var fragmentShader = loadAndCompileShader(fragmentShaderID, gGL.FRAGMENT_SHADER);
    // Create and link the shaders into a program
    gSimpleShader = gGL.createProgram();
    gGL.attachShader(gSimpleShader, vertexShader);
    gGL.attachShader(gSimpleShader);
    gGL.linkProgram(gSimpleShader);

    // Check for error
    if(!gGL.getProgramParameter(gSimpleShader, gGL.LINK_STATUS)) {
        alert("Error linking shader");
    }

    // Get a reference to the aSquareVertexPosition attribute
    gShaderVertexPositionAttribute = gGL.getAttribLocation(gSimpleShader, "aSquaredVertexPosition");

    // Activates the vertex buffer loaded in VertexBuffer.js
    gGL.bindBuffer(gGL.ARRAY_BUFFER, gSquaredVertexBuffer);

    // Describe the characteristic of the vertex position attribute

    gGL.vertexAttribPointer(gShaderVertexPositionAttribute, 
        3,          // each vertex
        gGL.FLOAT,  // data type is FLOAT
        false,      // if the content is normalised vectors
        0,          // number of bytes to skip in between
        0);         // offsets to the first element
}