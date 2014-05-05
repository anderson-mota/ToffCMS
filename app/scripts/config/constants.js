/* global app:true */
'use strict';

app

  .constant('BACKEND_URL', 'http://api.historymakers.lv/v1.0/')

  .constant('LANGUAGES', {
    'en': 'English',
    'lv': 'Latvian',
    'ru': 'Russian'
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
