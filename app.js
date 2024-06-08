const http = require('http');

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, Docker World, I am Artem Zharkov!\n');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
