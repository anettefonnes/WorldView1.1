"use strict";

var HubHandler = angular.module('HubHandler',[]);

HubHandler.factory('Hub', function (){
    return {
        access: "",
        list: {},
        //connection: $.hubConnection('http://wtnews.cloudapp.net:8080'),
        connectToServer: function(){
            this.connection.qs = {Bearer: this.access};
            this.connection.logging = true;
            this.connection.start().fail(function (err) {
                console.log(err);
            });
        },
        setUpHub: function (name) {
            this.list[name] = this.connection.createHubProxy(name);
        }
    };
});

HubHandler.directive('hub',function(){
    return {
        restrict: 'E',
        controller: function($scope, Hub){
            Hub.connection = $.hubConnection('http://wtnews.cloudapp.net:8080');
        }
    }
});

HubHandler.controller('HubCtrl', ['$scope', 'Hub', function($scope, Hub){
    $scope.Hub = Hub;
}]);

/**
 * Created by Christer on 18.05.2015.
 */
