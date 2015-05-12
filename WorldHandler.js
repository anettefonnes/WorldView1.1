/**
 * Created by h139418 on 12.05.2015.
 */
"use strict;"

var world = angular.module('WorldHandler', ['WorldView', 'FigureGenerator']);

world.factory('World', function(WorldView, FigGen){

    var rad = 100;
    var world = FigGen.world(rad,300);
    world.name = "earth";
    WorldView.scene.add(world);

    return{
        radius : rad,
        world : world
    }
});

world.controller('WorldCtrl',['WorldView', 'World', function(WorldView, World){
    WorldView.animations.push(function () {
        World.world.rotation.y += 0.001;
    });
}]);

/**
 * TODO: Make a rotation function
 *
    WorldView.animations.push(function () {
        WorldView.world.rotation.y += 0.001;
    });
 */
