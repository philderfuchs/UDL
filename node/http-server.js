var http = require('http');
var https = require('https');

var key = "AIzaSyAyG8cJFWOgaWRD83UWMs_awMbvMNZSr8w";

http.createServer(function (req, res) {

    https.get('https://www.googleapis.com/calendar/v3/calendars/stylewildle%40gmail.com/events?key=' + key, function (incoming) {
        let rawData = '';

        incoming.on('data', function (chunk) {
            console.log("data");
            rawData += chunk;
        });

        incoming.on('end', function () {
            try {
                res.writeHead(200, {
                    'conten-type': 'text/plain'
                });
                res.write(rawData);
                res.end();
            } catch (e) {
                console.log(e.message);
            }
        });
    });


}).listen('3000');