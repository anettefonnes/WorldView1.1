"use strict";

var HubHandler = angular.module('HubHandler', []);

HubHandler.factory('Hub', function () {
    return {
        proxies: [],
        connections: []
    }
});

HubHandler.factory('Token', function () {
    return {}
});

HubHandler.directive('hubconnection', function (Token) {
    return {
        restrict: 'E',
        scope: {},
        controller: function ($scope, Hub) {
            $scope.Hub = Hub;
        },

        link: function ($scope, $element, $attrs) {

            $scope.Hub.connections[$attrs.connection] = $.hubConnection($attrs.url);
            $scope.$emit($attrs.connection);
            $scope.connect = function () {
                $scope.Hub.connections[$attrs.connection].start().done(function () {
                    console.log("Connected to Hub: : " + $attrs.connection);
                    //$scope.$emit($attrs.connection);
                }).fail(function (err) {
                    console.log(err);
                });
            };

            if ($attrs.login) {
                $scope.$root.$on($attrs.login, function () {
                    console.log("Connecting to HubConnection : " + $attrs.connection);
                    $scope.Hub.connections[$attrs.connection].qs = {Bearer: Token[$attrs.login]};
                    $scope.Hub.connections[$attrs.connection].logging = true;
                    $scope.connect();
                });
            } else {
                $scope.connect();
            }
        }
    };
});

HubHandler.directive('hub', function () {
    return {
        retrict: 'E',
        scope: {},
        controller: function ($scope, Hub) {
            $scope.Hub = Hub;
        },
        link: function ($scope, $element, $attrs) {
            $scope.$root.$on($attrs.connection, function(){
                $scope.Hub.proxies[$attrs.name] = $scope.Hub.connections[$attrs.connection].createHubProxy($attrs.name);
                $scope.Hub.proxies[$attrs.name].on($attrs.addevent, function (JSON) {
                    $scope.$emit($attrs.addevent, JSON.prelead);
                });
            });
        }
    }
});
/**
 * Created by Christer on 18.05.2015.
 */
