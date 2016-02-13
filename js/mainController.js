// Controller
angular.module('ekorrarna').controller('mainController', ['$scope', 'luftdata', '$interval', function($scope, luftdata, $interval) {

    $scope.day = 1;
    $scope.month = 1;
    $scope.hour = 1;
    $scope.maxData = luftdata.getMaxData();
    $scope.avgData = luftdata.getAvgData();

    $scope.allData = luftdata.getData($scope.month,$scope.day,$scope.hour);
    $scope.PM10 = {
      data: $scope.allData.PM10,
      max: $scope.maxData.PM10,
      avg: $scope.avgData.PM10,
      color: '#009cd8'
    };
    $scope.NO2 = {
      data: $scope.allData.NO2,
      max: $scope.maxData.NO2,
      avg: $scope.avgData.NO2,
      color:'#ce5e1c'
    };
    $scope.O3 = {
      data: $scope.allData.Ozon,
      max: $scope.maxData.O3,
      avg: $scope.avgData.O3,
      color:'#f4df10'
    };
    $scope.Bensen = {
      data: $scope.allData.Bensen,
      max: $scope.maxData.Bensen,
      avg: $scope.avgData.Bensen,
      color:'#592473'
    };
    $scope.CO = {
      data: $scope.allData.CO,
      max: $scope.maxData.CO,
      avg: $scope.avgData.CO,
      color:'#b10d61'
    };


    $scope.actions= [
    {
      "title": "Åk kollektivt",
      "text": "Visste du att forskning visar att den som åker kollektivt rör sig i genomsnitt fyra gånger mer per dag än den som åker bil?",
      "image": "kollektivt.png"
    },
    {
      "title": "Gå eller cykla när det är möjligt",
      "text": "För varje mil du cyklar eller går istället för att åka bil minskar du nybildningen av koldioxid från förbränning av bensin med 2.4 kilo",
      "image": "gacykla.png"
    },
    {
      "title": "Minska mängden halkbekämpningssalt och sand (reducerar partiklar)",
      "text": "Försök att minska mängden salt under vinterhalvåret vid bekämpning av is",
      "image": "salt.png"
    },
    {
      "title": "Vid körning accelerera gradvis och följa hastighetsbestämmelsen",
      "text": "På detta sätt minskar du utsläppen från avgaser och slitage på däck",
      "image": "acceleration.png"
    },
    {
      "title": "Kontrollera att dina däck är korrekt pumpade",
      "text": "Med rätt lufttryck slits däcken mindre och det går åt mindre drivmedel",
      "image": "dack.png"
    },
    {
      "title": "Vid körning försök att motorbromsa",
      "text": "Genom att motorbromsa slits bromsarna mindre",
      "image": "motorbromsa.png"
    },
    {
      "title": "Samåk exempelvis genom att använd skjutsgruppen.se",
      "text": "Ett utmärkt sätt att ersätta det egna bilåkandet är att åka med andra",
      "image": "skjutsgrupp.png"
    },
    {
      "title": "Ät närproducerat, och eller ekologiskt",
      "text": "Vid leveranser av varor från andra länder blir det stora utsläpp, välj därför om möjligt att äta närproducerat",
      "image": "ekologiskt.png"
    },
    {
      "title": "Avstå från att skjuta fyrverkerier",
      "text": "Många fyrverkerier innehåller ämen som inte är bra för dig eller naturen. Välj därför att avstå från att skjuta upp egna fyrverkerier",
      "image": "fyrverkerier.png"
    }
    ]


    var rand =Math.round( Math.random()*9);
    console.log(rand);
    $scope.firstAction = $scope.actions[rand];
    $scope.secondAction = $scope.actions[(rand+1)%9];
    $scope.thirdAction = $scope.actions[(rand+2)%9];



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
		//var arrayMax = [bensenMax, coMax, no2Max, ozonMax, pm10Max];
		var totalBad = bensenMax+coMax+no2Max+ozonMax+pm10Max;

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
		$scope.amount = [];

		$scope.badThings = [];
		$scope.badThings.push($scope.allData.Bensen);
		$scope.badThings.push($scope.allData.CO);
		$scope.badThings.push($scope.allData.NO2);
		$scope.badThings.push($scope.allData.Ozon);
		$scope.badThings.push($scope.allData.PM10);

		$scope.amount = getRealtimeData();
		$scope.amountColors = [];
    $interval(function() {
      $scope.increase();
    },2000);

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

    $scope.increase = function() {

      $scope.hour++;
      $scope.allData = luftdata.getData($scope.month,$scope.day,$scope.hour);
      $scope.PM10.data =  $scope.allData.PM10;
      $scope.NO2.data = $scope.allData.NO2;
      $scope.O3.data = $scope.allData.Ozon;
      $scope.Bensen.data =  $scope.allData.Bensen;
      $scope.CO.data = $scope.allData.CO;


			$scope.badThings = [];
			$scope.badThings.push(($scope.allData.Bensen < 0) ? 0 : $scope.allData.Bensen);
			$scope.badThings.push(($scope.allData.CO < 0) ? 0 : $scope.allData.CO);
			$scope.badThings.push(($scope.allData.NO2 < 0) ? 0 : $scope.allData.NO2);
			$scope.badThings.push(($scope.allData.Ozon < 0) ? 0 : $scope.allData.Ozon);
			$scope.badThings.push(($scope.allData.PM10 < 0) ? 0 : $scope.allData.PM10);

			$scope.amount = getRealtimeData();
			$scope.amountColors = [];

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

      $scope.$emit('newData');
    }


		function getRealtimeData() {
			var badThings = $scope.badThings;
			var arrayMax = [5, 60, 60, 120, 35];

			var array = [];
			var totalBadRealtime = 0;
			var totalBadPercentage = 0;

			for(var i=0; i<5; i++) {
				totalBadRealtime += badThings[i];
			}
			var cleanAir = totalBad - totalBadRealtime;
			badThings.push(cleanAir);

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
			var total = 0;
			for(var i=0; i<array.length; i++) {
				var b = Math.round(getPercentage(newArray[i], totalPercentage));
				total += b;
				finalArray.push(b);
			}
      if(total < 10) {
        console.log('oh no total is  ' + total);
        finalArray[finalArray.length-1]++;
      }

			return finalArray;

		}

		function getPercentage(value, maxValue) {
			//return Math.floor(value/maxValue*10);
			return value/maxValue*10;
		}
}]);

