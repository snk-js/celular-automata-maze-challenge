
import { createServer } from 'http';
import { readFile, writeFile } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join, extname } from 'path';
import { pathToDirections } from "./utils/output.js";
import { getSolution } from "./solution.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hostname = 'localhost';
let port = 5500;

const server = createServer();

export function saveDirectionsToFile(directions, filename) {
  writeFile(filename, directions, (err) => {
    if (err) throw err;
    console.log('Directions saved to file:', filename);
  });
  return directions
}



server.on('request', async (req, res) => {
  const publicPath = join(__dirname, '/');
  console.log('Request received:', req.url); // Add this line

  let filePath;

  if (req.url === '/result') {
    console.log('Handling /result request'); // Add this line to check if the endpoint is executed
    const solResult = getSolution.result()
    const directions = pathToDirections(solResult, getSolution.colLen);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(directions);
  } else {
    if (req.url === '/' || req.url === '/index.html') {
      filePath = join(publicPath, 'index.html');
    } else {
      filePath = join(publicPath, req.url);
    }

    readFile(filePath, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end('Not Found');
        return;
      }

      const ext = extname(filePath);
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
  }
});
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