// Regions factory for get/create/delete functions
angular.module('mainService', [])
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
		delete: function(region_name, chapter_name, idData) {
			return $http.delete('/api/events/' + region_name + '/' + chapter_name, idData)
		}
	}
})
.factory('Events', function($http) {
	return {
		get : function(region_name, chapter_name, event_name) {
			return $http.get('/api/events/' + region_name + '/' + chapter_name + '/' + event_name)
		},
		create : function(region_name, chapter_name, formData) {
			return $http.post('/api/events/' + region_name + '/' + chapter_name, formData)
		},
		delete: function(region_name, chapter_name, event_name, idData) {
			return $http.delete('/api/events/' + region_name + '/' + chapter_name + '/' + event_name, idData);
		}
	}
});