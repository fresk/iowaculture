
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {
        console.log("device ready");
    },
};


$(function(){       

  var home_screen = new HomeScreen()
  home_screen.$appendTo(document.querySelector('.content'));
});

var View = Vue.extend({
  // top element in tenplate becomes the actual view element
  replace: true,

  methods: {
    // creates a new view and transitions to it
    pushView: function(view_class, options){
      console.log(this, view_class, options) ;
      var _args = options || {};
      var _view = new window[view_class](options);
      _view._previousView = this;
      Vue.nextTick(function(){
        _view.$appendTo(".content");
      });
      this.$remove();
    },

    // returns to the previous view that pushed this one
    popView: function(e){
      this._previousView.$appendTo('.content');
      this.$remove();
    }

  }

});

var HomeScreen = View.extend({
   template: "#hometemplate",
   
   methods: {
    login: function(e){
      e.preventDefault();
      this.pushView('ListScreen');
    }
   }

});


var patient_list = [];
for(var i=0;i<25; i++){
  patient_list.push({
    name: Faker.Name.findName(),
    image: Faker.Image.avatar(),
    text: Faker.Lorem.sentence()
  });
}


var ListScreen = View.extend({
   template: "#list-template",
   data: {
    items: patient_list
   },
}); 


