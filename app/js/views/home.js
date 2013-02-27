define([
		'text!templates/home.html'], 
function(template){
	var HomeView = Backbone.View.extend({
		 el: '#content',
		 template: _.template(template),
                 ds:'',
                 events: {
		    },
		initialize: function(){
                      
                 //alert('hello');
                 this.ds = new Miso.Dataset({
		  url : "/data/Wastedvotes.csv",
		  delimiter : ",",
		  columns : [
		    { name : "cir_id", type : "number"},
                    { name : "circ_name", type : "string"},
                    { name : "total_votes", type : "number"}, 
                    { name : "votes_ennahdha", type : "number"},
                    { name : "votes_cpr", type : "number"},
		    { name : "votes_fdtl", type : "number"},
                    { name : "Wasted", type : "number"},
                    { name : "Blank_ballots", type : "number"},
                    { name : "cancelled_ballots", type : "number"},
		  ]
		});
				 
		},
		render: function(){
		 this.$el.html(this.template);
                  this.ds.fetch({
		  success: function() {
		    var total_votes=this.sum('total_votes'); 
                    var wasted= this.sum('Wasted'); 
                    var blancc =this.sum('Blank_ballots');
                    var cancelled = this.sum('cancelled_ballots');
                    var ennahdha= this.sum('votes_ennahdha');
                    var cpr =this.sum('votes_cpr');
                    var tak =this.sum('votes_fdtl');
                   $(".greenCircle").attr('value',Wasted*100/total_votes);
                   $(".greenCircle").knob({
		    'min':0,
		    'max':100,
		    'readOnly': true,
		    'width': 100,
		    'height': 100,
		    'fgColor': '#9FC569',
		    'dynamicDraw': true,
		    'thickness': 0.2,
		    'tickColorizeValues': true
		    })
                    $(".redCircle").attr('value',cancelled*100/total_votes);
		    $(".redCircle").knob({
		    'min':0,
		    'max':100,
		    'readOnly': true,
		    'width': 100,
		    'height': 100,
		    'fgColor': '#ED7A53',
		    'dynamicDraw': true,
		    'thickness': 0.2,
		    'tickColorizeValues': true
		    })
                   $(".blueCircle").attr('value',blancc*100/total_votes);
                   $(".blueCircle").knob({
		    'min':0,
		    'max':100,
		    'readOnly': true,
		    'width': 100,
		    'height': 100,
		    'fgColor': '#88BBC8',
		    'dynamicDraw': true,
		    'thickness': 0.2,
		    'tickColorizeValues': true
		   }) 
                  
                  ///////////////////
                  var data = [
		    { label: "Wasted Ballots",data:wasted , color: "#da4c4c"},
		    { label: "Blanc Ballots", data:blancc, color: "#444"},
		    { label: "Cancelled ballots",  data: cancelled, color: "#777"},
		    { label: "Votes Ennahdha",data: ennahdha, color: "#999"},
		    { label: "Votes CPR", data: cpr, color: "#DDD"},
		    { label: "Votes TAkatol", data:tak, color: "#EEE"}
		];

	    $.plot($(".wasted-pie"), data, 
		{
			series: {
				pie: { 
					show: true,
					highlight: {
						opacity: 0.1
					},
					radius: 1,
					stroke: {
						color: '#fff',
						width: 2
					},
					startAngle: 1,
				    combine: {
	                    color: '#353535',
	                    threshold: 0.05
	                },
	                label: {
	                    show: false
	                    }
	               // }
				},
				grow: {	active: false}
			},
			legend:{show:false},
			grid: {
	            hoverable: true,
	            clickable: true
	        },
	        tooltip: true, //activate tooltip
			tooltipOpts: {
				content: "%s : %y",
				shifts: {
					x: -30,
					y: -50
				}
			}
		}); 
                    
                  //// stacked bar 
                    
                   var stack = 0, bars = true, lines = false, steps = false;
                   var d1 = [];
	    for (var i = 1; i <= 27; i += 1)
	        d1.push([i, this.column('Wasted').data[i]]);
	 
	    var d2 = [];
	    for (var i = 1; i <= 27; i += 1)
	        d2.push([i, this.column('cancelled_ballots').data[i]]);
	 
	    var d3 = [];
	     for (var i = 1; i <= 27; i += 1)
	        d3.push([i, this.column('Blank_ballots').data[i]]);
	    console.log(d3);
            console.log(d1);
	    var dss = new Array();
	 
	     dss.push({
	     	label: "Wasted ballots",
	        data:d1
	    });
	    dss.push({
	    	label: "Cancelled ballots",
	        data:d2
	    });
	    dss.push({
	    	label: "Blanc ballots",
	        data:d3
	    });

		var stack = 0, bars = true, lines = false, steps = false;

		var options = {
				grid: {
					show: true,
				    aboveData: false,
				    color: "#3f3f3f" ,
				    labelMargin: 5,
				    axisMargin: 0, 
				    borderWidth: 0,
				    borderColor:null,
				    minBorderMargin: 5 ,
				    clickable: true, 
				    hoverable: true,
				    autoHighlight: true,
				    mouseActiveRadius: 20
				},
		        series: {
		        	grow: {active:false},
		        	stack: stack,
	                lines: { show: lines, fill: true, steps: steps },
	                bars: { show: bars, barWidth: 0.5, fill:1}
			    },
		        xaxis: {ticks:11, tickDecimals: 0},
		        legend: { position: "se" },
		        colors:[ "#da4c4c","#444","#777"],
		        shadowSize:1,
		        tooltip: true, //activate tooltip
				tooltipOpts: {
					content: "%s : %y.0",
					shifts: {
						x: -30,
						y: -50
					}
				}
		};

		$.plot($(".stacked-bars-chart"), dss, options);
            
                  /////////////////////
                  /////data table 
                  $('#wasted_table').dataTable( {
			"sDom": "<'row'<'span6'l><'span6'f>r>t<'row'<'span6'i><'span6'p>>",
			"sPaginationType": "bootstrap"
	          } ); 
                  //////// 
                  }

                   
		});
               
                 
                 return this;
               
		}
	});

     return  HomeView;
});
