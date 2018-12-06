'use strict';

/**
 * @ngdoc directive
 *
 * @name uxAspectsDashing.directive:widgetDate
 *
 * @description
 * Displays the current date and time of a given timezone.
 *
 * @element ANY
 * @param {Date} widgetDate Current date in GMT
 * @param {string=} dateFormat Format to be applied to the target date <br /> *(default: *`'EEE MMM d yyyy'`*)*
 * @param {string=} header Date title
 * @param {string=} timeFormat Format to be applied to the target time <br /> *(default: *`'h:mm:ss a'`*)*
 * @param {string=} timezone Time zone name (e.g. "America/Los_Angeles").
 *                           Accepts any <a href="http://momentjs.com/timezone/docs/" target="_blank">Moment.js Time zone name</a> <br />
 *                           *(default: browser's time zone)*
 */
angular.module('uxAspectsDashing')
    .directive('widgetDate', function () {
        return {
            templateUrl: 'scripts/directives/widgetDate/widgetDate.html',
            restrict: 'A',
            scope: {
                'data': '=widgetDate',
                'dateFormat': '@',
                'header': '@',
                'timeFormat': '@',
                'timezone': '@'
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
