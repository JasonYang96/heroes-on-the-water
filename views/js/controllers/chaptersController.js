// controller to handle listing, creating, and deleting of chapters
angular.module('chaptersController', [])
.controller('chaptersController', function($scope, $http, Chapters) {
	$scope.formData = {};
    $scope.idData = {};

	// grabs a chapter from mongoDB
    // param: chapter_name, region_name from input
    // return: list of all events in every chapter in specified chapter
	$scope.getChapter = function(region_name, chapter_name) {
		Chapters.get(region_name, chapter_name)
	        .success(function(data) {
	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });
	}

    // creates a chapter if it does not already exist then returns chapters
    // param: region_name from input, name from chapter-creation-form input
    // return: list of all events in every region in every chapter
    $scope.createChapter = function(region) {
    	if (!$.isEmptyObject($scope.formData.name)) {
    		Chapters.create(region.name, $scope.formData)
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

    // deletes a chapter then returns remaining chapters
    // param: chapter_name, region_name from html div
    // return: list of all events in every chapter in every chapter
    $scope.deleteChapter = function(region_name, chapter_name, region_id, chapter_id) {
        $scope.idData.region_id = region_id;
        $scope.idData.chapter_id = chapter_id;
        Chapters.delete(region_name, chapter_id, $scope.idData)
            .success(function(data) {
                $scope.regions = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
})