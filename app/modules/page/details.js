app.config(function ($routeProvider, USER_ROLES) {

    $routeProvider.when('/pages', {
      templateUrl: 'modules/page/views/index.html',
      controller: 'PageCtrl',
      data: {
        authorizedRoles: [USER_ROLES.admin]
      }
    });

  });
