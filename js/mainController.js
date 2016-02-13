// Controller
angular.module('ekorrarna').controller('mainController', ['$scope', 'luftdata', function($scope, luftdata) {
  $scope.greeting = 'Hola';
    $scope.allData = luftdata.getData(2,8,1);
    $scope.maxData = luftdata.getMaxData();

    console.log($scope.allData);
    $scope.PM10 = {data: $scope.allData.PM10, max: $scope.maxData.PM10 };
    $scope.NO2 = {data: $scope.allData.NO2, max: $scope.maxData.NO2 };
    $scope.O3 = {data: $scope.allData.Ozon, max: $scope.maxData.O3 };
    $scope.Bensen = {data: $scope.allData.Bensen, max: $scope.maxData.Bensen };
    $scope.CO = {data: $scope.allData.CO, max: $scope.maxData.CO };
		/*
		Färger:
		Lila - #592473
		Grön - #366841
		Rosa - #b10d61
		Orange - #ce5e1c
		Gul - #f4df10
		Blå - #009cd8
		*/
		var colors = ['#592473', '#366841', '#b10d61', '#ce5e1c', '#f4df10', '#009cd8'];

}]);

