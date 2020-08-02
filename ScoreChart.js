async function init() {
var data = await d3.csv('nba_savantGSW1819.csv');

var shot_xScale = d3.scaleLinear()
                             .domain([-200, 200]);
var shot_yScale = d3.scaleLinear()
                             .domain([0,221]);

  const margin = { left: 50, right: 50, top: 50, bottom: 50 };

  //const innerWidth = 500 - margin.left - margin.right;
    //const innerHeight = 470 - margin.top - margin.bottom;

  /*  shot_xScale.range([margin.left, innerWidth])
               .nice();

    shot_yScale.range([margin.top, innerHeight])
               .nice(); */
			   
   shot_xScale.range([100, 500])
               .nice();

    shot_yScale.range([60,300])
               .nice();


var vardata = data.filter(function(d) 
{ 

        if (d["name"] == "Kevin Durant"){
                    return d;
                  } 

    }) 			   

contours = d3.contourDensity() // Build a contourDensity object
    .x(function(d,i) {return shot_xScale(+d.x);})
    .y(function(d,i) {return shot_yScale(+d.y);})
    //.size([500, 465])
	  .size([innerWidth, innerHeight])
    .bandwidth(24);

	// This sets how "tight" our contours are"

colour = d3.scaleSequential(d3.interpolateInferno)
    .domain([0,0.1]);



//	d3.select("svg").append("g").attr("transform","translate(" + 300 + "," + 100 + ")")
d3.select("svg")
    .selectAll("path")
    .data(contours(data)) 
    .enter()
    .append("path")
    .attr("class", "contour")
    .attr("stroke", "green")
    .attr("fill", function(d) {return colour(d.value);})
    .attr("d", d3.geoPath()); //
	
	
	


var shots = d3.select("svg").append("g").attr("transform","translate(" + 300 + "," + 100 + ")")
             .selectAll("g").data(data).enter().append("g").attr("class","shot")
              .attr("transform",function(d) { return "translate(" + d.x + "," + d.y + ")" ;
            })
            .on("mouseover" , function(d) {
              d3.select(this).raise()
              .append("text")
              .attr("class","playername")
              .text(d.name);
            } )
            .on("mouseout", function(d){
              d3.selectAll("text.playername").remove();
            })

           
				
				
				
				
    var players = d3.nest()
       .key(function(d) {return d.name;})
       .rollup(function(a) {return a.length;})
       .entries(data);

      
    var selector = d3.select("#selector");

    selector.selectAll("option")
            .data(players)
            .enter()
            .append("option")
            .text(function(d) {return d.key + ":" + d.value;})
            .attr("value", function(d){ return d.key;});

    selector.on("change", function(){
		
		shots.append("circle")
                .attr("r",2)
                .attr("fill" , function(d){
                  if (d.shot_made_flag == 1){
                    return "#fdb927";
                  }
                  else{
                    return "#fdb927";
                  }
                });
				
      d3.selectAll(".shot")
      .attr("opacity" , 1.0);

      var value = selector.property("value");
	  console.log(value);
      //if(value != "ALL"){
         d3.selectAll(".shot")
         .filter(function(d) { return d.name != value;})
         .attr("opacity", 0);
     // }

    });
	
	
	
	d3.select("#tooltip")
						.style("left",  950 + "px")
						.style("top",  360	 + "px")
						.select("#value")
						.text("Majority of the shots are taken around BasketBall Rim");

						//console.log(width/2);

					//Show the tooltip
					d3.select("#tooltip").classed("hidden", false);
					
   d3.select("#tooltiplc")
						.style("left",  950 + "px")
						.style("top",  440	 + "px")
						.select("#value")
						.text("These are the other preferred locations");

						//console.log(width/2);

					//Show the tooltip
					d3.select("#tooltiplc").classed("hidden", false); 

					
					
  d3.select("svg").append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
.append("line")
.style("stroke" , "black")
.style("stroke-width", 1)
.style("stroke-dasharray", 4)
.attr("x1", shot_xScale(0) + "px" )
.attr("y1", shot_yScale(-30) + "px")
.attr("x2", 600 + "px")
.attr("y2", -10 + "px");

  d3.select("svg").append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
.append("line")
.style("stroke" , "black")
.style("stroke-width", 1)
.style("stroke-dasharray", 4)
.attr("x1", shot_xScale(100) + "px" )
.attr("y1", shot_yScale(150) + "px")
.attr("x2", 590 + "px")
.attr("y2", 50 + "px");	


d3.select("svg").append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
.append("line")
.style("stroke" , "black")
.style("stroke-width", 1)
.style("stroke-dasharray", 4)
.attr("x1", shot_xScale(-180) + "px" )
.attr("y1", shot_yScale(150) + "px")
.attr("x2", 590 + "px")
.attr("y2", 50 + "px");					


}