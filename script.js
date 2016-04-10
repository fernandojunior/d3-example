var data = [4, 8, 15, 16, 23, 42];

// Selections
var selections = function() {
  d3.selectAll("p").style("color", "white");
  d3.selectAll("body").style("background", "black");
}

// Dynamic properties
var dynamicProperties = function () {
  d3.selectAll("p").style("color", function() {
    return "hsl(" + Math.random() * 360 + ",100%,50%)";
  });

  d3.selectAll("p").style("color", function(d, i) {
    return i % 2 ? "#fff" : "#999";
  });

  d3.selectAll("p")
      .data(data)
      .style("font-size", function(d) { return d + "px"; });
}

// Enter and Exit
var enterAndExit = function () {
  d3.select("#content").selectAll("p")
      .data(data)
    .enter().append("p")
      .text(function(d) { return "I’m number " + d + "!"; });

  var p = d3.select("body").selectAll("p")
      .data(data)
      .text(function(d) { return d; });

  p.enter().append("p")
      .text(function(d) { return d; });

  p.exit().remove();
}

// Transitions
var transitions = function () {
    d3.select("#content").selectAll("circle")
        .data(data).enter()
        .append("svg")
            .append("circle")
                .attr("cx", 50)
                .attr("cy", 50)
                .attr("r", 50)
                .attr("fill", "red");

    d3.select("body")
        .transition()
        .duration(3000)
        .style("background-color", "black");

    d3.selectAll("circle")
        .transition()
        .duration(3000)
        .delay(function(d, i) { return i * 100; })
        .attr("r", function(d, i) { return Math.sqrt(d * 5); });
}

transitions();
