function buildMap(coord_array, color_attribute){
  $('.map').empty();
  var width = 950,
  height = 550;

  // set projection
  var projection = d3.geo.albersUsa()
  .translate([width/2, height/2])    // translate to center of screen
  .scale([1000]);          // scale things down so see entire US

  // create path variable
  var path = d3.geo.path()
  .projection(projection);


  d3.json("/javascripts/us.json", function(error, topo) {
    console.log(topo);

    states = topo.features

    // create svg variable
    var svg = d3.select(".map").append("svg")
      .attr("width", width)
      .attr("height", height);
    var max = d3.max(coord_array, function(d){ return d[color_attribute]})
    var color = d3.scale.linear().domain([0, max]).range([0, 5]);
    var scale = d3.scale.linear().domain([0, max]).range([1, 5]);
    console.log('MAX:', max);
    // add states from topojson
    svg.selectAll("path")
      .data(states).enter()
      .append("path")
      .attr("class", "feature")
      .style("fill", "steelblue")
      .attr("d", path);

    // put boarder around states
    svg.append("path")
      .datum(topojson.mesh(topo, topo.features, function(a, b) { return a !== b; }))
      .attr("class", "mesh")
      .attr("d", path);
    // console.log("coords", coord_array);

    // add circles to svg
    console.log("length:", coord_array.length);
    svg.selectAll("circle")
      .data(coord_array).enter()
      .append("circle")
      .attr("cx", function (d) { /*console.log("LOGGING", projection([d.lon, d.lat]), d);*/ if(projection([d.lon, d.lat])){return projection([d.lon, d.lat])[0];} })
      .attr("cy", function (d) { if(projection([d.lon, d.lat])){return projection([d.lon, d.lat])[1];}})
      .attr("r", function(d) { if(projection([d.lon, d.lat])){ return Math.pow(2, scale(d[color_attribute])) + "px"}})
      .attr("fill", function(d, i) { /*console.log(d, projection(d));*/ return d3.rgb("red").darker(color(d[color_attribute]))})
      .attr("opacity", 0.5)
  });

}
