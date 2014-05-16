/* global app:true */
'use strict';

app.config(function ($httpProvider) {
    $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
        return $injector.get('AuthInterceptor');
      }
    ]);
  })
  .factory('AuthInterceptor', function ($rootScope, $location, $q, AUTH_EVENTS) {

    // Redirect the user to the login page
    $rootScope.$on(AUTH_EVENTS.notAuthenticated, function () {
      $location.path('/login');
    });

    return {
      responseError: function (response) {
        if (response.status === 401) {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated,
                                response);
        }
        if (response.status === 403) {
          $rootScope.$broadcast(AUTH_EVENTS.notAuthorized,
                                response);
        }
        if (response.status === 419 || response.status === 440) {
          $rootScope.$broadcast(AUTH_EVENTS.sessionTimeout,
                                response);
        }
        return $q.reject(response);
      }
    };
  });
