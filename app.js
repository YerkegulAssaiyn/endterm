var http = require("http"); //to import the built-in http module, so that we can create http server which will respond to our requests
var fs = require("fs");
const path = require('path'); //Getting information about the path to the file

//checking which code type it will return
function serveStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) 
        responseCode = 200;
        fs.readFile(__dirname + path, function (err, data) {
            if (err) { 
                res.writeHead(500, { "Content-Type": "text/plain" }); //if it catch an error then return code - 500
                res.end("500 - Internal error with a response code 500");
            } else {
                res.writeHead(responseCode, { "Content-Type": contentType });
                res.end(data)
            }
        })
}

//The createServer() method returns an http.Server object.
http.createServer(function (req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();

    if (path == "") {//if u write nothing after http://localhost:3000, then it shows us index.html page
        serveStaticFile(res, "/index.html", "text/html");
    } else if (path == "/img/welcome.jpg") { //if u write nothing after http://localhost:3000, then it shows us index.html page
        serveStaticFile(res, "/img/welcome.jpg", "image/jpeg");
    } else if (path == "/about") { //if u write "/about" after http://localhost:3000, then it show us about.html page
        serveStaticFile(res, "/about.html", "text/html");
    } else if (path == "/img/about.jpg") {//if u write nothing after http://localhost:3000, then it shows us index.html page
        serveStaticFile(res, "/img/about.jpg", "image/jpeg");
    } else if (path == "/img/gallery/study") { //if u write "/img/gallery/study" after http://localhost:3000, then it shows study.jpg
        serveStaticFile(res, "/img/gallery/study.jpg", "image/jpeg");
    } else if (path == "/img/gallery/graduation") { //shows graduation.jpg
        serveStaticFile(res, "/img/gallery/graduation.jpg", "image/jpeg");
    } else if (path == "/img/cry.jpg") { //to show us cry.jpg in error.html
        serveStaticFile(res, "/img/cry.jpg", "image/jpeg");
    } else if (path == "/video/memes") { //shows us "memes" video
        serveStaticFile(res, "/video/students/memes.mp4", "video/mp4");
    } else if (path == "/style.css") { //to show us css files
        serveStaticFile(res, "/style.css", "text/css");
    } else { //if conditions are not satisfied then show us error
        serveStaticFile(res, "\/error.html", "text/html", 404);
    }

//The server can listen and process incoming connections, the
//server object needs to call the listen() method, into which the 
//port number is transmitted as a parameter to which the server starts.
}).listen(3000) 

console.log("Its working") //this is for checking connection with code in node.js