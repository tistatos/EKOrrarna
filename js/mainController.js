// Controller
angular.module('ekorrarna').controller('mainController', ['$scope', 'luftdata', function($scope, luftdata) {

    $scope.day = 1;
    $scope.month = 1;
    $scope.hour = 1;
    $scope.maxData = luftdata.getMaxData();
    $scope.avgData = luftdata.getAvgData();

    $scope.allData = luftdata.getData($scope.month,$scope.day,$scope.hour);
    $scope.PM10 = {data: $scope.allData.PM10, max: $scope.maxData.PM10, avg: $scope.avgData.PM10 };
    $scope.NO2 = {data: $scope.allData.NO2, max: $scope.maxData.NO2,  avg: $scope.avgData.NO2};
    $scope.O3 = {data: $scope.allData.Ozon, max: $scope.maxData.O3,  avg: $scope.avgData.O3};
    $scope.Bensen = {data: $scope.allData.Bensen, max: $scope.maxData.Bensen,  avg: $scope.avgData.Bensen};
    $scope.CO = {data: $scope.allData.CO, max: $scope.maxData.CO,  avg: $scope.avgData.CO};
		/*
		Färger:
		Lila - #592473	bensen
		Rosa - #b10d61	co1
		Orange - #ce5e1c	no2
		Gul - #f4df10		ozon
		Blå - #009cd8		pm10
		*/
		var bensenMax = 5;
		var coMax = 60;
		var no2Max = 60;
		var ozonMax = 120;
		var pm10Max = 35;
		var arrayMax = [bensenMax, coMax, no2Max, ozonMax, pm10Max];
		var totalBad = bensenMax+coMax+no2Max+ozonMax+pm10Max;

		getRealtimeData(1, 1, 1);
	/*
		Object {Starttid: "2014-01-01 00:00", Stopptid: "2014-01-01 01:00", CO: 0.2, NO2: 17.4, Ozon: 33.1…}
		Bensen: 1.7 		(34%)
		CO: 0.2 				(0%)
		NO2: 17.4				(29%)
		Ozon: 33.1 			(27.6%)
		PM10: 51.3 			(146%)
		Starttid: "2014-01-01 00:00"
		Stopptid: "2014-01-01 01:00"
		*/

		$scope.colors = ['#592473', '#b10d61', '#ce5e1c', '#f4df10', '#009cd8', '#ffffff'];
		$scope.amount = getRealtimeData();

		$scope.amountColors = [];
    $scope.increase = function() {
      $scope.allData = luftdata.getData($scope.month,$scope.day,$scope.hour++);
      $scope.PM10 = {data: $scope.allData.PM10, max: $scope.maxData.PM10, avg: $scope.avgData.PM10 };
      $scope.NO2 = {data: $scope.allData.NO2, max: $scope.maxData.NO2,  avg: $scope.avgData.NO2};
      $scope.O3 = {data: $scope.allData.Ozon, max: $scope.maxData.O3,  avg: $scope.avgData.O3};
      $scope.Bensen = {data: $scope.allData.Bensen, max: $scope.maxData.Bensen,  avg: $scope.avgData.Bensen};
      $scope.CO = {data: $scope.allData.CO, max: $scope.maxData.CO,  avg: $scope.avgData.CO};
      console.log("emitted")
      $scope.$emit('newData');
    }
		var u = 0;
		var i = 0;
		while(u < 10) {
			var no = $scope.amount[i];
			for(var j=0; j < no; j++) {
				$scope.amountColors.push($scope.colors[i]);
				u++;
			}
			i++;
		}

		function getRealtimeData(m, d, h) {
			var data = luftdata.getData(1,1,1);
			var badThings = [];
			badThings.push(data.Bensen);
			badThings.push(data.CO);
			badThings.push(data.NO2);
			badThings.push(data.Ozon);
			badThings.push(data.PM10);

			var array = [];
			var totalBadRealtime = 0;
			var totalBadPercentage = 0;

			for(var i=0; i<5; i++) {
				totalBadRealtime += badThings[i];
			}
			var cleanAir = totalBad - totalBadRealtime;
			badThings.push(badThings);

			var totalAirPercentage = 0;
			for(var i=0; i<5; i++) {
				var a = getPercentage(badThings[i], arrayMax[i]);
				a = a;
				totalBadPercentage += a;
				array.push(a);
				totalAirPercentage += getPercentage(arrayMax[i]-badThings[i], arrayMax[i]);
			}
			array.push(totalAirPercentage);

			var newArray = [];
			var totalPercentage = 0;
			for(var i=0; i<array.length; i++) {
				var b = getPercentage(array[i], totalBadPercentage);
				totalPercentage += b;
				newArray.push(b);
			}

			var finalArray = [];
			for(var i=0; i<array.length; i++) {
				var b = Math.round(getPercentage(newArray[i], totalPercentage));
				totalPercentage += b;
				finalArray.push(b);
			}
			return finalArray;

		}

		function getPercentage(value, maxValue) {
			//return Math.floor(value/maxValue*10);
			return value/maxValue*10;
		}
}]);

