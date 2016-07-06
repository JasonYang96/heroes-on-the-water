// public/core.js
var heroesOnTheWater = angular.module('heroesOnTheWater', []);

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

// controller to handle listing, creating, and deleting of regions
function regionController($scope, $http) {
    $scope.formData = {};
    $scope.regions = null;

    // creates a region if it does not already exist then returns regions
    // param: name from region-creation-form input
    // return: list of all events in every chapter in every region
    $scope.createRegion = function() {
        $http.post('/api/events/', $scope.formData)
            .success(function(data) {
                $scope.name = null;
                $scope.regions = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // grabs a region from mongoDB
    // param: region_name from input
    // return: list of all events in every chapter in specified region
    $scope.grabRegion = function(region_name) {
        $http.get('/api/events/' + region_name)
            .success(function(data) {
                $scope.regions = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            })
    };

    // deletes a region then returns remaining regions
    // param: region_name from html div
    // return: list of all events in every chapter in every region
    $scope.deleteRegion = function(region_name) {
        $http.delete('/api/events/' + region_name)
            .success(function(data) {
                $scope.regions = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}

// controller to handle listing, creating, and deleting of chapters
function chapterController($scope, $http) {
    $scope.formData = {};
    $scope.chapters = null;

    // creates a chapter if it does not already exist then returns chapters
    // param: name from chapter-creation-form input, region_name from input
    // return: list of all events in every chapter in every chapter
    $scope.createChapter = function(region_name) {
        $http.post('/api/events/testingtestingtesting/', $scope.formData)
            .success(function(data) {
                $scope.name = null;
                $scope.location = null;
                $scope.chapters = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // grabs a chapter from mongoDB
    // param: chapter_name, region_name from input
    // return: list of all events in every chapter in specified chapter
    $scope.grabChapter = function(region_name, chapter_name) {
        $http.get('/api/events/' + region_name + '/' + chapter_name)
            .success(function(data) {
                $scope.chapters = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            })
    };

    // deletes a chapter then returns remaining chapters
    // param: chapter_name, region_name from html div
    // return: list of all events in every chapter in every chapter
    $scope.deleteChapter = function(region_name, chapter_name) {
        $http.delete('/api/events/' + region_name + '/' + chapter_name)
            .success(function(data) {
                $scope.chapters = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}

// controller to handle listing, creating, and deleting of events
function eventController($scope, $http) {
    $scope.formData = {};
    $scope.events = null;

    // creates a event if it does not already exist then returns events
    // param: name from event-creation-form input, region and chapter name from input
    // return: list of all events in every chapter in every event
    $scope.createEvent = function(region_name, chapter_name) {
        $http.post('/api/events/testingtestingtesting/testtest/', $scope.formData)
            .success(function(data) {
                $scope.name = null;
                $scope.events = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // grabs a event from mongoDB
    // param: event_name from input, region and chapter name from input
    // return: list of all events in every chapter in specified event
    $scope.grabEvent = function(region_name, chapter_name, event_name) {
        $http.get('/api/events/' + region_name + '/' + chapter_name + '/' + event_name)
            .success(function(data) {
                $scope.events = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            })
    };

    // deletes a event then returns remaining events
    // param: event_name from html div, region, chapter name from input
    // return: list of all events in every chapter in every event
    $scope.deleteEvent = function(region_name, chapter_name, event_name) {
        $http.delete('/api/events/' + region_name + '/' + chapter_name + '/' + event_name)
            .success(function(data) {
                $scope.events = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}