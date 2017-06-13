angular.module('services', [])
	.factory('request', function($http) {
		var path = "http://localhost:8082/";//PATH DE LA API
		
		return {
			lista : function(numw){
				global = $http.get(path+'alltweets/'+numw);
				return global;
			},
			searchHashtag : function(hash){
				global = $http.get(path+'hashtags/'+hash);
				return global;
			},
			searchNumRetweet : function(numre){
				global = $http.get(path+'retweets/'+numre);
				return global;
			},
			searchCreated : function(date_1,date_2){
				global = $http.get(path+'created/'+date_1+"&"+date_2);
				return global;
			}
		}
	});
