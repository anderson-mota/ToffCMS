'use strict';

app.controller('MainCtrl', function ($scope, $route, LANGUAGES, FLAGS, Settings) {

    // Global constants
    $scope.LANGUAGES = LANGUAGES;
    $scope.FLAGS = FLAGS;

    Settings.show({key: 'internationalization'}, function (data) {
      $scope.hasInternationalization = data.settings.value;
    });

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
