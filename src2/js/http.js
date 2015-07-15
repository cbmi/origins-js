var http = http || {};

http.get = function(url) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.responseType = "json";

    req.onreadystatechange = function() {
      if (req.readyState == 4) {
        if (req.status == 200) {

          resolve(req.response);
        }
        else {
          reject(Error(req.statusText));
        }
      }
    };

    req.open('GET', url, true);
    req.send(null);
  });
};
