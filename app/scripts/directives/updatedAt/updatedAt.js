'use strict';

/**
 * @ngdoc directive
 * @name uxAspectsDashing.directive:updatedAt
 * @description
 * # updatedAt
 */
angular.module('uxAspectsDashing')
    .directive('updatedAt', function () {
        return {
            templateUrl: 'scripts/directives/updatedAt/updatedAt.html',
            restrict: 'A',
            scope:{
                'value' : '=updatedAt'
            },

        };
    });
