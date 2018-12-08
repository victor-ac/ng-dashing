'use strict';

/**
 * @ngdoc directive
 *
 * @name uxAspectsDashing.directive:widgetProfile
 *
 * @description
 * Displays information about an entity (e.g. address book contact, company, computer)
 * which is represented by an image, a name and a list of key-value properties.
 *
 * @element ANY
 * @param {object} widgetProfile Object with the following properties:
 *                               * `'name'`: Name of the entity to be represented
 *                               * `'picture'`: URL pointing to an image
 *                               * `'value'`: Array of key-value pairs representing properties about the entity
 * @param {string=} header Profile title <br /> *(default: "")*
 */
angular.module('uxAspectsDashing')
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
