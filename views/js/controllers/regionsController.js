// controller to handle listing, creating, and deleting of regions

angular.module('regionsController', [])
.controller('regionsController', function($scope, $http, Regions) {
	$scope.formData = {};

	// grabs a region from mongoDB
	// param: region_name from input
	// return: list of all events in every chapter in specified region
	$scope.getRegion = function(region_name) {
		Regions.get(region_name)
	        .success(function(data) {
	            console.log(data);
	        })
	        .error(function(data) {
	            console.log('Error: ' + data);
	        });
	}

    // creates a region if it does not already exist then returns regions
    // param: name from region-creation-form input
    // return: list of all events in every chapter in every region
    $scope.createRegion = function() {
    	if (!$.isEmptyObject($scope.formData.name)) {
    		Regions.create($scope.formData)
    			.success(function(data) {
    			    $scope.formData = {};
    			    $scope.regions = data;
    			    console.log(data);
                    location.reload();
    			})
    			.error(function(data) {
    			    console.log('Error: ' + data);
    			});
    	}
    };

    // deletes a region then returns remaining regions
    // param: region_name from html div
    // return: list of all events in every chapter in every region
    $scope.deleteRegion = function(region_name) {
        Regions.delete(region_name)
            .success(function(data) {
                $scope.regions = data;
                console.log(data);
                location.reload();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
})