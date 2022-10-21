import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module'; //Display the chart bar statistics, render GL and frames per second

export default class SceneInit {
	constructor(canvasId) {
		// NOTE: Core components to initialize Three.js app.
		this.scene = undefined;
		this.camera = undefined;
		this.renderer = undefined;

		// NOTE: Camera params;
		this.fov = 45;
		this.nearPlane = 1;
		this.farPlane = 10000;
		this.canvasId = canvasId;

		// NOTE: Additional components.
		this.clock = undefined;
		this.stats = undefined;
		this.controls = undefined;

		// NOTE: Lighting is basically required.
		this.ambientLight = undefined;
		this.directionalLight = undefined;
	}

	initialize() {
		this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color(0x8cc7de);


		this.camera = new THREE.PerspectiveCamera(
			this.fov, window.innerWidth / window.innerHeight, 1, 1000
		);
		this.camera.position.z = - 70;

		// ==============================================================
		// NOTE: Specify a canvas which is already created in the HTML.
		// NOTE: Anti-aliasing smooths out the edges.
			const canvas = document.getElementById(this.canvasId);
			this.renderer = new THREE.WebGLRenderer({
				canvas, antialias: true,
			});

			this.renderer.setSize(window.innerWidth, window.innerHeight);
			this.renderer.shadowMap.enabled = true;
			document.body.appendChild(this.renderer.domElement);
		// ==============================================================


			this.clock = new THREE.Clock();
			this.controls = new OrbitControls(this.camera, this.renderer.domElement);
			this.stats = Stats();
			document.body.appendChild(this.stats.dom);
		// ==============================================================

			// ambient light which is for the whole scene
			this.ambientLight = new THREE.AmbientLight(0xffffee, 0.25);
			//this.ambientLight.castShadow = true;
			this.scene.add(this.ambientLight);
		// ==============================================================

			// directional light - parallel sun rays
			this.directionalLight = new THREE.DirectionalLight(0xffeeff, 0.8);
			this.directionalLight.position.set(1, 1, 1);

			this.directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
			this.directionalLight2.position.set(- 1, 0.5, - 1);

			this.scene.add(this.directionalLight);
			this.scene.add(this.directionalLight2);
		// ==============================================================

			// if window resizes
			window.addEventListener('resize', () => this.onWindowResize(), false);
		// ==============================================================



		// ==============================================================

		// NOTE: Load space background.
		// this.loader = new THREE.TextureLoader();
		// this.scene.background = this.loader.load('./pics/space.jpeg');

		// NOTE: Declare uniforms to pass into glsl shaders.
		// this.uniforms = {
		//   u_time: { type: 'f', value: 1.0 },
		//   colorB: { type: 'vec3', value: new THREE.Color(0xfff000) },
		//   colorA: { type: 'vec3', value: new THREE.Color(0xffffff) },
		// };
	}

	animate() {
		window.requestAnimationFrame(this.animate.bind(this));
		this.render();
		this.stats.update();
		this.controls.update();
	}

	render() {
		// NOTE: Update uniform data on each render.
		// this.uniforms.u_time.value += this.clock.getDelta();
		this.renderer.render(this.scene, this.camera);
	}

	onWindowResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}
}
