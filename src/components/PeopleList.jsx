/** @jsx React.DOM */

var createReactClass = require("create-react-class");
var React = require("react");
var PropTypes = require("prop-types");

var BackboneMixin = require("../mixins/BackboneMixin.js");
var Hello = require("../components/Hello");
var People = require("../models/People");

var PeopleList = createReactClass({
  displayName: "People",

  propTypes: {
    collection: PropTypes.instanceOf(People).isRequired,
    route: PropTypes.string.isRequired,
    name: PropTypes.string
  },

  getBackboneModels: function () {
    return [this.props.collection];
  },

  mixins: [BackboneMixin],

  getDefaultProps: function () {
    return {
      name: "List of People"
    };
  },

  render: function () {
    console.log("Rendered: " + this.props.route);
    var peopleList = this.props.collection.map(function (person) {

      /* jscs:disable disallowTrailingWhitespace, validateQuoteMarks */
      /* jshint trailing:false, quotmark:false, newcap:false */
      return (
        <Hello key={person.id} person={person} />
      );
    });

    return (
      <div>
        <h1>{this.props.name}</h1>
        {peopleList}
      </div>
    );
  }
});

module.exports = PeopleList;
