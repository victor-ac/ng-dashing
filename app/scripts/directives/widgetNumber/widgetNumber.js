'use strict';

/**
 * @ngdoc directive
 * @name uxAspectsDashing.directive:widgetNumber
 * @description
 * # widgetNumber
 */
angular.module('uxAspectsDashing')
    .directive('widgetNumber', function () {
        return {
            templateUrl: 'scripts/directives/widgetNumber/widgetNumber.html',
            restrict: 'A',
            scope: {
                'data': '=widgetNumber',
                'prefix': '@',
                'showVariation': '=?',
                'suffix': '@',
                'header': '@'
            },
            controller: function ($scope) {
                if (_.isUndefined($scope.showVariation)) {
                    $scope.showVariation = false;
                }
            }
        };
    });
