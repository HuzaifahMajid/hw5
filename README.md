# client_server_HTTP
making a an API endpoint connection to communicate over HTTP


i frist made a server,py file and created a server which  listens on port 30000

i then printed the headers that  are sent with every request from my postman client to localhost:3000 TO SEE HOW TO IMPLEMENT INTO MY CODE

given the headers fromat, i type check any headers type with the fromat that i want. for example curl with no conetnt type should not be allowed to interact with my server. i chose to allow curl with header allowed for now with no further checks beascuse i will implement more checks for the next part regardless

ping should not be allowed to interact with mys erver because i dont want unnessacry mallicious strain on my server.

npm install -g nodemon
for easy serverside  development

just testing mainly one method becasue they fall under the same if function. but ideally all tests should be done for both. this is just proof of concept purposes