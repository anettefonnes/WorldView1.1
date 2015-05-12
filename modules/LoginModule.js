/**
 * Created by Christer on 08.05.2015.
 */
"user strict";
//Services and controllers connected to login

var LoginModule = angular.module('Login', []);



LoginModule.factory('Token', function(){
    return {
        access: "",
        connectToHub: function(){
            var connection = $.hubConnection('http://wtnews.cloudapp.net:8080');
            var preleadHub = connection.createHubProxy('preleadHub');

            connection.qs = {Bearer: this.access};
            connection.logging = true;

            preleadHub.on('onNewPrelead', function (prelead) {
                //Do the magic
                console.log(prelead);
            });
            connection.start().fail(function(err){
                console.log(err);
            });
        }
    }; // Returns Token Object - for connecting
});
LoginModule.factory('Login', function(){
    return {
        url: "http://wtnews.cloudapp.net:8080/idsrv/connect/token",
        username: "arnor",
        password: "H3mm3lig",
        client_id: 'internalServerApp'
    }
});
LoginModule.controller('LoginCtrl', function($http, Login, Token){
    console.log("Logging in with username: " + Login.username);
    $http({
        method: 'POST',
        url: Login.url ,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: 'grant_type=password' +
        '&username=' + Login.username +
        '&password=' + Login.password +
        '&client_id=' + Login.client_id +
        '&client_secret=H3mm3lig' +
        '&scope=write'
    }).then(function(data) {
        Token.access = data.data.access_token;
        if(Token.access) {
            console.log("Login Success!");
            Token.connectToHub();
        }
    });
});

