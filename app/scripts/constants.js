'use strict';

app

  .constant('BACKEND_URL', 'http://lqdicms.app/v1.0/')

  .constant('LANGUAGES', {
      'pt': 'Português',
      'en': 'English'
  })

  .constant('FLAGS', {
    'pt': 'br',
    'en': 'us'
  })

  .constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })

  .constant('USER_ROLES', {
    all: '*',
    admin: 'admin',
    editor: 'editor',
    guest: 'guest'
  });
