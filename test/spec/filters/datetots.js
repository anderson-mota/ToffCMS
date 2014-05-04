'use strict';

describe('Filter: dateToTS', function () {

  // load the filter's module
  beforeEach(module('adminApp'));

  // initialize a new instance of the filter before each test
  var dateToTS;
  beforeEach(inject(function ($filter) {
    dateToTS = $filter('dateToTS');
  }));

  it('should return the input prefixed with "dateToTS filter:"', function () {
    var text = 'angularjs';
    expect(dateToTS(text)).toBe('dateToTS filter: ' + text);
  });

});
