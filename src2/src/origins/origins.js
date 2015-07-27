/* global module, Promise, require */

var http = require('./http');

var origins = {};
module.exports = origins;

origins.INV_DOMAIN = Error("Invalid Domain");

origins.Client = function(url) {
    this.url = url;
    var obj = this;

    this.connect = new Promise(function(resolve, reject) {
        http.get(url).then(function(data) {
            obj.title = data.Title;
            obj.version = data.Version;
            resolve();
        }).catch(function(err) {
            reject(err);
        });
    });
};

origins.Client.prototype.domains = function() {
    var url = this.url;
    return this.connect.then(function() {
        return new Promise(function(resolve) {
            http.get(url + "/domains").then(function(domains) {
                resolve(domains);
            });
        });
    });
};

origins.Client.prototype.domainAccess = function(prefix, suffix) {
    prefix = (typeof prefix !== "undefined" ? prefix : "timeline");
    suffix = (typeof suffix !== "undefined" ? suffix : "");

    var obj = this;

    return function(domain) {
        return obj.domains().then(function(domains) {
            return new Promise(function(resolve, reject) {
                for (var i = 0; i < domains.length; i++) {
                    if (domain === domains[i]) {
                        resolve(http.get(obj.url + "/" + prefix +
                                         "/" + domain + "/" + suffix));
                    }
                }
                reject(origins.INV_DOMAIN);
            });
        });
    };
};

origins.Client.prototype.timeline = function(domain) {
    return (this.domainAccess())(domain);
};
origins.Client.prototype.log = function(domain) {
    return (this.domainAccess("log"))(domain);
};
origins.Client.prototype.entities = function(domain) {
    return (this.domainAccess("log", "entities"))(domain);
};
origins.Client.prototype.attributes = function(domain) {
    return (this.domainAccess("log", "attributes"))(domain);
};
origins.Client.prototype.values = function(domain) {
    return (this.domainAccess("log", "values"))(domain);
};