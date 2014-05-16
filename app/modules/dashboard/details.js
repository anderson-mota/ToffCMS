app.config(function ($routeProvider, USER_ROLES) {

    $routeProvider.when('/', {
      templateUrl: 'modules/dashboard/views/index.html',
      controller: 'DashboardCtrl',
      data: {
        authorizedRoles: [USER_ROLES.admin]
      }
    });

  });
