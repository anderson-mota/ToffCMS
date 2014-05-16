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

  .run(function ($rootScope, $route, $cookieStore, AUTH_EVENTS, AuthService, User, LANGUAGES) {

    // Global constants
    $rootScope.LANGUAGES = LANGUAGES;

    // Get the layout of a view
    $rootScope.getLayout = function () {
      var layout = 'default.html';

      if ($route.current === undefined) {
        return;
      }

      if ($route.current.layout) {
        layout = $route.current.layout;
      }

      return 'views/layouts/' + layout;
    };

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

    $rootScope.do = function ($event) {
      $event.preventDefault();
    };

    /**
     * Hide the sidebar - on/off canvas toggle
     */
    $rootScope.offCanvas = function (event) {
      event.preventDefault();

      // If window is small enough, enable sidebar push menu
      if ($(window).width() <= 992) {
        $('.row-offcanvas').toggleClass('active');
        $('.left-side').removeClass('collapse-left');
        $('.right-side').removeClass('strech');
        $('.row-offcanvas').toggleClass('relative');
      } else {
        // Else, enable content streching
        $('.left-side').toggleClass('collapse-left');
        $('.right-side').toggleClass('strech');
      }
    };

  });
