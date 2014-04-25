'use strict';

app.controller('PageCtrl', function ($scope, $routeParams, Page) {
    $scope.pages = [];
    $scope.activeStatus = 'all';

    $scope.showByStatus = function (status) {
      for (var i = 0; i < $scope.pages.length; i++) {
        $scope.pages[i].isVisible = ($scope.pages[i].status === status || status === 'all');
      };

      $scope.activeStatus = status;
    };

    /**
     * Edit a page
     * @param  {object} page
     * @return {void}
     */
    $scope.editPage = function (page) {
      // ToDo
      console.log('edit');
    };

    /**
     * Delete a page
     * @param  {object} page
     * @return {void}
     */
    $scope.deletePage = function (page) {

      // ToDo: make this better
      // Delete a page from the scope
      for (var i = 0; i < $scope.pages.length; i++) {
        if ($scope.pages[i].id === page.id) {
          delete $scope.pages.splice(i, 1);
        }
      };

      // ToDo: delete the page server-side
    };

    // Get all of the pages
    Page.get(function (data) {
      for (var i = 0; i < data.pages.length; i++) {
        data.pages[i].isVisible = true;
      };

      $scope.pages = data.pages;
    });
  });
