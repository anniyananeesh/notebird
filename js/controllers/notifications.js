notebird.controller('NotificationCtrl',['$scope','$localStorage','Data',function($scope,$localStorage,Data){

	//Get the list of notifications from database
	Data.get('notifications?ref='+$localStorage.phone).then(function(result){
 		$scope.notifications = (!result.error) ? result.data : [];
	});

}]);