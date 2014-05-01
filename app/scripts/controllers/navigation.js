'use strict';

app.controller('NavigationCtrl', function ($scope, Navigation, Page) {

    $scope.navigation = [];
    $scope.pages = [];
    $scope.activeLanguage = 'en';
    $scope.activeInstance = {};
    $scope.formErrors = [];

    /**
     * Create a new instance
     * Triggers on `create a instance` click
     * @return {void}
     */
    $scope.newInstance = function () {
      $scope.formErrors = [];
      // $scope.instanceForm.$setPristine();
      $scope.activeInstance = {
        type: 'uri',
        language: 'en'
      };
    };

    /**
     * Edit a instance
     * @param  {object} instance
     * @return {void}
     */
    $scope.editInstance = function (instance) {
      $scope.formErrors = [];
      $scope.instanceForm.$setPristine();
      $scope.activeInstance = instance;
    };

    /**
     * Process the submitted form
     * @return {void}
     */
    $scope.processForm = function () {

      console.log($scope.activeInstance);
      return;

      // Error processing
      var error = function (data) {
        $scope.formErrors = data.data.message;
      };

      if ($scope.activePage.id) {

        // Update a page
        Page.update($scope.activePage, function success () {
          $('#page-crud-modal').modal('hide');
        }, error);

      } else {

        // Create a new page
        Page.create($scope.activePage, function success (data) {
          data.page.updateSlug = false;
          $scope.pages.push(data.page);
          $('#page-crud-modal').modal('hide');
        }, error);

      }
    };

    // Get all of the navigation
    Navigation.get(function (data) {
      for (var i = 0; i < data.navigation.length; i++) {
        data.navigation[i].updateSlug = false;
      }

      $scope.activeInstance = data.navigation[0];
      $scope.navigation = data.navigation;
    });

    // Get all of the pages
    Page.get(function (data) {
      $scope.pages = data.pages;
    });

  });
