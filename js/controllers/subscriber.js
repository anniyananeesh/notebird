notebird.controller('SubscriberCtrl',['$scope','$stateParams','Data','Auth','$localStorage','$state',function($scope,$stateParams,Data,Auth,$localStorage,$state){

	//Load subcribers based on the category chosen
	Data.get('subscribers_list?cat='+$stateParams.catId+"&qry=").then(function(result){

		$scope.subscribers = (!result.error) ? result.data : [];
	});

	var favourites = Auth.getFavourites(),
		favourites = favourites.favourites; 

	$scope.hasFav = function(userId)
	{
 
		var index = favourites.indexOf(userId);
		return (index > -1);
	};

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

		 		$(elem).html('Following');
		 		$(elem).removeClass('follow-btn');
				$(elem).addClass('follow-btn-following');
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

				$(elem).html('Follow');
				$(elem).removeClass('follow-btn-following');
				$(elem).addClass('follow-btn');
			}

		});
 
	};

	$scope.showCategories = function()
	{
		$state.go('app.category');
	};

}]);