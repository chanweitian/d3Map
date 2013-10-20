
var landColor = d3.rgb("#666666"); 
var width = height = null;

var chart_svg = d3.select("#chart").append("svg");

var background = chart_svg.append("rect")
							.attr("fill", "#111");

var projection = d3.geo.projection(d3.geo.hammer.raw(1.75, 2))
						.rotate([-10, -45])
						.scale(180);
var path = d3.geo.path()
					.projection(projection);
							
var rscale = d3.scale.sqrt();

function initSizes() {
  width = $(window).width();
  height = $(window).height() - 40;
  background
    .attr("width", width)
    .attr("height", height);
  projection.translate([width/2.3,height/2]);
  chart_svg
    .attr("width", width)
    .attr("height", height);
  rscale.range([0, height/45]);
};

initSizes();

queue()
  .defer(d3.json, "data/world-countries.json")
  .await(function(err, world){
    var leftMargin = 350; // Math.max(100, width*0.4);
    var fitMapProjection = function() {
      fitProjection(projection, world, [[leftMargin, 60], [width - 20, height-120]], true);
    };
    
    fitMapProjection();

    chart_svg.append("g")
       	.attr("class", "map")
      	.selectAll("path")
        .data(world.features)
        .enter().append("path")
        .attr("class", "land")
        .attr("fill", landColor)
        .attr("data-code", function(d) { return d.id; });

    var updateMap = function() {
      chart_svg.selectAll("g.map path")
        .attr("d", path);
    };

    updateMap();


  });



