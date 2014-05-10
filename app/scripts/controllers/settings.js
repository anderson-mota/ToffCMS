'use strict';

app.controller('SettingsCtrl', function ($scope, Settings, LANGUAGES) {

    $scope.settings = [];
    $scope.languages = LANGUAGES;

    Settings.get(function (data) {
      $scope.settings = data.settings;
    });

  });
