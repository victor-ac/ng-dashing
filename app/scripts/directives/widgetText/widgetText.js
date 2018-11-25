'use strict';

/**
 * @ngdoc directive
 * @name myDashingApp.directive:widgetText
 * @description
 * # widgetText
 */
angular.module('myDashingApp')
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
