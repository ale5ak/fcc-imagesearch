var express = require('express')
var app = express()

const ImagesClient = require('google-images');

let client = new ImagesClient('CSE ID', 'API KEY');

client.search('Steve Angello')
    .then(function (images) {
        /*
         [{
         "url": "http://steveangello.com/boss.jpg",
         "type": "image/jpeg",
         "width": 1024,
         "height": 768,
         "size": 102451,
         "thumbnail": {
         "url": "http://steveangello.com/thumbnail.jpg",
         "width": 512,
         "height": 512
         }
         }]
         */
    });

// paginate results
client.search('Steve Angello', {
    page: 2
});

// search for certain size
client.search('Steve Angello', {
    size: 'large'
});



app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(3000, function () {
    console.log('Running now!!!!')
})