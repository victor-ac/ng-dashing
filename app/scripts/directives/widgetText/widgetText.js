'use strict';

/**
 * @ngdoc directive
 *
 * @name uxAspectsDashing.directive:widgetText
 *
 * @description
 * Displays a text.
 *
 * @element ANY
 * @param {object} widgetText Object with the following properties:
 *                            * `'value'`: Text to be displayed
 * @param {string=} header Text title <br /> *(default: "")*
 * @param {boolean=} small Flag controlling whether or not to display the text in a smaller font
 *                         <br /> *(default: false)*
 */
angular.module('uxAspectsDashing')
    .directive('widgetText', function () {
        return {
            templateUrl: 'scripts/directives/widgetText/widgetText.html',
            restrict: 'A',
            scope:{
                'data': '=widgetText',
                'header': '@',
                'small': '=?'
            }
        };
    });
