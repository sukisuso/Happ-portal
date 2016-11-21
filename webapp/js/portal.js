var app = angular.module('app', ['cl.paging']);

app.controller("appController", function appController($scope, $location, $http){

	$scope.clientInfo = {};
	$scope.rowCollectionTransacction = [];
	$scope.pagingTransacction = {
		total: 100,
		current: 1,
		size: 10,
		onPageChanged: loadPagesTransacction,
	};

	$scope.init = function init(entity){
		$scope.entity = entity;

		$http({
			url: '/entity/'+entity, method: "GET"
		})
		.then(function(result) {
			$scope.clientInfo = result.data.personalInfo;
			loadStats(result.data.stats);
			loadPagesTransacction($scope.clientInfo._id);
		});
	}

	function loadPagesTransacction (id){
		$http({
			url: '/entity/'+$scope.entity+'/transacctions',
			method: "POST",
			data: {
				'clientId': id,
				'init': ($scope.pagingTransacction.current - 1) * $scope.pagingTransacction.size,
				'page': $scope.pagingTransacction.size
			}
		})
		.then(function(result) {
			$scope.rowCollectionTransacction = [];
			$scope.pagingTransacction.total = Math.floor(result.data.total / $scope.pagingTransacction.size);
			if (result.data.total % $scope.pagingTransacction.size) {
				$scope.pagingTransacction.total++;
			}
			$scope.rowCollectionTransacction = $scope.rowCollectionTransacction.concat(result.data.clients);
		});
	};


	function loadPagesDocs (){};


	function loadStats (statsValid) {
		var serie = {};
		serie.name = $scope.clientInfo.name;
		serie.data = [];
		var stat = 0;

		statsValid.forEach(function(value,index,arr){
			if (value.type === "Ingreso") {
				stat += value.cant;
			} else {
				stat -= value.cant;
			}
			var date = new Date(value.date);
			date.setDate(date.getDate() + 1);
			 
			serie.data.push([date.getTime(), stat]); 
		});
		loadStatsDefault('statscontent', serie);
   }
})


