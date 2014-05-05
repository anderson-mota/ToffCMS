'use strict';

describe('Service: Galleryitem', function () {

  // load the service's module
  beforeEach(module('adminApp'));

  // instantiate service
  var Galleryitem;
  beforeEach(inject(function (_Galleryitem_) {
    Galleryitem = _Galleryitem_;
  }));

  it('should do something', function () {
    expect(!!Galleryitem).toBe(true);
  });

});
