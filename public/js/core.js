angular.module('HOW', ['regionsController','chaptersController', 'eventsController', 'mainService'])

function mainController($scope, $http) {
    // lists all events in every chapter in every region
    // returns: list of all events in every chapter in every region
    $http.get('/api/events')
        .success(function(data) {
            $scope.regions = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}