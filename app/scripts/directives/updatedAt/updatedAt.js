'use strict';

/**
 * @ngdoc directive
 *
 * @name uxAspectsDashing.directive:updatedAt
 *
 * @description
 * Displays a text meant to inform the last time the widget data was updated.
 *
 * @element ANY
 * @param {Date} updatedAt Value representing the date in which the widget was updated for the last time
 *
 * @example
 * ```html
 *    <div updated-at="data.updatedAt"></div>
 * ```
 */
angular.module('uxAspectsDashing')
    .directive('updatedAt', function () {
        return {
            templateUrl: 'scripts/directives/updatedAt/updatedAt.html',
            restrict: 'A',
            scope:{
                'value' : '=updatedAt'
            },

        };
    });
