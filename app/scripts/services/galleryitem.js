'use strict';

app.service('GalleryItem', function Galleryitem($resource, AuthService) {
    var params = AuthService.getApiCredentials();
    params.id = '@id';

    return $resource('http://api.historymakers.lv/v1.0/gallery/item/:id', params);
  });
