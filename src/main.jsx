/** @jsx React.DOM */

var React = require("react");

var PeopleList = require("./components/PeopleList");

/* jshint trailing:false, quotmark:false, newcap:false */
React.renderComponent(
  <div>
    <h1>
      Build with <img src="img/favicon.ico" />
      Broccoli<img src="img/favicon.ico" />
    </h1>
    <PeopleList />
  </div>,
  document.getElementById("application")
);
