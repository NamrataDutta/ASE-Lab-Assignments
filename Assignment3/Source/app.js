var app = angular.module('neo', ['ui.router', 'google-maps', 'facebook']);
app.config(['FacebookProvider', '$stateProvider', '$urlRouterProvider', '$locationProvider', function (FacebookProvider, $stateProvider, $urlRouterProvider, $locationProvider) {
    var myAppId = '177848839368358';

    // You can set appId with setApp method
    FacebookProvider.setAppId(myAppId);

    /**
     * After setting appId you need to initialize the module.
     * You can pass the appId on the init method as a shortcut too.
     */
    FacebookProvider.init(myAppId);


}]);
app.controller('MainCtrl', function ($scope, $rootScope, $document, $http, $timeout, $state, Facebook, $location, $window) {

    $scope.user = {};

    // Defining user logged status
    $scope.logged = false;

    // And some fancy flags to display messages upon user status change
    $scope.byebye = false;
    $scope.salutation = false;

    /**
     * Watch for Facebook to be ready.
     * There's also the event that could be used
     */
    $scope.$watch(
        function () {
            return Facebook.isReady();
        },
        function (newVal) {
            if (newVal)
                $scope.facebookReady = true;
        }
    );

    var userIsConnected = false;

    Facebook.getLoginStatus(function (response) {
        if (response.status == 'connected') {
            userIsConnected = true;
        }
    });

    /**
     * IntentLogin
     */
    $scope.IntentLogin = function () {
        //if (!userIsConnected) {
        // $scope.login();
        //$state.go('index')
        //$window.location.href = '/map.html';
        //}
        $scope.login();
        //$state.go('index')
        //else $window.location.href = '/map.html';
    };

    /**
     * Login
     */
    $scope.login = function () {
        Facebook.login(function (response) {
            if (response.status == 'connected') {
                $scope.logged = true;
                $scope.me();
            }

        });
    };

    /**
     * me
     */
    $scope.me = function () {
        Facebook.api('/me', function (response) {
            /**
             * Using $scope.$apply since this happens outside angular framework.
             */
            $scope.$apply(function () {
                $scope.user = response;
                // Setting a cookie

                $window.location.href = '/mashupf.html';
            });

        });
    };

    /**
     * Logout
     */
    $scope.logout = function () {
        Facebook.logout(function () {
            $scope.$apply(function () {
                $scope.user = {};
                $scope.logged = false;
            });
        });
    }

    /**
     * Taking approach of Events :D
     */
    $scope.$on('Facebook:statusChange', function (ev, data) {
        console.log('Status: ', data);
        if (data.status == 'connected') {
            $scope.$apply(function () {
                $scope.salutation = true;
                $scope.byebye = false;
            });
        } else {
            $scope.$apply(function () {
                $scope.salutation = false;
                $scope.byebye = true;

                // Dismiss byebye message after two seconds
                $timeout(function () {
                    $scope.byebye = false;
                }, 2000)
            });
        }


    });
    0
    // map object
    $scope.map = {
        control: {},
        center: {
            latitude: -37.812150,
            longitude: 144.971008
        },
        zoom: 14
    };

    // marker object
    $scope.marker = {
        center: {
            latitude: -37.812150,
            longitude: 144.971008
        }
    }

    // instantiate google map objects for directions
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();
    var geocoder = new google.maps.Geocoder();

    // directions object -- with defaults
    $scope.directions = {
        // origin: "Collins St, Melbourne, Australia",
        // destination: "MCG Melbourne, Australia",
        // showList: false
    }

    // get directions using google maps api
    $scope.getDirections = function () {

        $http({
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + $scope.directions.origin + '&APPID=f3be765eab8cc560146965c7922696d8&units=Imperial'
        }).then(function successCallback(response) {
            $scope.origintemp = response.data.main.temp + '\u{00B0}F';
        }, function errorCallback(response) {
            //log error
        });
        $http({
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + $scope.directions.destination + '&APPID=f3be765eab8cc560146965c7922696d8&units=Imperial'
        }).then(function successCallback(response) {
            $scope.desttemp = response.data.main.temp + '\u{00B0}F';
        }, function errorCallback(response) {
            //log error
        });
        var request = {
            origin: $scope.directions.origin,
            destination: $scope.directions.destination,
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        };
        directionsService.route(request, function (response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap($scope.map.control.getGMap());
                directionsDisplay.setPanel(document.getElementById('directionsList'));
                $scope.directions.showList = true;
            } else {
                alert('Google route unsuccesfull!');
            }
        });
    }
}).directive('googleplace', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, model) {
            var options = {
                types: []
                // componentRestrictions: {}
            };
            scope.gPlace = new google.maps.places.Autocomplete(element[0], options);

            google.maps.event.addListener(scope.gPlace, 'place_changed', function () {
                scope.$apply(function () {
                    model.$setViewValue(element.val());
                });
            });
            scope.$on('$destroy', function () {
                google.maps.event.clearInstanceListeners(element[0]);
            });
        }
    }
});