"use strict";

var Space = angular.module('SpaceHandler',['FigureGenerator','ViewHandler']);

Space.directive('space', function(){
    return{
        restrict: 'E',
        scope: {},
        controller: function($scope, FigGen, Model){
            $scope.createUniverse = FigGen.universe;
            $scope.model = Model;
        },
        link: function($scope, $element, $attrs){
            $scope.model.universe = $scope.createUniverse($attrs.size, $attrs.segments, $attrs.texture);
            $scope.model.scene.add($scope.model.universe);
            $scope.model.scene.add(new THREE.AmbientLight(parseInt($attrs.light)));

            if($attrs.rotation) {
                $scope.model.animations.push(function () {
                    $scope.model.universe.rotation.y += ($attrs.rotation / 1000);
                });
            }
        }


    }
})

/**
 * Created by Christer on 15.05.2015.
 */