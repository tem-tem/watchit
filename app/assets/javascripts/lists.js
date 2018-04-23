Vue.component('list-row', {
  template: '#list-row',
  props: {
    list: Object
  }
})

var lists = new Vue({
  el: '#lists',
  data: {
    lists: []
  },
  ready: function() {
    var that;
    that = this;
    $.ajax({
      url: '/lists.json',
      success: function(res) {
        that.lists = res;
      }
    });
  }
});
