'use strict';

app.service('Session', function ($cookieStore) {
  this.create = function (apiKey, userId, userRole) {
    this.apiKey = apiKey;
    this.userId = userId;
    this.userRole = userRole;
    $cookieStore.put('userApiKey', apiKey);
    $cookieStore.put('userId', userId);
  };
  this.updateFromCookies = function () {

    if ($cookieStore.get('userApiKey') === null ||
        $cookieStore.get('userId') === null) {
      return false;
    }

    this.apiKey = $cookieStore.get('userApiKey');
    this.userId = $cookieStore.get('userId');
    this.userRole = 'admin'; // ToDo: create user roles
    return true;
  };
  this.destroy = function () {
    this.apiKey = null;
    this.userId = null;
    this.userRole = null;
    $cookieStore.remove('userApiKey');
    $cookieStore.remove('userId');
  };
  return this;
});
