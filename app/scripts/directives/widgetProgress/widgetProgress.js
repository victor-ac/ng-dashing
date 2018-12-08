'use strict';

/**
 * @ngdoc directive
 *
 * @name uxAspectsDashing.directive:widgetProgress
 *
 * @description
 * Displays the progress (in percentage) towards a certain metric.
 *
 * @element ANY
 * @param {object} widgetProgress Object with the following properties:
 *                                * `'value'` Object with the following properties:
 *                                  * `'current'`: Number indicating current progress
 *                                  * `'total'`: Number representing 100% of the progress
 * @param {string=} header Progress title <br /> *(default: "")*
 * @param {boolean=} isSize Flag controlling whether or not the number represents file size.
 *                          If `'true'`, a filter will be applied to show the number in B, KB, MB, GB, or TB.
 *                          This is only applicable if `'type'` is `'donut'` <br /> *(default: false)*
 * @param {boolean=} showValue Flag controlling visibility of the raw value (not the percentage) <br /> *(default: false)*
 * @param {string=} type Progress type: `'donut'` or `'progress-bar'` <br /> *(default: "progress-bar")*
 */
angular.module('uxAspectsDashing')
    .directive('widgetProgress', function () {
        return {
            templateUrl: 'scripts/directives/widgetProgress/widgetProgress.html',
            restrict: 'A',
            scope:{
                'data' : '=widgetProgress',
                'header': '@',
                'isSize': '=?',
                'showValue': '=?',
                'type': '@'
            },
            controller: function ($scope, $filter) {
                if ($scope.type !== 'donut') {
                    $scope.type = 'progress-bar';
                }

                var outerColor = 'rgba(0, 115, 231, 0.2)',
                    innerColor = 'rgb(0, 115, 231)';

                if (!!$scope.data) {
                    $scope.data = {};
                }

                $scope.dataset = [
                    {
                        color: outerColor,
                        value: 100
                    },
                    {
                        color: innerColor,
                        value: 0
                    }
                ];

                $scope.donutOptions = {
                    size: 200,
                    donutWidth: 15,
                    donutSpacing: 4,
                    hoverAnimation: false,
                    tooltip: {
                        show: false
                    },
                    centerLabel: {
                        show: true,
                        color: '#0073e7',
                        fontSize: 45,
                        text: ''
                    }
                };

                $scope.$watch('data', function (newValue, oldValue) {
                    if (!_.isEqual(newValue, oldValue)) {
                        $scope.dataset[1].value = newValue.value.current / newValue.value.total * 100;
                        $scope.percentage = Math.round($scope.dataset[1].value) + '%';
                        $scope.donutOptions.centerLabel.text = Math.round($scope.dataset[1].value) + '%';
                        if ($scope.isSize) {
                            $scope.value = $filter('dataSize')(newValue.value.current);
                        }
                        else {
                            $scope.value = newValue.value.current;
                        }
                    }
                });
            }
        };
    });
