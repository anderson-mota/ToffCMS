'use strict';

app.controller('LogoutCtrl', function ($rootScope, Session, AUTH_EVENTS) {
    Session.destroy();
    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
  });
