'use strict';

app.controller('GalleryCtrl', function ($scope, $upload, Gallery, GalleryItem, AuthService) {
    $scope.maxLoadedImages = 6;
    $scope.galleries = [];

    Gallery.get(function (data) {
      $scope.galleries = data.galleries;
    });

    /**
     * Search & destroy the gallery item
     * @param  {integer} galleryId
     * @param  {integer} $index
     * @return {void}
     */
    $scope.deleteItem = function (galleryId, $index) {
      angular.forEach($scope.galleries, function (row) {
        if (row.id === galleryId) {
          var item = row.items[$index];

          // Delete client side
          row.items.splice($index, 1);

          // Delete server side
          GalleryItem.delete({id: item.id});

          return false;
        }
      });
    };

    /**
     * Upload a file
     * @param  {array} $files
     * @param  {integer} galleryId
     * @return {void}
     */
    $scope.onFileSelect = function($files, galleryId) {
      var auth = AuthService.getApiCredentials(),
        success = function(data) {
          // Append the received item to the array of gallery items
          angular.forEach($scope.galleries, function (value, key) {
            if (value.id === galleryId) {
              $scope.galleries[key].items.push(data.item);
              return;
            }
          });
        },
        error = function(data) {
          console.error('err'); // ToDo
          console.log(data);
        };


      for (var i = 0; i < $files.length; i++) {
        var file = $files[i];

        $scope.upload = $upload.upload({
          url: 'http://api.historymakers.lv/v1.0/gallery/item/upload?user_id='+ auth.user_id +'&api_key='+ auth.api_key, // jshint ignore:line
          data: {id: galleryId},
          file: file,
        })
        .success(success)
        .error(error);
      }
    };


  });
