'use strict';

app.controller('HeaderCtrl', function ($scope) {

    /**
     * Hide the sidebar - on/off canvas toggle
     */
    $scope.offCanvas = function (event) {
      event.preventDefault();

      // If window is small enough, enable sidebar push menu
      if ($(window).width() <= 992) {
        $('.row-offcanvas').toggleClass('active');
        $('.left-side').removeClass('collapse-left');
        $('.right-side').removeClass('strech');
        $('.row-offcanvas').toggleClass('relative');
      } else {
        // Else, enable content streching
        $('.left-side').toggleClass('collapse-left');
        $('.right-side').toggleClass('strech');
      }
    };

  });
