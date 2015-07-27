/* global beforeEach, describe, expect, it, require */

var origins = require('../src/origins/origins');

describe('Origins HTTP Test', function() {
    var client;
    var url = 'http://127.0.0.1:49110';

    beforeEach(function(){
        client = new origins.Client(url);
    });

    it('initializes client url', function() {
        expect(client.url).toBe(url);
    });

    it('initializes client version & title on connect', function(done) {
        client.connect.then(function() {
            expect(client.version).toBe('0.1');
            expect(client.title).toBe('Origins HTTP Service');
            done();
        }).catch(function(err) {
            expect(err).toBe("not thrown");
            done();
        });
    });

    it('lists correct domains', function(done) {
        client.domains().then(function(domains) {
            expect(domains.sort()).toEqual(
                ['domain0', 'domain1', 'domain2', 'origins.transactions']);
            done();
        }).catch(function(err) {
            expect(err).toBe("not thrown");
            done();
        });
    });

    // compare helper function, for sorting
    var compareEAV = function(a,b) {
        if (a.Name > b.Name) {
            return 1;
        }
        if (a.Name < b.Name) {
            return -1;
        }
        return 0;
    };

    // validate thelist of either entities or attributes for a given domain
    var validateEA = function(done, accessorPromise, domain, expectedEA) {
        var expected = [];

        for (var i = 0; i < expectedEA.length; i++) {
            expected.push({
                Domain: domain,
                Name: expectedEA[i]
            });
        }

        accessorPromise.call(client, domain).then(function(data) {
            expect(data.sort(compareEAV)).toEqual(expected);
            done();
        }).catch(function(err) {
            expect(err).toBe("not thrown");
            done();
        });
    };

    it('lists correct entities for a given domain', function(done) {
        var entities = [];
        for (var i = 0; i < 4; i++) {
            entities.push('entity' + i);
        }

        validateEA(done, origins.Client.prototype.entities, 'domain0', entities);
    });

    it('lists correct attributes for a given domain', function(done) {
        var attributes = [];
        for (var i = 0; i < 5; i++) {
            attributes.push('attr' + i);
        }

        validateEA(done, origins.Client.prototype.attributes, 'domain0', attributes);
    });

    it('lists correct values for given domain', function(done) {
        var expected = [];
        for (var i = 0; i < 6; i++) {
            var e = {
                Domain: '',
                Name: 'value' + i
            };
            expected.push(e);
        }

        client.values('domain0').then(function(values) {
            expect(values.sort(compareEAV)).toEqual(expected);
            done();
        }).catch(function(err) {
            expect(err).toBe('not thrown');
            done();
        });
    });

    it('identifies invalid domain', function(done) {
        client.values('invalid domain').then(function() {
            done.fail('Invalid domain should have been rejected.');
        }).catch(function(err) {
            expect(err).toBe(origins.INV_DOMAIN);
            done();
        });
    });
});
