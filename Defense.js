async function init() {
const data = await d3.csv('GSWDefense.csv');
var svg = d3.select("svg");
var w = 600;
var h = 400;

var margin = {top: 10, right: 100, bottom: 100, left:100};
var    width = 800 - margin.left - margin.right;
var    height = 600 - margin.top - margin.bottom;

var selector = d3.select("#selector");
console.log(selector.property("value"));

selector.on("change", function(){
var selectorValue = selector.property("value");

if(selectorValue == "StealAndBlocks"){
d3.selectAll("svg > *").remove();
displayStealAndBlocks();
}
else if (selectorValue == "DefenceEff"){
d3.selectAll("svg > *").remove();
displayDefenceEff();
}
});

//d3.extent(data, function(d) { return d.sepalWidth; }).nice()
displayStealAndBlocks();
function displayStealAndBlocks(){
var xScale = d3.scaleLinear()
/*.domain([0 , d3.max(data, function(d) { return +d.PTS; })])*/
.domain(d3.extent(data, function(d) { return +d.STEALS; })).nice()
.range([0, width]);



var yScale = d3.scaleLinear()
/*.domain([0, d3.max(data, function(d) { return +d.EFG; })])*/
.domain(d3.extent(data, function(d) { return +d.BLOCKS; })).nice()
.range([height, 0]);

var aScale = d3.scaleSqrt()      // <--New!
.domain([0, d3.max(data, function(d) { return +d.MIN; })]).range([0, 25]);

/*var xScale = d3.scaleLog()
               .domain([10, 150])
               .range([0, 200]);

var yScale = d3.scaleLog().base(10)
               .domain([10, 150])
               .range([200, 0]);*/

var color = d3.scaleOrdinal(d3.schemeCategory10);
var colorScale = d3.scaleSequential(d3.interpolateGreens).domain([0,95]);

var dots = svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("class","effclass")
.attr("cx", function(d) { return xScale(+d.STEALS);})
.attr("cy", function(d) { return yScale(+d.BLOCKS);})
/*.attr("fill" , "lightblue")
.style("fill", function(d) { return color(d.PLAYER); })*/
.attr('fill', function(d){return(colorScale(+d.STEALS));})
.attr("stroke" , "black")
.attr("r", function(d) {
    return aScale(d.MIN);  //'a' scale for 'area'!
   })
.append("title")
   			   .text(function(d) {
   			   		return  d.PLAYER + " : " + d.STEALS + " Steals , "  + d.BLOCKS + " Blocks";
   			   });


                        d3.select("#tooltip")
						.style("left", width + 415 + "px")
						.style("top", height/2 + 240	 + "px")
						.select("#value")
						.text("Has 90+ Steals and 60+ Blocks");

						console.log(width/2);

					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);


svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
.selectAll("text")
.data(data)
.enter()
.append("text")
.filter(function(d) { return ( d.STEALS > 80 & d.BLOCKS > 60)  })
.text(function(d) { return d.PLAYER; })
.attr("x", function(d) { return xScale(+d.STEALS );})
.attr("y", function(d) { return yScale(+d.BLOCKS);})
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
.filter(function(d) { return ( d.STEALS > 80 & d.BLOCKS > 60) })
.style("stroke" , "black")
.style("stroke-width", 1)
.style("stroke-dasharray", 4)
.attr("x1", function(d) { return xScale(+d.STEALS );})
.attr("y1", function(d) { return yScale(+d.BLOCKS);})
.attr("x2", width + "px")
.attr("y2", height/2 - 95 + "px");








var xAxis = d3.axisBottom()
              .scale(xScale);

var yAxis = d3.axisLeft()
              .scale(yScale)

svg.append("g").attr("transform", "translate(" + margin.left  + "," + margin.top + ")")
    .call(yAxis);

svg.append("g").attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
    .call(xAxis);



      svg.append("text")
        .attr("transform",
              "translate(" + ((width/2) + 100) + " ," +
                             (h  + margin.top + 130 ) + ")")
        .style("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .text("Total Steals");

        svg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 50)
     .attr("x", -height/2 - 30)
     .attr("dy", "1em")
     .style("text-anchor", "middle")
     .style("font-family", "sans-serif")
     .text("Total Blocks");
  }

  function displayDefenceEff(){

		var xScale = d3.scaleLinear()
		/*.domain([0 , d3.max(data, function(d) { return +d.PTS; })])*/
		.domain(d3.extent(data, function(d) { return +d.DEFENSIVEREB; })).nice()
		.range([0, width]);



		var yScale = d3.scaleLinear()
		/*.domain([0, d3.max(data, function(d) { return +d.EFG; })])*/
		.domain(d3.extent(data, function(d) { return +d.DFGEF; })).nice()
		.range([height, 0]);

		var aScale = d3.scaleSqrt()      // <--New!
		.domain([0, d3.max(data, function(d) { return +d.MIN; })]).range([0, 25]);



		var color = d3.scaleOrdinal(d3.schemeCategory10);
		var colorScale = d3.scaleSequential(d3.interpolateGreens).domain([0,500]);

		var dots = svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
		.selectAll("circle")
		.data(data)
		.enter()
		.append("circle")
		.attr("class","effclass")
		.attr("cx", function(d) { return xScale(+d.DEFENSIVEREB);})
		.attr("cy", function(d) { return yScale(+d.DFGEF);})
		/*.attr("fill" , "lightblue")
		.style("fill", function(d) { return color(d.PLAYER); })*/
		.attr('fill', function(d){return(colorScale(+d.DEFENSIVEREB));})
		.attr("stroke" , "black")
		.attr("r", function(d) {
		    return aScale(d.MIN);  //'a' scale for 'area'!
		   })


		.append("title")
		   			   .text(function(d) {
		   			   		return d.PLAYER + " : " + d.DEFENSIVEREB + " Defensive Rebounds , "  + d.DFGEF + "% Defensive Efficiency";
		   			   });


		                        d3.select("#tooltip")
								.style("left", width + 290 + "px")
								.style("top", height/2 + 170	 + "px")
								.select("#value")
								.text("Have 400+ Defensive Rebounds and Defensive Effeciency is less than 60%");

								console.log(width/2);

							//Show the tooltip
							d3.select("#tooltip").classed("hidden", false);


		svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
		.selectAll("text")
		.data(data)
		.enter()
		.append("text")
		.filter(function(d) { return d.DEFENSIVEREB > 400   })
		.text(function(d) { return d.PLAYER; })
		.attr("x", function(d) { return xScale(+d.DEFENSIVEREB );})
		.attr("y", function(d) { return yScale(+d.DFGEF);})
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
		.filter(function(d) { return d.DEFENSIVEREB > 400 })
		.style("stroke" , "black")
		.style("stroke-width", 1)
		.style("stroke-dasharray", 4)
		.attr("x1", function(d) { return xScale(+d.DEFENSIVEREB );})
		.attr("y1", function(d) { return yScale(+d.DFGEF);})
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
		              "translate(" + ((width/2) + 100) + " ," +
		                             (h  + margin.top + 130 ) + ")")
		        .style("text-anchor", "middle")
		        .style("font-family", "sans-serif")
		        .text("Defensice Rebounds");

		        svg.append("text")
		     .attr("transform", "rotate(-90)")
		     .attr("y", 50)
		     .attr("x", -height/2 - 30)
		     .attr("dy", "1em")
		     .style("text-anchor", "middle")
		     .style("font-family", "sans-serif")
		     .text("Opponents Scoring Percentage");


  }



}