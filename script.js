//set up buttons
var labelWidth=0;
var label=['       Taiwan        ','China','United States','Other Asia Pacific'];
var label2=['2171','1894','589','1983'];
var width = 600
height = 300
const data = [{       
        "country": "Taiwan",
        "boxes": 108,
        "revenue": 2171
      },
      {
        "country": "China",
        "boxes": 95,
        "revenue":1894
      },
      {
        "country": "United States",
        "boxes": 30,
        "revenue": 589
      },
      {
        "country": "Other Asia Pacific",
        "boxes": 99,
        "revenue": 1983
      }
    ];

    const colors = ["#FF8E79", "#FF6B5B", "#FF4941", "#DB1D25"];
    scaleColor = d3.scaleOrdinal()
      .domain(data.map(d => d.country))
      .range(colors);


    uncount = (data, accessor) =>
      data.reduce((arr, item) => {
        const count = accessor(item)
        for (let i = 0; i < count; i++) {
          arr.push({
            ...item
          })
        }
        return arr
      }, []);

    const boxes = uncount(data, d => d.boxes);

    const nest = d3
      .nest()
      .key(d => d.country)
      .entries(boxes)


    const graph = d3.select(".chart");
    const group = graph
      .selectAll(".container")
      .data(nest)
      .join("div")
      .attr("class", "container");

// var x = d3.scaleLinear()
//   .domain([0, d3.max(data)])
//   .range([0, 200]);

    // const labeltry=d3.select(".chart")
    // labeltry.selectAll(".container")
    // .append("text")
    //       .attr("class","label")
    //       .text(function(d, i) { return label[i]; })
 

    group
      .selectAll(".box")
      .data(d => d.values)
      .join("div")
      .attr("class", "box")
      .style("background-color", d => scaleColor(d.country));

   
    // graph.selectAll(".container")
    // .append("text")
    //       .attr("class","label")
    //       .text(function(d, i) { return label2[i]; })




//intitiate paused animation
let anim = new TimelineLite({paused: false});

anim.staggerTo(".label",0.5,{

  scale:1,
  ease: Power1.easeOut,

    stagger: {
    grid: "auto",
    from: "start",
    axis: "y",
    each: 0.07
  }


});

anim.staggerTo(".box", 1, {
  scale: 1,
  ease: Power1.easeOut,
  stagger: {
    grid: "auto",
    from: "start",
    axis: "y",
    each: 0.07
  }

});




  