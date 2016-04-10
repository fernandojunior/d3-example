var randomInt = function (low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

var sample = function (low, high, length) {
    var numbers = new Array(length);
    for (var i = 0; i < length; i++)
        numbers[i] = randomInt(low, high);
    return numbers;
}

var randomColor = function () {
    return "hsl(" + Math.random() * 360 + ", 100%, 50%)"
}

var selections = function() {
  d3.select("header").style("color", "f0f0f0");
  d3.selectAll("circle").attr("fill", "blue");
}

var clear = function (selector) {
    d3.select("main").text("");
}

var helloWorld = function () {
    d3.select("main")
    .append("div")
        .attr("class", "container")
        .text("Hello World");
}

var showData = function (data) {
    d3.select("footer .container")
    .text(function() { return "data=[" + data + "];" });
}

var createCircles = function (data, radius) {
    d3.select("main")
    .selectAll("svg circle")
    .data(data)
    .enter()
    .append("svg")
        .attr({height: radius * 2, width: radius * 2})
        .append("circle")
            .attr({cx: radius, cy: radius, r: radius, fill: "red"});
}

var changeCircleRadius = function (data) {
    d3.selectAll("circle")
    .data(data)
    .attr("r", function(datum) { return datum; });
}

var changeOddCircleColor = function (data) {
    d3.selectAll("circle")
    .data(data)
    .attr("fill", function(datum, i) {
        var oldColor = this.getAttribute("fill");
        var newColor = randomColor();
        return i % 2 ? newColor : oldColor;
    });
}

var changeBackgroundColor = function () {
    d3.select("main")
    .transition()
    .duration(1000)
    .style("background-color", function () { return randomColor(); });
}

var cicleTransition = function (duration, length) {
    d3.selectAll("circle")
    .transition()
    .duration(duration)
    .attr("fill", function() { return randomColor(); })
    .delay(function() { return randomInt(1, length); })
    .attr("r", function() { return randomInt(1, length); });
}

var cicleLoop = function () {
    var duration = 1000;
    var repeat = function() {
        cicleTransition(duration, length);
        setTimeout(repeat, duration);
    };
    repeat();
}

// selections();

// var data = sample(1, 50, 3);
// showData(data);
// changeCircleRadius(data);
// changeOddCircleColor(data);

// clear();
// helloWorld();

// clear();
// var length = randomInt(1, 100);
// var data = sample(1, 50, length);
// showData(data);
// createCircles(data, length);

// changeBackgroundColor();

clear();
var length = randomInt(1, 100);
var data = sample(1, 50, length);
createCircles(data, length);
cicleLoop();
