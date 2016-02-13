// lungdirective
angular.module('ekorrarna')
.directive('databar', ['d3Service', function(d3Service) {
return {
  restrict: "E",
  scope: {
    measurement: '=measure'
  },
  link: function(scope, element, attrs) {

    var barWidth = 230;
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
        scope.text.text(scope.measurement.data);
        if(oldVal-scope.measurement.data > 0 && upTrend) {
          scope.arrow.transition().duration(800).attrTween("transform",tweenP);
          oldVal = scope.measurement.data;
          upTrend = false;
        }
        else if(oldVal-scope.measurement.data < 0 && !upTrend) {
          upTrend = true;
          scope.arrow.transition().duration(800).attrTween("transform",tween);
          oldVal = scope.measurement.data;
        }
        else {
          oldVal = scope.measurement.data;
        }
        function tweenP(d, i, a) {
          return d3.interpolateString("rotate(45, 245, 10)", "rotate(135, 245, 10)");
        }
        function tween(d, i, a) {
          return d3.interpolateString("rotate(135, 245, 10)", "rotate(45, 245, 10)");
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

          scope.text = svg.append("text").text(scope.measurement.data).attr("x", 10).attr("y", 13).attr("dy", ".35em");
          var pts = '245, 0, 250, 10, 247,10, 247, 20 242,20 242,10 240,10 245,0';
          if(scope.arrow) {
          }
          else {
          scope.arrow = svg.append('polyline')
						.attr("x",0)
            .attr('points', pts)
            .style('stroke', 'white')
						.attr("y",-100)
            .attr("transform", "rotate(45, 245, 10)")
            .style('fill', 'white');
          }
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
          scope.text = svg.append("text").text("värde saknas").attr("x", 10).attr("y", 13).attr("dy", ".35em");
        }
      }
    });
  }};
}]);

