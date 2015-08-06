notebird.factory("Data", ['$http','CONSTS',
    function ($http,CONSTS) {

        var serviceBase = CONSTS.API_SERVER; //45.33.67.32 production //device testing 192.168.56.1
 
        var obj = {};
        obj.get = function (q) {
            return $http.get(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        obj.post = function (q, object) {
            return $http.post(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.put = function (q, object) {
            return $http.put(serviceBase + q, object).then(function (results) {
                return results.data;
            });
        };
        obj.delete = function (q) {
            return $http.delete(serviceBase + q).then(function (results) {
                return results.data;
            });
        };
        return obj;
}])

// PUSH NOTIFICATIONS
.service('PushNotificationsService', function (GCM_SENDER_ID, PUSHBOTS_APP_ID, CONSTS){
    
    this.register = function(tagName){
 
        if(PushbotsPlugin.isiOS()){
          PushbotsPlugin.initializeiOS(CONSTS.PUSHBOTS_APP_ID);
        }

        if(PushbotsPlugin.isAndroid()){

            //Initialize the push notification server
            PushbotsPlugin.initializeAndroid(CONSTS.PUSHBOTS_APP_ID, CONSTS.GCM_SENDER_ID);
 
            //Set the tag name for the subscriber
            PushbotsPlugin.setAlias(tagName);
        }

    };

})

.factory('Auth', function ($cookieStore) {

   var _user = $cookieStore.get('notebird.user'),
       _favourites = $cookieStore.get('notebird.favourites');

   var setUser = function (user) {
      _user = user;
      $cookieStore.put('notebird.user', _user);
   }

   var setFavourites = function(favourites){
      _favourites = favourites;
      $cookieStore.put('notebird.favourites', _favourites);
   } 

   return {
      setUser: setUser,
      setFavourites: setFavourites,

      isLoggedIn: function () {
         return _user ? true : false;
      },
      getUser: function () {
         return _user;
      },
      getFavourites: function () {
         return _favourites;
      },
      logout: function () {
        
         $cookieStore.remove('notebird.user');
         $cookieStore.remove('notebird.favourites');

         _user = null;
         _favourites = null;
      }
   }
});