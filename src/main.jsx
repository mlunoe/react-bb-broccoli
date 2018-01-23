/** @jsx React.DOM */

var Backbone = require("backbone");
var React = require("react");
var ReactDOM = require("react-dom");

var ViewManager = require("./components/ViewManager");

var Router = require("./models/Router");

var globalRouter = new Router();

/* jscs:disable disallowTrailingWhitespace, validateQuoteMarks */
/* jshint trailing:false, quotmark:false, newcap:false */
ReactDOM.render(
  <ViewManager router={globalRouter} />,
  document.getElementById("application")
);

Backbone.history.start();
