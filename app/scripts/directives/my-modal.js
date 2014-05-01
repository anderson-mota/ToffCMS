'use strict';

app.directive('myModal', function () {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        id: '@modalid'
      },
      templateUrl: 'views/directives/my-modal.html'
    };
  });

app.directive('myModalHeader', function () {
    return {
      restrict: 'E',
      transclude: true,
      scope: {},
      templateUrl: 'views/directives/my-modal-header.html'
    };
  });
