'use strict';

app.service('Page', function Page($resource, AuthService, BACKEND_URL) {
    var params = AuthService.getApiCredentials();
    params.id = '@id';

    return $resource(BACKEND_URL + 'page/:id', params, {
        update: { method: 'PUT' },
        create: { method: 'POST' }
      });
  });
