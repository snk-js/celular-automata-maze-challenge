const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
let port = 5500;

const server = http.createServer((req, res) => {
  const publicPath = path.join(__dirname, '/');
  let filePath;

  if (req.url === '/' || req.url === '/index.html') {
    filePath = path.join(publicPath, 'index.html');
  } else {
    filePath = path.join(publicPath, req.url);
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Not Found');
      return;
    }

    const ext = path.extname(filePath);
    let contentType = 'text/plain';

    switch (ext) {
      case '.html':
        contentType = 'text/html';
        break;
      case '.js':
        contentType = 'application/javascript';
        break;
      case '.css':
        contentType = 'text/css';
        break;
      // Add more content types as needed
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    res.end(data);
  });
});

function startListening() {
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

function startListening(port) {
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });
}

server.on('error', (error) => {
  const newPort = [port]
  if (error.code === 'EADDRINUSE') {
    newPort.push(newPort.pop() + 1)
    console.log(`Port ${port} is already in use, trying the next one.`);
    startListening(newPort[0]);
  } else {
    console.error('Failed to start server:', error);
  }
});

startListening(port);