QUnit.test('connect', function (assert) {
	var client = new origins.Client('http://127.0.0.1:49110');
	assert.strictEqual(client.url, 'http://127.0.0.1:49110', 'client url');

    client.connect.then(function() {
		assert.strictEqual(client.title, 'Origins HTTP Service', 'client title');
		assert.strictEqual(client.version, '0.1', 'client version');
	});
});

QUnit.test('domains', function (assert) {
	expect(0);

	var client = new origins.Client('http://127.0.0.1:49110');
	
	var expected = ['origins.transactions', 'domain0', 'domain1', 'domain2'];
    client.domains().then(function(domains) {
		assert.deepEqual(domains, expected, 'domains');
	});
});

QUnit.test('entities', function (assert) {
	expect(0);

	var client = new origins.Client('http://127.0.0.1:49110');
	
	var domains = [];
	for (i in [0,1,2]) {
		domains.push('domain'+i);
	}

	var entities = [];
	for (i in [0,1,2,3]) {
		entities.push('entity'+i);
	}

	for (i in domains) {
		var expected = [];

		for (j in entities) {
			var e = new Object();
    		e.Domain = domains[i];
    		e.Name = entities[j];
			expected.push(e);
		}

		(function() {
			var e = expected;
			client.entities(domains[i]).then(function(entities) {
				assert.deepEqual(entities, e, 'entities');
			});
		})();
	}
});

QUnit.test('attributes', function (assert) {
	expect(0);

	var client = new origins.Client('http://127.0.0.1:49110');
	
	var domains = [];
	for (i in [0,1,2]) {
		domains.push('domain'+i);
	}

	var attributes = [];
	for (i in [0,1,2,3,4]) {
		attributes.push('attr'+i);
	}

	for (i in domains) {
		var expected = [];

		for (j in attributes) {
			var e = new Object();
    		e.Domain = domains[i];
    		e.Name = attributes[j];
			expected.push(e);
		}

		(function() {
			var e = expected;
			client.attributes(domains[i]).then(function(attributes) {
				assert.deepEqual(attributes, e, 'attributes');
			});
		})();
	}
});

QUnit.test('values', function (assert) {
	expect(0);

	var client = new origins.Client('http://127.0.0.1:49110');
	
	var domains = [];
	for (i in [0,1,2]) {
		domains.push('domain'+i);
	}

	var values = [];
	for (i in [0,1,2,3,4,5]) {
		values.push('value'+i);
	}

	var expected = [];
	for (i in values) {
		var e = new Object();
		e.Domain = '';
		e.Name = values[i];
		expected.push(e);
	}

	for (i in domains) {
		client.values(domains[i]).then(function(values) {
			assert.deepEqual(values, expected, 'values');
		});
	}
});
