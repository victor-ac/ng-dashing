'use strict';

/**
 * @ngdoc directive
 *
 * @name uxAspectsDashing.directive:widgetChart
 *
 * @description
 * Displays a chart in which the y-axis represents values and x-axis represents
 * the time elapsed since the dashboard was originally loaded.
 *
 * @element ANY
 * @param {object} widgetChart Set of data points to be ploted in the chart
 * @param {string} header Chart title <br /> *(optional, default: "")*
 * @param {number} maxDataPoints Maximum number of data points to be visible at any given time <br /> *(optional, default: 50)*
 * @param {boolean} showXAxisLabels Flag controlling visibility of x-axis labels <br /> *(optional, default: true)*
 * @param {string} xAxisUnit Unit to be appended to x-axis values <br /> *(optional, default: "")*
 * @param {string} yAxisPrefixUnit Unit to be prefixed to y-axis values <br /> *(optional, default: "")*
 * @param {string} yAxisSuffixUnit Unit to be appended to y-axis values <br /> *(optional, default: "")*
 */
angular.module('uxAspectsDashing')
    .directive('widgetChart', ['$colorService', function ($colorService) {
        return {
            templateUrl: 'scripts/directives/widgetChart/widgetChart.html',
            restrict: 'A',
            scope: {
                'data': '=widgetChart',
                'header': '@',
                'maxDataPoints': '=?',
                'showXAxisLabels': '=?',
                'xAxisUnit': '@',
                'yAxisPrefixUnit': '@',
                'yAxisSuffixUnit': '@'
            },
            controllerAs: 'vm',
            controller: function ($scope, $colorService) {
                var vm = this,
                    lowerLimit = 1000000,
                    pointsDiscarded = 0;

                vm.dataPoints = [];

                if (!$scope.showXAxisLabels) {
                    $scope.showXAxisLabels = true;
                }

                if (!_.isNumber($scope.maxDataPoints)) {
                    $scope.maxDataPoints = 50;
                }

                if (!$scope.xAxisUnit) {
                    $scope.xAxisUnit = "";
                }

                if (!$scope.yAxisPrefixUnit) {
                    $scope.yAxisPrefixUnit = "";
                }

                if (!$scope.yAxisSuffixUnit) {
                    $scope.yAxisSuffixUnit = "";
                }

                var chartColors = {
                    primary: '#0073e7',
                    tickColor: $colorService.getColor('grey6').toHex(),
                    borderColor: $colorService.getColor('grey2').setAlpha(0.5).toRgba(),
                    white: '#FFFFFF'
                };

                vm.addDataPoint = function (newValue) {
                    if (vm.dataPoints.length === $scope.maxDataPoints) {
                        vm.dataPoints = vm.dataPoints.slice(1);
                        vm.dataPoints.push(newValue);
                        lowerLimit = _.min(vm.dataPoints);
                        pointsDiscarded++;
                    }
                    else {
                        if (newValue < lowerLimit) {
                            lowerLimit = newValue;
                        }

                        vm.dataPoints.push(newValue);
                    }

                    lowerLimit = (lowerLimit - 10) < 0 ? 0 : (lowerLimit - 10);
                    vm.liveChart.options.yaxis.min = lowerLimit;
                };

                vm.getChartData = function () {
                    return _.map(vm.dataPoints, function (value, index) {
                        return [index, value];
                    });
                };

                vm.liveChart = {
                    series: [{
                        data: vm.getChartData(),
                        lines: {
                            fill: true,
                            lineWidth: 1,
                            fillColor: {
                                colors: [
                                    {
                                        opacity: 0.1
                                    },
                                    {
                                        opacity: 0.1
                                    }
                                ]
                            }
                        },
                        shadowSize: 0
                    }],
                    options: {
                        grid: {
                            color: [chartColors.gridColor],
                            tickColor: [chartColors.tickColor],
                            borderWidth: {
                                top: 0,
                                bottom: 1,
                                left: 1,
                                right: 0
                            },
                            borderColor: {
                                bottom: [chartColors.borderColor],
                                left: [chartColors.borderColor]
                            },
                            minBorderMargin: 20,
                            labelMargin: 10,
                            margin: {
                                top: 8,
                                bottom: 20,
                                left: 20
                            },
                            markings: function (axes) {
                                var markings = [];
                                var xaxis = axes.xaxis;
                                for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
                                    markings.push({
                                        xaxis: {
                                            from: x,
                                            to: x + xaxis.tickSize
                                        },
                                        color: [chartColors.white]
                                    });
                                }
                                return markings;
                            }
                        },
                        colors: [chartColors.primary],
                        xaxis: {
                            tickFormatter: function (x) {
                                if ($scope.showXAxisLabels && (x % 1 === 0) && (x >= 0)) {
                                    // x is 0-based
                                    x++;

                                    if (vm.dataPoints.length === $scope.maxDataPoints) {
                                        return (x + pointsDiscarded) + $scope.xAxisUnit;
                                    }
                                    else {
                                        return x + $scope.xAxisUnit;
                                    }
                                }
                                else {
                                    return '';
                                }
                            }
                        },
                        yaxis: {
                            min: 1000000,
                            tickFormatter: function (y) {
                                return ("<span class='blue'>" + $scope.yAxisPrefixUnit + "&nbsp;" + y + $scope.yAxisSuffixUnit + "</span>");
                            }
                        }
                    }
                };

                $scope.$watch('data', function (newValue, oldValue) {
                    if (!_.isUndefined(newValue)) {
                        vm.addDataPoint(newValue.value || 0);
                        vm.liveChart.series[0].data = vm.getChartData();
                    }
                });
            }
        };
    }]);
