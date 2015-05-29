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
                if (event.geolocation.hasValue) {
                    event.Mesh = FigGen.event($attrs.size, $attrs.color);
                    event.Mesh.position.copy($scope.vector(event.geolocation.latitude, event.geolocation.longitude));
                    Model.world.add(event.Mesh);
                    $scope.list[event.id] = event;
                }
            };

            $scope.createEvent({/* Defined Point event */});

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


                    /*                     event.particleVec = {};
                     event.particleVec.current = event.progress;
                     event.particleVec.to = event.progress;
                     event.particleVec.nextIndex = event.progress + 1;
                     event.particleVec.lerpN = 0;
                     event.particleVec.path = event.points;
                     event.particle.geometry.vertices[0].update = function (progress) {
                     this.lerpN += 0.05;
                     if (this.lerpN > 1) {
                     this.lerpN = 0;
                     this.current = this.nextIndex;
                     this.nextIndex++;
                     this.position.x = particle.x;
                     obj.position.y = particle.y;
                     obj.position.z = particle.z;            //When particle is at the end of the path, change the linecolor to green. (first iteration only)
                     if (particle.nextIndex >= progress) {
                     particle.moveIndex = 0;
                     particle.nextIndex = 1;
                     line.material.color = new THREE.Color(0, 255, 0);
                     line.material.colorsNeedUpdate = true;
                     }
                     };

                     var currentPoint = path[particle.moveIndex];
                     var nextPoint = path[particle.nextIndex];
                     particle.copy(currentPoint);
                     particle.lerp(nextPoint, particle.lerpN);

                     this.geometry.verticesNeedUpdate = true;
                     */
                    event.mesh.add(event.particle);
                    $scope.list[event.id] = event;


                }
            };

            $scope.updateTransfer = function (event) {
                if($scope.list[event.id]){
                    if (event.progress != $scope.list[event.id].progress && event.progress >= 0 && event.progress <= 100) {
                        $scope.list[event.id].particle.geometry.vertices[0] = $scope.list[event.id].points[event.progress];
                        $scope.list[event.id].particle.geometry.verticesNeedUpdate = true;
                    }

                }
            };

    //        $scope.$root.$on($attrs.addTransfer, $scope.createTransfer(data, transferEvent));
            $scope.createTransfer({
                id: 'Test1',
                progress: 50,
                fromGeolocation: {
                    hasValue: true,
                    latitude: 60,
                    longitude: -90
                },
                toGeolocation: {
                    hasValue: true,
                    latitude: 0,
                    longitude: -90
                }
            });
            $scope.createTransfer({
                id: 'Test2',
                progress: 0,
                fromGeolocation: {
                    hasValue: true,
                    latitude: 60,
                    longitude: -90
                },
                toGeolocation: {
                    hasValue: true,
                    latitude: 90,
                    longitude: -90
                }
            });

            $scope.num = 0;
            $scope.test = function () {
                $scope.num++;
                $scope.updateTransfer({
                    id: 'Test2',
                    progress: $scope.num
                })
            };
            window.setInterval($scope.test, 100);
        }
    }
});
