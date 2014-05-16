app.config(function ($routeProvider, USER_ROLES) {

    $routeProvider.when('/navigation', {
      templateUrl: 'modules/navigation/views/index.html',
      controller: 'NavigationCtrl',
      data: {
        authorizedRoles: [USER_ROLES.admin]
      }
    });

  });
