"use strict";

var View = angular.module('ViewHandler',[]);

View.factory('View',[function(){
    return {
        renderer: new THREE.WebGLRenderer(),
        scene: new THREE.Scene(),
        animations: []
    }
}]);

View.factory('Camera', [function(){

    return{
        object: new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,1 , 5000),
        zoom: 300
    }
}]);

View.controller('CameraCtrl', ['$scope','Camera',function($scope, Camera){

}]);

View.directive('view', function () {
    return {
        restrict: 'E',

        controller: function ($scope, $element, Camera, View) {
            //Appending the canvas to the renderer to the DOMelement
            $element.append(View.renderer.domElement);

            Camera.object.position.setZ(300);
            //Renderer to fit the screen - and setting it liquid to screen
            View.renderer.setSize(window.innerWidth, window.innerHeight);
            window.addEventListener("resize", function () {
                View.renderer.setSize((window.innerWidth), (window.innerHeight));
            }, false);

            var requestUpdate = function (view,camera) {  // Adds the scene model "WorldView" to the animation loop
                return function request() {

                    for(var i = 0; i < view.animations.length; i++){
                        view.animations[i]();
                    }

                    view.renderer.render(view.scene, camera.object);
                    window.setTimeout(requestAnimationFrame(request), (1000/60));
                }
            }

            $scope.animate = requestUpdate(View, Camera);
            $scope.animate();
        }
    }
});


/**
 * Created by Christer on 14.05.2015.
 */