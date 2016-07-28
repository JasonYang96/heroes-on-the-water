angular.module('HOW', ['regionsController','chaptersController', 'eventsController', 'mainService'])
angular.module('Donor', []);
angular.module('User', []);

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

    $scope.loadEvents = function() {
        $http.get('/events')
            .success(function(data) {
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }

    $scope.signUp = function(user, region_name, chapter_name, event_name){
        var event = { 
            "region_name": region_name,
            "chapter_name": chapter_name,
            "event_name": event_name
        };

        $http.post('/api/signup/' + user.local.name, event)
            .success(function(data) {
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            })
    }

    $scope.toggleHide = function(data) {
        // $scope.isHidden = !$scope.isHidden;
        data.isHidden = !data.isHidden;
    }
    $scope.isHidden = false;

    $scope.isUndefOrNull = function(val)
    {
        return angular.isUndefined(val) || val == null  || val == '';
    }
};

// controller to handle listing, creating, and deleting of donors
function donorController($scope, $http) {
    $scope.formData = {};
    $scope.donors = null;

    // creates a donor if it does not already exist then returns donors
    // param: donor-creation-form input
    // return: list of all donors
    $scope.createDonor = function() {
        $http.post('/api/donors/', $scope.formData)
            .success(function(data) {
                console.log('createDonor - donorCore');
                console.log(data);
                $scope.name = null;
                $scope.donors = data;
                location.reload();
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    }
};

function donorsListController($scope, $http) {
    // lists all events in every chapter in every region
    // returns: list of all events in every chapter in every region
    $http.get('/api/donors')
        .success(function(data) {
            $scope.donors = data;
            $scope.upperBound = Math.ceil($scope.donors.length/2);
            $scope.lowerBound = $scope.upperBound + 1;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };
};

function userController($scope, $http) {
    $scope.formData = {};

    // updates user
    $scope.updateUser = function(user) {
        $http.post('/api/user/' + user._id, $scope.formData)
            .success(function(data) {
                console.log(data);
                $scope.formData = {};
                $scope.user = data;
                location.reload();
            })
            .error(function(data) {
                console.log('Error: ' + data);
                location.reload();
            });
            location.reload()
    };
    // adds regional manager permissions
    $scope.addRegionPermission = function(region) {
        $http.post('/api/manager/' + region[0].name, $scope.formData)
        .success(function(data) {
            console.log(data);
            $scope.formData = {};
            $scope.user = data;
            location.reload();
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // adds chapter manager permissions
    $scope.addChapterPermission = function(region) {
        $http.post('/api/manager/' + region[0].name + '/' + region[0].chapters[0].name, $scope.formData)
        .success(function(data) {
            console.log(data);
            $scope.formData = {};
            $scope.user = data;
            location.reload();
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
    
    // adds event manager permissions
    $scope.addEventPermission = function(region) {
        $http.post('/api/manager/' + region[0].name + '/' + region[0].chapters[0].name + '/' + region[0].chapters[0].events[0].name, $scope.formData)
        .success(function(data) {
            console.log(data);
            $scope.formData = {};
            $scope.user = data;
            location.reload();
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // deletes manager permissions
    $scope.delPermission = function(region) {
        $http.delete('/api/manager/')
        .success(function(data) {
            console.log(data);
            $scope.formData = {};
            $scope.user = data;
            location.reload();
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }

}

function expandController($scope) {
    $scope.exp = true;
};
function toggle(data){
    data.visible = !data.visible;
    console.log("toggle time");
}