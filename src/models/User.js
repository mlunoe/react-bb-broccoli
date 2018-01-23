var Backbone = require("backbone");

var Config = require("../utils/Config");
var Service = require("../utils/Service");

var User = Backbone.Model.extend({

  initialize: function () {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.isLoggedIn = this.isLoggedIn.bind(this);
  },

  defaults: function () {
    return {
      email: "",
      password: ""
    };
  },

  getSignInData: function () {
    return ["email", "password"].reduce(function (obj, item) {
      if (!this.get(item)) {
        obj[item] = this.get(item);
      }

      return obj;
    }.bind(this), {});
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
    return !this.get("email");
  },

  url: Config.baseUrl + "auth/user.json"

});

module.exports = User;
