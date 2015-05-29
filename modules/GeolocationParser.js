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
        },
        getBezierPoints: function(rad){
            return function(vectors){
                var anchors = {
                    midPoint : vectors.start.clone().lerp(vectors.end, 0.5)
                    };


                var dist = vectors.start.clone().sub(vectors.end).length();
                var distHalf = dist * 0.5;
                var midLength = anchors.midPoint.length();
                var scalar = 0.3;
                var anchScalar = 1.1;
                // TODO make more dynamic after word radius - for better looks on different lenght of lines
                if (dist > (rad * 1.5 )) {
                    scalar *= 2;
                    anchScalar *= 1.2;
                }

                anchors.midPoint.normalize();
                anchors.midPoint.multiplyScalar(midLength + dist * scalar);
                var normal = (new THREE.Vector3()).subVectors(vectors.start,  vectors.end);
                normal.normalize();

                anchors.startAnch = vectors.start.clone().multiplyScalar(anchScalar);
                anchors.startA = anchors.midPoint.clone().add(normal.clone().multiplyScalar(distHalf));
                anchors.endB = anchors.midPoint.clone().add(normal.clone().multiplyScalar(-distHalf));
                anchors.endAnch = vectors.end.clone().multiplyScalar(anchScalar);

                return anchors;
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