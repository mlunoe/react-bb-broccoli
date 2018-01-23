var Service = {
  /*
   * Abstracted fn to make a request
   * Takes a url endoint, a GET|POST|PUT|DELETE method,
   * optional data and a callback
   */
  request: function (url, method, data, callback) {
    var oReq = new XMLHttpRequest();
    oReq.onreadystatechange = function () {
      if (oReq.readyState === 4) {
        if (oReq.status === 200) {
          if (callback && typeof callback.success === "function") {
            callback.success(oReq.responseText);
          }
        } else if (callback && typeof callback.error === "function") {
          callback.error(oReq.statusText);
        }
      }
    };
    oReq.open(method, url);
    oReq.send(data);
  }
};

module.exports = Service;
