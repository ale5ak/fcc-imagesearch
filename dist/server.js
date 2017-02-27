'use strict';

var express = require('express');
var app = express();

const Promise = require("bluebird");

Promise.promisifyAll(require("mongodb"));

const mongo = require('mongodb')
var MongoClient = mongo.MongoClient
    , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017';
// Use connect method to connect to the Server


//var ImagesClient = require('google-images');
 var ImagesClient = require("./googleimg")


var CSEID = ""; // here put the CSE ID
var APIKEY = ""; // here put the API KEY

var client = new ImagesClient(CSEID, APIKEY);


app.get('/api/imagesearch/:searchString', function (req, res) {

    var searchString = req.params.searchString;
    var offset = req.query.offset;

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");


        var collection = db.collection('imagesearch')
        try {
            collection.insertOne({"term": searchString, "when": new Date()})
        } catch(e) {
            throw new Error("error during inserting to database", e)
        }


        db.close();
    });

    client.search(searchString, {
        page: parseInt(offset)
    }).then(function (images) {
        res.send(images)
    });

});


app.get('/api/latest/imagesearch/', function (req, res) {

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        console.log("Connected correctly to server");

        var collection = db.collection('imagesearch')

        collection.find().sort({_id:-1}).limit(10).toArray(function(err, items) {
            if (err) {
                throw new Error("Error reading the database", err)
            }
            items.map(function (item) {
                delete item["_id"]
            })

            res.send(items)
            db.close();
        });

    });


})



app.get('/', function (req, res) {
    res.send("Hello world!")
});

app.listen(3000, function () {
    console.log('Running now!');
});