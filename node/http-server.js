var http = require('http');
var https = require('https');

var key = "AIzaSyAyG8cJFWOgaWRD83UWMs_awMbvMNZSr8w";

http.createServer(function (req, res) {

    https.get('https://www.googleapis.com/calendar/v3/calendars/stylewildle%40gmail.com/events?key=' + key, function (res) {
        res.on('data', function(d) {
            process.stdout.write(d);
        });
    });

    res.writeHead(200, {
        'conten-type': 'text/plain'
    });
    res.write('Ciao\n');
    setTimeout(function() {
        res.end('Welt!\n');
    }, 2000)
}).listen('3000');