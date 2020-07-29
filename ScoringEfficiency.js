async function init() {
const data = await d3.csv('GSWNBA.csv');
var svg = d3.select("svg");
var w = 600;
var h = 400;

var margin = {top: 10, right: 100, bottom: 100, left:100};
var    width = 800 - margin.left - margin.right;
var    height = 500 - margin.top - margin.bottom;

var selector = d3.select("#selector");
console.log(selector.property("value"));

selector.on("change", function(){
var selectorValue = selector.property("value");

if(selectorValue == "Overall"){
d3.selectAll("svg > *").remove();
displayOverallEff();
}
else if (selectorValue == "Postup"){
d3.selectAll("svg > *").remove();
displayPostup();
}
else if (selectorValue == "Paint"){
  d3.selectAll("svg > *").remove();
displayPaint();
}
else if (selectorValue == "PullUp"){
  d3.selectAll("svg > *").remove();
displayPullps();
}
else if (selectorValue == "Drive"){
  d3.selectAll("svg > *").remove();
displayDrive();
}
else if (selectorValue == "CatchAndShoot"){
  d3.selectAll("svg > *").remove();
displayCatchAndShoot();
}
});

displayOverallEff();
function displayOverallEff(){
var xScale = d3.scaleLinear()
/*.domain([0 , d3.max(data, function(d) { return +d.PTS; })])*/
.domain(d3.extent(data, function(d) { return +d.PTS; })).nice()
.range([0, width]);



var yScale = d3.scaleLinear()
/*.domain([0, d3.max(data, function(d) { return +d.EFG; })])*/
.domain(d3.extent(data, function(d) { return +d.EFG; })).nice()
.range([height, 0]);

var aScale = d3.scaleSqrt()      
.domain([0, d3.max(data, function(d) { return +d.MIN; })]).range([0, 25]);



var color = d3.scaleOrdinal(d3.schemeCategory10);
var colorScale = d3.scaleSequential(d3.interpolateGreens).domain([30,2030]);

var dots = svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("class","effclass")
.attr("cx", function(d) { return xScale(+d.PTS);})
.attr("cy", function(d) { return yScale(+d.EFG);})
/*.attr("fill" , "lightblue")
.style("fill", function(d) { return color(d.PLAYER); })*/
.attr('fill', function(d){return(colorScale(+d.PTS));})
.attr("stroke" , "black")
.attr("r", function(d) {
    return aScale(d.MIN);  //'a' scale for 'area'!
   })
.append("title")
   			   .text(function(d) {
   			   		return d.PLAYER;
   			   });
			   

                        d3.select("#tooltip")
						.style("left", width + 320 + "px")
						.style("top", height/2 + 100	 + "px")						
						.select("#value")
						.text("Scored 1500+ Points with good efficiency");
						
						console.log(width/2);
			   
					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);			   


svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
.selectAll("text")
.data(data)
.enter()
.append("text")
.filter(function(d) { return d.PTS > 1500 })
.text(function(d) { return d.PLAYER; })
.attr("x", function(d) { return xScale(+d.PTS );})
.attr("y", function(d) { return yScale(+d.EFG);})
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
.filter(function(d) { return d.PTS > 1500 })
.style("stroke" , "black")
.style("stroke-width", 1)
.style("stroke-dasharray", 4)
.attr("x1", function(d) { return xScale(+d.PTS );})
.attr("y1", function(d) { return yScale(+d.EFG);})
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
              "translate(" + ((width/2) + 60) + " ," +
                             (h  + margin.top + 50 ) + ")")
        .style("text-anchor", "middle")
        .style("font-family", "sans-serif")
        .text("Total Points Scored");

        svg.append("text")
     .attr("transform", "rotate(-90)")
     .attr("y", 40)
     .attr("x", -height/2 - 25)
     .attr("dy", "1em")
     .style("text-anchor", "middle")
     .style("font-family", "sans-serif")
     .text("Scoring Efficiency ( Percentage)");
  }

  function displayCatchAndShoot(){

    var xScale = d3.scaleLinear()
    /*.domain([0 , d3.max(data, function(d) { return +d.PTS; })])*/
    .domain(d3.extent(data, function(d) { return +d.CSPTS; })).nice()
    .range([0, width]);

    var yScale = d3.scaleLinear()
    /*.domain([0, d3.max(data, function(d) { return +d.EFG; })])*/
    .domain(d3.extent(data, function(d) { return +d.CSFG; })).nice()
    .range([height, 0]);

    var aScale = d3.scaleSqrt()      
    .domain([0, d3.max(data, function(d) { return +d.MIN; })]).range([0, 25]);

  


    var colorScale = d3.scaleSequential(d3.interpolateGreens).domain([0,1000]);

    svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return xScale(+d.CSPTS);})
    .attr("cy", function(d) { return yScale(+d.CSFG);})
  
    .attr('fill', function(d){return(colorScale(+d.CSPTS));})
    .attr("stroke" , "black")
    .attr("r", function(d) {
        return aScale(d.MIN);  
       })
    .append("title")
       			   .text(function(d) {
       			   		return d.PLAYER;
       			   });
				   
				   
				   d3.select("#tooltip")
						.style("left", width + 320 + "px")
						.style("top", height/2 + 80	 + "px")						
						.select("#value")
						.text("Scored 600+ Catch And Shoot Points");
						
						console.log(width/2);
			   
					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);	
				   
				   
				   svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
.selectAll("text")
.data(data)
.enter()
.append("text")
.filter(function(d) { return d.CSPTS > 600 })
.text(function(d) { return d.PLAYER; })
.attr("x", function(d) { return xScale(+d.CSPTS );})
.attr("y", function(d) { return yScale(+d.CSFG);})
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
.filter(function(d) { return d.CSPTS > 600 })
.style("stroke" , "black")
.style("stroke-width", 1)
.style("stroke-dasharray", 4)
.attr("x1", function(d) { return xScale(+d.CSPTS );})
.attr("y1", function(d) { return yScale(+d.CSFG);})
.attr("x2", width + "px")
.attr("y2", height/2 - 115 + "px");	

   

    var xAxis = d3.axisBottom()
                  .scale(xScale);

    var yAxis = d3.axisLeft()
                  .scale(yScale)



        svg.append("g").attr("transform", "translate(" + margin.left  + "," + margin.top + ")")
            .call(yAxis);

        //svg.append("g").attr("transform", "translate(50," + 450 + ")")
        svg.append("g").attr("transform", "translate(" + margin.left + "," + (height + margin.top) + ")")
            .call(xAxis);



              svg.append("text")
                .attr("transform",
                      "translate(" + ((width/2) + 60) + " ," +
                                     (h  + margin.top + 50 ) + ")")
                .style("text-anchor", "middle")
                .style("font-family", "sans-serif")
                .text("Total Catch And Shoot Points Scored");

                svg.append("text")
             .attr("transform", "rotate(-90)")
             .attr("y", 40)
             .attr("x", -height/2 - 80)
             .attr("dy", "1em")
             .style("text-anchor", "middle")
             .style("font-family", "sans-serif")
             .text(" Catch And Shoot Scoring Efficiency");

  }

  function displayDrive(){

    var xScale = d3.scaleLinear()
    /*.domain([0 , d3.max(data, function(d) { return +d.PTS; })])*/
    .domain(d3.extent(data, function(d) { return +d.DRIVEPTS; })).nice()
    .range([0, width]);

    var yScale = d3.scaleLinear()
    /*.domain([0, d3.max(data, function(d) { return +d.EFG; })])*/
    .domain(d3.extent(data, function(d) { return +d.DRIVEFG; })).nice()
    .range([height, 0]);

    var aScale = d3.scaleSqrt()      // <--New!
    .domain([0, d3.max(data, function(d) { return +d.MIN; })]).range([0, 25]);

    /*var xScale = d3.scaleLog()
                   .domain([10, 150])
                   .range([0, 200]);

    var yScale = d3.scaleLog().base(10)
                   .domain([10, 150])
                   .range([200, 0]);*/


    var colorScale = d3.scaleSequential(d3.interpolateGreens).domain([0,500]);

    svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return xScale(+d.DRIVEPTS);})
    .attr("cy", function(d) { return yScale(+d.DRIVEFG);})

    .attr('fill', function(d){return(colorScale(+d.DRIVEPTS));})
    .attr("stroke" , "black")
    .attr("r", function(d) {
        return aScale(d.MIN);  
       })
    .append("title")
       			   .text(function(d) {
       			   		return d.PLAYER;
       			   });
				   
				   
				   d3.select("#tooltip")
						.style("left", width + 320 + "px")
						.style("top", height/2 + 100	 + "px")						
						.select("#value")
						.text("Scored 400+ Drive Points");
						
						console.log(width/2);
			   
					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);			   


svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
.selectAll("text")
.data(data)
.enter()
.append("text")
.filter(function(d) { return d.DRIVEPTS > 400 })
.text(function(d) { return d.PLAYER; })
.attr("x", function(d) { return xScale(+d.DRIVEPTS );})
.attr("y", function(d) { return yScale(+d.DRIVEFG);})
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
.filter(function(d) { return d.DRIVEPTS > 400 })
.style("stroke" , "black")
.style("stroke-width", 1)
.style("stroke-dasharray", 4)
.attr("x1", function(d) { return xScale(+d.DRIVEPTS );})
.attr("y1", function(d) { return yScale(+d.DRIVEFG);})
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
                                "translate(" + ((width/2) + 60) + " ," +
                                               (h  + margin.top + 50 ) + ")")
                          .style("text-anchor", "middle")
                          .style("font-family", "sans-serif")
                          .text("Total Drive Points Scored");

                          svg.append("text")
                       .attr("transform", "rotate(-90)")
                       .attr("y", 40)
                       .attr("x", -height/2 - 80)
                       .attr("dy", "1em")
                       .style("text-anchor", "middle")
                       .style("font-family", "sans-serif")
                       .text("Drive Shot Scoring Efficiency");


  }

  function displayPullps(){

    var xScale = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return +d.PULLUPPTS; })).nice()
    .range([0, width]);

    var yScale = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return +d.PULLUPFG; })).nice()
    .range([height, 0]);

    var aScale = d3.scaleSqrt()      // <--New!
    .domain([0, d3.max(data, function(d) { return +d.MIN; })]).range([0, 25]);




    var colorScale = d3.scaleSequential(d3.interpolateGreens).domain([0,800]);

svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return xScale(+d.PULLUPPTS);})
    .attr("cy", function(d) { return yScale(+d.PULLUPFG);})
   
    .attr('fill', function(d){return(colorScale(+d.PULLUPPTS));})
    .attr("stroke" , "black")
    .attr("r", function(d) {
        return aScale(d.MIN);  
       })
    .append("title")
       			   .text(function(d) {
       			   		return d.PLAYER;
       			   });
				   
				   
				   d3.select("#tooltip")
						.style("left", width + 320 + "px")
						.style("top", height/2 + 160	 + "px")						
						.select("#value")
						.text("Scored 400+ Pullup Points");
						
						console.log(width/2);
			   
					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);			   


svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
.selectAll("text")
.data(data)
.enter()
.append("text")
.filter(function(d) { return d.PULLUPPTS > 400 })
.text(function(d) { return d.PLAYER; })
.attr("x", function(d) { return xScale(+d.PULLUPPTS );})
.attr("y", function(d) { return yScale(+d.PULLUPFG);})
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
.filter(function(d) { return d.PULLUPPTS > 400 })
.style("stroke" , "black")
.style("stroke-width", 1)
.style("stroke-dasharray", 4)
.attr("x1", function(d) { return xScale(+d.PULLUPPTS );})
.attr("y1", function(d) { return yScale(+d.PULLUPFG);})
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
                              "translate(" + ((width/2) + 60) + " ," +
                                             (h  + margin.top + 50 ) + ")")
                        .style("text-anchor", "middle")
                        .style("font-family", "sans-serif")
                        .text("Total PullUp Points Scored");

                        svg.append("text")
                     .attr("transform", "rotate(-90)")
                     .attr("y", 40)
                     .attr("x", -height/2 - 80)
                     .attr("dy", "1em")
                     .style("text-anchor", "middle")
                     .style("font-family", "sans-serif")
                     .text("PollUp Scoring Efficiency");


  }

  function displayPaint(){

    var xScale = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return +d.PAINTTOUCHPTS; })).nice()
    .range([0, width]);

    var yScale = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return +d.PAINTTOUCHFG; })).nice()
    .range([height, 0]);

    var aScale = d3.scaleSqrt()      
    .domain([0, d3.max(data, function(d) { return +d.MIN; })]).range([0, 25]);

    


    var colorScale = d3.scaleSequential(d3.interpolateGreens).domain([0,350]);

    svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return xScale(+d.PAINTTOUCHPTS);})
    .attr("cy", function(d) { return yScale(+d.PAINTTOUCHFG);})
  
    .attr('fill', function(d){return(colorScale(+d.PAINTTOUCHPTS));})
    .attr("stroke" , "black")
    .attr("r", function(d) {
        return aScale(d.MIN); 
       })
    .append("title")
       			   .text(function(d) {
       			   		return d.PLAYER;
       			   });
				   
				   
				                           d3.select("#tooltip")
						.style("left", width + 320 + "px")
						.style("top", height/2 + 100	 + "px")						
						.select("#value")
						.text("Scored 300+ Paint Points");
						
						console.log(width/2);
			   
					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);			   


svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
.selectAll("text")
.data(data)
.enter()
.append("text")
.filter(function(d) { return d.PAINTTOUCHPTS > 300 })
.text(function(d) { return d.PLAYER; })
.attr("x", function(d) { return xScale(+d.PAINTTOUCHPTS );})
.attr("y", function(d) { return yScale(+d.PAINTTOUCHFG);})
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
.filter(function(d) { return d.PAINTTOUCHPTS > 300 })
.style("stroke" , "black")
.style("stroke-width", 1)
.style("stroke-dasharray", 4)
.attr("x1", function(d) { return xScale(+d.PAINTTOUCHPTS );})
.attr("y1", function(d) { return yScale(+d.PAINTTOUCHFG);})
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
                              "translate(" + ((width/2) + 60) + " ," +
                                             (h  + margin.top + 50 ) + ")")
                        .style("text-anchor", "middle")
                        .style("font-family", "sans-serif")
                        .text("Total Paint Points Scored");

                        svg.append("text")
                     .attr("transform", "rotate(-90)")
                     .attr("y", 40)
                     .attr("x", -height/2 - 80)
                     .attr("dy", "1em")
                     .style("text-anchor", "middle")
                     .style("font-family", "sans-serif")
                     .text("Paint Shot Scoring Efficiency");


  }

  function displayPostup(){

    var xScale = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return +d.POSTTOUCHPTS; })).nice()
    .range([0, width]);

    var yScale = d3.scaleLinear()
    .domain(d3.extent(data, function(d) { return +d.POSTTOUCHFG; })).nice()
    .range([height, 0]);

    var aScale = d3.scaleSqrt()      // <--New!
    .domain([0, d3.max(data, function(d) { return +d.MIN; })]).range([0, 25]);

 


    var colorScale = d3.scaleSequential(d3.interpolateGreens).domain([0,250]);

    svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
    .selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function(d) { return xScale(+d.POSTTOUCHPTS);})
    .attr("cy", function(d) { return yScale(+d.POSTTOUCHFG);})

    .attr('fill', function(d){return(colorScale(+d.POSTTOUCHPTS));})
    .attr("stroke" , "black")
    .attr("r", function(d) {
        return aScale(d.MIN);  
       })
    .append("title")
       			   .text(function(d) {
       			   		return d.PLAYER;
       			   });
				   
				   
				   d3.select("#tooltip")
						.style("left", width + 320 + "px")
						.style("top", height/2 + 160	 + "px")						
						.select("#value")
						.text("Scored 200+ Postup Points");
						
						console.log(width/2);
			   
					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);			   


svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
.selectAll("text")
.data(data)
.enter()
.append("text")
.filter(function(d) { return d.POSTTOUCHPTS > 200 })
.text(function(d) { return d.PLAYER; })
.attr("x", function(d) { return xScale(+d.POSTTOUCHPTS );})
.attr("y", function(d) { return yScale(+d.POSTTOUCHFG);})
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
.filter(function(d) { return d.POSTTOUCHPTS > 200 })
.style("stroke" , "black")
.style("stroke-width", 1)
.style("stroke-dasharray", 4)
.attr("x1", function(d) { return xScale(+d.POSTTOUCHPTS );})
.attr("y1", function(d) { return yScale(+d.POSTTOUCHFG);})
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
                              "translate(" + ((width/2) + 60) + " ," +
                                             (h  + margin.top + 50 ) + ")")
                        .style("text-anchor", "middle")
                        .style("font-family", "sans-serif")
                        .text("Total Postup Points Scored");

                        svg.append("text")
                     .attr("transform", "rotate(-90)")
                     .attr("y", 40)
                     .attr("x", -height/2 - 80)
                     .attr("dy", "1em")
                     .style("text-anchor", "middle")
                     .style("font-family", "sans-serif")
                     .text("PostUp Shot Scoring Efficiency");




  }

}