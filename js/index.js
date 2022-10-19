// making the cameras global so they can be accessed from other scripts
var camera;
var camera1;
var camera2;
var camera3;

var createScene = function () {

    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    camera = new BABYLON.ArcRotateCamera("Camera0", 0, 0.8, 5, new BABYLON.Vector3.Zero(), scene);
    camera.setTarget(BABYLON.Vector3.Zero());
	
	// This stops the camera from zooming at all on desktop
	camera.inputs.removeByType("ArcRotateCameraMouseWheelInput");
	//camera.inputs.removeByType("multiTouchPanAndZoom");
	// and for mobile
	camera.inputs.attached.pointers.multiTouchPanAndZoom = false;
	camera.inputs.attached.pointers.multiTouchPanning = false;
	camera.inputs.attached.pointers.pinchZoom = false;

	//camera.lowerRadiusLimit = camera.radius;
    //camera.upperRadiusLimit = camera.radius;
	
	// Sets zoom distance limits if zoom is enabled
	//camera.lowerRadiusLimit = 4;
    //camera.upperRadiusLimit = 20;
	
	// Sets up/down movement limits 
	camera.lowerBetaLimit = 0;
    camera.upperBetaLimit = 2;


    camera1 = new BABYLON.ArcRotateCamera("Camera1", 0, 0.8, 10, new BABYLON.Vector3.Zero(), scene);

    camera2 = new BABYLON.ArcRotateCamera("Camera2", 0, 0.8, 10, new BABYLON.Vector3.Zero(), scene);

    camera3 = new BABYLON.ArcRotateCamera("Camera3", 0, 0.8, 10, new BABYLON.Vector3.Zero(), scene);

    // This attaches the camera to the canvas
    camera.attachControl(document.getElementById("renderCanvas0"), true);


    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 0.7;

	// Set layer masks
	camera.layerMask = 1;
	camera1.layerMask = 2;
	camera2.layerMask = 4;
	camera3.layerMask = 8;
    
	BABYLON.SceneLoader.ImportMesh("", "./assets/tyrannosaurus_rex/", "scene.gltf", scene, function (newMeshes) {
		// do something with the scene ??? But what would you do ???
		for (var i = 0; i < newMeshes.length; i++){
			console.log(newMeshes[i].name);
			//newMeshes[0].scaling = new BABYLON.Vector3 (0.5,0.5,0.5);
			newMeshes[i].layerMask = 1;
		}
		var firstMesh = newMeshes[0];
		firstMesh.scaling = new BABYLON.Vector3 (0.5,0.5,0.5);
	});
		
		
	BABYLON.SceneLoader.ImportMesh("", "./assets/", "low_poly_mccree.glb", scene, function (newMeshes) {
		// do something with the scene ??? But what would you do ???	
		for (var i = 0; i < newMeshes.length; i++){
			console.log(newMeshes[i].name);
			//newMeshes[0].scaling = new BABYLON.Vector3 (0.5,0.5,0.5);
			newMeshes[i].layerMask = 2;
		}
	});
	
	BABYLON.SceneLoader.ImportMesh("", "./assets/cute_spino/", "scene.gltf", scene, function (newMeshes) {
		// do something with the scene ??? But what would you do ???	
		for (var i = 0; i < newMeshes.length; i++){
			console.log(newMeshes[i].name);
			newMeshes[i].scaling = new BABYLON.Vector3 (2.0,2.0,2.0);
			newMeshes[i].layerMask = 4;
		}
	});
	
	BABYLON.SceneLoader.ImportMesh("", "./assets/defender-class_light_corvette/", "scene.gltf", scene, function (newMeshes) {
		// do something with the scene ??? But what would you do ???	
		for (var i = 0; i < newMeshes.length; i++){
			console.log(newMeshes[i].name);
			newMeshes[i].scaling = new BABYLON.Vector3 (0.15,0.15,0.15);
			newMeshes[i].layerMask = 8;
		}
	});
	

    scene.createDefaultEnvironment();
    
    engine.registerView(document.getElementById("renderCanvas0"), camera);
    engine.registerView(document.getElementById("renderCanvas1"), camera1);
    engine.registerView(document.getElementById("renderCanvas2"), camera2);
    engine.registerView(document.getElementById("renderCanvas3"), camera3);

    // Some animations  Need to fix this !!!! Remove 
    var alpha = 0;
    scene.registerBeforeRender(() => {
/*        camera1.radius = 10 + Math.cos(alpha) * 5;
        camera2.alpha += 0.01;
        camera3.beta = Math.cos(alpha);

        alpha += 0.01;*/
		// light.position = camera.position;
    })

    return scene;

};