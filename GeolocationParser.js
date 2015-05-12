/**
 * Created by h139418 on 12.05.2015.
 */
"use stric;"

var parser = angular.module('GeoParser', []);

parser.factory('GeoParser', function(){
    return function(la, lo, rad){
        return new THREE.Vector3(
            rad * Math.cos(la) * Math.cos(lo),
            rad * Math.sin(la),
            rad * Math.cos(la) * Math.sin(lo)
        );
    };
});