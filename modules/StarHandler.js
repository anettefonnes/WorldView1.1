"use strict";

var Star = angular.module('StarHandler', ['FigureGenerator']);

Star.factory('Star', ['FigGen', function(FigGen){
    var star = FigGen.star(0xffffff,  0.3);
    star.position.set(200,0,500);
    return {
        object: star,
        range: 1000
    };
}]);

/**
 * Created by Christer on 15.05.2015.
 */