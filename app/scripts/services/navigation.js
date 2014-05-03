'use strict';

app.service('Navigation', function Navigation($resource, AuthService) {
    var params = AuthService.getApiCredentials();
    params.id = '@id';

    return $resource('http://api.historymakers.lv/v1.0/navigation/:method/:id', params, {
        update: { method: 'PUT' },
        create: { method: 'POST' },
        updateOrder: { method: 'PUT', params: { method: 'order' } }
      });
  });
