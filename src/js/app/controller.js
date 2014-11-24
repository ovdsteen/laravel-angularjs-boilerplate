angular.module('controller', [])

	.controller('mainController', function($scope, $http, $modal, $log, Password, Client) {

		$scope.loading = true;

		Password.all().success(function(data) {
			$scope.passwords = data;
			$scope.loading = false;
		});

		Client.all().success(function(data) {
			$scope.clients = data;
		});

		$scope.open = function (id) {

			Password.get(id).success(function(data) {

				var modalInstance = $modal.open({
					templateUrl: '/modals/password',
					controller: 'modalController',
					resolve: {
						modalData: function () {
							return data;
						},
					}
				});

				modalInstance.result.then(function (items) {
					$scope.passwords = items;
				}, function () {
					$log.info('Modal dismissed at: ' + new Date());
				});

			});

		};

		$scope.submitPassword = function() {

			$scope.loading = true;

			Password.save($scope.passwordData).success(function(data) {

				Password.all().success(function(getData) {
					$scope.passwords = getData;
					$scope.loading = false;
				});

			}).error(function(data) {
				console.log(data);
			});

		};

		$scope.deletePassword = function(id) {
			$scope.loading = true;

			Password.destroy(id).success(function(data) {

				Password.all().success(function(getData) {
					$scope.passwords = getData;
					$scope.loading = false;
				});

			});

		};

	}).controller('modalController', function ($scope, $modalInstance, modalData, Password) {

		// Please note that $modalInstance represents a modal window (instance) dependency.
		// It is not the same as the $modal service used above.

		$scope.modalData = modalData;

		$scope.ok = function () {

			$scope.loading = true;
			Password.update($scope.modalData).success(function(data) {

				Password.all().success(function(getData) {
					$modalInstance.close(getData);
				});

			}).error(function(data) {
				console.log(data);
			});

		};

		$scope.cancel = function () {
			$modalInstance.dismiss('cancel');
		};

	});
