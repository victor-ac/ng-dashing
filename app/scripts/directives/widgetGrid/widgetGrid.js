'use strict';

/**
 * @ngdoc directive
 *
 * @name uxAspectsDashing.directive:widgetGrid
 *
 * @description
 * Displays a table outlining the properties (columns) and values (rows) of an object. This replicates the behavior
 * of the <a href="https://uxaspects.github.io/UXAspects/#/components/grid#grid-ng1" target="_blank">Grid component</a>
 * in UX Aspects.
 *
 * @element ANY
 * @param {object} widgetGrid Object with the following properties:
 *                            * `'value'`: Array of objects to be listed
 * @param {boolean=} check Flag controlling whether or not checkboxes should be displayed along with rows <br /> *(default: false)*
 * @param {string=} header Grid title <br /> *(default: "")*
 * @param {boolean=} lastUpdated Flag controlling whether or not to show the last date/time the data was updated <br /> *(default: true)*
 */
angular.module('uxAspectsDashing')
    .directive('widgetGrid', function () {
        return {
            templateUrl: 'scripts/directives/widgetGrid/widgetGrid.html',
            restrict: 'A',
            scope: {
                'data': '=widgetGrid',
                'check': '=?',
                'header': '@',
                'lastUpdated': '=?'
            },
            controllerAs: 'vm',
            controller: function ($scope) {
                var vm = this;
                if (_.isUndefined($scope.lastUpdated)) {
                    $scope.lastUpdated = true;
                }
                vm.getSource = function (data) {
                    vm.source = [];
                    vm.columns = [];
                    _.each(data, function (item) {
                        if ($scope.check) {
                            item.checked = false;
                        }
                        vm.source.push(item);
                    });
                    if ($scope.check) {
                        vm.columns.push({
                            title: '',
                            template: '<checkbox style="margin-bottom: 0" ng-model="checked"></checkbox>',
                            width: '40px'
                        });
                    }
                    _.mapKeys(vm.source[0], function (value, key) {
                        if (key !== 'checked') {
                            vm.columns.push({
                                title: _.startCase(key),
                                template: '<span ng-bind="::' + key + '"></span>'
                            });
                        }
                    });
                };
                $scope.$watch('data', function (newValue, oldValue) {
                    if (!_.isEqual(newValue, oldValue)) {
                        vm.getSource(newValue.value);
                    }
                });
            }
        };
    });
