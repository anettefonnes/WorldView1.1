"use strict";

var Space = angular.module('SpaceHandler',['FigureGenerator']);

Space.factory('Space',['FigGen', function(FigGen)
{
    return{
        object: FigGen.universe(),
        rotation: 0.001,
        light: new THREE.AmbientLight(0x909090)
    };
}]);

/**
 * Created by Christer on 15.05.2015.
 */