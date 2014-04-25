'use strict';

app.controller('PageCtrl', function ($scope, $routeParams, Page) {
    $scope.pages = [];
    $scope.activeStatus = 'all';

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


    // Make the editor look smaller
    $.fn.wysihtml5.locale.en = jQuery.extend($.fn.wysihtml5.locale.en, {
      emphasis: {
        bold: 'B',
        italic: 'I',
        underline: 'U',
        small: 'S'
      }
    });

    // Init wysiwyg
    $(".textarea").wysihtml5({
      toolbar: {
        color: true,
        html: true
      }
    });

    $('input[name="title"]').keyup(function () {
      $('input[name="slug"]').val( slug($(this).val()) );
    });

    // Get all of the pages
    Page.get(function (data) {
      for (var i = 0; i < data.pages.length; i++) {
        data.pages[i].isVisible = true;
      };

      $scope.pages = data.pages;
    });
  });
