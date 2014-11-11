'use strict';

app.service('Settings', function Settings($resource, AuthService, BACKEND_URL) {
    var params = AuthService.getApiCredentials();
    params.id = '@id';
    params.key = '@key';

    return $resource(BACKEND_URL + 'settings/:id', params, {
        update: { method: 'PUT' },
        create: { method: 'POST' },
        show: { method: 'GET', url: BACKEND_URL + 'settings/:key' }
      });
  });
