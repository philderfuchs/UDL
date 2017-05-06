var http = require('http');
var https = require('https');
var request = require('request');
var async = require('async');

// KleinParis
// var key = "AIzaSyDkdDAWXsoECm144VHaKEwtkpcUhSKWPXA";
// PA
var key = "AIzaSyAyG8cJFWOgaWRD83UWMs_awMbvMNZSr8w";

var endOfYear = 1514761200000;

function addEvents(parsedData, events, category) {
    parsedData.items.forEach(function (value) {
        if (value.start) {
            let startTime;
            let endTime;
            if (value.start.dateTime) {
                startTime = new Date(value.start.dateTime.split(' ').join('T')).getTime();
                endTime = new Date(value.end.dateTime.split(' ').join('T')).getTime();
            } else if (value.start.date) {
                startTime = new Date(value.start.date).getTime();
                endTime = new Date(value.end.date).getTime();
            }

            events.push({
                title: value.summary,
                start: startTime,
                end: endTime,
                class: category,
                id: value.id,
                url: 'http://www.example.com'
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
                            url: 'http://www.example.com'
                        });
                    }
                }
            }
        }
    });
}

function sendRequest(url, events, category, callback) {
    request.get(url,
        function (error, response, body) {
            if (error) {
                console.error(">>>>>>>> ERROR GETTING CALENDAR");
                console.log(err);
            }
            addEvents(JSON.parse(body), events, category);
            callback();
        });
}

http.createServer(function (req, res) {

    let events = [];

    // HIPHOP
    async.parallel([
            function (callback) {
                // HIPHOP
                sendRequest('https://www.googleapis.com/calendar/v3/calendars/h86f19mfhajijbqr4fld0ghalk@group.calendar.google.com/events?key=' + key,
                    events,
                    "event-standard",
                    callback);
            }, function (callback) {
                // BREAKDANCE
                sendRequest('https://www.googleapis.com/calendar/v3/calendars/ole9uvl71kba7sr2jid3f1nsgk@group.calendar.google.com/events?key=' + key,
                    events,
                    "event-important",
                    callback);
            }, function (callback) {
                // WORKSHOPS, PARTIES, JAMS
                sendRequest('https://www.googleapis.com/calendar/v3/calendars/tlu070aums1aegpgbsake8u334%40group.calendar.google.com/events?key=' + key,
                    events,
                    "event-success",
                    callback);
            }, function (callback) {
                // HOUSE
                sendRequest('https://www.googleapis.com/calendar/v3/calendars/s49l2gua3gai6rs9imfvtnf9qo%40group.calendar.google.com/events?key=' + key,
                    events,
                    "event-warning",
                    callback);
            }, function (callback) {
                // LOCKING / POPPING
                sendRequest('https://www.googleapis.com/calendar/v3/calendars/o5gf1c9ila9jj21gkvipnposoo@group.calendar.google.com/events?key=' + key,
                    events,
                    "event-info",
                    callback);
            }, function (callback) {
                // Other Styles
                sendRequest('https://www.googleapis.com/calendar/v3/calendars/n339bp32ism75mr3qfms6jrdfk@group.calendar.google.com/events?key=' + key,
                    events,
                    "event-inverse",
                    callback);
            }, function (callback) {
                // Other Styles
                sendRequest('https://www.googleapis.com/calendar/v3/calendars/77falh44dpf9mj35iakun2pt84@group.calendar.google.com/events?key=' + key,
                    events,
                    "event-special",
                    callback);
            }
        ],
        function (err, results) {

            let responseJson = {
                success: 1,
                result: events.filter(function (n) {
                    return n != undefined
                })
            };

            try {
                res.writeHead(200, {
                    'conten-type': 'application/json',
                    'Access-Control-Allow-Origin': "*"
                });
                res.write(JSON.stringify(responseJson));
                res.end();
            } catch (e) {
                console.log(e.message);
            }
        }
    )
    ;


}).listen('8080');