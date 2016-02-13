// lungdirective
angular.module('ekorrarna')
.directive('lungdirective', ['d3Service', function(d3Service) {

	// Lungorna
  var url = 'data/lung.json';
  var request = new XMLHttpRequest();
          request.open("GET", url, false);
          request.send(null)
  var pos = JSON.parse(request.responseText);

  var numberOfDots = 30;
  var radius = 7.5;
  var circleDistance = radius*2 + 2;
  var lungHeight = (radius*2 + 2)*(numberOfDots+2);

  var dots = [];

	return {
		scope: true,
	  link: function(scope, element, attrs) {

	    d3Service.d3().then(function(d3) {

	      svg = d3.select(element[0])
	        .append('svg')
	        .style('width', '100%')
	        .style('height', lungHeight);

	      // Browser onresize event
	      window.onresize = function() {
	        scope.$apply();
	      };

        scope.$parent.$on('newData', function() {
        	scope.updateLung();
      	});

	      // Watch for resize event
	      scope.$watch(function() {
	        return angular.element(window)[0].innerWidth;
	      }, function() {
	        scope.render(scope.data);
	      });

	      scope.updateLung = function() {
    			dots.forEach(d => {
	      	var rand = Math.floor(((Math.random())* 10));
				  var randTrans = Math.floor((Math.random() * 4000));
						d.transition()
				  	.duration(2000)
					  .style("fill",scope.amountColors[rand])
						.ease("linear");
    			}) 
				}

	    });

      scope.render = function(data) {
   
      	svg.append("image")
      		.attr("height", "100px")
      		.attr("xlink:href", "img/lunga_vit.png")
				  .attr("width", lungHeight)
				  .attr("height", lungHeight)
				  .attr("x", radius)
					.attr("y", -15);

		  	pos.forEach(item => {

		  		// Number 0-9 (random bland aktuella färger)
					var rand = Math.floor((Math.random() * 10));
		  		var dot=svg.append("circle")
					  .attr("cx",(1+item.x)*circleDistance)
					  .attr("cy",(1+item.y)*circleDistance)
					  .attr("r",0)
					  .style("fill",scope.amountColors[rand]);

				  var randTrans = Math.floor((Math.random() * 4000));
				  dot.transition()
				  	.duration(randTrans)
						.attr("r",radius)
						.ease("elastic");

					dots.push(dot);

		  	})
      }
  }};
}]);

