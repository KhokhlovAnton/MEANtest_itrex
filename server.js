const http = require('http');
const express = require('express');
const fs = require('fs');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const WebSocket = require('ws');
let mongoUrl = "mongodb://localhost:27017/";
let server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));
server.use(cookieParser());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(path.join(__dirname, 'public')));
let dbo;

//let server = http.createServer(expressserver);

let users = [
    { login: "Admin", pass: '54321'},
    { login: "Guest", pass: 'tmp'},
    { login: "User", pass: '12345'}
];

let uEmails;

MongoClient.connect(mongoUrl, (err, client) => {
    if (err) return console.log(err);
    dbo = client.db('test');
    let uCollection = dbo.collection("users");
    uEmails = dbo.collection("emails");
    server.listen(8081, () => {
        console.log('listening on 8081')
    })
});



server.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

server.get('/login', function(req, res) {
    res.sendFile(__dirname + '/public/login.html');
});

server.get('/list', function(req, res) {
    uEmails.find({}).toArray(function(err, emails) {
        if(!err){
            res.json(emails);
        }
    });

    res.sendFile(__dirname + '/public/list.html');
});
/*
server.get('/index', function(req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

server.post('/emails', (req, res) => {
    console.log(req.body);
    dbo.collection('emails').save(req.body, (err, result) => {
        if (err) return console.log(err);
        console.log('saved to database');
    });
    res.redirect('/');
});
/*
server.get('/list',function(req,res){
    //var cursor = dbo.collection('emails').find();
    dbo.collection('emails').find().toArray((err, res) => {
        if (err) return console.log(err)
        res.sendFile('/public/list.html', {emails: res})
    })
});
*/
server.on("request", function(request, response) {
    //Get local filename and guess its content type from extension
    let url = require('url').parse(request.url);
    let filename = url.pathname.substring(1);
    let type;

    switch(filename.substring(filename.lastIndexOf(".") + 1)) {
        case "html":
        case "htm": type = "text/html; charset=UTF-8"; break;
        case "js": type = "application/javascript; charset=UTF-8"; break;
        case "css": type = "text/css; charset=UTF-8"; break;
        case "txt": type = "text/plain; charset=UTF-8"; break;
        case "manifest": type = "text/cache-manifest; charset=UTF-8"; break;
        case "jpeg": type = "image/jpeg"; break;
        case "jpg": type = "image/jpeg"; break;
        case "png": type = "image/png"; break;
        default: type = "application/octet-stream"; break;
    }
    //Read the file async and pass the content as a single chunk to the callback function.
    //For really large files, using the streaming API with fs.createReadStream() would be better
    fs.readFile(filename, function(err, content) {
        if(err) { //If we couldn't read the file for some reason
            response.writeHead(404, { //Send a 404 not found status
                "Content-Type": "text/plain; charset=UTF-8"
            });
            response.write(err.message); //Response body as error message
            response.end();
        } else {
            response.writeHead(200, {
            "Content-Type": type
        });
            response.write(content); //Send file contents as a response body
            response.end();
        }
    });
});

module.exports = server;
