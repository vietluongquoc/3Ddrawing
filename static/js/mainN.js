import * as THREE from './threejs/three.module.js';
import {STLLoader} from './threejs/STLLoader.js';
import Arm3D from "./arm3D.js";

const clickbtn = ['#btn-open-vd1','#btn-open-vd2','#btn-open-vd3', '#btn-open-vd4', '#btn-open-vd4s','#btn-open-vd5', '#btn-open-vd5s','#btn-open-hc6', '#btn-open-hc6s', '#btn-open-hc7'];
// Threejs
const models = [
    {
        name: 'VD1',
        coordinate: new THREE.Object3D(),
        path: './static/js/threejs/model/bt1_3d.stl',
        angle: {x:0, y:0, z:0},
        position: {x: 0,y:0,z:0,},
        colors: { color: '#4CAF50', specular: 0x111111, shininess: 10 },
        axis_rotate: '0',
        scaleRatio:  0.3,
    },
    {
        name: 'VD2',
        coordinate: new THREE.Object3D(),
        path: './static/js/threejs/model/bt2_3d.stl',
        angle: {x:0, y: 0, z:0},   
        // rotation angle y: -MATH.PI/2 = initial point
        position: {x: 0,y:0,z:0,},
        colors: { color: '#4CAF50', specular: 0x111111, shininess: 10 },
        axis_rotate: 'Y',
        scaleRatio:  0.3,
    },
    {
        name: 'VD3',
        coordinate: new THREE.Object3D(),
        path: './static/js/threejs/model/bt5.stl',
        angle: {x:0, y: 0, z:0},  
        // rotation angle y: MATH.PI/2 = initial point
        position: {x: 0,y:0,z:0,},
        colors: { color: 'red', specular: 0x111111, shininess: 10 },
        axis_rotate: 'Y',
        scaleRatio: 0.2,
    },
    {
        name: 'VD4',
        coordinate: new THREE.Object3D(),
        path: './static/js/threejs/model/sliding01.stl',
        angle: {x:0, y: 0, z:0},  
        // rotation angle y: MATH.PI/2 = initial point
        position: {x: 0,y:0,z:0,},
        colors: { color: 'green', specular: 0x111111, shininess: 10 },
        axis_rotate: 'Y',
        scaleRatio: 0.2,
    },
    {
        name: 'VD4s',
        coordinate: new THREE.Object3D(),
        path: './static/js/threejs/model/sliding01s.stl',
        angle: {x:0, y: 0, z:0},  
        // rotation angle y: MATH.PI/2 = initial point
        position: {x: 0,y:0,z:0,},
        colors: { color: 'green', specular: 0x111111, shininess: 0 },
        axis_rotate: 'Y',
        scaleRatio: 0.2,
    },
    {
        name: 'VD5',
        coordinate: new THREE.Object3D(),
        path: './static/js/threejs/model/vd5.stl',
        angle: {x:0, y: 0, z:0},  
        // rotation angle y: MATH.PI/2 = initial point
        position: {x: 0,y:0,z:0,},
        colors: { color: 'green', specular: 0x111111, shininess: 10 },
        axis_rotate: 'Y',
        scaleRatio: 0.15,
    },
    {
        name: 'VD5s',
        coordinate: new THREE.Object3D(),
        path: './static/js/threejs/model/vd5s.stl',
        angle: {x:0, y: 0, z:0},  
        // rotation angle y: MATH.PI/2 = initial point
        position: {x: 0,y:0,z:0,},
        colors: { color: 'green', specular: 0x111111, shininess: 0 },
        axis_rotate: 'Y',
        scaleRatio: 0.15,
    },
    {
        name: 'hc6',
        coordinate: new THREE.Object3D(),
        path: './static/js/threejs/model/hc06.stl',
        angle: {x:0, y: 0, z:0},  
        // rotation angle y: MATH.PI/2 = initial point
        position: {x: 0,y:0,z:0,},
        colors: { color: 'green', specular: 0x111111, shininess: 10 },
        axis_rotate: 'Y',
        scaleRatio: 0.15,
    },
    {
        name: 'hc6s',
        coordinate: new THREE.Object3D(),
        path: './static/js/threejs/model/hc06s.stl',
        angle: {x:0, y: 0, z:0},  
        // rotation angle y: MATH.PI/2 = initial point
        position: {x: 0,y:0,z:0,},
        colors: { color: 'green', specular: 0x111111, shininess: 0 },
        axis_rotate: 'Y',
        scaleRatio: 0.15,
    },
    {
        name: 'hc7',
        coordinate: new THREE.Object3D(),
        path: './static/js/threejs/model/hc07.stl',
        angle: {x:0, y: 0, z:0},  
        // rotation angle y: MATH.PI/2 = initial point
        position: {x: 0,y:0,z:0,},
        colors: { color: 'green', specular: 0x111111, shininess: 0 },
        axis_rotate: 'Y',
        scaleRatio: 0.15,
    }
];

const stlLoader = new STLLoader();
var loadModels = (models3D, i) =>{
    let part = models[i];
    stlLoader.load(part.path, (root)=>{
        // root.center();
        let mater1 = new THREE.MeshPhongMaterial(part.colors)
        let mesh1 = new THREE.Mesh(root, mater1);
        mesh1.name = part.name;
        mesh1.scale.set(part.scaleRatio, part.scaleRatio, part.scaleRatio);
        let axesHelper = new THREE.AxesHelper(2);
        part.coordinate.add(mesh1);
        part.coordinate.add( axesHelper);
        part.coordinate.rotation.set(part.angle.x,part.angle.y, part.angle.z);
        part.coordinate.position.set(part.position.x, part.position.y, part.position.z);
    });
    models3D.scene.remove(models3D.scene.children[4]);
    models3D.scene.add(part.coordinate);
    // console.log(models3D.scene.children[4]);
};


$(document).ready(()=>{
    var canvas0 = document.getElementById('in3dspace0');
    var models3D = new Arm3D(canvas0);
    models3D.init();
    loadModels(models3D,0);
    clickbtn.forEach((clickbtn, index)=>{
        $(clickbtn).click(()=>{
            loadModels(models3D,index);
        });
    });

    function render() {
        setTimeout(()=>{
            models3D.drawing(canvas0);
            requestAnimationFrame(render);
        }, 1000/100)
    };
    requestAnimationFrame(render);
});
