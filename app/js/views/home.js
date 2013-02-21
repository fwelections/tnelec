define([
		'text!templates/home.html'], 
function(template){
	var HomeView = Backbone.View.extend({
		 el: 'body',
		 template: _.template(template),
                 events: {
		    },
		initialize: function(){
                        console.log( 'home sweet home' );    
		},
		render: function(){
		 this.$el.html(this.template);
                 return this;
		}
	});

     return  HomeView;
});
