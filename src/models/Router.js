var Backbone = require("backbone");

var noop = function () {};

var Router = Backbone.Router.extend({

  routes: {
    "": "home",
    "page1": "page1",
    "page2": "page2",
    "page2/:name": "page2",
    "signin": "signin"
  },
  home: noop,
  page1: noop,
  page2: noop,
  signin: noop
});

module.exports = Router;
