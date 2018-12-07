'use strict';

/**
 * @ngdoc directive
 *
 * @name uxAspectsDashing.directive:widgetList
 *
 * @description
 * Displays a list of items.
 *
 * @element ANY
 * @param {object} widgetList Object in which the `'list'` property represents an array of objects.
 *                            Each one of them is a key-value pair in which the key is represented by
 *                            the `'name'` property and value by `'value'`
 * @param {string=} color Name of a color to use for the item background and borders.
 *                        Accepts any of the names supported by <a href="https://uxaspects.github.io/UXAspects/#/components/utilities#color-service" target="_blank">Color Service</a> in UX Aspects <br />
 *                        *(default: transparent)*
 * @param {string=} emptyMessage Message to be presented if the list is empty <br /> *(default: "")*
 * @param {string=} header List title <br /> *(default: "")*
 * @param {boolean=} hideBullets Flag controlling whether or not bullet points should be displayed in unordered lists
 *                   *(default: false)*
 * @param {boolean=} isOrdered Flag controlling whether or not the list is ordered <br /> *(default: false)*
 * @param {number=} limit Maximum number of items to be displayed in the list <br /> *(default: no limit)*
 */
angular.module('uxAspectsDashing')
    .directive('widgetList', function () {
        return {
            templateUrl: 'scripts/directives/widgetList/widgetList.html',
            restrict: 'A',
            scope: {
                'data': '=widgetList',
                'color': '@',
                'emptyMessage': '@',
                'header': '@',
                'hideBullets': '=?',
                'isOrdered': '=?',
                'limit': '=?'
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
