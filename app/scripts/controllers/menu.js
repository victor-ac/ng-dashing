'use strict';

/**
 * @ngdoc function
 * @name myDashingApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the myDashingApp
 */
angular.module('myDashingApp')
  .controller('MenuCtrl', function ($scope, $routeParams, dashboardService) {
        dashboardService.getNamespaceDashboards($routeParams.namespace).then(function (result) {
            $scope.dashboards = result.data;
        }, function (error) {
            toastr.error('no connection (' + error + ')');
        });

        $scope.getPath = function(dashboard) {
            return '#/'+ $routeParams.namespace + '/' + dashboard.name;
        };
  });
