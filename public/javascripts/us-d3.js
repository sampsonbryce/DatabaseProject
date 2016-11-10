// var width = 960,
// height = 600;
//
// var path = d3.geo.path()
// .projection(null);
//
// var svg = d3.select("body").append("svg")
// .attr("width", width)
// .attr("height", height);
//
// d3.json("build/counties.json", function(error, us) {
//   if (error) return console.error(error);
//
//   svg.append("path")
//   .datum(topojson.mesh(us))
//   .attr("d", path);
//
//   aa = [-122.490402, 37.786453];
//   bb = [-122.389809, 37.72728];
//
//   // add circles to svg
//   svg.selectAll("circle")
//   .data([aa,bb]).enter()
//   .append("circle")
//   .attr("cx", function (d) { console.log("LOGGING", projection(d)); return projection(d)[0]; })
//   .attr("cy", function (d) { return projection(d)[1]; })
//   .attr("r", "8px")
//   .attr("fill", "red")
//
// });
function buildMap(coord_array){

  var width = 950,
  height = 550;

  // set projection
  var projection = d3.geo.albersUsa()
  .translate([width/2, height/2])    // translate to center of screen
  .scale([1000]);          // scale things down so see entire US

  // create path variable
  var path = d3.geo.path()
  .projection(projection);


  d3.json("/javascripts/us.json", function(error, topo) { console.log(topo);

    states = topo.features

    // create svg variable
    var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

    // points
    // aa = [-122.490402, 37.786453];
    // bb = [-122.389809, 37.72728];
    //
    // console.log(projection(aa),projection(bb));
    // var color = d3.scale.linear().domain([1, 5]).range(1000, 10000);
    // var color = d3.scale.linear().domain([1, 5]).range(0, 7000);
    var color = d3.scale.linear().domain([0, 7000]).range(0, 5);

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
    svg.selectAll("circle")
    .data(coord_array).enter()
    .append("circle")
    .attr("cx", function (d) { /*console.log("LOGGING", projection(d))*/; if(projection(d)){return projection(d)[0];} })
    .attr("cy", function (d) { if(projection(d)){return projection(d)[1];}})
    .attr("r", "2px")
    .attr("fill", function(d, i) { console.log(i, color(i)); return d3.rgb("red").darker(color(i))} )

  });

}
