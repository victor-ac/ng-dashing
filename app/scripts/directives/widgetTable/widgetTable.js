'use strict';

/**
 * @ngdoc directive
 * @name myDashingApp.directive:widgetTable
 * @description
 * # widgetTable
 */
angular.module('myDashingApp')
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
