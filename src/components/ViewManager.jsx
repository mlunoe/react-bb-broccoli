/** @jsx React.DOM */

var React = require("react/addons");

var PeopleList = require("../components/PeopleList");
var SignIn = require("../components/SignIn");
var People = require("../models/People");
var User = require("../models/User");
var Router = require("../models/Router");

var ViewManager = React.createClass({

  displayName: "ViewManager",

  propTypes: {
    router: React.PropTypes.instanceOf(Router).isRequired
  },

  getInitialState: function () {
    return {
      people: new People(),
      route: null,
      user: new User()
    };
  },

  capitalize: function (s) {
    return s && s[0].toUpperCase() + s.slice(1);
  },

  routeHome: function () {
    /* jshint trailing:false, quotmark:false, newcap:false */
    return (
      <div>
        <a href="/#page1">Go to page 1</a>
        &nbsp;|&nbsp;
        <a href="/#page2">Go to page 2</a>
      </div>
    );
  },

  routePage1: function () {
    /* jshint trailing:false, quotmark:false, newcap:false */
    return (
      <div>
        <PeopleList
            route={this.state.route.name}
            collection={this.state.people} />
        <a href="/">Go home</a>
        &nbsp;|&nbsp;
        <a href="/#page2">Go to page 2</a>
      </div>
    );
  },

  routePage2: function (name) {
    name = name || "List of People #2";
    /* jshint trailing:false, quotmark:false, newcap:false */
    return (
      <div>
        <PeopleList
            name={name}
            route={this.state.route.name}
            collection={this.state.people} />
        <a href="/">Go home</a>
        &nbsp;|&nbsp;
        <a href="/#page1">Go to page 1</a>
      </div>
    );
  },

  routeSignin: function () {
    /* jshint trailing:false, quotmark:false, newcap:false */
    return (
      <SignIn
          model={this.state.user}
          route={this.state.route.name} />
    );
  },

  componentDidMount: function () {
    this.props.router.on("route", function (route, params) {
      this.setState({
        route: {
          name: route,
          params: params
        }
      });
    }.bind(this));
  },

  render: function() {
    var route = this.state.route;
    var component;

    if (route != null) {
      var routeName = this.capitalize(route.name);
      component = this["route" + routeName].apply(this, route.params);
    }


    /* jshint trailing:false, quotmark:false, newcap:false */
    return (
      <div className="container">
        <h1>
          Build with&nbsp;
          <img src="img/favicon.ico" />
          Broccoli
          <img src="img/favicon.ico" />
        </h1>
        <a href="/#signin" className="pull-right">Sign in</a>
        {component}
      </div>
    );
  }
});

module.exports = ViewManager;
