var Backbone = require("backbone");

var Person = require("./Person");
var Config = require("../utils/Config");

module.exports = Backbone.Collection.extend({
  model: Person,

  parse: function (data) {
    return data.users;
  },

  url: Config.baseUrl + "data.json"

});
