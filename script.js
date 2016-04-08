// Selections
d3.selectAll("p").style("color", "white");
d3.selectAll("body").style("background", "black");

// Dynamic properties
d3.selectAll("p").style("color", function() {
  return "hsl(" + Math.random() * 360 + ",100%,50%)";
});

d3.selectAll("p").style("color", function(d, i) {
  return i % 2 ? "#fff" : "#999";
});

d3.selectAll("p")
    .data([4, 8, 15, 16, 23, 42])
    .style("font-size", function(d) { return d + "px"; });
