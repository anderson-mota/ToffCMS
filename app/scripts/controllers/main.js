'use strict';

app.controller('MainCtrl', function ($scope, $route, LANGUAGES) {

    // Global constants
    $scope.LANGUAGES = LANGUAGES;

    // Get the layout of a view
    $scope.getLayout = function () {
      var layout = 'default.html';

      if ($route.current === undefined) {
        return;
      }

      if ($route.current.layout) {
        layout = $route.current.layout;
      }

      return 'views/layouts/' + layout;
    };

    /**
     * Prevent the default event
     * @param  {Event} $event
     * @return {void}
     */
    $scope.do = function ($event) {
      $event.preventDefault();
    };

  });
