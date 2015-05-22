"use strict";

var View = angular.module('ViewHandler',[]);

View.factory('Model',[function(){
    return {
        scene: new THREE.Scene(),
        animations: []
    }
}]);
View.factory('Camera', [function(){
    return new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,1 , 5000)
    
}]);

View.directive('camera', function(){
    return {
        restrict: 'A',
        require: ['view'],
        controller: ['$scope','Camera',function($scope, Camera){
            $scope.camera = Camera;
            $scope.placeCamera = function(vector, object){
                Camera.position = vector;
                Camera.lookAt(object);
            };
            $scope.updateCameraPerspective = function(width, height) {
                Camera.aspect = (width / height);
                Camera.updateProjectionMatrix();
            }
        }],
        link: function($scope, $element, $attrs){
            $scope.camera.position.setZ($attrs.camera);
        }
    }
});

View.directive('view', function () {
    return {
        restrict: 'E',

        controller: function ($scope, $element, Camera, Model) {
            //Appending the canvas to the renderer to the DOMelement

            $scope.renderer = new THREE.WebGLRenderer(),
            $element.append($scope.renderer.domElement);



            //Renderer to fit the screen - and setting it liquid to screen
            $scope.renderer.setSize(window.innerWidth, window.innerHeight);
            window.addEventListener("resize", function () {
                $scope.renderer.setSize((window.innerWidth), (window.innerHeight));
            }, false);

            var requestUpdate = function (view,camera) {  // Adds the scene model "WorldView" to the animation loop
                return function request() {

                    for(var i = 0; i < view.animations.length; i++){
                        view.animations[i]();
                    }

                    $scope.renderer.render(view.scene, camera);
                    window.setTimeout(requestAnimationFrame(request), (1000/60));
                }
            }

            $scope.animate = requestUpdate(Model, Camera);
            $scope.animate();
        }
    }
});

/**
 * Created by Christer on 14.05.2015.
 */