'use strict';

describe('Directive: widgetText', function () {

  // load the directive's module
  beforeEach(module('uxAspectsDashing'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<widget-text></widget-text>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the widgetText directive');
  }));
});
