/** @jsx React.DOM */

var assert = require("assert");
var React = require("react");
var ReactDOM = require("react-dom");
const jsdom = require("jsdom");

const { JSDOM } = jsdom;

var Person = require("../../src/models/Person");
var Hello = require("../../src/components/Hello");

module.exports = {

  "Hello": {

    beforeEach: function () {
      const dom = new JSDOM("<html><body><div id='application'></div></body></html>");
      window = dom.window;
      document = dom.window.document;
    },

    "should render the component populated with data": function () {
      var element = document.getElementById("application");
      var react = new Person({ id: 1, name: "React" });

      /* jshint trailing:false, quotmark:false, newcap:false */
      var reactNode = ReactDOM.render(
        <Hello person={react} />,
        element
      );

      assert.equal(document.querySelectorAll(".clickable").length, 1);
      assert.equal(document.querySelector(".clickable").textContent, "Hello, React!");
    },

    "should render the component populated with other data": function () {
      var element = document.getElementById("application");
      var webpack = new Person({ id: 1, name: "Webpack" });

      /* jshint trailing:false, quotmark:false, newcap:false */
      var reactNode = ReactDOM.render(
        <Hello person={webpack} />,
        element
      );

      assert.equal(document.querySelectorAll(".clickable").length, 1);
      assert.equal(document.querySelector(".clickable").textContent, "Hello, Webpack!");
    }
  }
};
