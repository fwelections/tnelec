define([
		'text!templates/header.html'], 
function(template){
	var HeaderView = Backbone.View.extend({
		 el: '#header',
		 template: _.template(template),
                 events: {
		    },
		initialize: function(){
                        console.log( 'header' ); 
                        this.render();   
		},
		render: function(){
		 this.$el.html(this.template);
                 return this;
		},
                selectMenuItem: function (menuItem) {
                  $('#smoothmenu ul li a').removeClass('selected');
			if (menuItem) {
			    $('#' + menuItem).addClass('selected');
			}
	       }
	});

     return  HeaderView;
});
