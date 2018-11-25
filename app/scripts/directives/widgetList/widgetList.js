'use strict';

/**
 * @ngdoc directive
 * @name myDashingApp.directive:widgetList
 * @description
 * # widgetList
 */
angular.module('myDashingApp')
    .directive('widgetList', function () {
        return {
            templateUrl: 'scripts/directives/widgetList/widgetList.html',
            restrict: 'A',
            scope: {
                'data': '=widgetList',
                'isOrdered': '=?',
                'limit': '=?',
                'hideBullets': '=?', // Applicable only to un-ordered lists
                'color': '@', // UX Aspects theme color names only
                'emptyMessage': '@',
                'header': '@'
            },
            controllerAs: 'vm',
            controller: function ($scope, $colorService) {
                var vm = this;

                vm.scrollBarConfig = {
                    resizeSensor: true,
                    showOnlyOnHover: false,
                    enableKeyboardNavigation: true,
                    isScrollableH: false,
                    scrollMargin: 5
                };

                if (_.isUndefined($scope.isOrdered)) {
                    $scope.isOrdered = false;
                }

                if ($scope.color) {
                    $scope.backgroundColor = $colorService.getColor($scope.color).setAlpha(0.2).toRgba();
                    $scope.borderColor = $colorService.getColor($scope.color).setAlpha(0.5).toRgba();
                }
            }
        };
    });
