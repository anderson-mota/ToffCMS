'use strict';

app.service('Page', function Page($resource, AuthService) {
    var params = jQuery.extend({id: '@id'}, AuthService.getApiCredentials());

    return $resource('http://api.historymakers.lv/v1.0/page/:id', params, {
        update: { method: 'PUT' },
        create: { method: 'POST' }
      });
  });
