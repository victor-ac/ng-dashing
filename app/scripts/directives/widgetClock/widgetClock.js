'use strict';

/**
 * @ngdoc directive
 * @name uxAspectsDashing.directive:widgetClock
 * @description
 * # widgetClock
 */
angular.module('uxAspectsDashing')
    .directive('widgetClock', function () {
        return {
            templateUrl: 'scripts/directives/widgetClock/widgetClock.html',
            restrict: 'A',
            scope: {
                'timeFormat': '@',
                'header': '@'
            },
            controller: function ($scope) {
                $scope.time = new Date();
                setInterval(function () {
                    $scope.time = new Date();
                }, 1000);
                if (!$scope.timeFormat) {
                    $scope.timeFormat = 'h:mm:ss a';
                }
            }
        };
    });
