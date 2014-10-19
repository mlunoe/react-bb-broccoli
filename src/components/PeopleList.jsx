/** @jsx React.DOM */

var React = require("react");

var BackboneMixin = require("../mixins/BackboneMixin.js");
var Hello = require("../components/Hello");
var People = require("../models/People");

var PeopleList = React.createClass({
  displayName: "People",

  mixins: [BackboneMixin],

  getInitialState: function() {
    return {
      people: new People()
    };
  },

  render: function() {
    var peopleList = this.state.people.models.map(function (person, index) {

      /* jshint trailing:false, quotmark:false, newcap:false */
      return (
        <Hello key={index} person={person} />
      );
    });

    return (
      <div>
        {peopleList}
      </div>
    );
  }
});

module.exports = PeopleList;
