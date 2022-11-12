var engine = null;
var scene = null;
var sceneToRender = null;
var createDefaultEngine = function() { return new BABYLON.Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true,  disableWebGL2Support: false}); };
var createScene = function () {
        
            var scene = new BABYLON.Scene(engine);
            scene.createDefaultCamera(true);
        
            // Load the model
            BABYLON.SceneLoader.Append("https://www.babylonjs.com/Assets/NeonPipe/glTF/", "NeonPipe.gltf", scene, function (meshes) {
                var gl = new BABYLON.GlowLayer("glow", scene, { 
                    mainTextureFixedSize: 256,
                    blurKernelSize: 64
                });
        
                // Create a camera pointing at your model.
                scene.createDefaultCameraOrLight(true, true, true);
                
                var helper = scene.createDefaultEnvironment();
                helper.setMainColor(BABYLON.Color3.Gray());
            });
        
            return scene;
        };
                window.initFunction = async function() {
                    
                    
                    var asyncEngineCreation = async function() {
                        try {
                        return createDefaultEngine();
                        } catch(e) {
                        console.log("the available createEngine function failed. Creating the default engine instead");
                        return createDefaultEngine();
                        }
                    }

                    window.engine = await asyncEngineCreation();
        if (!engine) throw 'engine should not be null.';
        startRenderLoop(engine, canvas);
        window.scene = createScene();};
        initFunction().then(() => {sceneToRender = scene                    
        });
