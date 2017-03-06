/**
 * Created by Julian Purkart, Thomas Schoenegger on 25-Jan-16.
 */
angular.module('myApp').controller('signup', function ($scope, $http, $log, promiseTracker, $timeout) {
    $scope.customStyle = {};
    $scope.turnGreen = function () {
        $scope.customStyle.style = {"background-color": "lightgreen"};
    };

    $scope.turnRed = function () {
        $scope.customStyle.style = {"background-color": "red"};
    };

    // Inititate the promise tracker to track form submissions.
    $scope.progress = promiseTracker();

    $scope.hideUrl = true;

    // Form submit handler.
    $scope.submit = function (form) {
        // Trigger validation flag.
        $scope.submitted = true;

        // If form is invalid, return and let AngularJS show validation errors.
        if (form.$invalid) {
            return;
        }

        // Default values for the request.
        var config = {
            params: {
                //'callback': 'JSON_CALLBACK',
                'first_name': $scope.first_name,
                'last_name': $scope.last_name,
                'email': $scope.email,
                'pwd': $scope.pwd,
                'comments': $scope.comments
            }
        };

        // remember an error
        var error = false;
        // Perform JSONP request.



        var $promise = $http.post('/signup', config)
            .success(function (data, status, headers, config) {

                $scope.turnRed();

                if (data.status == 'OK') {
                    $scope.turnGreen();
                    $scope.first_name = null;
                    $scope.last_name = null;
                    $scope.email = null;
                    $scope.pwd = null;
                    $scope.comments = null;
                    $scope.messages = data.message;
                    if (data.message.length == 0) {
                        $scope.messages = 'You have been registered!';
                    }
                    if (data.verification_link.length != 0) {
                        $scope.hideUrl = false;
                        $scope.verify_email = data.verification_link;
                    }
                    $scope.submitted = false;
                    console.log(data);
                } else {
                    $scope.messages = data.message;
                    if (data.message.length == 0) {
                        $scope.messages = 'Oops, we received your request, but there was an error processing it.';
                    }
                    $log.error(data);

                    error = true;
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

                    // redirect to the homepage if signup was successfull
                    if (!error) {
                        //window.location = "/";
                    }
                }, 5000);
            });

        // Track the request and show its progress to the user.
        $scope.progress.addPromise($promise);
    };

});