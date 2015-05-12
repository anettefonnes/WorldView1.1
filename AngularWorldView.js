"use strict";

var WorldView = angular.module('WorldView', []);

//TODO new canvas for each renderer?
// Models of the scene
WorldView.factory('WorldView', function(){
    return{
        renderer: new THREE.WebGLRenderer(),
        scene: new THREE.Scene(),
        camera: undefined,
        world: undefined,
        animations: []
    }
});

// ELEMENTS
WorldView.directive('worldview', function(){
    return {
        restrict: "E",
        scope:{},
        controller: function($scope, $element, WorldView){

            //Debugging log
            console.log("WorldView Controller running");
            /**
             * WorldView Directive API
             *
             */

            /**
             * Setting Variables for the renderer and domElement it contains
             * Also setting the Model WorldView to the scope
             * adds a css class to the element <worldview> with class"world-view"
             * ends with adding a star - making possibility for simulating monthly phases
             */
            $scope.WorldView = WorldView;
            $element.addClass("world-view");
            $element.append(WorldView.renderer.domElement);


            WorldView.star = new THREE.DirectionalLight(0xffffff, 0.3);
            WorldView.star.position.set(200,0,500);
            WorldView.scene.add(WorldView.star);


            /**
             * Scene configuration
             *
             * Initializes and sets the ambient light
             * Sets a background to the scene - class directive? or use word-view DOM class - set from the
             * TODO : variable the ambient light through a directive?
             * TODO : set correct aspects to the renderer canvas conserning the liquid window
             * TODO : get texture for background variabled
             *
             *
             **/

            //Adds Background sphere
            WorldView.scene.add( new THREE.Mesh(
                    new THREE.SphereGeometry(1000, 300, 300),
                    new THREE.MeshBasicMaterial({
                        map: THREE.ImageUtils.loadTexture('img/stars.png'),
                        side: THREE.BackSide })));



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


        link: function($scope, $element, $attri){
            console.log("Element Directory Link");
            console.log($scope);
            console.log($element);
            console.log($attri);
            console.log(" ");

            $scope.animate = $scope.requestUpdate($scope.WorldView);
            $scope.animate();
        } // Makes the directive animate the scene onto the canvas child element
    }
});


// ATTRIBUTE CONTROLLERS
WorldView.directive('world', function(){
    return{
        require: "worldview",
        controller: function($scope, $element, WorldView){

            console.log("World Controller running");

            WorldView.world  = new THREE.Mesh(
                new THREE.SphereGeometry(100, 300, 300),
                new THREE.MeshPhongMaterial({
                    map:            THREE.ImageUtils.loadTexture('img/earth.jpg'),
                    bumpMap:        THREE.ImageUtils.loadTexture('img/bump.jpg'),
                    bumpScale:      2,
                    specularMap:    THREE.ImageUtils.loadTexture('img/water.png'),
                    specular:       new THREE.Color('grey')
                })
            );

            WorldView.world.name = "earth";
            WorldView.scene.add(WorldView.world);

            WorldView.animations.push(function (){
                WorldView.world.rotation.y += 0.001;
            });

            this.addToWorld = WorldView.world.add;
        },

        link:function($scope, $element, $attr, viewCtrl){
            viewCtrl.addElement = $scope.addToWorld;


            console.log("World Directory Link");
            console.log($scope);
            console.log($element);
            console.log($attr);
            console.log(viewCtrl);
            console.log("");

            }

        }

});
WorldView.directive('camera', function(){
    return {
        controller: function($scope, $element, WorldView){
            console.log("Camera Controller running");
            WorldView.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,1 , 10000);
            WorldView.camera.position.setZ(300);
            WorldView.scene.add(WorldView.camera);
        }
    }
});


/**

WorldView.directive('', function() {
    return {
        controller: function ($scope, WorldView){}
    }
});

 * Created by Christer on 05.05.2015.
 */