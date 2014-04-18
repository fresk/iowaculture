var Vue = require('vue');
var VueTouch = require('vue-touch');
Vue.use(VueTouch);

module.exports = Vue.extend({

  created: function(){
    this.$data.rootView = null;
    this.$data.rootContext = null;
  },

  methods: {
    setRootView: function(viewConfig){
      if (this.rootView) this.rootView.$destroy();
      viewConfig.parent = this;
      viewConfig.replace = true;
      this.rootView = new Vue(viewConfig);
      this.rootView.$appendTo(this.$el);
    }
  }

});


