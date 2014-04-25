/* global app:true */
/* exported app */
'use strict';

var app = angular.module('adminApp', [
  'ngResource',
  'ngRoute',
  'ngCookies'
])
  .config(function ($routeProvider, USER_ROLES) {
    $routeProvider
      .when('/',             {templateUrl: 'views/main.html',      controller: 'MainCtrl',    data: { authorizedRoles: [USER_ROLES.admin] }})
      .when('/login',        {templateUrl: 'views/login.html',     controller: 'LoginCtrl',   data: { authorizedRoles: USER_ROLES.all }, layout: 'login.html' })
      .when('/logout',       {templateUrl: 'views/main.html',      controller: 'LogoutCtrl',  data: { authorizedRoles: [USER_ROLES.admin] }})
      .otherwise({
        redirectTo: '/',
        data: { authorizedRoles: USER_ROLES.admin }
      });
  })

  .run(function ($rootScope, $route, $cookieStore, AUTH_EVENTS, AuthService, Session) {

    // Get the layout of a view
    $rootScope.getLayout = function () {
      var layout = 'default.html';

      if ($route.current == null) {
        return;
      }

      if ($route.current.layout) {
        layout = $route.current.layout;
      }

      return 'views/layouts/' + layout;
    }

    // Check if the user is logged in
    Session.updateFromCookies();

    $rootScope.$on('$routeChangeStart', function (event, next) {

      var authorizedRoles = next.data.authorizedRoles;

      if (AuthService.isAuthorized(authorizedRoles) === false) {
        event.preventDefault();

        if (AuthService.isAuthenticated()) {
          // user is not allowed
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
        } else {
          // user is not logged in
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
        }

      }
    });

  });
