'use strict';

angular.module('myDashingApp')
    .filter('dataSize', function () {
        return function (bytes) {
            var sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
            var k = 1024;
            if (bytes === 0) {
                return '0 Bytes';
            }
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)));
            return Math.round(bytes / Math.pow(k, i), 2) + sizes[i];
        };
    }
);
