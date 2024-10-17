// Create Node js server

const http = require("node:http")
const https = require("node:https")
const os = require('os');
const express = require('express')
var bodyParser = require('body-parser')
// const fs = require('fs');
const morgan = require('morgan')
const app = express()


// using static files
// app.use(express.static("public"))

// using body parser functions
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())

// using to retrive data from req.body
app.use(express.urlencoded())
app.use(express.json())

// specifing third-party morgan to logging http requests in middleware
// app.use(morgan('tiny'))
app.use(morgan('dev'))

// middleware
app.use((req,res,next) => {
  console.log("request happend at ," ,Date.now())
  next();
})

// specifing special routing in middleware
app.use('/test',(req,res,next) => {
  console.log("this test middleware appear only route /test")
  next();
})

// Load SSL certificate and key
// const options = {
//     key: fs.readFileSync('server.key'),
//     cert: fs.readFileSync('server.cert')
//   };

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

app.get('/',(req,res) => {
  console.log("Hello")
  res.statusCode = 200
  res.send('<h1>Hello world</h1>')
})

app.post("/user",(req,res,next) => {
  try{

    const {email,name} = req.body
    console.log('email: ',email)
    console.log('name: ',name)
    res.send("<h1>authentication successfully</h1>")
  } catch(err) {
    // console.log(err)
    throw err
    // next(err)
  }
})

// update users
// put : replace the old document with the new document
// patch : only modifies certain properties inside the document

app.listen(port, hostname, () => {
    console.log(`Server is running on local at http://${localhost}:${port}/`)
    console.log(`Server is running on network at http://${devicehost}:${port}/`)
})

/**
 * Notes REST APIs  Representional State Transfer Application Programming Interfaces
 * Statelessness => meaning the each request need to include all information necessary for processiong
 * كل ريكويست منفصل بذاته وميعرفش حاجة عن الريكوست اللي بعده ولا اللي قلبله
 */