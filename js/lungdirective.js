// lungdirective
angular.module('ekorrarna')
.directive('lungdirective', ['d3Service', function(d3Service) {

	// Lungorna
  var url = 'data/lung.json';
  var request = new XMLHttpRequest();
          request.open("GET", url, false);
          request.send(null)
  var pos = JSON.parse(request.responseText);

  var radius = 7;
  var circleDistance = radius*2 + 2;

	return {
		scope: true,
	  link: function(scope, element, attrs) {

	    d3Service.d3().then(function(d3) {
	    	
	      svg = d3.select(element[0])
	        .append('svg')
	        .style('width', '40%')
	        .style('height', '100vw');

	      // Browser onresize event
	      window.onresize = function() {
	        scope.$apply();
	      };

	      // Watch for resize event
	      scope.$watch(function() {
	        return angular.element(window)[0].innerWidth;
	      }, function() {
	        scope.render(scope.data);
	      });

	      scope.updateLung = function() {

			  	pos.forEach(item => {

			  		// Number 0-9 (random bland aktuella färger)
						var rand = Math.floor((Math.random() * 10));
			  		var mySquare=svg.append("circle")
						  .attr("cx",(1+item.x)*circleDistance)
						  .attr("cy",(1+item.y)*circleDistance)
						  .attr("r",radius)
						  .style("fill",scope.amountColors[rand]);

			  	})
				}
	    });

      scope.render = function(data) {
      	scope.updateLung();
      }
  }};
}]);
