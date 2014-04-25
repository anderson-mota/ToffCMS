/* global app:true */
'use strict';

app.controller('LoginCtrl', function ($scope, $rootScope, AUTH_EVENTS, AuthService) {

    $scope.error = null;

    $scope.credentials = {
      email: '',
      password: ''
    };

    $scope.login = function (credentials) {
      $scope.error = null;

      AuthService.login(credentials).then(function (data) {

        if (data.error) {
          $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          $scope.error = data.message;
          return;
        }

        $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        $('html, body').removeClass('bg-black');
      }, function () {
        $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
      });
    };

    $('html, body').addClass('bg-black');
  });
