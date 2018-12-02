'use strict';

/**
 * @ngdoc directive
 * @name uxAspectsDashing.directive:widgetImage
 * @description
 * # widgetImage
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
