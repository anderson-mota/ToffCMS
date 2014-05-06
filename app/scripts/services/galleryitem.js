'use strict';

app.service('GalleryItem', function Galleryitem($resource, AuthService, BACKEND_URL) {
    var params = AuthService.getApiCredentials();
    params.id = '@id';

    return $resource(BACKEND_URL + 'gallery/item/:method/:id', params, {
      updateOrder: { method: 'PUT', params: { method: 'order' } }
    });
  });
