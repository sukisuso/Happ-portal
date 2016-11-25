var app = angular.module('app', ['cl.paging', 'ui.bootstrap']);

app.controller("appController", function appController($scope, $location, $http, $window){

	$scope.clientInfo = {};
	$scope.rowCollectionTransacction = [];
	$scope.pagingTransacction = {
		total: 100,
		current: 1,
		size: 10,
		onPageChanged: loadPagesTransacction,
	};

	$scope.rowCollectionDocuments = [];
	$scope.pagingDocuments = {
		total: 100,
		current: 1,
		size: 10,
		onPageChanged: loadPagesDocuments,
	};

	$scope.init = function init(entity, msg){
		$scope.entity = entity;
		$http({
			url: '/entity/'+entity, method: "GET"
		})
		.then(function(result) {
			$scope.clientInfo = result.data.personalInfo;
			loadOptions(result.data.options);
			if(!msg){
				loadStats(result.data.stats);
				loadPagesTransacction();
				loadPagesDocuments ();
			}
		});
	};

	function loadPagesTransacction (){
		$http({
			url: '/entity/'+$scope.entity+'/transacctions',
			method: "POST",
			data: {
				'clientId': $scope.clientInfo._id,
				'init': ($scope.pagingTransacction.current - 1) * $scope.pagingTransacction.size,
				'page': $scope.pagingTransacction.size
			}
		})
		.then(function(result) {
			$scope.rowCollectionTransacction = [];
			$scope.pagingTransacction.total = result.data.total;
			$scope.pagingTransacction.totalPages = Math.floor(result.data.total / $scope.pagingTransacction.size);
			if (result.data.total % $scope.pagingTransacction.size) {
				$scope.pagingTransacction.totalPages++;
			}
			$scope.rowCollectionTransacction = $scope.rowCollectionTransacction.concat(result.data.clients);
		});
	};


	function loadPagesDocuments (){
		$http({
			url: '/entity/'+$scope.entity+'/documents',
			method: "POST",
			data: {
				'clientId': $scope.clientInfo._id,
				'init': ($scope.pagingDocuments.current - 1) * $scope.pagingDocuments.size,
				'page': $scope.pagingDocuments.size
			}
		})
		.then(function(result) {
			$scope.rowCollectionDocuments = [];
			$scope.pagingDocuments.total = result.data.total;
			$scope.pagingDocuments.totalPages = Math.floor(result.data.total / $scope.pagingDocuments.size);
			if (result.data.total % $scope.pagingDocuments.size) {
				$scope.pagingDocuments.totalPages++;
			}
			$scope.rowCollectionDocuments = $scope.rowCollectionDocuments.concat(result.data.clients);
		});
	};


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
   };

   $scope.viewDoc = function openPortal(row){
   		window.open("/documents/get/"+row._id);
 	};	

 	$scope.msg = {
 		clientId:null,
 		asunto:"",
 		estado: false,
 		msg: "",
 		gestorId:null
 	};

 	$scope.sendMsg = function (){
 		$scope.msg.clientId = $scope.clientInfo._id;
 		$scope.msg.gestorId = $scope.clientInfo.gestorId;

 		if(!$scope.msg.asunto || ! $scope.msg.msg){
 			return ;
 		}
 		
 		$http({
			url: '/mensajes',
			method: "POST",
			data:$scope.msg
		})
		.then(function(result) {
			$window.location.href = '/portal/'+$scope.entity;
		});
 	};

 	function loadOptions (options) {
 		if(!options){
 			options = {};
 		}
 		$scope.options = options.portales;
 	}
})


