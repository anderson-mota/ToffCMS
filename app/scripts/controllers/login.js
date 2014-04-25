/* global app:true */
'use strict';

app.controller('LoginCtrl', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {

    $scope.credentials = {
      email: '',
      password: ''
    };

    $scope.login = function (credentials) {
      AuthService.login(credentials).then(function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $('html, body').removeClass('bg-black');
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };

    $('html, body').addClass('bg-black');
  });
