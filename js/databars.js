// lungdirective
angular.module('ekorrarna')
.directive('databar', ['d3Service', function(d3Service) {
return {
  restrict: "E",
  scope: {
    measurement: '=measure'
  },
  link: function(scope, element, attrs) {

    d3Service.d3().then(function(d3) {
      var svg = d3.select(element[0])
        .append('svg')
        .style('width', '100%');

      // Browser onresize event
      window.onresize = function() {
        scope.$apply();
      };

      // Watch for resize event
      scope.$watch(function() {
        return angular.element(window)[0].innerWidth;
      }, function() {
        scope.render();
      });

      scope.$parent.$on('newData', function() {
        scope.render();
        console.log("recieved");
      });

      scope.render = function() {
        var avgPos = (scope.measurement.avg/scope.measurement.max)*300
        var dataWidth = (scope.measurement.data/scope.measurement.max)*300
        var dataWidth = Math.min(dataWidth,300);
        //pos.forEach(item => {
      		var mySquare=svg.append("rect")
						.attr("x",0)
						.attr("y",0)
            .attr("width", 300)
            .attr("height", 22)
					  .style("stroke-width",2)
					  .style("stroke",'#009cd8')
					  .style("fill",'#dddddd');

          svg.append("rect")
            .attr("x", 2)
            .attr("y", 2)
            .attr("width", dataWidth)
            .attr("height", 19)
            .style("fill", "green");
          svg.append("rect")
            .attr("x", avgPos)
            .attr("y", 0)
            .attr("width", 3)
            .attr("height", 22)
            .style("fill", "blue");
        //})
        // our custom d3 code
      }
    });
  }};
}]);

