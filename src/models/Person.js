var Backbone = require("Backbone");

module.exports = Backbone.Model.extend({
  initialize: function(data, options) {
    this.options = options;
    this.name = data.name;
  },
});
