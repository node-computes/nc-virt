// Module dependencies.
var libvirt_driver  = require('./drivers/libvirt');

var express         = require('express'),
    path            = require('path'),
    bodyParser      = require('body-parser');

//Create server
var api = express();

api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());

//Router
//Get a list of all books

api.get( '/api/libvirt/hypervisor/hostname', function( request, response ) {
    libvirt_driver.connect(function () {
        libvirt_driver.getHypervisor('getHostname', function (res) {
            response.send(res);
        })
    });
});



/*
//Insert a new book
api.post( '/api/books', function( request, response ) {
    var book = {
        title: request.body.title,
        author: request.body.authors,
        releaseDate: request.body.releaseDate
    };

    response.send(book);
});
//Get a single book by id
api.get( '/api/books/:id', function( request, response ) {
    var book = {
        title: "Unique Book",
        author: "Unique Author",
        releaseDate: "03/03/2014"
    };

    response.send(book);
});
//Update a book
api.put( '/api/books/:id', function( request, response ) {
    response.send("Updated!");
});
//Delete a book
api.delete( '/api/books/:id', function( request, response ) {
    response.send("Deleted");
});
*/
//Start server
var port = 4711;
api.listen( port, function() {
    console.log( 'NC API server listening on port %d in %s mode', port, api.settings.env );
});
