'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication','User','Message',
	function($scope, $stateParams, $http, $location, Authentication,User,Message) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user()) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				Message.success(response.message);

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				Message.error(response.message);
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
                Message.error(response.message);
			});
		};
	}
]);
