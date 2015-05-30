"use strict";

var LoginModule = angular.module('Login', ['HubHandler']);

LoginModule.directive('login',function(){
    return {
        restrict: 'E',
        scope:{},
        controller: function($scope, $http, Token){
            $scope.http = $http;
            $scope.token = Token;
        },
        link: function($scope, $element, $attrs){
            $scope.http({
                method: 'POST',
                url: $attrs.url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'grant_type=password' +
                '&username=' + $attrs.username +
                '&password=' + $attrs.password +
                '&client_id=' + 'internalServerApp' +
                '&client_secret=H3mm3lig' +
                '&scope=write'
            }).then(function (data) {
                $scope.token[$attrs.login] = data.data.access_token;

                if($scope.token[$attrs.login]){
                    console.log('Bearer recieved - emits ' + $attrs.login);
                    $scope.$emit($attrs.login);
                }
            });
        }
    }
});

/**
 * Created by Christer on 08.05.2015.
 */