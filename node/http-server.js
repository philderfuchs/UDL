var http = require('http');
var https = require('https');

var key = "AIzaSyAyG8cJFWOgaWRD83UWMs_awMbvMNZSr8w";

http.createServer(function (req, res) {

    https.get('https://www.googleapis.com/calendar/v3/calendars/stylewildle%40gmail.com/events?key=' + key, function (incoming) {
        let rawData = '';

        incoming.on('data', function (chunk) {
            rawData += chunk;
        });


        incoming.on('end', function () {

            console.log(rawData);


            let parsedData = JSON.parse(rawData);
            var id = 0;
            let events = parsedData.items.map(function (item) {
                if (item.start) {
                    return {
                        title: item.summary,
                        start: new Date(item.start.dateTime.split(' ').join('T')).getTime(),
                        end: new Date(item.end.dateTime.split(' ').join('T')).getTime(),
                        class: "event-important",
                        id: id++,
                        url: "http://example.com"
                    };
                }
            });

            let responseJson = {
                success: 1,
                result: events.filter(function (n) {
                    return n != undefined
                })
            };

            try {
                res.writeHead(200, {
                    'conten-type': 'text/plain',
                    'Access-Control-Allow-Origin': "*"
                });
                res.write(JSON.stringify(responseJson));
                res.end();
            } catch (e) {
                console.log(e.message);
            }
        });
    });


}).listen('3000');