'use strict';

/**
 * @ngdoc directive
 * @name uxAspectsDashing.directive:widgetText
 * @description
 * # widgetText
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
