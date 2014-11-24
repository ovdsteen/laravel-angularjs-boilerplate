angular.module('service', [])

	.factory('Password', function($http) {

		return {
			// get all the comments
			get : function(id) {
				return $http.get('/api/passwords/'+id);
			},

			all : function() {
				return $http.get('/api/passwords');
			},

			update : function(data) {
				return $http({
					method: 'PUT',
					url: '/api/passwords/'+data.id,
					data: data
				});
			},

			// save a comment (pass in comment data)
			save : function(passwordData) {
				return $http({
					method: 'POST',
					url: '/api/passwords',
					headers: { 'Content-Type' : 'application/x-www-form-urlencoded' },
					data: $.param(passwordData)
				});
			},

			// destroy a comment
			destroy : function(id) {
				return $http.delete('/api/passwords/' + id);
			}
		}

	});
