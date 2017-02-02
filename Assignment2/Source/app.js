var app = angular.module('neo', ['google-maps']);

app.controller('MainCtrl', function ($scope, $document, $http) {
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
            url: 'http://api.openweathermap.org/data/2.5/weather?q='+$scope.directions.origin+'&APPID=f3be765eab8cc560146965c7922696d8&units=Imperial'
        }).then(function successCallback(response) {
            $scope.origintemp = response.data.main.temp+'\u{00B0}F';
        }, function errorCallback(response) {
            //log error
        });
        $http({
            method: 'GET',
            url: 'http://api.openweathermap.org/data/2.5/weather?q='+$scope.directions.destination+'&APPID=f3be765eab8cc560146965c7922696d8&units=Imperial'
        }).then(function successCallback(response) {
            $scope.desttemp = response.data.main.temp+'\u{00B0}F';
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