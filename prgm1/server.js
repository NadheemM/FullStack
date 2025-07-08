const http = require("http");
const fs = require("fs");
const path = require("path");

http.createServer((req, res) => {
  let filePath = "." + req.url;
  if (filePath === "./") filePath = "./index.html";

  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
  };

  const contentType = mimeTypes[ext] || "application/octet-stream";

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(err.code === "ENOENT" ? 404 : 500, { "Content-Type": "text/html" });
      res.end(`<h1>${err.code === "ENOENT" ? "404 - File Not Found" : "Server Error"}</h1>`);
    } else {
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });
}).listen(3001);
console.log("Running at http://localhost:3001");
