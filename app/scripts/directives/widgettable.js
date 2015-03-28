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
            template: '<div><div class="title">{{data.title}}</div>' +
            '<table> <tr class="headers"><td ng-repeat="h in data.value.headers">{{h}}</td></tr>' +
            '<tr class="data" ng-repeat="r in data.value.rows"><td ng-repeat="i in r">{{i}}</td></tr>' +
            '</table><div updated-at="data.updatedAt"></div>' +
            '</div>',
            restrict: 'A',
            scope: {
                'data': '=widgetTable'
            }

        };
    });
