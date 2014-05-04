'use strict';

app.service('Gallery', function Gallery($resource, AuthService) {
    var params = AuthService.getApiCredentials();
    params.slug = '@slug';

    return $resource('http://api.historymakers.lv/v1.0/gallery/:slug', params);
  });
