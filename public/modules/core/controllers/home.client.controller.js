'use strict';


angular.module('core').controller('HomeController', ['$scope', '$rootScope', 'Authentication', 'User',
	function($scope, $rootScope, Authentication, User) {

        //Watch user login
        $scope.user = User.get();
        $scope.isAuthenticated = Authentication.isAuthenticated();
        console.log("$scope.user", $scope.user)

        $rootScope.$on('Auth',function(){
            $scope.user = User.get();
            $scope.isAuthenticated = Authentication.isAuthenticated();
        });

		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);
