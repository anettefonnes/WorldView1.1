"use strict";

var world = angular.module('WorldHandler', ['FigureGenerator', 'ViewHandler']);

world.directive('world', function(FigGen, Model, Camera){
    return{
        restrict: 'E',
        scope: {},
        controller: function($scope){
        },
        link:function($scope, $element, $attrs){
            Model.world = FigGen.world($attrs.rad, $attrs.seg, $attrs.texture);
            Model.scene.add(Model.world);
            if($attrs.clouds){
                Model.world.add(FigGen.clouds(parseInt($attrs.rad), parseInt($attrs.seg), $attrs.clouds));
            }
            Model.worldRadius = $attrs.rad;
            Model.world.add(Model.star);

            if($attrs.rotation){
                Model.animations.push(function() {
                    Model.world.rotation.y += ($attrs.rotation / 1000);
                })
            }
        }
    }
});

/**
 * Created by h139418 on 12.05.2015.
 */