var dataset = [
  { name: 'League of Legends', revenue: 1628 },
  { name: 'CrossFire', revenue: 1110 },
  { name: 'Dungeon Fighter Online', revenue: 1052 },
  { name: 'World of Warcraft', revenue: 40 },
  { name: 'World of Tanks', revenue: 446 },
  { name: 'Lineage I', revenue: 339 },
  { name: 'Maplestory', revenue: 253 },
  { name: 'DOTA 2', revenue: 238 },
  { name: 'Counter­Strike: Global Offensive', revenue: 221 },
  { name: 'Grand Theft Auto V', revenue: 205 }
];

var chartSize = 500;
var chartRadius = chartSize / 2;

// https://github.com/mbostock/d3/wiki/Ordinal-Scales#categorical-colors
var color = d3.scale.category20b();

var chart = d3.select('#chart')
    .append('svg')
    .attr({width: chartSize, height: chartSize})
    .append('g')
    .attr('transform', 'translate(' + chartRadius + ',' + chartRadius + ')');

var arc = d3.svg.arc()
    .outerRadius(chartRadius);

var pie = d3.layout.pie()
    .value(function(datum) { return datum.revenue; });

var path = chart.selectAll('path')
    .data(pie(dataset))
    .enter()
    .append('path')
    .attr('d', arc)
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
    .attr('x', legendSize + legendSpacing)
    .attr('y', (legendSize/2) + 4)
    .text(function(datum) { return datum; });
