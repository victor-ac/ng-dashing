'use strict';

/**
 * @ngdoc directive
 * @name uxAspectsDashing.directive:widgetTable
 * @description
 * # widgetTable
 */
angular.module('uxAspectsDashing')
    .directive('widgetTable', function () {
        return {
            templateUrl: 'scripts/directives/widgetTable/widgetTable.html',
            restrict: 'A',
            scope: {
                'data': '=widgetTable',
                'header': '@'

            }
        };
    });
