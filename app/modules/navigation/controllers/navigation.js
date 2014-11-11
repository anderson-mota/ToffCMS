/* global confirm:true */
'use strict';

app.controller('NavigationCtrl', function ($scope, Navigation, Page) {

    $scope.navigation = [];
    $scope.pages = [];
    $scope.activeLanguage = 'pt';
    $scope.activeInstance = {};
    $scope.formErrors = [];
    $scope.dragHappened = false;
    $scope.orderSaveClicked = false;
    $scope.orderSaved = false;

    /**
     * Save the order of links
     * @return {void}
     */
    $scope.saveOrder = function () {
      var order = prepareOrder($scope.navigation);

      $scope.dragHappened = false;
      $scope.orderSaveClicked = true;

      // Update the order
      Navigation.updateOrder({data: order}, function () {
        $scope.orderSaveClicked = false;
        $scope.orderSaved = true;
      });
    };

    /**
     * Create a new instance
     * Triggers on `create a instance` click
     * @return {void}
     */
    $scope.newInstance = function () {
      $scope.formErrors = [];
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
      $scope.activeInstance = instance;
    };

    /**
     * Delete an instance
     * @param  {object} instance
     * @return {void}
     */
    $scope.deleteInstance = function (instance) {

      if (confirm('Are you sure you want to delete this item?') === false)
      {
        return;
      }

      Navigation.delete({id: instance.id}, function () {
        Navigation.get(function (data) {
          $scope.navigation = data.navigation;
        });
      });

    };

    /**
     * Process the submitted form
     * @return {void}
     */
    $scope.processForm = function () {

      // Error processing
      var error = function (data) {
        $scope.formErrors = data.data.message;
      };

      if ($scope.activeInstance.id) {

        // Update a instance
        Navigation.update($scope.activeInstance, function success () {
          $('#navigation-form-modal').modal('hide');
        }, error);

      } else {

        // Create a new instance
        Navigation.create($scope.activeInstance, function success (data) {
          $scope.navigation.push(data.navigation);
          $('#navigation-form-modal').modal('hide');
        }, error);

      }
    };

    /**
     * Update the save button
     * @type {Object}
     */
    $scope.treeOptions = {
      dropped: function () {
        $scope.dragHappened = true;
      }
    };

    // Get all of the navigation
    Navigation.get(function (data) {
      $scope.activeInstance = data.navigation[0];
      $scope.navigation = data.navigation;
    });

    // Get all of the pages
    Page.get(function (data) {
      $scope.pages = data.pages;
    });

    /**
     * Prepare the order that will be sent to the backend
     * @param  {array} data
     * @return {array}
     */
    var prepareOrder = function (data) {
      var order = [];

      angular.forEach(data, function (value) {
        var d = {
          id: value.id,
          children: []
        };

        if (value.children !== undefined && value.children.length > 0) {
          d.children = prepareOrder(value.children);
        }

        order.push(d);
      });

      return order;
    };

  });
