'use strict';

describe('Service: Dashboardclient', function () {

  // load the service's module
  beforeEach(module('myDashingApp'));

  // instantiate service
  var Dashboardclient;
  beforeEach(inject(function (_Dashboardclient_) {
    Dashboardclient = _Dashboardclient_;
  }));

  it('should do something', function () {
    expect(!!Dashboardclient).toBe(true);
  });

});
