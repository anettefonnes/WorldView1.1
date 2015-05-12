/**
 * Created by h139418 on 12.05.2015.
 */
"use strict;"

var Event = angular.module('EventHandler', ['WorldHandler', 'GeoParser', 'FigureGenerator']);

Event.factory('Events', function(GeoParser){
    return{
        list: {},
        computeVector: function(la,lo){
            return GeoParser(la,lo, 100);
        }
    };
});


//TODO : create UpdateEvent method
Event.controller('EventCtrl',function(World, Events, FigGen){

    Events.addEvent = function(event){
        var pos = Events.computeVector(event.la, event.lo);
        if(Events.list[event.id] === undefined){
            Events.list[event.id] = FigGen.event(event.color);
        }
        Events.list[event.id].position.copy(pos);

        World.world.add(Events.list[event.id]);
    };

    Events.deleteEvent = function(event){
        if(Events.list[event.id] !== undefined) {
            WorldView.world.remove(Events.list[event.id])
            Events.list[event.id] = undefined;
        }
        console.log("Cannot find any event on id : " + event.id);
    };



});

