notebird.controller('VerifyController',['$scope','$localStorage','$window','$state','Auth',function($scope,$localStorage,$window,$state,Auth){

	$scope.user = {
		code1: "",
		code2: "",
		code3: "",
		code4: ""
	}

	$scope.verifySMS = function(){

		var code1 = $scope.user.code1,
			code2 = $scope.user.code2,
			code3 = $scope.user.code3,
			code4 = $scope.user.code4;

		if(code1 == "" || code2 == "" || code3 == "" || code4 == "")
		{
			$window.alert('Enter all digits');
		}else{

			var code = $localStorage.code,
				userFullCode = code1+code2+code3+code4;

			if(parseInt(userFullCode) === parseInt(code))
			{
				$localStorage.verified = true;
				Auth.setUser({
					phone: $localStorage.phone
				});

				$state.go('dashboard');
			}else{
				$window.alert('Wrong');
			}

		}

	}

}]);