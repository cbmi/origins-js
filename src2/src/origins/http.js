/* global module, Promise */

module.exports = {
    get: function(url) {
        return new Promise(function(resolve, reject) {
            var req = new XMLHttpRequest();
            req.responseType = 'json';

            req.onreadystatechange = function() {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        resolve(req.response);
                    } else {
                        reject(Error('XMLHttpRequest failed with status ' +
                            req.status + ' ' + req.statusText));
                    }
                }
            };

            req.open('GET', url, true);
            req.send(null);
        });
    }
};