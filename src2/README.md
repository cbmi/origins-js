# Origins JavaScript Client

The client provides a JavaScript interface for the Origins HTTP service.

## Example

```
// Initialize the client, providing the address of an Origins HTTP service.
var client = new origins.Client('http://127.0.0.1:49110');

// Attempt to connect to the server. 
// On success, title and version of the Origins service will be available to the client.
client.connect.then(function() {
    console.log("connected: " + client.title + " " + client.version);
}).catch(function(error) {
    console.log("Failed to retrieve the endpoint: ", error); 
});

// Fetch the list of available domains.
// This will wait until `client.connect` is successful.
client.domains().then(function(data) {
    console.log("available domains: " + data)
}).catch(function(error) {
    console.log("Failed to retrieve domains: ", error); 
});

// Fetch Entity-Attribute-Value information for a given domain.
// These access methods will wait for `client.domains` to succeed.

client.entities("domain1").then(function(data) {
	for(i in data) {
		console.log(data[i]);
	}
}).catch(function(error) {
	console.log("Failed to retrieve entities for domain 'domain1' : ", error); 
});

client.attributes("domain1").then(function(data) {
	for(i in data) {
		console.log(data[i]);
	}
}).catch(function(error) {
	console.log("Failed to retrieve attributes for domain 'domain1' : ", error); 
});

client.values("domain1").then(function(data) {
	for(i in data) {
	    console.log(data[i]);
	}
}).catch(function(error) {
	console.log("Failed to retrieve values for domain 'domain1' : ", error); 
}); 
```