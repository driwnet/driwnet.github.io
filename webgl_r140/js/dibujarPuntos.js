/*
    Seminario #1: Dibujar puntos con VBOs
*/

//Shader de vertices
const VSHADERS_SOURCE = `
    attribute vec3 posicion;
    void main(){
        gl_Position = vec4(posicion, 1.0);
        gl_PointSize = 10.0;
    }
`

//SHADER de fragmentos
const FSHADERS_SOURCE = `
    uniform highp vec3 color;
    void main(){
        gl_FragColor = vec4(color, 1.0) 
    }
`

//Variables globales
const clicks = [];
let colorFragmento;

function main(){
    
    //Recuperar el lienzo
    const canvas = document.getElementById("canvas");
    const gl =  getWebGLContext(canvas);

    //Cargo shaders en programa
    if(!initShaders(gl,VSHADERS_SOURCE,FSHADERS_SOURCE)){
        console.log("La cosa no va bien, no carga shaders");
    }

    //Color de borrado del lienzo
    gl.clearColor(0.0, 0.0 ,0.3 ,1.0);

    //Localiza atributo shaders posicion
    const coordenadas = gl.getAttribLocation(gl.program, 'posicion');

    //Crear Buffer, etc..
    const bufferVertices = gl.createBuffer();
}
