notebird.controller('SplashCtrl',['$scope','$state','$localStorage','Auth',function($scope,$state,$localStorage,Auth){

	$scope.$storage = $localStorage.$default({
        verification_code: "",
        verified: false,
        phone: null
    });

    if(Auth.isLoggedIn() && (typeof $localStorage.verified != 'undefined' && $localStorage.verified))
    {
    	$state.go('dashboard');
    }

	$scope.signUp = function()
	{
		$state.go('signup');
	};

}]);