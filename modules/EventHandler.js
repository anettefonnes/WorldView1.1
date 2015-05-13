/**
 * Created by h139418 on 12.05.2015.
 */
"use strict;"

var Event = angular.module('EventHandler', ['WorldHandler', 'GeoParser', 'FigureGenerator']);

Event.factory('Events', ['World', 'GeoParser', 'FigGen', function(World, GeoParser, FigGen){
    return{
        list: {},
        computeVector: function(la,lo){
            return GeoParser(la,lo, World.radius);
        },
        add: function(event){
            var pos = this.computeVector(event.la, event.lo);
            if(this.list[event.id] === undefined){
                this.list[event.id] = FigGen.event(event.color);
            }
            this.list[event.id].position.copy(pos);
            World.world.add(this.list[event.id]);
        },
        remove: function(event) {
            if (!this.list[event.id]) {
                WorldView.world.remove(Events.list[event.id])
                delete this.list[event.id];
            }
            console.log("Cannot find any event on id : " + event.id);
        }
    };
}]);


//TODO : create UpdateEvent method


