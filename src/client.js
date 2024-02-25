const http = require('http');

// Server details
const serverUrl = 'http://localhost:3000';

// JSON payload to be sent in the request body
const jsonData = {
  key1: 'value1',
  key2: 'value2',
  key3: 'value3'
};

// Convert JSON data to a string
const jsonString = JSON.stringify(jsonData);

// Request configuration
const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(jsonString)
  }
};

// Create the HTTP request
const req = http.request(options, (res) => {
  // Log the response status code
  console.log(`Response Status Code: ${res.statusCode}`);

  // Log the response body
  let responseData = '';
  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log(`Response Body: ${responseData}`);
  });
});

// Handle potential errors in the request
req.on('error', (e) => {
  console.error(`Error with the request: ${e.message}`);
});

// Send the JSON payload in the request body
req.write(jsonString);
req.end();
