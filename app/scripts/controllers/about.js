'use strict';

/**
 * @ngdoc function
 * @name myDashingApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myDashingApp
 */
angular.module('myDashingApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
