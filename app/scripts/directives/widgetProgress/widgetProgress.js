'use strict';

/**
 * @ngdoc directive
 * @name myDashingApp.directive:widgetProgress
 * @description
 * # widgetProgress
 */
angular.module('myDashingApp')
    .directive('widgetProgress', function () {
        return {
            templateUrl: 'scripts/directives/widgetProgress/widgetProgress.html',
            restrict: 'A',
            scope:{
                'data' : '=widgetProgress',
                'header': '@',
                'type': '@',
                'showValue': '=?',
                'isSize': '=?' //Applicable to donut only
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
