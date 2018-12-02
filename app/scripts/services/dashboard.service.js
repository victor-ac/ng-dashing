'use strict';

/**
 * @ngdoc service
 * @name uxAspectsDashing.dashboardService
 * @description
 * # dashboardService
 * Service in the uxAspectsDashing.
 */
angular.module('uxAspectsDashing')
    .service('dashboardService', function ($http, $q) {

        var backendUrl = 'http://localhost:3030',
            dashboardsUrl = backendUrl + '/dashboards/';

        this.getNamespaceDashboards = function (namespace){
            return $http.get(dashboardsUrl + namespace);
        };

        this.getAllDashboards = function () {
            var deferred = $q.defer();

            $http.get(dashboardsUrl).then(function (response) {
                deferred.resolve(response.data);
            },
            function (error) {
                deferred.reject(error);
            });

            return deferred.promise;
        };
    });
