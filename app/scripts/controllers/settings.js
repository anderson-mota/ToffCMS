'use strict';

app.controller('SettingsCtrl', function ($scope, Settings) {

    $scope.settings = [];
    $scope.formErrors = [];
    $scope.processingForm = false;

    /**
     * Process the current form
     * @return {void}
     */
    $scope.processForm = function () {
      $scope.processingForm = true;

      // Error processing
      var error = function (data) {
        console.log(data);
        $scope.formErrors = data.data.message;
        $scope.processingForm = false;
      };

      // Update the settings
      Settings.update({ settings: $scope.settings }, function success () {
        $scope.processingForm = false;
      }, error);
    };

    Settings.get(function (data) {
      $scope.settings = data.settings;
    });

  });
