"use strict";

var world = angular.module('WorldHandler', ['FigureGenerator', 'ViewHandler']);

world.factory('World', ['FigGen',function(FigGen){

    var rad = 100;
    var world = FigGen.world(rad,300);
    world.name = "world";

    return{
        object: world,
        radius: rad,
        rotation : 0.001,
        add: world.add,
    }
}]);

world.directive('world', function(){
    return{
        restric: 'A',
        require: 'view',
        controller: function($scope,World, View){

        }
    }
});

/**
 * Created by h139418 on 12.05.2015.
 */