/* global app:true */
'use strict';

app.controller('MainCtrl', function ($scope, USER_ROLES, AuthService) {
    $scope.currentUser = null;
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized;
  });
