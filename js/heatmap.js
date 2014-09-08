

//height of each row in the heatmap
//width of each column in the heatmap

var heatmap = function(options){
    var config = {
        selector:'#heatmap',
        data:[],
        margin:{top: 20, right: 80, bottom: 30, left: 100},
        width:640,
        height:380
    }
    config.selector = options.selector?options.selector: config.selector;
    config.data = options.data?options.data: config.data;
    config.margin = options.margin?options.margin: config.margin;
    config.width = options.width?options.width: config.width;
    config.height = options.height?options.height: config.height;
    config.categories = options.categories;
    config.data_key = options.data_key;
    var width = config.width - config.margin.left - config.margin.right;
    var height = config.height - config.margin.top - config.margin.bottom;

    var gridSize = 40,
    h = gridSize,
    w = gridSize,
    rectPadding = 60;

    var drawGraph = function(){
        var colorLow = '#f2f2f2', colorMed = 'yellow', colorHigh = 'green';

        var colorScale = d3.scale.linear()
             .domain([0,4])
             .range([colorLow, colorHigh]);

        var thisData = [], i=0;
        var numColumns = 0;
        for(i=0; i<config.data.length; i++){
            var j=0;
            for(j=0; j<config.data[i][config.data_key].length; j++){
                thisData.push({"row":i, "col":j, "score":config.data[i][config.data_key][j]});
            }
            numColumns = j;
            

        }
        console.log(config.categories);
        var placeholder_for_labels = 100

        var svg = d3.select(config.selector).append("svg")
            .attr("width", config.width)
            .attr("height", config.height)
          .append("g")
            .attr("transform", "translate(0,0)");

        var heatMap = svg.selectAll(".heatmap")
            .data(thisData)
          .enter().append("svg:rect")
            .attr("x", function(d,i) { console.log(d); return d.col * w +config.margin.left; })
            .attr("y", function(d,i) { return d.row * h + placeholder_for_labels; })
            .attr("width", function(d) { return w; })
            .attr("height", function(d) { return h; })
            .style("fill", function(d) { return colorScale(d.score); });

        var colHeaders = svg.selectAll('.colHeaders')
            .data(config.categories)
        .enter().append("svg:text")
            .attr('x',function(d,i){return i*w+config.margin.left + w/2})
            .attr('y',placeholder_for_labels - 5)
            .attr("width",function(d){return w;})
            .attr("height",function(d){return h;})
            .attr('transform',function(d,i){
                return 'rotate(-45,'+(i*w+config.margin.left+w/2)+','+(placeholder_for_labels-5)+')'})
            .text(function(d){return d});
        var rowHeaders = svg.selectAll('.rowHeaders')
            .data(config.data)
        .enter().append("svg:text")
            .attr('x',function(d,i){return config.margin.left-5;})
            .attr('y',function(d,i){return i*h+placeholder_for_labels+h/2;})
            .attr("width",function(d){return w;})
            .attr("height",function(d){return h;})
            .attr('text-anchor','end')
            .text(function(d){return d.name});

        var rowEnders = svg.selectAll('.rowEnders')
            .data(config.data)
        .enter().append("svg:text")
                .attr('x',function(d,i){return numColumns*w+config.margin.left+5;})
                .attr('y',function(d,i){return i*h+placeholder_for_labels+h/2;})
                .attr("width",function(d){return w;})
                .attr("height",function(d){return h;})
                .text(function(d){return d.class})
        var rowEnders2 = svg.selectAll('.rowEndersMajor')
            .data(config.data)
        .enter().append("svg:text")
                .attr('x',function(d,i){return numColumns*w+config.margin.left+5;})
                .attr('y',function(d,i){return i*h+placeholder_for_labels+h;})
                .attr("width",function(d){return w;})
                .attr("height",function(d){return h;})
                .attr('fill','#A2A2A2')
                .text(function(d){return d.major})
            
    };
    drawGraph();

    
    return {

    };
};

