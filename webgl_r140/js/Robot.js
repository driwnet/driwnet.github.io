/**
 * Robot.js
 * 
 * Practica GPC #2. Crear un Robot
 * 
 * Author: Andreu Casamayor
 */

//Imports
import * as THREE from "../lib/three.module.js";

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
    camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 100);
    camera.position.set(90, 200, 350);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
}

function loadScene()
{
    //Material
    const material = new THREE.MeshBasicMaterial({color: "red", wireframe: true});

    //Robot completo
    robot = new THREE.Object3D();

    //Base
    base = new THREE.Mesh(THREE.CylinderGeometry(50, 50, 15, 32), material);

    
}