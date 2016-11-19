var app = angular.module('app', []);

app.controller("appController", function appController($scope, $location){

	$scope.init = function init(entity){
		$scope.entity = entity;
	}
})


