var randomInt = function(low, high) {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

var color = function(hue) {
    return "hsl(" + hue + ", 100%, 50%)"
}

var helloWorld = function(msg) {
    var random = randomInt(1, 360);
    d3.select("#hello_world")
        .style({color: color(random), "font-size": random})
        .html(msg);
    d3.select("footer .container")
        .html(function () {
            return "Random: " + random;
        });
}

var loop = function(args) {
    var duration = 1000/2;
    var repeat = function() {
        helloWorld.call(null, args);
        setTimeout(repeat, duration);
    };
    repeat();
}

var msg = "Rebeca ♥";
// helloWorld(msg)
loop(msg);
