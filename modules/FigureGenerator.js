"use strict";

var FigureGenerator = angular.module('FigureGenerator', []);

FigureGenerator.factory('FigGen', function () {
    function prefixColor(color) {
        if (!color) {
            color = 0xffffff
        }
        if (typeof color == "string") {
            color = parseInt(color);
        }
        return color;
    }

    function prefixOpacity(opacity) {
        if (!opacity) {
            opacity = 50
        }
        if (typeof color == "string") {
            opacity = parseInt(color);
        }
        return (opacity / 100);
    }

    return {
        event: function (size, color) {
            color = prefixColor(color);
            return new THREE.Mesh(
                new THREE.SphereGeometry(size, 10, 10),
                new THREE.MeshBasicMaterial({color: color})
            );
        },
        eventGlow: function (size, color, opacity) {
            opacity = prefixOpacity(opacity);
            color = prefixColor(color);
            return new THREE.Mesh(
                new THREE.SphereGeometry(size, 10, 10),
                new THREE.MeshBasicMaterial({
                    color: color,
                    transparent: true,
                    opacity: opacity
                })
            )
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

        particle: function (color) {
            color = prefixColor(color);
            return new THREE.PointCloud(
                new THREE.Geometry(),
                new THREE.PointCloudMaterial({
                    color: color,
                    size: 50,
                    map: THREE.ImageUtils.loadTexture("img/map_mask.png"),
                    blending: THREE.NormalBlending,
                    transparent: true
                })
            );
        },
        clouds: function (rad, seg, texture) {
            return new THREE.Mesh(
                new THREE.SphereGeometry((rad + 0.2), seg, seg),
                new THREE.MeshPhongMaterial({
                    map: THREE.ImageUtils.loadTexture(texture), //
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
            return new THREE.DirectionalLight(color, size).add(new THREE.Mesh(
                new THREE.SphereGeometry(size*10, 250, 250),
                new THREE.MeshBasicMaterial({color: color})));
        },
        universe: function (rad, seg, texture) {
            return new THREE.Mesh(
                new THREE.SphereGeometry(rad, seg, seg),
                new THREE.MeshBasicMaterial({
                    map: THREE.ImageUtils.loadTexture(texture), // 'img/stars.png'
                    side: THREE.BackSide,
                    opacity: 0.4,
                    transparent: true
                })
            );
        }
    }
});

/**
 * Created by h139418 on 12.05.2015.
 */