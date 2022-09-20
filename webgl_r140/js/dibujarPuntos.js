/*
    Seminario #1: Dibujar puntos con VBOs
*/

//Shader de vertices
const VSHADER_SOURCE = `
    attribute vec3 posicion;
    void main(){
        gl_Position = vec4(posicion,1.0);
        gl_PointSize = 10.0;
    }
`

// Shader de fragmentos
const FSHADER_SOURCE = `
    uniform highp vec3 color;
    void main(){
        gl_FragColor = vec4(color,1.0);
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
    if(!initShaders(gl,VSHADER_SOURCE,FSHADER_SOURCE)){
        console.log("La cosa no va bien, no carga shaders");
    }

    //Color de borrado del lienzo
    gl.clearColor(0.0, 0.0 ,0.3 ,1.0);

    //Localiza atributo shaders posicion
    const coordenadas = gl.getAttribLocation(gl.program, 'posicion'); //devuelvo el attributo posicion 

    //Crear Buffer, etc..
    const bufferVertices = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, bufferVertices ); //le referencia al buffer creado que es un buffer array
    gl.vertexAttribPointer( coordenadas, 3, gl.FLOAT, false, 0, 0 ); //enllaça bufferVertices amb coordenadas
    gl.enableVertexAttribArray( coordenadas ); //activa la matriu d'atributs de vèrtex genèric a l'índex especificat a la llista de matrius d'atributs

    // Asignar el mismo color a todos los puntos
    colorFragmento = gl.getUniformLocation( gl.program, 'color' );

    // Registrar la call-back del click del raton
    canvas.onmousedown = function(evento){ click(evento,gl,canvas); };

    // Dibujar
    render( gl );
}

function click( evento, gl, canvas )
{
    // Recuperar la posicion del click
    // El click devuelve la x,y en el sistema de referencia
    // del documento. Los puntos que se pasan al shader deben
    // de estar en el cuadrado de lado dos centrado en el canvas

    let x = evento.clientX;
    let y = evento.clientY;
    const rect = evento.target.getBoundingClientRect();

    // Conversion de coordenadas al sistema webgl por defecto
    x = ((x-rect.left)-canvas.width/2) * 2/canvas.width;
    y = ( canvas.height/2 - (y-rect.top)) * 2/canvas.height;

	
	// Guardar las coordenadas y copia el array
	clicks.push(x); clicks.push(y); clicks.push(0.0);

	// Redibujar con cada click
	render( gl );
}

function render( gl )
{
	// Borra el canvas con el color de fondo
	gl.clear( gl.COLOR_BUFFER_BIT );

	// Fija el color de TODOS los puntos
	gl.uniform3f(colorFragmento, 1, 1, 0);

	// Rellena el BO activo con las coordenadas y lo manda a proceso
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(clicks), gl.STATIC_DRAW );
	gl.drawArrays( gl.LINE_STRIP, 0, clicks.length/3 )	
}