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

        //TODO - When hub sends event.id, activate check for exisiting event
        link: function ($scope, $element, $attrs) {
            $scope.createEvent = function (event) {
                //if(!$scope.list[event.id]) {
                    $scope.size = parseInt($attrs.size) / 100;
                    if (event.geolocation) {
                        if (event.geolocation.hasValue) {
                            event.mesh = FigGen.event($scope.size, $attrs.color);
                            if ($attrs.glow) {
                                event.mesh.add(FigGen.eventGlow(($scope.size + 0.5), $attrs.glow, ($attrs.opacity ? $attrs.opacity : 50)));
                            }
                            event.mesh.position.copy($scope.vector(event.geolocation.latitude, event.geolocation.longitude));
                            Model.world.add(event.mesh);
                            $scope.list[event.id] = event;
                        }
                    }
                /*}
                else{
                    console.error("Event " + event.id + " already exist - use update or delete event first!");
                }*/
            };

            $scope.updateEvent = function(event){
                if($scope.list[event.id]){
                    if (event.geolocation && event.geolocation.hasValue) {
                        $scope.list[event.id].mesh.position.copy($scope.vector(event.geolocation.latitude, event.geolocation.longitude));
                    }
                    else{
                        console.log("Event " + event.id + " has nothing to update");
                    }
                }
                else{
                    console.error("Event " + event.id + " does not exist, u need to create it first!");
                }
            };


            //TODO needs to be tested for memory leaks
            $scope.deleteEvent = function (event) {
                if ($scope.list[event.id]) {
                    Model.world.getObjectById($scope.list[event.id].mesh.id).geometry.dispose();
                    Model.world.getObjectById($scope.list[event.id].mesh.id).material.dispose();
                    Model.world.remove(Model.world.getObjectById($scope.list[event.id].mesh.id));
                    $scope.list[event.id].mesh.material.dispose();
                    $scope.list[event.id].mesh.geometry.dispose();
                    $scope.list[event.id] = null;
                    delete $scope.list[event.id];

                }
            };


            $scope.$root.$on($attrs.addevent, function (value, prelead) {
                $scope.createEvent(prelead);
            });
            $scope.$root.$on($attrs.deleteevent, function (value, prelead) {
                $scope.deleteEvent(prelead);
            });
            $scope.$root.$on($attrs.updateevent, function (value, prelead) {
                $scope.updateEvent(prelead);
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

            // TODO - complete this without fuckups =)
            $scope.updateTransfer = function (event) {
                if ($scope.list[event.id]) {
                    if (event.progress != $scope.list[event.id].progress && event.progress >= 0 && event.progress <= 100) {
                        $scope.list[event.id].particle.geometry.vertices[0] = $scope.list[event.id].points[event.progress];
                        $scope.list[event.id].particle.geometry.verticesNeedUpdate = true;
                    }

                }
            };

            //TODO - Define this
            $scope.deleteTransfer = function (event) {
                if ($scope.list[event.id]) {
                    //delete
                }
            };



            $scope.$root.$on($attrs.addtransfer, function (value, transfer) {
                $scope.deleteEvent(transfer);
            });
            $scope.$root.$on($attrs.updateevent, function (value, transfer) {
                $scope.deleteEvent(transfer);
            });
            $scope.$root.$on($attrs.deletetransfer, function (value, transfer) {
                $scope.deleteEvent(transfer);
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
