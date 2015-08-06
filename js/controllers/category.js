notebird.controller('CategoryCtrl',['$scope','$location','Data',function($scope,$location,Data){

	//Get category list from database
	Data.get('categories').then(function(result){
		$scope.categories = (!result.error) ? result.data : [];
	});

	$scope.showCategoryItems = function(catId)
	{
		$location.path('/subscribers/'+catId);
	};

}]);