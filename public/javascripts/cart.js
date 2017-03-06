/**
 * Created by Julian Purkart, Thomas Schoenegger on 25-Jan-16.
 */
angular.module('myApp').controller('ctrlRead', function ($scope, $http, $log, $filter, $timeout) {

    $scope.showCart = false;
    //$scope.showMessage = true;
    // init
    $scope.sort = {
        sortingOrder: 'id',
        reverse: false
    };

    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 8;
    $scope.pagedItems = [];
    $scope.currentPage = 0;

// Extension for 'Projektarbeit SS2016' - start

    function logArrayElements(element, index, array) {
        console.log('a[' + index + '] = ' + element);
    }

    var options = {excludeAvailableMediaDevices: false};
    new Fingerprint2(options).get(function (result, components) {
        console.log("Calculated hash: " + result); //a hash, representing your device fingerprint
        console.log(components);// an array of FP components

        //Window.add
        //console.log(navigator.mediaDevices.enumerateDevices());
        //console.log(navigator.mediaDevices.enumerateDevices().length);

        navigator.mediaDevices.enumerateDevices().then(
            // Loggen der Nachricht und des Wertes

            function(devices) {
                console.log("test");
                console.log(devices);

                devices.forEach(logArrayElements);

            });

        //console.log(navigator.mediaDevices.getSupportedConstraints());
        //console.log(navigator.mediaDevices.getUserMedia());
        //MediaDevices;
        var config = {
            data: {
                'fingerprint': result
            }
        };
        $http.post('/identify', config);
    });
// Extension for 'Projektarbeit SS2016' - end

    $scope.loadCart = function () {
        $http.get('/loadCart')
            .success(function (data, status, headers, config) {

                if (data.status == 'OK') {
                    console.log(data);
                    $scope.shopping_cart_items = data.data;
                    $scope.search();
                    $scope.calcTotalSum();
                    $scope.showCart = true;
                    //$scope.showMessage = false;
                } else {
                    $scope.messages = data.message;
                    if (data.message.length == 0) {
                        $scope.messages = 'Oops, we received your request, but there was an error processing it.';
                    }
                    $log.info(data);
                }
            })
            .error(function (data, status, headers, config) {
                $scope.progress = data;
                $scope.messages = 'There was a network error. Try again later.';
                $log.error(data);
            })
            .finally(function () {
                // Hide status messages after three seconds.
                $timeout(function () {
                    $scope.messages = null;
                }, 5000);
            });
    };

    $scope.loadCart();


    //$scope.gap = $scope.shopping_cart_items.length%$scope.itemsPerPage;
    $scope.gap = 1;
    console.log($scope.gap);


    $scope.calcTotalSum = function () {
        console.log($scope.shopping_cart_items.length);
        var temp_total = 0;
        for (var i = 0; i < $scope.shopping_cart_items.length; i++) {
            console.log($scope.shopping_cart_items[i].price);
            temp_total += ($scope.shopping_cart_items[i].price * $scope.shopping_cart_items[i].qty)
        }
        //console.log(temp_total);
        $scope.total = temp_total.toString() + ' €';
    };

    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.shopping_cart_items, function (shopping_cart_item) {
            for (var attr in shopping_cart_item) {
                if (searchMatch(shopping_cart_item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sort.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
        }
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

    $scope.update_row = function (item_id, qty) {
        //alert("item_id: " + item_id + " qty: " + qty);

        updateItem = {
            item_id: item_id,
            qty: qty
        };

        $http.put('/updateCart', updateItem)
            .success(function (data, status, headers, config) {

                if (data.status == 'OK') {
                    console.log(data);
                    $scope.messages = data.message;
                    $scope.loadCart();
                } else {
                    $scope.messages = data.message;
                    if (data.message.length == 0) {
                        $scope.messages = 'Oops, we received your request, but there was an error processing it.';
                    }
                    $log.info(data);
                }
            })
            .error(function (data, status, headers, config) {
                $scope.progress = data;
                $scope.messages = 'There was a network error. Try again later.';
                $log.error(data);
            })
            .finally(function () {
                // Hide status messages after three seconds.
                $timeout(function () {
                    $scope.messages = null;
                }, 3000);
            });
    };

    $scope.shareablelink = "test";
});

