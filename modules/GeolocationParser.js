"use strict";

var parser = angular.module('GeoParser', []);

parser.factory('GeoParser', function() {
    return {
        getParser: function (rad) {
            return function (la, lo) {
                la = Number(la).toRad();
                lo = Number(lo).toRad();
                return new THREE.Vector3(
                    rad * Math.cos(la) * Math.cos(-lo),
                    rad * Math.sin(la),
                    rad * Math.cos(la) * Math.sin(-lo)
                );
            }
        }
    }
});

/**
 * Created by h139418 on 12.05.2015.
 */

/** Converts numeric degrees to radians */
if (typeof(Number.prototype.toRad) === "undefined") {
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }
}