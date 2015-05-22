"user strict";

var LoginModule = angular.module('Login', []);

LoginModule.factory('Token', function(){
    return{
        token: ""
    }
});
/*
LoginModule.factory('Login', ['$http','Hub', function ($http,Hub) {
    return {
        url: "http://wtnews.cloudapp.net:8080/idsrv/connect/token",
        username: "arnor",
        password: "H3mm3lig",
        client_id: 'internalServerApp',

        login: function(){
            $http({
                method: 'POST',
                url: this.url,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'grant_type=password' +
                '&username=' + this.username +
                '&password=' + this.password +
                '&client_id=' + this.client_id +
                '&client_secret=H3mm3lig' +
                '&scope=write'
            }).then(function (data) {
                Hub.access = data.data.access_token;
                if (Hub.access) {
                    console.log("Login Success!");
                    Hub.connectToServer();
                }
            });
        }
    };
}]);
*/

LoginModule.directive('login',function(){
    return {
        restrict: 'E',
        controller: function($scope, $http){
            $scope.http = $http;
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
                $scope.token = data.data.access_token;
                console.log($scope);
                console.log($element);
                if($scope.token){
                    $scope.$emit('token');
                }
            });
        }
    }
});

/**
 * Created by Christer on 08.05.2015.
 */