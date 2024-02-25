const http = require('http');
const port = 3000;

const supportedContentTypes = new Set([
  'application/json',
  'text/calendar',
  'text/ics; charset=utf-8'
]); // Add more types as needed

const server = http.createServer(function (request, response) {
    // Log incoming request details
    logRequestDetails(request);
  
    // Check if the request method is either POST or PUT
    if (request.method === 'POST' || request.method === 'PUT') {
      // Check if Content-Type is supported
      if (request.headers['content-type'] && isContentTypeSupported(request.headers['content-type'])) {
        // Read and parse the request body
        parseRequestBody(request, (error, requestBody) => {
          if (error) {
            // Handle parsing error
            sendErrorResponse(response, 400, 'Invalid request body');
            } else {
                // Log the received message
                console.log(`Received message: ${JSON.stringify(requestBody)}`);
  
            // Check if the parsed body is empty
            if (isEmptyObject(requestBody)) {
              sendErrorResponse(response, 400, 'Empty JSON body');
            } else {
              // Respond with the bounced back message
              sendResponse(response, 200, `Bounced back: ${JSON.stringify(requestBody)}`);
            }
          }
        });
      } else {
        // Notify the client about unsupported Content-Type
        sendErrorResponse(response, 415, 'Unsupported Media Type\nThe supported media types are: ' + Array.from(supportedContentTypes));
      }
    } else {
      // Handle non-POST and non-PUT requests
      sendErrorResponse(response, 405, 'Method Not Allowed');
    }
  });
  
  // Function to check if an object is empty
  function isEmptyObject(obj) {
    return Object.keys(obj).length === 0;
  }
  


//logging for security purposes. can choose to implement this data into a data structure to store for other purposes
  function logRequestDetails(request) {
    console.log(`\nIncoming Request details for security logging:`);
    console.log(`- Method: ${request.method}`);
    console.log(`- URL: ${request.url}`);
    console.log(`- Remote Address: ${request.connection.remoteAddress}`);
    console.log(`- Headers:`);
    Object.keys(request.headers).forEach((header) => {
      console.log(`  ${header}: ${request.headers[header]}`);
    });
  }

// Function to check if "Content-Type" is supported
function isContentTypeSupported(contentType) {
  return supportedContentTypes.has(contentType.toLowerCase());
}

// Function to parse the request body
function parseRequestBody(req, callback) {
    let body = '';
  
    // Read data chunks from the request
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
  
    // Parse the complete body on end
    req.on('end', () => {
      try {
        // Check if the body is empty
        if (body.trim() === '') {
          callback('Empty request body', null);
        } else {
          const parsedBody = JSON.parse(body);
          callback(null, parsedBody);
        }
      } catch (error) {
        callback(error, null);
      }
    });
  }
  
// Function to send a successful response
function sendResponse(res, statusCode, message) {
    // Set the HTTP status code and content type in the response header
    res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
    // End the response by sending the specified message
    res.end(message);
  }
  
  // Function to send an error response
  function sendErrorResponse(res, statusCode, errorMessage) {
    // Set the HTTP status code and content type in the response header
    res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
    // End the response by sending the specified error message
    res.end(errorMessage);
  }
  
  // Start the HTTP server on the specified port
  server.listen(port, function(error) {
    if (error) {
      // Log an error message if the server encounters an error during startup
      console.log("Error: ", error);
    } else {
      // Log a success message if the server starts successfully
      console.log("Server is running at http://localhost:" + port);
    }
  });
  
module.exports = server;