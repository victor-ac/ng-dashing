'use strict';

/**
 * @ngdoc function
 * @name uxAspectsDashing.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the uxAspectsDashing
 */
angular.module('uxAspectsDashing')
  .controller('MainCtrl', function ($scope, $log, $rootScope) {

    // the last received msg
    $rootScope.msg = {};

    // handles the callback from the received event
    var handleCallback = function (msg) {
      // console.log('msg is here', msg);
      $scope.$apply(function () {
        // $log.info('got msg', msg);
        var msgData = JSON.parse(msg.data);
        $rootScope[msgData.id] = msgData;
      });
    };

    var source = new EventSource('http://localhost:3030/events');
    source.addEventListener('message', handleCallback, false);

  });
