// Module dependencies.
var libvirt_driver  = require('./drivers/libvirt.js'),
    hypervisor      = libvirt_driver.hypervisor();

var express         = require('express'),
    path            = require('path'),
    bodyParser      = require('body-parser');

//Create server
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Router
//Get a list of all books
hypervisor.hostname(function (res) {console.log(res)});

app.get( '/api/hypervisor_hostname', function( request, response ) {
    var hypervisor_hostname = {
        title: request.body.title,
        author: request.body.authors,
        releaseDate: request.body.releaseDate
    };

    response.send(hypervisor_hostname);
});
/*
//Insert a new book
app.post( '/api/books', function( request, response ) {
    var book = {
        title: request.body.title,
        author: request.body.authors,
        releaseDate: request.body.releaseDate
    };

    response.send(book);
});
//Get a single book by id
app.get( '/api/books/:id', function( request, response ) {
    var book = {
        title: "Unique Book",
        author: "Unique Author",
        releaseDate: "03/03/2014"
    };

    response.send(book);
});
//Update a book
app.put( '/api/books/:id', function( request, response ) {
    response.send("Updated!");
});
//Delete a book
app.delete( '/api/books/:id', function( request, response ) {
    response.send("Deleted");
});
*/
//Start server
var port = 4711;
app.listen( port, function() {
    console.log( 'NC API server listening on port %d in %s mode', port, app.settings.env );
});