"use strict";

var world = angular.module('WorldHandler', ['FigureGenerator', 'ViewHandler']);

world.directive('world', function(){
    return{
        restrict: 'E',
        scope: {},
        controller: function($scope, FigGen, Model){
            $scope.createWorld = FigGen.world;
            $scope.model = Model;
        },
        link:function($scope, $element, $attrs){
            $scope.model.world = $scope.createWorld($attrs.rad, $attrs.seg, $attrs.texture);
            $scope.model.scene.add($scope.model.world);
            $scope.model.worldRadius = $attrs.rad;

            if($attrs.rotation){
                $scope.model.animations.push(function() {
                    $scope.model.world.rotation.y += ($attrs.rotation / 1000);
                })
            }
        }
    }
});

/**
 * Created by h139418 on 12.05.2015.
 */