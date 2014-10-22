var Backbone = require("backbone");
var _ = require("underscore");

var Config = require("../utils/Config");
var Service = require("../utils/Service");

var User = Backbone.Model.extend({

  initialize: function() {
    _.bindAll(this, "login", "logout", "isLoggedIn");
  },

  defaults: function() {
    return {
      email: null,
      password: null
    };
  },

  getSignInData: function () {
    return _.reduce(
      ["email", "password"],
      function (obj, item) {
        if (!_.isEmpty(this.get(item))) {
          obj[item] = this.get(item);
        }
        return obj;
      }.bind(this),
      {}
    );
  },

  login: function (callback) {
    var data = this.getSignInData();
    Service.request(
      Config.baseUrl + "auth/login.json",
      "POST",
      data,
      callback
    );
  },

  logout: function (callback) {
    if (this.isLoggedIn()) {
      Service.request(
        Config.baseUrl + "auth/logout.json",
        "GET",
        null,
        callback
      );
    }
  },

  isLoggedIn: function () {
    return this.get("email") != null;
  },

  url: Config.baseUrl + "auth/user.json"

});

module.exports = User;
