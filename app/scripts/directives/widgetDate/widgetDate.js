'use strict';

/**
 * @ngdoc directive
 * @name uxAspectsDashing.directive:widgetDate
 * @description
 * # widgetDate
 */
angular.module('uxAspectsDashing')
    .directive('widgetDate', function () {
        return {
            templateUrl: 'scripts/directives/widgetDate/widgetDate.html',
            restrict: 'A',
            scope: {
                'data': '=widgetDate',
                'timezone': '@',
                'dateFormat': '@',
                'timeFormat': '@',
                'header': '@'
            },
            controller: function ($scope) {
                if (!$scope.timeFormat) {
                    $scope.timeFormat = 'h:mm:ss a';
                }
                if (!$scope.dateFormat) {
                    $scope.dateFormat = 'EEE MMM d yyyy';
                }
                $scope.getTimezoneOffset = function (time) {
                    if (!$scope.timezone) {
                        $scope.timezone = moment.tz.guess();
                    }
                    var offset = moment.tz.zone($scope.timezone).utcOffset(time);
                    if (offset > 0) {
                        offset = '+' + offset;
                    }
                    return offset;
                };

                $scope.toTimezone = function (time) {
                    if ($scope.timezone) {
                        return moment(time).tz($scope.timezone).format($scope.timeFormat);
                    }
                    else {
                        return time;
                    }
                };
            }
        };
    });
