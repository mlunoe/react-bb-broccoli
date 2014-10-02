/** @jsx React.DOM */

var React = require("react");
var PeopleList = require("./components/PeopleList");

/* jshint trailing:false, quotmark:false, newcap:false */
React.renderComponent(
  <div>
    <h1>Build with Broccoli</h1>
    <PeopleList />
  </div>,
  document.getElementById("application")
);
