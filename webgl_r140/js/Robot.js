/**
 * Robot.js
 * 
 * Practica GPC #2. Crear un Robot
 * 
 * Author: Andreu Casamayor
 */

//Variables De consenso
let renderer, scene, camera;

//Variables Globales
var robot, base, brazo, antebrazo, mano;

let angulo = 0.0;

init();
loadScene();
render();

function init()
{
    //Instaciar el motor
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('container').appendChild( renderer.domElement);

    //Intanciar la escena
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0.5,0.5,0.5);

    //Instanciar camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 100);
    camera.position.set(0.5,2,7);
    camera.lookAt(0,1,0);
}