'use strict';

/**
 * @ngdoc directive
 * @name myDashingApp.directive:widgetProfile
 * @description
 * # widgetProfile
 */
angular.module('myDashingApp')
    .directive('widgetProfile', function () {
        return {
            templateUrl: 'scripts/directives/widgetProfile/widgetProfile.html',
            restrict: 'A',
            scope:{
                'data': '=widgetProfile',
                'header': '@'
            },
            controller: function ($scope) {
                $scope.scrollBarConfig = {
                    resizeSensor: true,
                    showOnlyOnHover: false,
                    enableKeyboardNavigation: true,
                    isScrollableH: false,
                    scrollMargin: 5
                };
            }
        };
    });
