angular.module('app-mongo', ['services']);

angular.module('app-mongo').controller('controller', ['$scope','request',controller]);

function controller($scope, request) {
	$scope.posts={};
	$scope.mensaje="";

	$scope.getAllTweets = function(){
		var start = new Date();
		request.lista($scope.a.numw).then(function (data){
      		console.log(data.data);
			$scope.posts=data.data;
			$scope.posts.exist=1;
			var time = new Date() - start;
			$scope.t = time;
		});
	};

	$scope.getAllHashtags = function(){
		var start = new Date();
		request.searchHashtag($scope.a.hash,$scope.a.lim).then(function (data){
      		console.log(data.data);
			$scope.posts=data.data;
			$scope.posts.exist=1;
			var time = new Date() - start;
			$scope.t = time;
		});
	};

	$scope.getAllRetweets = function(){
		var start = new Date();
		request.searchNumRetweet($scope.a.numre,$scope.a.lim).then(function (data){
      		console.log(data.data);
			$scope.posts=data.data;
			$scope.posts.exist=1;
			var time = new Date() - start;
			$scope.t = time;
		});
	};

	$scope.getAllCreated = function(){
		var start = new Date();
		var initial = new Date ($scope.a.initialdate);
		var last = new Date ($scope.a.lastdate);
		$scope.initialdate = initial.getFullYear()+"-"+(initial.getMonth()+1)+"-"+initial.getDate(); 
		$scope.lastdate =  last.getFullYear()+"-"+(last.getMonth()+1)+"-"+last.getDate();
		request.searchCreated($scope.initialdate,$scope.lastdate,$scope.a.lim).then(function (data){
      		console.log(data.data);
			$scope.posts=data.data;
			$scope.posts.exist=1;
			var time = new Date() - start;
			$scope.t = time;
		});
	};
    
}