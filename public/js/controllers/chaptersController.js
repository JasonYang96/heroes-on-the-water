// controller to handle listing, creating, and deleting of chapters
angular.module('chaptersController', [])
.controller('chaptersController', function($scope, $http, Chapters) {
	$scope.formData = {};

	// grabs a region from mongoDB
	// param: region_name from input
	// return: list of all events in every chapter in specified region
	$scope.getChapter = function(region_name, chapter_name) {
		Chapters.get(region_name, chapter_name)
	        .success(function(data) {
	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });
	}

    // creates a Chapter if it does not already exist then returns Chapters
    // param: name from Chapter-creation-form input
    // return: list of all events in every chapter in every Chapter
    $scope.createChapter = function(region_name) {
    	if (!$.isEmptyObject($scope.formData.name)) {
    		Chapters.create(region_name, $scope.formData)
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

    // deletes a chapter then returns remaining Chapters
    // param: chapter_name from html div
    // return: list of all events in every chapter in every Chapter
    $scope.deleteChapter = function(region_name, chapter_name) {
        Chapters.delete(region_name, chapter_name)
            .success(function(data) {
                $scope.regions = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
})