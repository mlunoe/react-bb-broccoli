var React = require("react");
var PeopleList = require("./components/PeopleList.jsx");

/* jshint trailing:false, quotmark:false, newcap:false */
React.renderComponent(
  <div>
    <h1>Build with Broccoli</h1>
    <PeopleList />
  </div>,
  document.getElementById("application")
);
