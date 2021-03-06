'use strict';

/**
 * @ngdoc function
 * @name uxAspectsDashing.controller:DashboardCtrl
 * @description
 * # DashboardCtrl
 * Controller of the uxAspectsDashing
 */
angular.module('uxAspectsDashing')
    .controller('DashboardCtrl', function ($scope) {
        var gridster;
        $(document).ready(function () {
            gridster = $('.gridster > ul').gridster({
                /*jshint camelcase: false */
                widget_margins: [1,1],
                widget_base_dimensions: [310, 310],
                min_cols: 4,
                resize: {
                    enabled: true
                }
            });
        });

        // the last received msg
        $scope.msg = {};

        // handles the callback from the received event
        var handleCallback = function (msg) {
            $scope.$apply(function () {
                // $log.info('got msg', msg);
                var msgData = JSON.parse(msg.data);
                $scope[msgData.id] = msgData;
            });
        };

        var source = new EventSource('http://localhost:3030/events');
        source.addEventListener('message', handleCallback, false);
    });
