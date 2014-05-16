app.config(function ($routeProvider, USER_ROLES) {

    $routeProvider
      .when('/login', {
        templateUrl: 'modules/user/views/login.html',
        controller: 'LoginCtrl',
        data: {
          authorizedRoles: USER_ROLES.all
        },
        layout: 'login.html'
      })
      .when('/logout', {
        templateUrl: 'modules/user/views/login.html',
        controller: 'LogoutCtrl',
        data: {
          authorizedRoles: [USER_ROLES.admin]
        }
      });

  });
