define(['views/home'], function(HomeView) {
var Router = Backbone.Router.extend({
    routes: {
        "2013"     : "elections2013",
        "opendata" : "openData",
        '*path'    :'home'
    },
    
    home: function (id) {
        if (!this.homeView) {
            this.homeView = new HomeView();
        }
        homeView.render();
        console.log(homeView.el);
    },
    elections2013: function () {
       
    },
    
    openData: function () {
       
    },
    initialize: function() {
      console.log( 'hello rad' );
       var homeview= new HomeView();
       homeview.render();
    }
  });
  Backbone.history.start();   
  return Router;
});

