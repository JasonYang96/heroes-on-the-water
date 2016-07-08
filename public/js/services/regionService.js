eventsService.factory('Regions', function($http) {
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
