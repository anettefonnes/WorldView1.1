"use strict";

var HubHandler = angular.module('HubHandler',[]);
/*
HubHandler.factory('Token', function(){
   return{
       token: ""
   }
});

HubHandler.factory('Hub', function (){
    return {
        access: "",
        list: {},
        //connection: $.hubConnection('http://wtnews.cloudapp.net:8080'),
        connectToServer: function(){

            this.connection.start().fail(function (err) {
                console.log(err);
            });
        },
        setUpHub: function (name) {
            this.list[name] = this.connection.createHubProxy(name);
        }
    };
});
*/

HubHandler.directive('hub',function(){
    return {
        restrict: 'E',
        controller: function($scope){
            $scope.$on('token', function(){
                $scope.hubServer.qs = {Bearer: $scope.token};
                $scope.hubServer.logging = true;
                $scope.hubServer.start().fail(function (err) {
                    console.log(err);
                });
            });

        },
        link:function($scope, $element, $attrs){
            $scope.hubServer = $.hubConnection($attrs.url);

            $scope.$on('hub', functionm)
        }
    }
});

/**
 * Created by Christer on 18.05.2015.
 */
