/** @jsx React.DOM */

var createReactClass = require("create-react-class");
var React = require("react");
var PropTypes = require("prop-types");

var Person = require("../models/Person");

var Hello = createReactClass({
  displayName: "Hello",

  propTypes: {
    person: PropTypes.instanceOf(Person).isRequired
  },

  handleClick: function (event) {
    event.preventDefault();
    alert("You clicked ‘" + this.props.person.get("name") + "’!");

  },

  render: function () {

    /* jscs:disable disallowTrailingWhitespace, validateQuoteMarks */
    /* jshint trailing:false, quotmark:false, newcap:false */
    return (
      <div
          className="clickable"
          onClick={this.handleClick}>
        Hello, {this.props.person.get("name")}!
      </div>
    );
  }
});

module.exports = Hello;
