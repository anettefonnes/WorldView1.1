/**
 * Created by h139418 on 12.05.2015.
 */
"use strict";

var Event = angular.module('EventHandler', ['WorldHandler', 'GeoParser', 'FigureGenerator']);

Event.directive('event', function (FigGen, Model) {
    return {
        restrict: 'E',
        scope: {},
        controller: function ($scope, GeoParser) {
            $scope.list = [];
            $scope.vector = GeoParser.getParser(Model.worldRadius);


        },
        link: function ($scope, $element, $attrs) {
            $scope.createEvent = function (event) {
                if (event.geolocation) {
                    if (event.geolocation.hasValue) {
                        event.Mesh = FigGen.event($attrs.size, $attrs.color);
                        event.Mesh.position.copy($scope.vector(event.geolocation.latitude, event.geolocation.longitude));
                        Model.world.add(event.Mesh);
                        $scope.list[event.id] = event;
                    }
                }
            };
            $scope.$root.$on($attrs.addevent, function (value, prelead) {
                $scope.createEvent(prelead);
            });
        }
    }
});

Event.directive('transfer', function (FigGen, Model) {
    return {
        restrict: 'E',
        scope: {},
        controller: function ($scope, GeoParser) {
            $scope.list = [];
            $scope.vector = GeoParser.getParser(Model.worldRadius);
            $scope.anchor = GeoParser.getBezierPoints(Model.worldRadius);


        },
        link: function ($scope, $element, $attrs) {
            $scope.createTransfer = function (event) {
                if (event.toGeolocation.hasValue && event.fromGeolocation.hasValue) {

                    //Gets the start and end point on world
                    event.start = $scope.vector(event.fromGeolocation.latitude, event.fromGeolocation.longitude);
                    event.end = $scope.vector(event.toGeolocation.latitude, event.toGeolocation.longitude);

                    //Generate the anchor points for the transferring line
                    event.anchors = $scope.anchor(event);


                    event.splineA = new THREE.CubicBezierCurve3(event.start, event.anchors.startAnch, event.anchors.startA, event.anchors.midPoint);
                    event.splineB = new THREE.CubicBezierCurve3(event.anchors.midPoint, event.anchors.endB, event.anchors.endAnch, event.end);

                    event.points = event.splineA.getPoints(50);
                    event.points = event.points.splice(0, event.points.length - 1);
                    event.points = event.points.concat(event.splineB.getPoints(50));


                    // Line - Creates the mesh and adds it to the world
                    event.mesh = FigGen.transfer($attrs.color, event.splineA, event.splineB);
                    Model.world.add(event.mesh);


                    // Particle - computes the position, and adds the
                    if (!event.progress) {
                        event.progress = 0;
                    }
                    event.particleGeometry = new THREE.Geometry();

                    event.particleGeometry.vertices.push(event.points[event.progress].clone());


                    event.particle = FigGen.particle($attrs.particlecolor, event.particleGeometry);
                    event.particle.sortParticles = true;
                    event.particle.dynamic = true;

                    event.mesh.add(event.particle);
                    $scope.list[event.id] = event;


                }
            };

            $scope.updateTransfer = function (event) {
                if ($scope.list[event.id]) {
                    if (event.progress != $scope.list[event.id].progress && event.progress >= 0 && event.progress <= 100) {
                        $scope.list[event.id].particle.geometry.vertices[0] = $scope.list[event.id].points[event.progress];
                        $scope.list[event.id].particle.geometry.verticesNeedUpdate = true;
                    }

                }
            };

            //        $scope.$root.$on($attrs.addTransfer, $scope.createTransfer(data, transferEvent));
            $scope.createTransfer({
                id: 'afganTobergen',
                progress: 50,
                fromGeolocation: {
                    hasValue: true,
                    latitude: 34,
                    longitude: 38
                },
                toGeolocation: {
                    hasValue: true,
                    latitude: 60,
                    longitude: 5
                }
            });
            $scope.createTransfer({
                id: 'madridvsbarcelona',
                progress: 0,
                fromGeolocation: {
                    hasValue: true,
                    latitude: 40,
                    longitude: -3
                },
                toGeolocation: {
                    hasValue: true,
                    latitude: 60,
                    longitude: 5
                }
            });

            $scope.num = 0;
            $scope.test = function () {
                $scope.num++;
                if($scope.num == 110){
                    $scope.num = 0;
                }
                $scope.updateTransfer({
                    id: 'madridvsbarcelona',
                    progress: $scope.num
                })
            };
            window.setInterval($scope.test, 100);
        }
    }
});
