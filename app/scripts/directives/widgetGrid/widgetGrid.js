'use strict';

/**
 * @ngdoc directive
 * @name myDashingApp.directive:widgetGrid
 * @description
 * # widgetGrid
 */
angular.module('myDashingApp')
    .directive('widgetGrid', function () {
        return {
            templateUrl: 'scripts/directives/widgetGrid/widgetGrid.html',
            restrict: 'A',
            scope: {
                'data': '=widgetGrid',
                'header': '@',
                'check': '=?',
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
