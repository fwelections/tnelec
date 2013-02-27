define(['views/home','views/header'], function(HomeView,HeaderView) {
var Router = Backbone.Router.extend({
    routes: {
        "2013"     : "elections2013",
        "2013p"    : "pelections2013",
        "opendata" : "openData",
        '*path'    :'home'
    },
    
    home: function () {
       if(!this.homeView){
       this.homeView = new HomeView();
       this.homeView.render();}
        console.log(this.homeView.el);
       console.log('here we go again');
        this.headerview.selectMenuItem('menu-home');
    },
    elections2013: function () {
        console.log( '2013 elections' );
        this.headerview.selectMenuItem('menu-2013');
     
    },
    pelections2013: function () {
        console.log( '2013 elections' );
        this.headerview.selectMenuItem('menu-2013p');
     
    },
    
    openData: function () {
        console.log( 'opendata' );
        this.headerview.selectMenuItem('menu-open');
       
    },
    initialize: function() {
      console.log( 'hello rad' );
       this.headerview= new HeaderView();
       this.homeView = new HomeView();
       this.homeView.render();
    }
  });
  Backbone.history.start();   
  return Router;
});

