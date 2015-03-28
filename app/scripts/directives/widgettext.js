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
            template: '<div><div class="title">{{data.title}}</div><div class="value">{{data.value}}</div><div updated-at="data.updatedAt"></div></div>',
            restrict: 'A',
            scope:{
                'data': '=widgetText'
            }

        };
    });
