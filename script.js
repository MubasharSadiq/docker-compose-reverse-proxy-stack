// A simple Node.js script to test the setup
console.log("Hello, world! This is a Node.js app running in Docker.");

// Example of a basic HTTP server (optional)
const http = require('http');

const hostname = '0.0.0.0'; // Bind to all network interfaces
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, world! This is served by a Node.js app running in Docker.\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
