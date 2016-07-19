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
            console.log("=== donor List Controller ===")
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
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
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // adds manager permissions
    $scope.addPermission = function(region) {
        $http.post('/api/manager/add/' + region.id, $scope.formData)
        .success(function(data) {
            console.log(data);
            $scope.formData = {};
            $scope.user = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // deletes manager permissions
    $scope.delPermission = function(region) {
        $http.post('/api/manager/del/' + region.id, $scope.formData)
        .success(function(data) {
            console.log(data);
            $scope.formData = {};
            $scope.user = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    }
}