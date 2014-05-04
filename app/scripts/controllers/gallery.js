'use strict';

app.controller('GalleryCtrl', function ($scope, $upload, Gallery, AuthService) {
    $scope.maxLoadedImages = 6;
    $scope.galleries = [];

    Gallery.get(function (data) {
      $scope.galleries = data.galleries;
    });

    /**
     * Search & destroy the gallery item
     * @param  {integer} gallery_id
     * @param  {integer} $index
     * @return {void}
     */
    $scope.deleteItem = function (gallery_id, $index) {
      angular.forEach($scope.galleries, function (row) {
        if (row.id === gallery_id) {
          row.items.splice($index, 1);
        }
      });

      // ToDo: delete server side
    };

    /**
     * Upload a file
     * @param  {array} $files
     * @param  {integer} gallery_id
     * @return {void}
     */
    $scope.onFileSelect = function($files, gallery_id) {
      for (var i = 0; i < $files.length; i++) {
        var file = $files[i],
            auth = AuthService.getApiCredentials();

        $scope.upload = $upload.upload({
          url: 'http://api.historymakers.lv/v1.0/gallery/item/upload?user_id='+ auth.user_id +'&api_key='+ auth.api_key,
          data: {id: gallery_id},
          file: file,
        }).success(function(data, status, headers, config) {

          // Append the received item to the array of gallery items
          angular.forEach($scope.galleries, function (value, key) {
            if (value.id === gallery_id) {
              $scope.galleries[key].items.push(data.item);
              return;
            }
          });

        })
        .error(function (data) {
          console.error('err');
          console.log(data);
        });
      }
    };


  });
