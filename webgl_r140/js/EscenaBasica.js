/**
 * EscenaBasica.js
 * 
 * Seminario GPC #2. Escena basica con geometrias predefinidas,
 * transformaciones y objetos importados
 * 
 * Author: Andreu Casamayor
 */

//Modulos necesarios
import * as THREE from "../lib/three.module.js";
import {GLTFLoader, GLTFLoades} from "../lib/GLTFLoader.module.js";

//Variables De consenso
let renderer, scene, camera;

// Otras globales
let esferaCubo;
let angulo = 0;

//Acciones
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

function loadScene()
{
    const material = new THREE.MeshBasicMaterial( {color: 'yellow', wireframe: true});

    // Suelo
    const suelo = new THREE.Mesh(new THREE.PlaneGeometry(10, 10, 10,10), material);
    suelo.rotation.x = -Math.PI/2; //voy a girar 90º
    scene.add(suelo);

    // cubo 
    const cubo = new THREE.Mesh(new THREE.BoxGeometry(2,2,2), material);
    // esfera
    const esfera = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 20), material);

    esferaCubo = new THREE.Object3D();
    //añado a la esfera cubo sus objetos
    esferaCubo.add(cubo);
    esferaCubo.add(esfera);
    //Hago tranformaciones
    cubo.position.x = -1; //matriz modelo cubo x = -1
    esfera.position.x = 1;
    esferaCubo.position.y = 1.5; //la matriz de este model, translacion en y de 1.5, como se acumulan las matrices realment a cubo y esfera le meto otra tranformacion

    scene.add(esferaCubo);


    // model importado
    const loader =  new THREE.ObjectLoader();
    loader.load( "models/soldado/soldado.json", 
    function(objeto){
        cubo.add( objeto );
        objeto.position.set( 0, 1, 0);
    });

    //modelo importado en formato GLTF
    const glloader = new GLTFLoader();
    glloader.load( "models/RobotExpressive.glb",
    function(gltf)
    {
        gltf.scene.position.y = 1;
        gltf.scene.rotation.y = -Math.PI/2;
        esfera.add(gltf.scene);
        console.log("ROBOT");
        console.log(gltf);
    })

    scene.add(new THREE.AxesHelper(3));

}

function update()
{
    angulo += 0.01;
    esferaCubo.rotation.y = angulo;
}

function render()
{
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
}