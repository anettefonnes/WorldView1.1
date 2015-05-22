"use strict";

var WorldView = angular.module('WorldView', ['ViewHandler','WorldHandler','StarHandler','SpaceHandler','EventHandler','HubHandler', 'Login']);

WorldView.directive('worldview', function(){
    return {
        scope:{},
        restrict: 'E',

        controller: function($scope, World,Star,Space,Camera,View, Events, Hub, Login){

            // Adding World Rotation to the animation
            View.animations.push(function(){ World.object.rotation.y += World.rotation; });

            View.scene.add( World.object );
            View.scene.add( Star.object );
            View.scene.add( Space.object );
            View.scene.add( Space.light );


            /*
            Login.login();

            Hub.setUpHub("preleadHub");
            Hub.list["preleadHub"].on('onNewPrelead', function (JSON) {
                var newEvent;
                if(JSON.prelead.geolocation.hasValue) {
                    newEvent = {};
                    newEvent.id = JSON.prelead.oid;
                    newEvent.la = JSON.prelead.geolocation.latitude;
                    newEvent.lo = JSON.prelead.geolocation.longitude;
                }
                if(newEvent){
                    Events.add(newEvent);
                }
                JSON = undefined;
            });
            */
        },
    }
});

/**
 * Created by Christer on 05.05.2015.
 */