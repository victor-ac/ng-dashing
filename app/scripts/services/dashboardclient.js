'use strict';

/**
 * @ngdoc service
 * @name myDashingApp.Dashboardclient
 * @description
 * # Dashboardclient
 * Service in the myDashingApp.
 */
angular.module('myDashingApp')
  .service('DashboardClient', function DashboardClient( $http ) {

        var source = 'http://localhost:3030';

        this.listDashboards = function(namespace){
            return $http.get(source + '/dashboards/' + namespace );
        };

  });
