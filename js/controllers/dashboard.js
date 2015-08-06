notebird.controller('DashboardCtrl',['$scope','$localStorage','Data','Auth','$state',function($scope,$localStorage,Data,Auth,$state){

	//PushNotificationsService.register($localStorage.phone);
	$scope.user = {
		search: ''
	}
	
    $localStorage.phone = '971525723556'; // remove this line after development

    var favourites = [];

    $scope.hasFav = function(userId)
	{
		var favourites = Auth.getFavourites(),
		favourites = favourites.favourites;
		var index = favourites.indexOf(userId);
		return (index > -1);
	};

    //Get all subscribers of the registered user if any
	Data.get('followed?ref='+$localStorage.phone).then(function(result){

		if(!result.error)
		{
			Auth.setFavourites({
				favourites: result.data
			});
		}else{
		  	Auth.setFavourites({
				favourites: []
			});
		}

	});


	//List all subscribers
	Data.get('subscribers?ref='+$localStorage.phone).then(function(result){
		$scope.subscribers = (!result.error && result.code == 200) ? result.data : [];
	});

	$scope.followSubscriber = function($event,subsId)
	{
		var elem = $('#'+subsId);

		//Follow this subscriber if not already followed / if already following unfollow
		var params = {
			phone: $localStorage.phone,
			subsId: subsId			
		};

		Data.post('follow',params).then(function(result){
 
			if(!result.error && result.code == 200 && result.message == 'followed')
			{
				favourites.push(subsId);
		 		Auth.setFavourites({
					favourites: favourites
				});

				$(elem).find('.chosen').fadeIn(350);
			}

			if(!result.error && result.code == 200 && result.message == 'unfollowed')
			{
				var index = favourites.indexOf(subsId);
		  		if (index > -1) {
					favourites.splice(index, 1);	
					Auth.setFavourites({
						favourites: favourites
					});		    
				}

				$(elem).find('.chosen').fadeOut(350);
			}

		});
 
	};

	$scope.showCategories = function()
	{
		$state.go('category');
	};

}]);