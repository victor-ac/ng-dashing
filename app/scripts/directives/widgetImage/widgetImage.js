'use strict';

/**
 * @ngdoc directive
 * @name myDashingApp.directive:widgetImage
 * @description
 * # widgetImage
 */
angular.module('myDashingApp')
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
