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

    //Base (Tiene dentro al brazo)
    base = new THREE.Mesh(THREE.CylinderGeometry(50, 50, 15, 32), material);
    base.position.set(0,0,0);

    //Brazo (4 elementos: eje, esparrago, rotula, antebrazo)
    brazo = new THREE.Object3D();

    //elemento eje
    var eje = new THREE.Mesh(THREE.CylinderGeometry(20, 20, 18, 32), material);
    eje.rotateZ(Math.PI/2);
    brazo.add(eje);
    //elemento esparrago
    var esparrago = new THREE.Mesh(THREE.BoxGeometry(18,120,12), material);
    esparrago.rotateY(Math.PI/2);
    esparrago.position.set(0,50,0);
    brazo.add(esparrago);
    //elemento rotula
    var rotula = new THREE.Mesh(THREE.SphereGeometry(20, 20, 20), material);
    rotula.position.set(0,120,0);
    brazo.add(rotula);

    //Elemto antebrazo(tendra 3 elementos: disco, nervios, mano)
    antebrazo = new THREE.Object3D();
    antebrazo.position.set(0,120,0)

    //elemento disco
    var disco = new THREE.Mesh(THREE.CylinderGeometry(22, 22, 6, 32), material);
    antebrazo.add(disco);

    //elemento nervio 1:
    var nervio1 = new THREE.Mesh(THREE.BoxGeometry(4,80,4), material);
    nervio1.position.set(4, 0, -4);
    antebrazo.add(nervio1);
    //elemento nervio 2:
    var nervio2 = new THREE.Mesh(THREE.BoxGeometry(4,80,4), material);
    nervio2.position.set(-4, 0, -4);
    antebrazo.add(nervio2);
    //elemento nervio 3:
    var nervio3 = new THREE.Mesh(THREE.BoxGeometry(4,80,4), material);
    nervio3.position.set(4, 0, 4);
    antebrazo.add(nervio3);
    //elemento nervio 4:
    var nervio4 = new THREE.Mesh(THREE.BoxGeometry(4,80,4), material);
    nervio4.position.set(-4, 0, 4);
    antebrazo.add(nervio4);

    //Elemento mano (3 elementos:mano, pinzalz, pinzaDe)
    mano = new THREE.Mesh(THREE.CylinderGeometry(15,15,40), material);
    mano.position.set(0,80,0);
    mano.rotateZ(Math.PI/2);

    
}