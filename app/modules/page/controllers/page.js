/* global $:true */
/* global confirm:true */
'use strict';

app.controller('PageCtrl', function ($scope, $routeParams, Page, Slug) {
    $scope.pages = [];
    $scope.activeStatus = 'all';
    $scope.activeLanguage = 'all';
    $scope.activePage = {};
    $scope.formErrors = [];

    /**
     * Create a new page
     * Triggers on `create a page` click
     * @return {void}
     */
    $scope.newPage = function () {
      $scope.formErrors = [];
      $scope.activePage = {
        status: 'draft',
        language: 'en',
        updateSlug: true,
      };
    };

    /**
     * Edit a page
     * @param  {object} page
     * @return {void}
     */
    $scope.editPage = function (page) {
      $scope.formErrors = [];
      $scope.activePage = page;
    };

    /**
     * Delete a page
     * @param  {integer} $index
     * @return {void}
     */
    $scope.deletePage = function ($index) {

      if (confirm('Are you sure you want to delete this page?') === false) {
        return;
      }

      Page.delete($scope.pages[$index], function () {
        delete $scope.pages.splice($index, 1); // jshint ignore:line
      });

    };

    /**
     * Process the submitted form
     * @return {void}
     */
    $scope.processForm = function () {
      this.pageForm.$setPristine();

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

    // Watch for title changes and update the slug field
    $scope.$watch('activePage.title', function (value) {
      if ($scope.activePage.updateSlug === false) {
        return;
      }

      $scope.activePage.slug = Slug.slugify(value);
    });

    // Get all of the pages
    Page.get(function (data) {
      for (var i = 0; i < data.pages.length; i++) {
        data.pages[i].updateSlug = false;
      }

      $scope.activePage = data.pages[0];
      $scope.pages = data.pages;
    });
  });
