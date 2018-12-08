'use strict';

/**
 * @ngdoc directive
 *
 * @name uxAspectsDashing.directive:widgetTable
 *
 * @description
 * Displays a table with configurable columns and rows. The main difference to the
 * {@link uxAspectsDashing.directive:widgetGrid widgetGrid} relies on how the data
 * object is structured. Here, it needs to consist of `'headers'` and `'rows'`.
 * There, the structure can be anything.
 *
 * @element ANY
 * @param {object} widgetTable Object with the following properties:
 *                             * `'value'`: Object representing the table data. It should have the following properties:
 *                               * `'headers'`: Array with the column names
 *                               * `'rows'`: Array of arrays. Each element in the inner array maps to a column
 * @param {string=} header Table title <br /> *(default: "")*
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
