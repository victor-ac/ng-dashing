'use strict';

/**
 * @ngdoc directive
 * @name uxAspectsDashing.directive:widgetRssFeed
 * @description
 * # widgetRssFeed
 */
angular.module('uxAspectsDashing')
    .directive('widgetRssFeed', ['timeAgoService', function (timeAgoService) {
        return {
            templateUrl: 'scripts/directives/widgetRssFeed/widgetRssFeed.html',
            restrict: 'A',
            scope: {
                'data': '=widgetRssFeed',
                'header': '@'
            },
            controllerAs: 'vm',
            controller: function ($scope, timeAgoService) {
                var vm = this;

                vm.scrollBarConfig = {
                    resizeSensor: true,
                    showOnlyOnHover: false,
                    enableKeyboardNavigation: true,
                    isScrollableH: false,
                    scrollMargin: 5
                };

                timeAgoService.setStrings({
                    lessThanSecond: '< 1s ago',
                    second: '1s ago',
                    seconds: '{x} s ago',
                    minute: '1 min ago',
                    minutes: '{x} min ago',
                    hour: '1h ago',
                    hours: '{x}h ago',
                    day: '1 day ago',
                    days: '{x} days ago',
                    week: '1 week ago',
                    weeks: '{x} weeks ago',
                    month: '1 month ago',
                    months: '{x} months ago',
                    year: '1 year ago',
                    years: '{x} years ago'
                });

                $scope.$watch('data', function (newValue, oldValue) {
                    if (!_.isEqual(newValue, oldValue)) {
                        var now = new Date();
                        _.each(newValue.items, function (item) {
                            item.timeAgo = timeAgoService.timeSince(moment(newValue.items[0].pubDate).toDate(), now);
                        });
                    }
                })
            }
        };
    }]);
