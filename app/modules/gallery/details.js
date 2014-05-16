app.config(function ($routeProvider, USER_ROLES) {

    $routeProvider.when('/gallery', {
      templateUrl: 'modules/gallery/views/index.html',
      controller: 'GalleryCtrl',
      data: {
        authorizedRoles: [USER_ROLES.admin]
      }
    });

  });
