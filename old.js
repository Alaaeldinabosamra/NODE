
const http = require("node:http")
const https = require("node:https")
const os = require('os');

function getIPv4Address() {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        for (const iface of interfaces[interfaceName]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
        }
      }
    }
    return '0.0.0.0';
  }
  

const localhost ="127.0.0.1";
const hostname ="0.0.0.0";
const devicehost =getIPv4Address();
const port = 8080;

// const server = https.createServer(options, (req,res) => {
const server = http.createServer((req,res) => {
  console.log("METHOD", req.method)
  console.log("url", req.url)
    
  switch(req.url){
    case "/":
      res.statusCode = 200;
      // res.setHeader("Content-Type", "text/plain");
      res.setHeader("Content-Type", "text/html");
      // res.end("Hello,World! \n");
      res.end("<h1>Hello, From New Captial!</h1>\n");
      break;
    case "/profile":
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ name: "alaaeldin", age: 24}))
      break;
    default:
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html");
      res.end("<h2>Error 404 Page Not Found!</h2>")
  }
})


server.listen(port, hostname, () => {
    console.log(`Server is running on local at http://${localhost}:${port}/`)
    console.log(`Server is running on network at http://${devicehost}:${port}/`)
})