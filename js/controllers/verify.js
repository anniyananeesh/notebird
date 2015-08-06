notebird.controller('VerifyController',['$scope','$localStorage','$window','$state','Auth','PushNotificationsService',function($scope,$localStorage,$window,$state,Auth,PushNotificationsService){

	$scope.user = {
		code1: "",
		code2: "",
		code3: "",
		code4: ""
	}

	smsplugin.isSupported(function(result){
		alert(result);
	},function(error){
		alert(error);
	});

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

				alert($localStorage.phone);
				Auth.setUser({
					phone: $localStorage.phone
				});

				//Register with push notification service
				PushNotificationsService.register($localStorage.phone);

				$state.go('dashboard');
			}else{
				$window.alert('Wrong');
			}

		}

	}

}]);