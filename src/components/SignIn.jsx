/** @jsx React.DOM */

var createReactClass = require("create-react-class");
var React = require("react");
var PropTypes = require("prop-types");

var BackboneMixin = require("../mixins/BackboneMixin.js");
var User = require("../models/User");

var SignIn = createReactClass({

  displayName: "SignIn",

  propTypes: {
    className: PropTypes.string,
    model: PropTypes.instanceOf(User).isRequired,
    route: PropTypes.string.isRequired
  },

  getBackboneModels: function () {
    return [this.props.model];
  },

  mixins: [BackboneMixin],

  handleEmailChange: function (event) {
    this.props.model.set({email: event.target.value});
  },

  handlePasswordChange: function (event) {
    this.props.model.set({password: event.target.value});
  },

  handleSignIn: function (event) {
    event.preventDefault();
    this.props.model.login({
      success: function (response) {
        if (response.email != null) {
          // go to home
          window.location.hash = "";
        }
      }
    });
  },

  render: function () {
    console.log("Rendered: " + this.props.route);

    var model = this.props.model;

    /* jscs:disable disallowTrailingWhitespace, validateQuoteMarks */
    /* jshint trailing:false, quotmark:false, newcap:false */
    return (
      <form
          className={this.props.className}
          role="form">
        <div className="form-group">
          <label>Email address</label>
          <input
              className="form-control"
              onChange={this.handleEmailChange}
              placeholder="Enter email"
              type="email"
              value={model.get("email")} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
              className="form-control"
              placeholder="Password"
              onChange={this.handlePasswordChange}
              type="password"
              value={model.get("password")} />
        </div>
        <ul className="list-inline">
          <li>
            <button
                className="btn btn-default"
                onClick={this.handleSignIn}>
              Sign in
            </button>
          </li>
          <li>
            <a href="/">Cancel</a>
          </li>
        </ul>
      </form>
    );
  }
});

module.exports = SignIn;
