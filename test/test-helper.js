require("./object-assign-polyfill.js");

// React determines if it can depend on the DOM at require-time, so if we don"t
// set this up beforehand it will complain about not being able to do things
// with the DOM.
// Perhaps a bug in React?

if (typeof exports !== "undefined" && this.exports !== exports) {
  global.backbone = require("backbone");
  global.react = require("react");
  global.sinon = require("sinon");
  global.assert = require("assert");
  global.cheerio = require("cheerio");
  global.$ = global.cheerio.load("<html><body></body></html>");
}
