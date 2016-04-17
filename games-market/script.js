var dataset = [
  { name: 'League of Legends', value: 1628 },
  { name: 'CrossFire', value: 1110 },
  { name: 'Dungeon Fighter Online', value: 1052 },
  { name: 'World of Warcraft', value: 814 },
  { name: 'World of Tanks', value: 446 },
  { name: 'Lineage I', value: 339 },
  { name: 'Maplestory', value: 253 },
  { name: 'DOTA 2', value: 238 },
  { name: 'Counter­Strike: Global Offensive', value: 221 },
  { name: 'Grand Theft Auto V', value: 205 }
];

var total = d3.sum(dataset.map(function(datum) {
    return datum.value;
}));

dataset.forEach(function (datum) {
    datum.percent = Math.round(100 * datum.value / total);
})

var chartSize = 500;
var chartRadius = chartSize / 2;

// https://github.com/mbostock/d3/wiki/Ordinal-Scales#categorical-colors
var color = d3.scale.category20b();

var chart = d3.select('#chart')
    .append('svg')
    .attr({width: chartSize, height: chartSize})
    .append('g')
    .attr('transform', 'translate(' + chartRadius + ',' + chartRadius + ')');

var pie = d3.layout.pie()
    .value(function(datum) { return datum.value; });

var path = chart.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', d3.svg.arc().outerRadius(chartRadius))
    .attr('fill', function(datum) {
        return color(datum.data.name);
    });

var legendSize = chartSize / 10 * 0.9;
var legendSpacing = chartSize / 10 * 0.1;
var legendsSize = dataset.length * (legendSize + legendSpacing);

var legends = d3.select('#legends')
    .append('svg')
    .attr({width: legendsSize, height: legendsSize})
    .append('g')
    .attr('transform', 'translate(0, 0)');

var legend = legends.selectAll('g')
    .data(color.domain())
    .enter()
    .append('g')
    .attr('transform', function(datum, i) {
        var x = 0;
        var y = i * (legendSize + legendSpacing);
        return 'translate(' + x + ',' + y + ')';
    });

legend.append('rect')
    .attr({width: legendSize, height: legendSize, fill: color});

legend.append('text')
    .attr({x: legendSize + legendSpacing, y: (legendSize/2) + 4})
    .text(function(datum) { return datum; });

var tooltip = d3.select('#chart')
    .append('div')
    .style({
        display: 'none',
        background: '#eee',
        color: '#333',
        padding: '10px',
        position: 'absolute',
    });

tooltip.append('div')
    .attr('class', 'name');
tooltip.append('div')
    .attr('class', 'value');
tooltip.append('div')
    .attr('class', 'percent');

path.on('mouseover', function(datum) {
    tooltip.select('.name').html(datum.data.name);
    tooltip.select('.value').html('$' + datum.data.value);
    tooltip.select('.percent').html(datum.data.percent + '%');
    tooltip.style('display', 'block');
});

path.on('mousemove', function () {
    var coordinates = d3.mouse(this);
    var x = coordinates[0] + chartSize / 2 + 20;
    var y = coordinates[1] + chartSize / 2 + 20;
    tooltip.style({'left': x + 'px', 'top': y + 'px'});
})

chart.on('mouseout', function() {
    tooltip.style('display', 'none');
});
