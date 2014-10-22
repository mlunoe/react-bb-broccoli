var $ = require("jquery");
var _ = require("underscore");

var Service = {
  /*
   * Abstracted fn to make a request
   * Takes a url endoint, a GET|POST|PUT|DELETE method,
   * optional data and a callback
   */
  request: function(url, method, data, callback) {
    $.ajax({
      url: url,
      contentType: "application/json",
      dataType: "json",
      type: method,
      data:  JSON.stringify( data ),
      success: function (response) {
        if ( callback && _.isFunction(callback.success) ) {
          callback.success(response);
        }
      },
      error: function(mod, response){
        if ( callback && _.isFunction(callback.error) ) {
          callback.error(response);
        }
      }
    });
  }
};

module.exports = Service;
