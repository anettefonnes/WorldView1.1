/**
 * Created by h139418 on 12.05.2015.
 */
"use strict";

var Event = angular.module('EventHandler', ['WorldHandler', 'GeoParser', 'FigureGenerator']);

Event.factory('Events', ['GeoParser', 'FigGen', function(GeoParser, FigGen){
    return{
        list: {}/*,


        remove: function(event) {
            if (!this.list[event.id]) {
                World.object.remove(Events.list[event.id])
                delete this.list[event.id];
            }
            console.log("Cannot find any event on id : " + event.id);
        }
 */   };
}]);



Event.directive('events', function(){
    return{
        restrict:'E',
        scope:{},
        controller: function($scope, Model, GeoParser, FigGen){
            $scope.list = {};
            $scope.world = Model.world;
            $scope.vector = GeoParser.getParser(Model.worldRadius);
            $scope.createEvent = FigGen.event;


        },
        link: function($scope, $element, $attrs){
            $scope.add = function(id, la, lo, size, color){
                if($scope.list[id] === undefined){
                    $scope.list[id] = $scope.createEvent(size, color);
                }
                $scope.list[id].position.copy($scope.vector(la,lo));
                $scope.world.add($scope.list[id]);
            };

            $scope.remove = function(id){
                if ($scope.list[id]) {
                    $scope.world.remove($scope.list[id]);
                    $scope.list[id] = undefined;
                }else{
                    console.log("Cannot find any event on id : " + id);
                }
            }
            //TODO - Update og delete event

        }
    }
});

