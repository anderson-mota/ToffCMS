/* global confirm:true */
'use strict';

app.controller('GalleryCtrl', function ($scope, $upload, Gallery, GalleryItem, AuthService, Slug) {
    $scope.maxLoadedImages = 6;
    $scope.galleries = [];
    $scope.activeGallery = {};
    $scope.formErrors = [];

    Gallery.get(function (data) {
      $scope.galleries = data.galleries;
    });

    // Watch for title changes and update the slug field
    $scope.$watch('activeGallery.title', function (value) {
      if ($scope.activeGallery.id) {
        return;
      }

      $scope.activeGallery.slug = Slug.slugify(value);
    });

    /**
     * Create a new gallery
     * @return {void}
     */
    $scope.newGallery = function () {
      $scope.activeGallery = {};
    };

    /**
     * Edit a gallery
     * @param  {object} gallery
     * @return {void}
     */
    $scope.editGallery = function (gallery) {
      $scope.activeGallery = gallery;
    };

    /**
     * Delete a gallery
     * @param  {object} gallery
     * @return {void}
     */
    $scope.deleteGallery = function (gallery) {

      if (confirm('Are you sure you want to delete this gallery?') === false) {
        return;
      }

      getGalleryIndexById(gallery.id, function ($index) {
        Gallery.delete({id: gallery.id}, function () {
          $scope.galleries.splice($index, 1);
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

      if ($scope.activeGallery.id) {

        // Update a instance
        Gallery.update($scope.activeGallery, function success () {
          $('#gallery-modal').modal('hide');
        }, error);

      } else {

        // Create a new instance
        Gallery.create($scope.activeGallery, function success (data) {
          data.gallery.items = [];
          $scope.galleries.push(data.gallery);
          $('#gallery-modal').modal('hide');
        }, error);

      }

    };

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

    var getGalleryIndexById = function (id, callback) {
      angular.forEach($scope.galleries, function (value, key) {
        if (value.id === id) {
          callback(key);
          return false;
        }
      });
    };

  });
