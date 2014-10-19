var _ = require("underscore");

var BackboneMixin = {
  resolveModels: function() {
    var models = [this.props.model, this.props.collection];

    if (_.isFunction(this.getBackboneModels)) {
      models = _.union(models, this.getBackboneModels());
    }

    models = _.filter(models, function(model) {
      if (model != null) {
        return model;
      }
    });

    return models;
  },
  // Binds a listener to a component's resource so the component can be updated
  // when the resource changes.
  //
  // An object that uses this mixin must implement `getBackboneModels` and
  // return an object that extends `Backbone.Events`. Common use cases are
  // `Backbone.Model` and `Backbone.Collection`.
  componentDidMount: function() {
    this._boundForceUpdate = this.forceUpdate.bind(this, null);
    var models = this.resolveModels();
    models.forEach(function(model) {
      // There are more events that we can listen on. For most cases, we're
      // fetching pages of data, listening to add events causes superfluous
      // calls to render.
      model.on("batch reset sync", this._boundForceUpdate, this);
      model.fetch({ reset: true });
    }, this);
  },

  componentWillUnmount: function() {
    var models = this.resolveModels();
    models.forEach(function(model) {
      model.off("batch reset sync", this._boundForceUpdate, this);
    }, this);
  }
};

module.exports = BackboneMixin;
