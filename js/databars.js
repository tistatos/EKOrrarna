// lungdirective
angular.module('ekorrarna')
.directive('databar', ['d3Service', function(d3Service) {
return {
  restrict: "E",
  scope: {
    measurement: '=measure'
  },
  link: function(scope, element, attrs) {

    var barWidth = 250;
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
        scope.update();
      });

      scope.update = function() {
        var dataWidth = (scope.measurement.data/scope.measurement.max)*barWidth
        dataWidth = Math.max(0,Math.min(dataWidth,barWidth));
        scope.databar.transition().attr("width",dataWidth).duration(2000).ease("linear");
      }

      scope.render = function() {
        var avgPos = (scope.measurement.avg/scope.measurement.max)*barWidth
        var dataWidth = (scope.measurement.data/scope.measurement.max)*barWidth
        dataWidth = Math.max(0,Math.min(dataWidth,barWidth));

        //pos.forEach(item => {
      		var mySquare=svg.append("rect")
						.attr("x",0)
						.attr("y",0)
            .attr("width", barWidth)
            .attr("height", 22)
					  .style("stroke-width",2)
					  .style("stroke",'#009cd8')
					  .style("fill",'#dddddd');

          scope.databar = svg.append("rect")
            .attr("x", 2)
            .attr("y", 2)
            .attr("width", dataWidth)
            .attr("height", 19)
            .style("fill", scope.measurement.color);
          svg.append("rect")
            .attr("x", avgPos)
            .attr("y", 0)
            .attr("width", 3)
            .attr("height", 22)
            .style("fill", "black");

        //})
        // our custom d3 code
      }
    });
  }};
}]);

