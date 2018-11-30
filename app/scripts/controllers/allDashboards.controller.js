'use strict';

angular.module('myDashingApp')
    .controller('AllDashboardsCtrl', function ($scope, dashboardService, $location) {
        var vm = this;

        vm.iconConfig = {
            folder: {
                collapsed: 'hpe-folder',
                expanded: 'hpe-folder-open'
            },
            item: 'hpe-dashboard'
        };

        vm.treeOptions = {
          showTreeLines: false,
          openOnSelect: true,
          loadHeight: 72
        };

        vm.selected = {
            id: '0',
            title: ''
        };

        dashboardService.getAllDashboards().then(function (dashboardsInAllNamespaces) {
            vm.treeViewData = [];

            if (dashboardsInAllNamespaces.length) {
                dashboardsInAllNamespaces = _.sortBy(dashboardsInAllNamespaces, 'namespace');
                _.each(dashboardsInAllNamespaces, function (namespace) {
                    var namespaceNode = {
                        id: _.uniqueId('root_'),
                        title: namespace.namespace,
                        allowChildren: true,
                        type: 'folder',
                        permissions: {
                            edit: false
                        },
                        nodes: _.map(namespace.dashboards, function (dashboard) {
                            return {
                                id: _.uniqueId('child_'),
                                title: _.startCase(dashboard),
                                allowChildren: false,
                                type: 'item',
                                permissions: {
                                    edit: false
                                },
                                link: ('/' + namespace.namespace + '/' + dashboard),
                                nodes: []
                            };
                        })
                    };
                    vm.treeViewData.push(namespaceNode);
                });
            }
        },
        function () {
            vm.treeViewData = [];
        });

        $scope.$watch('vm.selected', function (newValue, oldValue) {
            if (!_.isEqual(newValue, oldValue)) {
                if (_.startsWith(newValue.id, 'child_')) {
                    $location.path(newValue.link);
                }
            }
        });
    });