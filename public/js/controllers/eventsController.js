// controller to handle listing, creating, and deleting of events
angular.module('eventsController', [])
.controller('eventsController', function($scope, $http, Events) {
	$scope.formData = {};
    $scope.idData = {};

	// grabs a event from mongoDB
    // param: event_name from input, region and chapter name from input
    // return: list of all events in every chapter in specified event
    $scope.getEvent = function(region_name, chapter_name, event_name) {
        Events.get(region_name, chapter_name, event_name)
            .success(function(data) {
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            })
    };
    // creates a event if it does not already exist then returns events
    // param: name from event-creation-form input, region and chapter name from input
    // return: list of all events in every chapter in every event
    $scope.createEvent = function(region_name, chapter_name) {
        if (!$.isEmptyObject($scope.formData.name)) {
            Events.create(region_name, chapter_name, $scope.formData)
                .success(function(data) {
                    $scope.formData = {};
                    $scope.regions = data;
                    console.log(data);
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }
    };

    // deletes a event then returns remaining events
    // param: event_name from html div, region, chapter name from input
    // return: list of all events in every chapter in every event
    $scope.deleteEvent = function(region_name, chapter_name, event_name, region_id, chapter_id, event_id) {
        idData.region_id = region_id;
        idData.chapter_id = chapter_id;
        idData.event_id = event_id;
        Events.delete(region_name, chapter_name, event_name, $scope.idData)
            .success(function(data) {
                $scope.regions = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
})