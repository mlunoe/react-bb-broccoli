var Backbone = global.backbone;
var assert = global.assert;
var sinon = global.sinon;

var People = require("../../src/models/People");

module.exports = {

  beforeEach: function () {
    this.sinon = sinon.sandbox.create();
    this.ajaxStub = sinon.stub(Backbone, "ajax").yieldsTo("success",
      {
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
      });
    this.people = new People();
  },

  afterEach: function () {
    this.ajaxStub.restore();
    this.sinon.restore();
  },

  "People": {

    "should be populated with data": function () {
      this.people.fetch();

      assert.equal("React", this.people.get(0).get("name"));
      assert.equal("Webpack", this.people.get(1).get("name"));
    }
  }
};
