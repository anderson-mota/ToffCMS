'use strict';

app.service('Settings', function Settings($resource, AuthService, BACKEND_URL) {
    var params = AuthService.getApiCredentials();
    params.id = '@id';

    return $resource(BACKEND_URL + 'settings/:id', params, {
        update: { method: 'PUT' },
        create: { method: 'POST' }
      });
  });
