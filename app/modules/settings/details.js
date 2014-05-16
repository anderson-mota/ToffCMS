app.config(function ($routeProvider, USER_ROLES) {

    $routeProvider.when('/settings', {
      templateUrl: 'modules/settings/views/index.html',
      controller: 'SettingsCtrl',
      data: {
        authorizedRoles: [USER_ROLES.admin]
      }
    });

  });
