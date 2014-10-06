/** @jsx React.DOM */

var assert = require("assert");
var cheerio = require("cheerio");
var React = require("react");

var Person = require("../../src/models/Person");
var Hello = require("../../src/components/Hello");

var $ = cheerio.load("<html><body></body></html>");

module.exports = {
  afterEach: function () {
    $("body").empty();
  },
  "Hello": {
    "should render the component populated with data": function () {
      var react = new Person({ id: 0, name: "React" });
      var webpack = new Person({ id: 1, name: "Webpack" });

      /* jshint trailing:false, quotmark:false, newcap:false */
      var reactNode = React.renderComponentToString(
        <Hello person={react} />
      );
      var webpackNode = React.renderComponentToString(
        <Hello person={webpack} />
      );

      $("body").append(reactNode);
      $("body").append(webpackNode);

      assert.equal($(".clickable").length, 2);
      assert.equal($(".clickable").eq(0).children().eq(1).text(), "React");
      assert.equal($(".clickable").eq(1).children().eq(1).text(), "Webpack");
    }
  }
};
