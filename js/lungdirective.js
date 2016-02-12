// lungdirective
angular.module('ekorrarna')
.directive('lungdirective', ['d3Service', function(d3Service) {
return {
  link: function(scope, element, attrs) {
		/*
		Färger: 
		Lila - #592473
		Grön - #366841
		Rosa - #b10d61
		Orange - #ce5e1c
		Gul - #f4df10
		Blå - #009cd8
		*/
	  	var pos = [
	  		{
	  			x: 0,
	  			y: 0
	  		},
	  		{
	  			x: 0,
	  			y: 1
	  		},
	  		{
	  			x: 1,
	  			y: 0
	  		},
	  		{
	  			x: 1,
	  			y: 1
	  		},
	  	];

    d3Service.d3().then(function(d3) {
    	
      var svg = d3.select(element[0])
        .append('svg')
        .style('width', '100%');

      // Browser onresize event
      window.onresize = function() {
        scope.$apply();
      };

      // hard-code data
      scope.data = [
        {name: "Greg", score: 98},
        {name: "Ari", score: 96},
        {name: 'Q', score: 75},
        {name: "Loser", score: 48}
      ];

      // Watch for resize event
      scope.$watch(function() {
        return angular.element(window)[0].innerWidth;
      }, function() {
        scope.render(scope.data);
      });

      scope.render = function(data) {

      	pos.forEach(item => {

      		var mySquare=svg.append("rect")
					  .attr("x",item.x*60)
					  .attr("y",item.y*60)
					  .attr("width",60)
					  .attr("height",60)
					  .style("fill",'#592473');
      	})
        // our custom d3 code
      }
    });
  }};
}]);