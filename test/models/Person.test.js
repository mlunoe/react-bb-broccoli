var assert = require("assert");

var Person = require("../../src/models/Person");

module.exports = {

  "Person": {

    beforeEach: function () {
      this.person = new Person({ id: 0, name: "Broccoli" });
    },

    "should have a name": function () {
      assert.equal("Broccoli", this.person.get("name"));
    },

    "should have an id": function () {
      assert.equal(0, this.person.get("id"));
    },

    "should not have the wrong name": function () {
      assert.notEqual("Broccolias", this.person.get("name"));
    }
  }
};
