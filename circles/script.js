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

var changeCircles = function (duration, maxRadius) {
    d3.selectAll("circle")
        .transition()
        .duration(duration)
        .attr("fill", function() { return randomColor(); })
        .delay(function() { return randomInt(1, maxRadius); })
        .attr("r", function() { return randomInt(1, maxRadius); });
}

var cicleLoop = function (maxRadius) {
    var duration = 1000;
    var repeat = function() {
        changeCircles(duration, maxRadius);
        setTimeout(repeat, duration);
    };
    repeat();
}

var radius = randomInt(1, 100);
var data = sample(1, 50, radius);

d3.select("footer .container")
    .text(function() { return "data=[" + data + "];" });

d3.select("main").html("");

d3.select("main")
    .selectAll("svg circle")
    .data(data)
    .enter()
    .append("svg")
    .attr({height: radius * 2, width: radius * 2})
    .append("circle")
    .attr({cx: radius, cy: radius, fill: "red"})
    .attr('r', function (datum) { return datum; });

cicleLoop(radius * 2.5);
