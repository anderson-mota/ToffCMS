'use strict';

app.controller('PageCtrl', function ($scope, $routeParams, Page, Slug) {
    $scope.pages = [];
    $scope.activeStatus = 'all';
    $scope.activePage = {};

    $scope.do = function ($event) {
      $event.preventDefault();
    };

    $scope.showByStatus = function (status) {
      for (var i = 0; i < $scope.pages.length; i++) {
        $scope.pages[i].isVisible = ($scope.pages[i].status === status || status === 'all');
      };

      $scope.activeStatus = status;
    };

    /**
     * Create a new page
     * Triggers on `create a page` click
     * @return {void}
     */
    $scope.newPage = function () {
      $scope.activePage = {
        status: 'draft',
        language: 'en',
        updateSlug: true
      };
    };

    /**
     * Edit a page
     * @param  {object} page
     * @return {void}
     */
    $scope.editPage = function (page) {
      $scope.activePage = page;
    };

    /**
     * Delete a page
     * @param  {integer} $index
     * @return {void}
     */
    $scope.deletePage = function ($index) {

      if (confirm('Are you sure you want to delete this page?') === false)
      {
        return;
      }

      Page.delete($scope.pages[$index], function () {
        // ToDO: catch errors
        delete $scope.pages.splice($index, 1);
      });

    };

    /**
     * Process the submitted form
     * @return {void}
     */
    $scope.processForm = function () {
      console.log($scope.activePage);

      // Update or create the page
      if ($scope.activePage.id) {
        Page.update($scope.activePage, function (data) {
          console.log(data);
          // ToDO: check for errors

          $('#page-crud-modal').modal('hide');
        });
      } else {
        Page.create($scope.activePage, function (data) {
          console.log(data);
          // ToDO: check for errors

          data.page.isVisible = true;
          data.page.updateSlug = false;
          $scope.pages.push(data.page);
          $('#page-crud-modal').modal('hide');
        });
      }
    };

    // Watch for title changes and update the slug field
    $scope.$watch('activePage.title', function (value, oldValue) {
      if ($scope.activePage.updateSlug === false) {
        return;
      }

      $scope.activePage.slug = Slug.slugify(value);
    });

    // Get all of the pages
    Page.get(function (data) {
      for (var i = 0; i < data.pages.length; i++) {
        data.pages[i].isVisible = true;
        data.pages[i].updateSlug = false;
      };

      $scope.activePage = data.pages[0];
      $scope.pages = data.pages;
    });
  });
