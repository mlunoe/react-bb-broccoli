var assert = require("assert");
var Backbone = require("backbone");
var sinon = require("sinon");

var People = require("../../src/models/People");

var data = {
  "users":
    [
      {
        "id": 0,
        "name": "React"
      },
      {
        "id": 1,
        "name": "Webpack"
      }
    ]
};

module.exports = {

  "People": {

    beforeEach: function () {
      this.sinon = sinon.sandbox.create();
      this.ajaxStub = this.sinon.stub(Backbone, "ajax").
        yieldsTo("success", data);
      this.people = new People();
    },

    afterEach: function () {
      this.ajaxStub.restore();
      this.sinon.restore();
    },

    "should be populated with data": function () {
      this.people.fetch();

      assert.equal("React", this.people.get(0).get("name"));
      assert.equal("Webpack", this.people.get(1).get("name"));
    }
  }
};
