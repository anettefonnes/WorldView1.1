/**
 * Created by h139418 on 12.05.2015.
 */
"use strict";

var Event = angular.module('EventHandler', ['WorldHandler', 'GeoParser', 'FigureGenerator']);

Event.factory('Events', ['World', 'GeoParser', 'FigGen', function(World, GeoParser, FigGen){
    var computer = GeoParser.getParser(World.radius);
    return{
        list: {},

        add: function(event){
            var pos = computer(event.la,event.lo);
            if(this.list[event.id] === undefined){
                this.list[event.id] = FigGen.event(event.color);
            }
            this.list[event.id].position.copy(pos);
            World.object.add(this.list[event.id]);
        },
        update: function(event){
            //Update event logi
        },
        remove: function(event) {
            if (!this.list[event.id]) {
                World.object.remove(Events.list[event.id])
                delete this.list[event.id];
            }
            console.log("Cannot find any event on id : " + event.id);
        }
    };
}]);




