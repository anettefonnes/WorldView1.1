"use strict";

var FigureGenerator = angular.module('FigureGenerator', []);

FigureGenerator.factory('FigGen', function(){
    return {
        event: function(size, color){
            if(!color){
                color = 0xffffff
            }
            return new THREE.Mesh(
                new THREE.SphereGeometry(size, 10,10),
                new THREE.MeshBasicMaterial({color: color})
            );
        },

        transfer: function(){
            console.log("Transfer figure is not defined ");
        },

        world: function(rad, seg, texture){
            return new THREE.Mesh(
                new THREE.SphereGeometry(rad, seg, seg),
                new THREE.MeshPhongMaterial({
                    map:            THREE.ImageUtils.loadTexture(texture),
                    bumpMap:        THREE.ImageUtils.loadTexture('img/bump.jpg'),
                    bumpScale:      2,
                    specularMap:    THREE.ImageUtils.loadTexture('img/water.png'),
                    specular:       new THREE.Color('grey')
                })
            );
        },
        star: function(color, size){
            return new THREE.DirectionalLight(color, size);
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

/**
 * Created by h139418 on 12.05.2015.
 */