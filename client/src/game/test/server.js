const http = require('http');
const fs = require('fs');
const path = require('path');

// Set the port
const PORT = 6900;

// Function to determine the correct MIME type
const getMimeType = (ext) => {
    const mimeTypes = {
        '.html': 'text/html',
        '.js': 'application/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon'
    };
    return mimeTypes[ext] || 'application/octet-stream';
};

// Create the server
const server = http.createServer((req, res) => {
    // Determine the requested file path
    let filePath = `.${req.url}`;
    if (filePath === './') {
        filePath = './index.html';
    }

    // Get the file extension
    const ext = path.extname(filePath);

    // Read and serve the file
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // File not found
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end('<h1>404 Not Found</h1>', 'utf-8');
            } else {
                // Server error
                res.writeHead(500);
                res.end(`Server Error: ${err.code}`, 'utf-8');
            }
        } else {
            // Serve the file with the correct MIME type
            res.writeHead(200, { 'Content-Type': getMimeType(ext) });
            res.end(content, 'utf-8');
        }
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
