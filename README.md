# client_server_HTTP
making a an API endpoint connection to communicate over HTTP

the server runs with port 3000 by default but if it is closed or taken, then either lsof -i :3000 in terminal to get process ID and kill process, or when running the program....
and you want a specific port, just run the file with adding PORT=<your port number>

i first made a best_server.js file and created a server which listens on port 30000 or could be specified during runtime

i then printed the headers that  are sent with every request from my postman client to localhost:3000 TO SEE HOW TO IMPLEMENT INTO MY CODE

given the headers fromat, i type check any headers type with the fromat that i want. for example curl with no content type should not be allowed to interact with my server. i chose to allow curl with header allowed for now with no further checks beascuse i will implement more checks for the next part regardless

ping should not be allowed to interact with my server because i dont want unnessacry mallicious strain on my server.

npm install -g nodemon
for easy serverside  development

inserted PUT method as well in code becasue that can be used as well because PUT is used to update a resource or create a new resource if it doesn't exist at the specified URL. Unlike POST, which is often used for creating new resources, PUT is typically used when the client provides the resource's URL and the entire updated representation of the resource. 

I also added security measures like logging so that in the future i am able to store the logs in a place which i can access later in case anything goes wrong with the server...
or a mallicious actor tries to screw with my server.