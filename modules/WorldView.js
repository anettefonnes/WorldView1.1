"use strict";

var WorldView = angular.module('WorldView', ['ViewHandler','WorldHandler','StarHandler','SpaceHandler', 'HubHandler' ,'EventHandler','Login']);



WorldView.directive('worldview', function(){
    return {
        restrict: 'E',
        controller: function(){



            /*
            Login.login();

            Hub.setUpHub("preleadHub");
            Hub.list["preleadHub"].on('onNewPrelead', function (JSON) {
                var newEvent;
                if(JSON.prelead.geolocation.hasValue) {
                    newEvent = {};
                    Event.id = JSON.prelead.oid;
                    newEvent.la = JSON.prelead.geolocation.latitude;
                    newEvent.lo = JSON.prelead.geolocation.longitude;
                }
                if(newEvent){
                    Events.add(newEvent);
                }
                JSON = undefined;
            });
            */
        }
    }
});

/**
 * Created by Christer on 05.05.2015.
 */