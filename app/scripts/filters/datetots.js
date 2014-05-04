'use strict';

app.filter('dateToTS', function () {
    return function (datetime) {
      return (new Date(datetime)).getTime();
    };
  });
