var counter = function(values) {
    var counts = {};
    values.forEach(function(value) {
        counts[value] = counts[value] + 1 || 1;
    });
    return counts;
}

var histrogram = function(values) {

    var counts = counter(values);

    var histdata = Object.keys(counts).map(function(key) {
        return {value: key, frequency: counts[key]};
    });

    var margin = {top: 40, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .tickFormat(d3.format("d%"));

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(datum) {
            var html = "<strong>Value:</strong> <span style='color:red'>"
                + datum.value
                + "</span><br>";
            html += "<strong>Frequency:</strong> <span style='color:red'>"
                + datum.frequency
                + "</span>";
            return html;
        });

    var svg = d3.select("#canvas").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip);

    x.domain(histdata.map(function(d) { return d.value; }));
    y.domain([0, d3.max(histdata, function(d) {return d.frequency;})]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");

    svg.selectAll(".bar")
        .data(histdata)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.value); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return height - y(d.frequency); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide);
}

d3.csv('data.csv', function(error, data) {
    var drawHistogram = function(attribute) {
        var canvas = d3.select("#canvas");
        canvas.html("");
        canvas.append('h2').html(attribute);

        var values = data.map(function(datum) {
            return Math.floor(parseFloat(datum[attribute]));
        });

        histrogram(values);
    }

    var nav = d3.select("nav .container")
        .append("ul")
        .attr("class", "list-inline");

    nav.selectAll("li")
        .data(Object.keys(data[0]))
        .enter()
        .append("li")
        .append("a")
        .attr("href", "#")
        .html(function(datum) {
            return datum;
        })
        .on('click', function(datum) {
            drawHistogram(datum);
        });

    var info = d3.select("#info");
    info.append("div")
        .html("Number of matches: " + data.length);
    info.append("div")
        .html("Number of participants: " + (data.length * 10));

    drawHistogram("championId");
});
