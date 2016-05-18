var scene_init = false,
	renderer,
	scene,
	camera,
	pole;


$(document).ready(function(){
	var results = checkSpeed(function(results_returned) {
		console.log("application - results: " + results_returned);
	});
	
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 1, 1000 );
	
	renderer = new THREE.WebGLRenderer();
	renderer.setClearColor( 0x8d8d8d );
	renderer.setSize( window.innerWidth, window.innerHeight );
	
	scene_init = true;
	
	var ambient = new THREE.AmbientLight( 0xffffff );
	ambient.intensity = 1.2;
	
	scene.add(ambient);
	
	var light = new THREE.DirectionalLight( 0xffffff );
	light.intensity = 5;
	
/*
	light.castShadow = true;
	light.shadowCameraVisible = true;
	light.shadowCameraTop = 2000;
	light.shadowCameraBottom = -2000;
	light.shadowCameraRight = 2000;
	light.shadowCameraLeft = -2000;
	light.shadowCameraFov = 45;
	light.shadowMapWidth = _shadowMapWidth;
	light.shadowMapHeight = _shadowMapHeight;
	light.shadowMapBias = 0.0039;
	light.shadowMapDarkness = 0.05;
	light.shadowDarkness = 0.25;
	light.shadowBias = 0.001;
	light.shadowCameraNear = 0;
	light.shadowCameraFar = 2500;
	scene.add(light);
*/
	
	$('.content').append(renderer.domElement);
	
	var geometry = new THREE.BoxGeometry( 1, 1, 1 );
	var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	
	//scene.add( cube );
	
	// model

	var onProgress = function ( xhr ) {
		if ( xhr.lengthComputable ) {
			var percentComplete = xhr.loaded / xhr.total * 100;
			console.log( Math.round(percentComplete, 2) + '% downloaded' );
		}
	};

	var onError = function ( xhr ) { };

	THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

	var mtlLoader = new THREE.MTLLoader();
	mtlLoader.setBaseUrl( 'http://localhost:8080/obj/' );
	mtlLoader.setPath( '/obj/' );
	mtlLoader.load( 'pole.mtl', function( materials ) {

		materials.preload();

		var objLoader = new THREE.OBJLoader();
		objLoader.setMaterials( materials );
		objLoader.setPath( '/obj/' );
		objLoader.load( 'pole.obj', function ( object ) {

			object.position.y = -2.5;
			object.position.z = -3;
			object.name = "pole";
			scene.add( object );
			pole = scene.getObjectByName( "pole" );
		}, onProgress, onError );

	});

	//
	
	camera.position.z = 5;
	
	var render = function () {
		requestAnimationFrame( render );
		//cube.rotation.y += 0.01;
		pole.rotation.y += 0.05;
		
		renderer.render(scene, camera);
	};
	
	render();
});

$(window).resize(function() {
	if(scene_init) {
		camera.aspect = window.innerWidth / window.innerHeight;
	    camera.updateProjectionMatrix();
	    renderer.setSize( window.innerWidth, window.innerHeight );
    }
});