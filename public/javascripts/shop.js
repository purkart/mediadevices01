/**
 * Created by Julian Purkart, Thomas Schoenegger on 25-Jan-16.
 */
angular.module('myApp').controller('shop', function ($scope, $http, $log, $filter, $timeout) {

    $scope.customStyle = {};
    $scope.groupedItems = [];
    $scope.itemsPerPage = 16;
    $scope.pagedItems = [];
    $scope.currentPage = 0;

    $scope.loadItems = function () {
        $http.get('/loadItems')
            .success(function (data, status, headers, config) {

                if (data.status == 'OK') {
                    console.log(data);
                    $scope.items = data.data;
                    $scope.search();
                } else {
                    $scope.messages = data.message;
                    $scope.setMessageVisible();
                    if (data.message.length == 0) {
                        $scope.messages = 'Oops, we received your request, but there was an error processing it.';
                    }
                    $log.info(data);
                }
            })
            .error(function (data, status, headers, config) {
                $scope.progress = data;
                $scope.messages = 'There was a network error. Try again later.';
                $scope.setMessageVisible();

                $log.error(data);
            });
    };

    $scope.loadItems();


    //$scope.gap = $scope.shopping_cart_items.length%$scope.itemsPerPage;
    $scope.gap = 1;
    console.log($scope.gap);

    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.items, function (item) {
            for (var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });

        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };


    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];

        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [$scope.filteredItems[i]];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };
    $scope.range = function (size, start, end) {
        var ret = [];
        console.log(size, start, end);

        if (size < end) {
            end = size;
            start = size - $scope.gap;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        console.log(ret);
        return ret;
    };

    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };

    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };

    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    $scope.buy = function(item) {

        $http.put('/addItemToCart', item)
            .success(function (data, status, headers, config) {

                if (data.status == 'OK') {
                    console.log(data);
                    $scope.messages = data.message;
                    $scope.setMessageVisible();
                } else {
                    $scope.messages = data.message;
                    $scope.setMessageVisible();
                    if (data.message.length == 0) {
                        $scope.messages = 'Oops, we received your request, but there was an error processing it.';
                    }
                    $log.info(data);
                }
            })
            .error(function (data, status, headers, config) {
                $scope.progress = data;
                $scope.messages = 'There was a network error. Try again later.';
                $scope.setMessageVisible();
                $log.error(data);
            })
            .finally(function () {
                // Hide status messages after three seconds.
                $timeout(function () {
                    $scope.messages = null;
                    $scope.setMessageHidden();
                }, 3000);
            });
    };
});

