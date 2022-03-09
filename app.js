// -- package that offers certain functionality that helps you deal with requests and responses
const http = require("http");

function handleRequest(request, response) {
  if (request.url === "/currenttime") {
    //localhost:300/currenttime
    response.statusCode = 200;
    response.end(`<h1>${new Date().toISOString()}</h2>`);
  } else {
    //localhost:300
    response.statusCode = 200;
    response.end("<h1>Hello World!</h1>");
  }
}

const server = http.createServer(handleRequest);

//! =================== Note 1 =================== !\\
// Most ports are closed for security reasons.
// :80 un-encrypted request
// :443 encrypted request
// we need to pass a port number in order to open in.
// For development purposes we will use a non common port as 3000. But later when we deploy our code to a remote machine(server/prod) we will slap the port for 80 or 443;
//! =================== *** =================== !\\

server.listen(3000, () => {
  console.log(`Server listen on port 3000`);
});
