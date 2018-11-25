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
            templateUrl: 'scripts/directives/updatedAt/updatedAt.html',
            restrict: 'A',
            scope:{
                'value' : '=updatedAt'
            },

        };
    });
