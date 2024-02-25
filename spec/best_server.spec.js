const request = require('supertest');
const http = require('http');

const port = 3000;
const server = require('../src/best_server'); // Import your server file

describe('Server API Tests', () => {
  // Close the server after all tests


  describe('POST / endpoint', () => {
    it('should respond with a success message when sending valid JSON data', async () => {
      const response = await request(server)
        .post('/')
        .set('Content-Type', 'application/json')
        .send({
          key1: 'value1',
          key2: 'value2'
        });

      expect(response.status).toBe(200);
      expect(response.text).toContain('Bounced back');
    });


    it('should respond with an error message for invalid JSON data', async () => {
      const response = await request(server)
        .post('/')
        .set('Content-Type', 'application/json')
        .send('invalid-json-data');

      expect(response.status).toBe(400);
      expect(response.text).toContain('Invalid request body');
    });

    it('should respond with an error message for empty JSON data', async () => {
        const response = await request(server)
          .post('/')
          .set('Content-Type', 'application/json')
          .send('{}');
  
        expect(response.status).toBe(400);
        expect(response.text).toContain('Empty JSON body');
      });
      it('Unsupported Method should respond with an error for unsupported HTTP method', async () => {
        const response = await request(server)
          .get('/')
          .set('Content-Type', 'application/json');
    
        expect(response.status).toBe(405);
        expect(response.text).toContain('Method Not Allowed');
      });
    
      it('Unsupported Content-Type should respond with an error message for unsupported Content-Type', async () => {
        const response = await request(server)
          .post('/')
          .set('Content-Type', 'text/xml')
          .send('<xml>data</xml>');
    
        expect(response.status).toBe(415);
        expect(response.text).toContain('Unsupported Media Type');
        expect(response.text).toContain('The supported media types are:');
      });
    

      it('Invalid JSON request should respond with an error message for invalid JSON', async () => {
        const response = await request(server)
          .post('/')
          .set('Content-Type', 'application/json')
          .send('{"key": "value",}'); // Note the extra comma making it invalid JSON
    
        expect(response.status).toBe(400);
        expect(response.text).toContain('Invalid request body');
      }); 

    // Add more test cases as needed 
  });


  describe('Unsupported Content-Type', () => {
    it('should respond with an error message for unsupported Content-Type', async () => {
      const response = await request(server)
        .post('/')
        .set('Content-Type', 'text/plain')
        .send('plain-text-data');

      expect(response.status).toBe(415);
      expect(response.text).toContain('Unsupported Media Type');
    });

    // Add more test cases for other unsupported Content-Types
  });

  describe('Non-POST and Non-PUT Requests', () => {
    it('should respond with an error for non-POST and non-PUT requests', async () => {
      const response = await request(server).get('/');

      expect(response.status).toBe(405);
      expect(response.text).toContain('Method Not Allowed');
    });

    // Add more test cases for other non-POST and non-PUT requests
  });
});
