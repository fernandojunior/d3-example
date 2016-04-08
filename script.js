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
      .data([4, 8, 15, 16, 23, 42])
      .style("font-size", function(d) { return d + "px"; });
}

// Enter and Exit
var enterAndExit = function () {
  d3.select("body main .container #content").selectAll("p")
      .data([4, 8, 15, 16, 23, 42])
    .enter().append("p")
      .text(function(d) { return "I’m number " + d + "!"; });

  var p = d3.select("body").selectAll("p")
      .data([4, 8, 15, 16, 23, 42])
      .text(function(d) { return d; });

  p.enter().append("p")
      .text(function(d) { return d; });

  p.exit().remove();
}
