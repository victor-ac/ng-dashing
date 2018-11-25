'use strict';

/**
 * @ngdoc directive
 * @name myDashingApp.directive:widgetCountdown
 * @description
 * # widgetCountdown
 */
angular.module('myDashingApp')
    .directive('widgetCountdown', function () {
        return {
            templateUrl: 'scripts/directives/widgetCountdown/widgetCountdown.html',
            restrict: 'A',
            scope: {
                'data': '=widgetCountdown',
                'header': '@',
                'dateFormat': '@', // Date format only affects the displayed date under the countdown
                'hideSeconds': '=?'
            },
            controller: function ($scope) {
                var intervals = ['months', 'days', 'hours', 'minutes'];
                var colors = ['rgba(0, 115, 231, 0.4)', 'rgba(0, 115, 231, 0.6)', 'rgba(0, 115, 231, 0.8)', 'rgb(0, 115, 231)'];

                if (!$scope.dateFormat) {
                    $scope.dateFormat = 'EEEE, MMMM d, yyyy h:mm:ss a';
                }

                if (!$scope.hideSeconds) {
                    intervals.push('seconds');
                    colors.push('rgb(22, 104, 193)');
                }

                $scope.getRemainingTime = function (time) {
                    $scope.time = [];
                    var now = moment(new Date());
                    var then = moment(time);
                    for (var i = 0; i < intervals.length; i ++) {
                        var diff = then.diff(now, intervals[i]);
                        now.add(diff, intervals[i]);
                        $scope.time.push({
                            unit: intervals[i],
                            value: ('0' + diff).slice(-2),
                            color: colors[i]
                        });
                    }
                    if ($scope.time[0].value === '00') { //remove months if 0
                        $scope.time.splice(0, 1);
                        if ($scope.time[0].value === '00') { //remove days if 0
                            $scope.time.splice(0, 1);
                        }
                    }
                };

                $scope.$watch('data', function (newValue) {
                    if (!_.isUndefined(newValue)) {
                        $scope.getRemainingTime(newValue.value);
                    }
                });
            }
        };
    });
