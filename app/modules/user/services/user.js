'use strict';

app.service('User', function User ($rootScope, $resource, AuthService, AUTH_EVENTS, BACKEND_URL) {

    var params = {
        'user_id': '@userId',
        'api_key': '@apiKey'
      },
      resource = $resource(BACKEND_URL + 'user/:id', params, {
        update: { method: 'PUT' },
        create: { method: 'POST' }
      });

    $rootScope.$on(AUTH_EVENTS.loginSuccess, function () {
      var params = AuthService.getApiCredentials();
      params.id = params.user_id; // jshint ignore:line

      resource.get(params, function (data) {
        $rootScope.currentUser = data.user;
        $rootScope.currentUser.name = 'John Doe'; // ToDo
        $rootScope.currentUser.role = 'admin'; // ToDo
      });
    });

    return resource;
  });
