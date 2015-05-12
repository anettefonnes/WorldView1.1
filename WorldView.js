"use strict";

var WorldView = angular.module('WorldView', ['GeoParser', 'FigureGenerator']);

//TODO new canvas for each renderer?
// Models of the scene
WorldView.factory('WorldView', function(){
    return{
        renderer: new THREE.WebGLRenderer(),
        scene: new THREE.Scene(),
        camera: undefined,
        animations: []
    }
});

// ELEMENTS
WorldView.directive('worldview', function(){
    return {
        restrict: "E",
        scope:{},

        /**
         * WorldView Controller
         *
         * Configure the renderer and the DOM-Element it contains
         * Sets the Model WorldView to the scope
         * Adds a css class to the element <worldview> with class"world-view"
         * Adds a star to the factory - making possibility for simulating monthly phases
         *
         * TODO : variable the ambient light through a directive?
         * TODO : set correct aspects to the renderer canvas conserning the liquid window
         * TODO : get texture for background variabled
         *
         *
         * @param $scope
         * @param $element
         * @param WorldView
         */
        controller: function($scope, $element, WorldView, FigGen){

            $scope.WorldView = WorldView;
            $element.append(WorldView.renderer.domElement);


            WorldView.renderer.setSize(window.innerWidth,window.innerHeight);
            window.addEventListener("resize", function(){
                WorldView.renderer.setSize((window.innerWidth) , (window.innerHeight));
            }, false);


            WorldView.star = new THREE.DirectionalLight(0xffffff, 0.3);
            WorldView.star.position.set(200,0,500);
            WorldView.scene.add(WorldView.star);
            WorldView.scene.add( FigGen.universe());
            WorldView.scene.add(new THREE.AmbientLight(0xe0e0e0));


            $scope.requestUpdate = function (view) {  // Adds the scene model "WorldView" to the animation loop
                return function request() {

                    for(var i = 0; i < view.animations.length; i++){
                        view.animations[i]();
                    }

                    view.renderer.render(view.scene, view.camera);
                    requestAnimationFrame(request);
                }
            }
        },

        /**
         * Link Behaviour
         * @param $scope
         * @param $element
         * @param $attri
         */
        link: function($scope){

            $scope.animate = $scope.requestUpdate($scope.WorldView);
            $scope.animate();
        } // Makes the directive animate the scene onto the canvas child element
    }
});


// ATTRIBUTE CONTROLLERS

WorldView.directive('camera', function(){
    return {
        controller: function($scope, $element, WorldView){
            WorldView.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,1 , 10000);
            WorldView.camera.position.setZ(300);
            WorldView.scene.add(WorldView.camera);

            window.addEventListener("resize", function(){
                WorldView.camera.aspect = (window.innerWidth) / (window.innerHeight);
                WorldView.camera.updateProjectionMatrix();
            }, false);
        }
    }
});


/**
 * Created by Christer on 05.05.2015.
 */