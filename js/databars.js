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
    var oldVal = 0;
    var upTrend = false;
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
        if(attrs.disabled)
          return;
        var dataWidth = (scope.measurement.data/scope.measurement.max)*barWidth
        dataWidth = Math.max(0,Math.min(dataWidth,barWidth));
        scope.databar.transition().attr("width",dataWidth).duration(2000).ease("linear");

        console.log(oldVal-scope.measurement.data);
        console.log(upTrend);
        if(oldVal-scope.measurement.data > 0 && upTrend) {
          scope.arrow.transition().duration(800).attrTween("transform",tweenP);
          console.log("downTrend");
          oldVal = scope.measurement.data;
          upTrend = false;
        }
        else if(oldVal-scope.measurement.data < 0 && !upTrend) {
          upTrend = true;
          console.log("uptrend");
          scope.arrow.transition().duration(800).attrTween("transform",tween);
          oldVal = scope.measurement.data;
        }
        else {
          oldVal = scope.measurement.data;
        }
        function tweenP(d, i, a) {
          return d3.interpolateString("rotate(45, 265, 10)", "rotate(135, 265, 10)");
        }
        function tween(d, i, a) {
          return d3.interpolateString("rotate(135, 265, 10)", "rotate(45, 265, 10)");
        }
      }

      scope.render = function() {
        if(!attrs.disabled) {
          var avgPos = (scope.measurement.avg/scope.measurement.max)*barWidth
          var dataWidth = (scope.measurement.data/scope.measurement.max)*barWidth
          dataWidth = Math.max(0,Math.min(dataWidth,barWidth));
          oldVal = scope.measurement.data;
      		var mySquare=svg.append("rect")
						.attr("x",0)
						.attr("y",0)
            .attr("width", barWidth)
            .attr("height", 22)
					  .style("stroke-width", 0)
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


          var pts = '265, 0, 270, 10, 267,10, 267, 20 262,20 262,10 260,10 265,0';
          scope.arrow = svg.append('polyline')
						.attr("x",0)
            .attr('points', pts)
            .style('stroke', 'white')
						.attr("y",-100)
            .attr("transform", "rotate(45, 265, 10)")
            .style('fill', 'white');

        }
        else {
      		var mySquare=svg.append("rect")
						.attr("x",0)
						.attr("y",0)
            .attr("width", barWidth)
            .attr("height", 22)
					  .style("stroke-width", 0)
					  .style("stroke",'#009cd8')
					  .style("fill",'#999999');
        }
      }
    });
  }};
}]);

