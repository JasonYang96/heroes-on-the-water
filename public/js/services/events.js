// Regions factory for get/create/delete functions
angular.module('eventsService', [])
.factory('Regions', function($http) {
	return {
		get : function(region_name) {
			return $http.get('/api/events/' + region_name);
		},
		create : function(formData) {
			return $http.post('/api/events/', formData);
		},
		delete : function(region_name) {
			return $http.delete('/api/events/' + region_name);
		}
	}
})
.factory('Chapters', function($http) {
	return {
		get: function(region_name, chapter_name) {
			return $http.get('/api/events/' + region_name + '/' + chapter_name)
		},
		create: function(region_name, formData) {
			return $http.post('/api/events/' + region_name, formData)
		},
		delete: function(region_name, chapter_name) {
			return $http.delete('/api/events/' + region_name + '/' + chapter_name)
		}
	}
})
