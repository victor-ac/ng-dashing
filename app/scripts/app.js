'use strict';

/**
 * @ngdoc overview
 * @name myDashingApp
 * @description
 * # myDashingApp
 *
 * Main module of the application.
 */
angular
    .module('myDashingApp', [
        'ux-aspects',
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch'
    ])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/allDashboards.html',
                controller: 'AllDashboardsCtrl',
                controllerAs: 'vm'
            })
            .when('/:namespace/:dashboard', {
                templateUrl: function (params) {
                    return 'views/dashboards/' + params.namespace + '/' + params.dashboard + '.html';
                },
                controller: 'DashboardCtrl'
            })
            .when('/:namespace', {
                templateUrl: 'views/menu.html',
                controller: 'MenuCtrl'
            })

            .otherwise({
                redirectTo: '/default'
            });
    });
