'use strict';

app.service('Navigation', function Navigation($resource, AuthService, BACKEND_URL) {
    var params = AuthService.getApiCredentials();
    params.id = '@id';

    return $resource(BACKEND_URL + 'navigation/:method/:id', params, {
        update: { method: 'PUT' },
        create: { method: 'POST' },
        updateOrder: { method: 'PUT', params: { method: 'order' } }
      });
  });
