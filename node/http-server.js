var http = require('http');
var https = require('https');
var request = require('request');
var rp = require('request-promise');

var key = "AIzaSyDkdDAWXsoECm144VHaKEwtkpcUhSKWPXA";

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

async function doRequests(res) {
    let events = [];

    // HIPHOP
    await rp('https://www.googleapis.com/calendar/v3/calendars/h86f19mfhajijbqr4fld0ghalk@group.calendar.google.com/events?key=' + key)
        .then(function (body) {
            addEvents(JSON.parse(body), events, "event-standard");
        })
        .catch(function (err) {
            console.log(">>>>>>>> ERROR GETTING HIPHOP CALENDAR");
        });

    // BREAKDANCE
    await rp('https://www.googleapis.com/calendar/v3/calendars/ole9uvl71kba7sr2jid3f1nsgk@group.calendar.google.com/events?key=' + key)
        .then(function (body) {
            addEvents(JSON.parse(body), events, "event-important");
        })
        .catch(function (err) {
            console.log(">>>>>>>> ERROR GETTING BREAKDANCE CALENDAR");
        });

    // WORKSHOPS, PARTIES, JAMS
    await rp('https://www.googleapis.com/calendar/v3/calendars/tlu070aums1aegpgbsake8u334%40group.calendar.google.com/events?key=' + key)
        .then(function (body) {
            // console.log(body);
            addEvents(JSON.parse(body), events, "event-success");
        })
        .catch(function (err) {
            console.log(">>>>>>>> ERROR GETTING WORKSHOPS CALENDAR");
        });

    // HOUSE
    await rp('https://www.googleapis.com/calendar/v3/calendars/s49l2gua3gai6rs9imfvtnf9qo%40group.calendar.google.com/events?key=' + key)
        .then(function (body) {
            // console.log(body);
            addEvents(JSON.parse(body), events, "event-warning");
        })
        .catch(function (err) {
            console.log(">>>>>>>> ERROR GETTING HOUSE CALENDAR");
            // console.log(err);
        });

    // LOCKING / POPPING
    await rp('https://www.googleapis.com/calendar/v3/calendars/o5gf1c9ila9jj21gkvipnposoo@group.calendar.google.com/events?key=' + key)
        .then(function (body) {
            // console.log(body);
            addEvents(JSON.parse(body), events, "event-info");
        })
        .catch(function (err) {
            console.log(">>>>>>>> ERROR GETTING LOCKING/POPPING CALENDAR");
            // console.log(err);
        });

    // Other Styles
    await rp('https://www.googleapis.com/calendar/v3/calendars/n339bp32ism75mr3qfms6jrdfk@group.calendar.google.com/events?key=' + key)
        .then(function (body) {
            // console.log(body);
            addEvents(JSON.parse(body), events, "event-inverse");
        })
        .catch(function (err) {
            console.log(">>>>>>>> ERROR GETTING OTHER STYLES CALENDAR");
            // console.log(err);
        });

    // ALL STYLES TRAININGS
    await rp('https://www.googleapis.com/calendar/v3/calendars/77falh44dpf9mj35iakun2pt84@group.calendar.google.com/events?key=' + key)
        .then(function (body) {
            addEvents(JSON.parse(body), events, "event-special");
        })
        .catch(function (err) {
            console.log(">>>>>>>> ERROR GETTING ALL STYLES TRAININGS CALENDAR");
        });

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


http.createServer(function (req, res) {

    doRequests(res);

}).listen('3000');