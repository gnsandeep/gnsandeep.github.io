async function init() {
const data = await d3.csv('GSWDefense.csv');
var svg = d3.select("svg");
var w = 600;
var h = 400;

var margin = {top: 30, right: 100, bottom: 100, left:100};
var    width = 800 - margin.left - margin.right;
var    height = 600 - margin.top - margin.bottom;



//d3.extent(data, function(d) { return d.sepalWidth; }).nice()
displayAssists();
function displayAssists(){
var xScale = d3.scaleLinear()
/*.domain([0 , d3.max(data, function(d) { return +d.PTS; })])*/
.domain(d3.extent(data, function(d) { return +d.PASSESMADE; })).nice()
.range([0, width]);



var yScale = d3.scaleLinear()
/*.domain([0, d3.max(data, function(d) { return +d.EFG; })])*/
.domain(d3.extent(data, function(d) { return +d.ASTTOPASS; })).nice()
.range([height, 0]);

var aScale = d3.scaleSqrt()      // <--New!
.domain([0, d3.max(data, function(d) { return +d.MIN; })]).range([0, 20]);

/*var xScale = d3.scaleLog()
               .domain([10, 150])
               .range([0, 200]);

var yScale = d3.scaleLog().base(10)
               .domain([10, 150])
               .range([200, 0]);*/

var color = d3.scaleOrdinal(d3.schemeCategory10);
var colorScale = d3.scaleSequential(d3.interpolateGreens).domain([40,4000]);

var dots = svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("class","effclass")
.attr("cx", function(d) { return xScale(+d.PASSESMADE);})
.attr("cy", function(d) { return yScale(+d.ASTTOPASS);})
/*.attr("fill" , "lightblue")
.style("fill", function(d) { return color(d.PLAYER); })*/
.attr('fill', function(d){return(colorScale(+d.PASSESMADE));})
.attr("stroke" , "black")
.attr("r", function(d) {
    return aScale(+d.MIN);  //'a' scale for 'area'!
   })
.append("title")
   			   .text(function(d) {
   			   		return d.PLAYER + " : " + d.PASSESMADE + " Passes Made , "  + d.ASTTOPASS + "% Assist Percentage";
   			   });


                        d3.select("#tooltip")
						.style("left", width + 400 + "px")
						.style("top", height/2 + 145	 + "px")
						.select("#value")
						.text("Have more than 3000+ Passes");

						console.log(width/2);

					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);


svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
.selectAll("text")
.data(data)
.enter()
.append("text")
.filter(function(d) { return +d.PASSESMADE > 3000   })
.text(function(d) { return d.PLAYER; })
.attr("x", function(d) { return xScale(+d.PASSESMADE );})
.attr("y", function(d) { return yScale(+d.ASTTOPASS);})
.attr("text-anchor", "middle")
					   .attr("font-family", "sans-serif")
					   .attr("font-size", "11px")
					   .attr("font-weight", "bold")
					   .attr("fill", "black");


svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
.selectAll("line")
.data(data)
.enter()
.append("line")
.filter(function(d) { return d.PASSESMADE > 3000 })
.style("stroke" , "black")
.style("stroke-width", 1)
.style("stroke-dasharray", 4)
.attr("x1", function(d) { return xScale(+d.PASSESMADE );})
.attr("y1", function(d) { return yScale(+d.ASTTOPASS);})
.attr("x2", width + "px")
.attr("y2", height/2 - 95 + "px");




var xAxis = d3.axisBottom()
              .scale(xScale);
              /*.tickValues([100, 400, 800, 1200, 1600 , 2000 , 2400]).tickFormat(d3.format("~s")) ;*/

var yAxis = d3.axisLeft()
              .scale(yScale)
              /*.tickValues([10, 20, 40,60,80, 100]).tickFormat(d3.format("~s")) ;*/

svg.append("g").attr("transform", "translate(" + margin.left  + "," + margin.top + ")")
    .call(yAxis);

svg.append("g").attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
    .call(xAxis);



      svg.append("text")
        .attr("transform",
              "translate(" + ((width/2) + 80) + " ," +
                             (h  + margin.top + 115 ) + ")")
        .style("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .text("Total Passes Made");

        svg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 50)
     .attr("x", -height/2 - 40)
     .attr("dy", "1em")
     .style("text-anchor", "middle")
     .style("font-family", "sans-serif")
     .text("Assist Percentage");
  }

  



}