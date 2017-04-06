var http = require('http');
var https = require('https');
var request = require('request');
var rp = require('request-promise');

var key = "AIzaSyAyG8cJFWOgaWRD83UWMs_awMbvMNZSr8w";

var endOfYear = 1514761200000;

function addEvents(parsedData, events, category) {
    parsedData.items.forEach(function (value) {
        if (value.start) {
            let startTime = new Date(value.start.dateTime.split(' ').join('T')).getTime();
            let endTime = new Date(value.end.dateTime.split(' ').join('T')).getTime();
            events.push({
                title: value.summary,
                start: startTime,
                end: endTime,
                class: category,
                id: value.id,
                url: "http://example.com"
            });

            if (value.recurrence) {
                if (value.recurrence[0].includes("FREQ=WEEKLY")) {
                    while (endTime < endOfYear) {
                        startTime += 604800000;
                        endTime += 604800000;
                        events.push({
                            title: value.summary,
                            start: startTime,
                            end: endTime,
                            class: category,
                            id: value.id,
                            url: "http://example.com"
                        });
                    }
                }
            }
        }
    });
}

async function doRequests(res) {
    let events = [];

    await rp('https://www.googleapis.com/calendar/v3/calendars/stylewildle%40gmail.com/events?key=' + key)
        .then(function (body) {
            let parsedData = JSON.parse(body);
            addEvents(parsedData, events, "event-important");

        })
        .catch(function (err) {
            console.log("Error yo");
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
}


http.createServer(function (req, res) {

    doRequests(res);

}).listen('3000');