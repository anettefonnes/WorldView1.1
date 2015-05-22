"user strict";

var LoginModule = angular.module('Login', ['HubHandler']);

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

LoginModule.controller('LoginCtrl', ['$scope', 'Login', function($scope, Login){

}]);

LoginModule.directive('login',function(){
    return {
        restrict: 'E',
        require: 'worldview',
        controller: function($scope,$element,$attrs){
            console.log($scope);
        }
    }
});

/**
 * Created by Christer on 08.05.2015.
 */