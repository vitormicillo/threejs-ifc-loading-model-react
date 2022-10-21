import { useEffect } from 'react';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { IFCLoader } from 'three/examples/jsm/loaders/IFCLoader';

import SceneInit from './lib/SceneInit';

function App() {
	useEffect(() => {
		const jrl = new SceneInit('myThreeJsCanvas');
		jrl.initialize();
		jrl.animate();

		// Initial Cube for position
		const boxGeometry = new THREE.BoxGeometry();
		const boxMaterial = new THREE.MeshNormalMaterial({ color: 0xff00ff, depthTest: false, transparent: true, opacity: 0.3 });
		const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
		jrl.scene.add(boxMesh);


		//let loadedModel;
		const ifcLoader = new IFCLoader();
		ifcLoader.ifcManager.setWasmPath('node_modules/three/examples/jsm/loaders/ifc/');
		ifcLoader.load('./assets/jrl/5237RiverStreetC62022.ifc', (ifcScene) => {
			//loadedModel = ifcScene;
			
			//Define 3D element position in the scene
			// ifcScene.scene.rotation.y = Math.PI / 8;
			// ifcScene.scene.position.y = 3;
			// ifcScene.scene.scale.set(10, 10, 10);
			
			
			jrl.scene.add( ifcScene.mesh );
		});

		
		//Animate 3D image automatically, funny purposes
		// const animate = () => {
		// 	  if (loadedModel) {
		// 	    loadedModel.scene.rotation.x += 0.01;
		// 	    loadedModel.scene.rotation.y += 0.01;
		// 	    loadedModel.scene.rotation.z += 0.01;
		// 	  }
		// 	requestAnimationFrame(animate);
		// };
		// animate();
	}, []);

	return (
		<div>
			<canvas id="myThreeJsCanvas" />
		</div>
	);
}

export default App;
