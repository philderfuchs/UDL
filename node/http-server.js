var http = require('http');
var https = require('https');

var key = "AIzaSyAyG8cJFWOgaWRD83UWMs_awMbvMNZSr8w";

var endOfYear = 1514761200000;

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
            let events = [];
            parsedData.items.forEach(function (value) {
                if (value.start) {
                    let startTime = new Date(value.start.dateTime.split(' ').join('T')).getTime();
                    let endTime = new Date(value.end.dateTime.split(' ').join('T')).getTime();
                    events.push({
                        title: value.summary,
                        start: startTime,
                        end: endTime,
                        class: "event-important",
                        id: id++,
                        url: "http://example.com"
                    });

                    if(value.recurrence) {
                        if(value.recurrence[0].includes("FREQ=WEEKLY")) {
                            while(endTime < endOfYear) {
                                startTime += 604800000;
                                endTime += 604800000;
                                events.push({
                                    title: value.summary,
                                    start: startTime,
                                    end: endTime,
                                    class: "event-important",
                                    id: id++,
                                    url: "http://example.com"
                                });
                            }
                        }
                    }
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