'use strict';

app.service('Gallery', function Gallery($resource, AuthService, BACKEND_URL) {
    var params = AuthService.getApiCredentials(),
        server = BACKEND_URL + 'gallery/';

    return $resource(server, params, {
        get: {
          method: 'GET',
          url: server + ':slug',
          params: { slug: '@slug' }
        },
        update: {
          method: 'PUT',
          url: server + ':id',
          params: { id: '@id' }
        },
        create: {
          method: 'POST'
        },
        delete: {
          method: 'DELETE',
          url: server + ':id',
          params: { id: '@id' }
        }
      });
  });
