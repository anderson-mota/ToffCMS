/* global app:true */
'use strict';

app.factory('AuthService', function ($http, $location, $cookies, Session, USER_ROLES) {
    return {
      login: function (credentials) {
        return $http
          .post('http://api.historymakers.lv/v1.0/login', credentials)
          .then(function (res) {

            if (res.data.error === true) {
              // !!! ToDo : display error msg
              console.error(res.data.message);
              return res.data;
            }

            // ToDo: create user-groups
            Session.create(res.data.user.api_key, res.data.user.id, 'admin'); // jshint ignore:line
            $location.path('/');
            return res.data;
          });
      },
      isAuthenticated: function () {
        return !!(Session.apiKey && Session.userId);
      },
      isAuthorized: function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
          authorizedRoles = [authorizedRoles];
        }

        // If this is public page..
        if (authorizedRoles.indexOf(USER_ROLES.all) !== -1) {
          return true;
        }

        return (this.isAuthenticated() &&
          authorizedRoles.indexOf(Session.userRole) !== -1);
      },
      getApiCredentials: function () {
        return {
          user_id: Session.userId, // jshint ignore:line
          api_key: Session.apiKey // jshint ignore:line
        };
      },
      loadFromCookies: function () {
        return Session.updateFromCookies();
      }
    };
  });
