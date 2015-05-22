"user strict";

var camera = angular.module('CameraHandler',[]);


camera.factory('Camera', [function(){

    return{
        object: new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,1 , 5000),
        zoom: 300
    }
}]);

camera.controller('CameraCtrl', ['$scope','Camera',function($scope, Camera){
    $scope.Camera = Camera.object;
}]);


/**
 * Created by Christer on 15.05.2015.
 */