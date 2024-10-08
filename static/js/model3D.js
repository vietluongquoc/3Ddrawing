import * as THREE from './threejs/three.module.js';

export default class Model3d{
    constructor(canvas){
        this.renderer = new THREE.WebGLRenderer({canvas});
        this.scene = new THREE.Scene();
        //  fov = 45;aspect = 2;near = 0.1;far = 100;
        this.camera = new THREE.OrthographicCamera(canvas.width, canvas.width, canvas.height,canvas.height,1, 100);
        // size of grid = 10; divisions = 20;
        // Light
        //skyColor = 0x000000;groundColor = 0xffffff; hintensity = 1;
        // this.hlight = new THREE.HemisphereLight(0x000000, 0xffffff, 1);
        // this.scene.add(this.hlight);
        // color = 0xFFFFFF; dintensity = 0.8;
        // this.dlight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
        // this.dlight.position.set(50, 50, 50);
        // this.dlight.target.position.set(0, 0, 0);
        // this.scene.add(this.dlight);
        // this.scene.add(this.dlight.target);
        this.hlight = new THREE.AmbientLight(0x000000, 0xffffff, 1);
        this.scene.add(this.hlight);
        this.scene.background = new THREE.Color('white');
        this.renderer.outputEncoding = THREE.sRGBEncoding;
    }

    setCam(camPosition){
        this.camera.position.set(camPosition);
    };

    drawing(canvas){
        function resizeRendererToDisplaySize(renderer){
            const cv = renderer.domElement;
            const width = cv.clientWidth;
            const height = cv.clientHeight;
            const needResize = canvas.width !== width || canvas.height !== height;
            if(needResize){
                renderer.setSize(width, height, false);
            }
            return needResize;
        };
        if (resizeRendererToDisplaySize(this.renderer)) {
            const cv = this.renderer.domElement;
            this.camera.aspect = cv.clientWidth / cv.clientHeight;
            this.camera.updateProjectionMatrix();
        };
        this.renderer.render(this.scene, this.camera);
    };

}