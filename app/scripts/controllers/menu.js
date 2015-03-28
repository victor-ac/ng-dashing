'use strict';

/**
 * @ngdoc function
 * @name myDashingApp.controller:MenuCtrl
 * @description
 * # MenuCtrl
 * Controller of the myDashingApp
 */
angular.module('myDashingApp')
  .controller('MenuCtrl', function ($scope, $routeParams, DashboardClient) {
        DashboardClient.listDashboards($routeParams.namespace).then(function(result){
            $scope.dashboards= result.data;
        }, function(){
            toastr.error('no connection');
        });

        $scope.getPath = function(dashboard){
            return '#/'+$routeParams.namespace + '/' + dashboard.name;
        }
  });
