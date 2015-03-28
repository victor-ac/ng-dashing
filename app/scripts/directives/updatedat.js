'use strict';

/**
 * @ngdoc directive
 * @name myDashingApp.directive:updatedAt
 * @description
 * # updatedAt
 */
angular.module('myDashingApp')
    .directive('updatedAt', function () {
        return {
            template: '<div>Last updated at {{value|date:"medium"}}</div>',
            restrict: 'A',
            scope:{
                'value' : '=updatedAt'
            },

        };
    });
