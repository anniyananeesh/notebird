notebird.controller('SignupCtrl',['$scope','Data','$window','$localStorage','$state',function($scope,Data,$window,$localStorage,$state){
 		
	$scope.user = {
		phone: ''
	};

	$scope.verifyPhoneNo = function()
	{
		if($scope.user.phone === "")
		{
			$window.alert('You must enter a phone no.');
		}else{

			var params = {
				phone : $scope.user.phone
			};

			$localStorage.phone = $scope.user.phone;

			//Send a four digit code to user
			Data.post('verify',params).then(function(result){

				if(!result.error)
				{
					$localStorage.code = result.code;
					$state.go('verify');
				}

			});

		}
	}

}]);