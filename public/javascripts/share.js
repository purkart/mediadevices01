/**
 * Created by Julian Purkart, Thomas Schoenegger on 25-Jan-16.
 */

angular.module('myApp').controller('share', function ($scope, $http, $log, promiseTracker, $timeout) {

    // Inititate the promise tracker to track form submissions.
    $scope.progress = promiseTracker();

    $scope.hideUrl = true;
    // Form submit handler.
    $scope.share = function (form) {

        var $promise = $http.get('/share')
            .success(function (data, status, headers, config) {

                if (data.status == 'OK') {
                    //$scope.messages = data.message;
                    $scope.hideUrl = false;
                    $scope.shareUrl = data.message;
                    console.log(data);
                    focus($scope.messages);
                } else {
                    $scope.messages = data.message;
                    if (data.message.length == 0) {
                        $scope.messages = 'Oops, we received your request, but there was an error processing it.';
                    }
                    $log.error(data);
                }
            })
            .error(function (data, status, headers, config) {
                $scope.progress = data;
                $scope.messages = 'There was a network error. Try again later.';
                $log.error(data);
                error = true;
            })
            .finally(function () {
                // Hide status messages after three seconds.
                $timeout(function () {
                    $scope.messages = null;
                }, 8000);
            });

        // Track the request and show its progress to the user.
        $scope.progress.addPromise($promise);
    };
});
