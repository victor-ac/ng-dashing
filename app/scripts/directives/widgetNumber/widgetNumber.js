'use strict';

/**
 * @ngdoc directive
 *
 * @name uxAspectsDashing.directive:widgetNumber
 *
 * @description
 * Displays a number and, optionally, the variation since the last value.
 *
 * @element ANY
 * @param {object} widgetNumber Object in which the `'value'` property represents a number and
 *                 `'variation'` represents the delta (in percentage) between the previous value and the current one
 * @param {string=} header Number title <br /> *(default: "")*
 * @param {string=} prefix String to be prepended to the number <br /> *(default: "")*
 * @param {boolean=} showVariation Flag controlling whether or not the variation should be displayed <br />
 *                                 *(default: false)*
 * @param {string=} suffix String to be appended to the number <br /> *(default: "")*
 */
angular.module('uxAspectsDashing')
    .directive('widgetNumber', function () {
        return {
            templateUrl: 'scripts/directives/widgetNumber/widgetNumber.html',
            restrict: 'A',
            scope: {
                'data': '=widgetNumber',
                'header': '@',
                'prefix': '@',
                'showVariation': '=?',
                'suffix': '@'
            },
            controller: function ($scope) {
                if (_.isUndefined($scope.showVariation)) {
                    $scope.showVariation = false;
                }
            }
        };
    });
