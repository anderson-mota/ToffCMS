'use strict';

app.service('Page', function Page($resource, AuthService) {
    var params = AuthService.getApiCredentials();
    params.id = '@id';

    return $resource('http://api.historymakers.lv/v1.0/page/:id', params, {
        update: { method: 'PUT' },
        create: { method: 'POST' }
      });
  });
