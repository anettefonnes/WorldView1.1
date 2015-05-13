/**
 * Created by h139418 on 12.05.2015.
 */
"use strict;"

var FigureGenerator = angular.module('FigureGenerator', []);

FigureGenerator.factory('FigGen', function(){
    return {
        event: function(color){
            if(color === undefined){
                color = 0xffffff
            }
            return new THREE.Mesh(
                new THREE.SphereGeometry(0.5, 10,10),
                new THREE.MeshBasicMaterial({color: color})
            );
        },

        transfer: function(){
            console.log("Transfer figure is not defined ");
        },

        world: function(rad, seg){
            return new THREE.Mesh(
                new THREE.SphereGeometry(rad, seg, seg),
                new THREE.MeshPhongMaterial({
                    map:            THREE.ImageUtils.loadTexture('img/earth.jpg'),
                    bumpMap:        THREE.ImageUtils.loadTexture('img/bump.jpg'),
                    bumpScale:      2,
                    specularMap:    THREE.ImageUtils.loadTexture('img/water.png'),
                    specular:       new THREE.Color('grey')
                })
            );
        },
        universe: function(){
            return new THREE.Mesh(
                new THREE.SphereGeometry(1000, 300, 300),
                new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture('img/stars.png'),
                    side: THREE.BackSide })
            );
        }
    }
});
