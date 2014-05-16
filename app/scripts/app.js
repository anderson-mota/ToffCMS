/* global app:true */
/* exported app */
'use strict';

var app = angular.module('adminApp', [
  'ngResource',
  'ngRoute',
  'ngCookies',
  'slugifier',
  'ui.tree',
  'ui.bootstrap',
  'angularFileUpload',
  'angulartics',
  'angulartics.google.analytics',
  'ui.gravatar'
])
  .config(function ($routeProvider, USER_ROLES) {
    $routeProvider
      .otherwise({
        redirectTo: '/',
        data: { authorizedRoles: USER_ROLES.admin }
      });
  })

  .run(function ($rootScope, AUTH_EVENTS, AuthService, User) {

    // Check if the user is logged in
    if (AuthService.loadFromCookies()) {
      new User();
      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
    }

    // Revalidate auth on route change
    $rootScope.$on('$routeChangeStart', function (event, next) {

      // Do not check the roles for redirections
      // We will do this once we're at the redirected destination
      if (next.redirectTo) {
        return;
      }

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
