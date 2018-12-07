'use strict';

/**
 * @ngdoc directive
 *
 * @name uxAspectsDashing.directive:widgetImage
 *
 * @description
 * Displays an image (JPG, GIF, or PNG) available at a given URL.
 *
 * @element ANY
 * @param {object} widgetImage Object in which the `'imageUrl'` property informs an accessible URL representing a .jpg, .gif, or .png image
 * @param {string=} header Image title <br /> *(default: "")*
 */
angular.module('uxAspectsDashing')
    .directive('widgetImage', function () {
        return {
            templateUrl: 'scripts/directives/widgetImage/widgetImage.html',
            restrict: 'A',
            scope:{
                'data': '=widgetImage',
                'header': '@'
            }
        };
    });
