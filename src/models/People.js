var Backbone = require("backbone");

var Person = require("./Person");

module.exports = Backbone.Collection.extend({
  model: Person,

  parse: function (data) {
    return data.users;
  },

  url: "data/data.json"

});
