//set up buttons
let button = document.getElementsByTagName("button")[0];
let button2 = document.getElementsByTagName("button")[1];
const data = [{
        "year": 2015,
        "tour": "The Red Bullet",
        "venue": "Rosemont theatre",
        "capacity": 4400,
        "boxes": 18
      },
      {
        "year": 2017,
        "tour": "Wings",
        "venue": "Allstate arena",
        "capacity": 18500,
        "boxes": 74
      },
      {
        "year": 2018,
        "tour": "Love Yourself",
        "venue": "United center",
        "capacity": 23500,
        "boxes": 94
      },
      {
        "year": 2019,
        "tour": "Love Yourself - Speak Yourself",
        "venue": "Soldier Field",
        "capacity": 61500,
        "boxes": 246
      }
    ];

    const colors = ["#FF8E79", "#FF6B5B", "#FF4941", "#DB1D25"];
    scaleColor = d3.scaleOrdinal()
      .domain(data.map(d => d.year))
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
      .key(d => d.venue)
      .entries(boxes);

    const graph = d3.select(".chart");
    const group = graph
      .selectAll(".container")
      .data(nest)
      .join("div")
      .attr("class", "container");

    group
      .selectAll(".box")
      .data(d => d.values)
      .join("div")
      .attr("class", "box")
      .style("background-color", d => scaleColor(d.year));

//intitiate paused animation
let anim = new TimelineLite({paused: true});
anim.staggerTo(".box", 1, {
  scale: 1,
  ease: Back.easeOut,
  stagger: {
    grid: "auto",
    from: "start",
    axis: "y",
    each: 0.08
  }
});
//play animation 
button.addEventListener ("click", function(e) {
    e.preventDefault();
    if(!anim.isActive()) {
      anim.play(0);
    }
});
//reverse animation
button2.addEventListener ("click", function(e) {
    e.preventDefault();
    anim.reverse();
});



