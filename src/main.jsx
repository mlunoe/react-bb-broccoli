/** @jsx React.DOM */

var Backbone = require("backbone");
var React = require("react");

var ViewManager = require("./components/ViewManager");

var Router = require("./models/Router");

var globalRouter = new Router();

/* jshint trailing:false, quotmark:false, newcap:false */
React.render(
  <ViewManager router={globalRouter} />,
  document.body
);

Backbone.history.start();
