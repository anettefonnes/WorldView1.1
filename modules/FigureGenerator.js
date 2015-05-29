"use strict";

var FigureGenerator = angular.module('FigureGenerator', []);

FigureGenerator.factory('FigGen', function () {
    function prefixColor(color){
        if (!color) {
            color = 0xffffff
        }
        if (typeof color == "string") {
            color = parseInt(color);
        }
        return color;
    }
    return {
        event: function (size, color) {
            color = prefixColor(color);
            return new THREE.Mesh(
                new THREE.SphereGeometry(size, 10, 10),
                new THREE.MeshBasicMaterial({color: color})
            );
        },

        transfer: function (color, splineA, splineB) {
            color = prefixColor(color);
            var mesh = new THREE.Mesh(
                new THREE.TubeGeometry(splineA, 50, 0.18, 8, false),
                new THREE.MeshBasicMaterial({color: new THREE.Color(color)}));
            mesh.add(new THREE.Mesh(
                new THREE.TubeGeometry(splineB, 50, 0.18, 8, false),
                new THREE.MeshBasicMaterial({color: new THREE.Color(color)})));
            return mesh;
        },


        particle: function (color, geom) {
            color = prefixColor(color);
            return new THREE.PointCloud(
                geom,
                new THREE.PointCloudMaterial({
                    color: new THREE.Color(color),
                    size: 50,
                    map: THREE.ImageUtils.loadTexture("img/map_mask.png"),
                    blending: THREE.AdditiveBlending,
                    transparent: true
                })
            );
        },
        world: function (rad, seg, texture) {
            return new THREE.Mesh(
                new THREE.SphereGeometry(rad, seg, seg),
                new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture(texture),
                    bumpMap: THREE.ImageUtils.loadTexture('img/bump.jpg'),
                    bumpScale: 2,
                    specularMap: THREE.ImageUtils.loadTexture('img/water.png'),
                    specular: new THREE.Color('grey')
                })
            );
        },
        star: function (color, size) {
            return new THREE.DirectionalLight(color, size);
        },
        universe: function () {
            return new THREE.Mesh(
                new THREE.SphereGeometry(1000, 300, 300),
                new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture('img/stars.png'),
                    side: THREE.BackSide
                })
            );
        }
    }
});

/**
 * Created by h139418 on 12.05.2015.
 */