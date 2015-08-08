notebird.controller('VerifyController',['$scope','$localStorage','$window','$state','Auth','PushNotificationsService',function($scope,$localStorage,$window,$state,Auth,PushNotificationsService){

	$scope.user = {
		code1: "",
		code2: "",
		code3: "",
		code4: ""
	}

	smsplugin.isSupported(function(result){
 
		smsplugin.startReception(function(result){
				
			var verifyCode = result.split('>');

			if(verifyCode[0] == 'SMS Alert')
			{
				alert('Yes');
				verifyCodeDigit = verifyCode[1].split('');

				$scope.user = {
					code1: verifyCodeDigit[0],
					code2: verifyCodeDigit[1],
					code3: verifyCodeDigit[2],
					code4: verifyCodeDigit[3]
				}

				var code = $localStorage.code,
				userFullCode = verifyCode[1];

				if(parseInt(userFullCode) === parseInt(code))
				{
					$localStorage.verified = true;

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

		},function(error){
				alert(error);
		});


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