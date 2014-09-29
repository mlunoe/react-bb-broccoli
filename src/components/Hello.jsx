var React = require("react");

var Person = require("../models/Person");

var Hello = React.createClass({
  displayName: "Hello",

  propTypes: {
    person: React.PropTypes.instanceOf(Person).isRequired
  },

  handleClick: function(event) {
    event.preventDefault();
    alert("You clicked ‘" + this.props.person.get("name") + "’!");

  },

  render: function() {

    /* jshint trailing:false, quotmark:false, newcap:false */
    return (
      <div className="clickable" onClick={this.handleClick}>
        Hello, {this.props.person.get("name")}!
      </div>
    );
  }
});

module.exports = Hello;
