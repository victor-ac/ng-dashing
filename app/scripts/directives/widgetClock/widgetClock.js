'use strict';

/**
 * @ngdoc directive
 *
 * @name uxAspectsDashing.directive:widgetClock
 *
 * @description
 * Displays the current time (updated every second).
 *
 * @element ANY
 * @param {string=} timeFormat Format to be applied to current time.
 *                             Accepts any <a href="https://docs.angularjs.org/api/ng/filter/date" target="_blank">AngularJS date filter</a> format <br /> *(default:* `'h:mm:ss a'`*)*
 * @param {string=} header Clock title <br /> *(default: "")*
 */
angular.module('uxAspectsDashing')
    .directive('widgetClock', function () {
        return {
            templateUrl: 'scripts/directives/widgetClock/widgetClock.html',
            restrict: 'A',
            scope: {
                'header': '@',
                'timeFormat': '@'
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
