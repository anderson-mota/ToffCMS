'use strict';

app.service('Page', function Page($resource, AuthService) {
    return $resource('http://api.historymakers.lv/v1.0/page', AuthService.getApiCredentials());
  });
