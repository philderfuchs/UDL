var http = require('http');
var async = require('async');
var PublicGoogleCalendar = require('public-google-calendar');

function addEvents(parsedData, events, category) {
    parsedData.forEach(function (value) {
        if (value.start) {
            let startTime = new Date(value.start).getTime();
            let endTime = new Date(value.end).getTime();

            events.push({
                title: value.summary,
                start: startTime,
                end: endTime,
                class: category,
                id: value.id,
                url: 'http://www.example.com'
            });
        }
    });
}

function getCalendar(id, type, allEvents, callback) {
    let publicGoogleCalendar = new PublicGoogleCalendar({
        calendarId: id
    });
    publicGoogleCalendar.getEvents(function (err, events) {
        if (err) {
            console.log("error getting calendar");
            return console.log(err.message);
        }
        addEvents(events, allEvents, type);
        callback();
    });
}

http.createServer(function (req, res) {


    let events = [];

    // HIPHOP
    async.parallel([
            function (callback) {
                // HIPHOP
                getCalendar('h86f19mfhajijbqr4fld0ghalk@group.calendar.google.com', "event-standard", events, callback);
            },
            function (callback) {
                // BREAKDANCE
                getCalendar('ole9uvl71kba7sr2jid3f1nsgk@group.calendar.google.com', "event-important", events, callback);
            },
            function (callback) {
                // WORKSHOPS, PARTIES, JAMS
                getCalendar('tlu070aums1aegpgbsake8u334%40group.calendar.google.com', "event-success", events, callback);
            },
            function (callback) {
                // HOUSE
                getCalendar('s49l2gua3gai6rs9imfvtnf9qo%40group.calendar.google.com', "event-warning", events, callback);
            },
            function (callback) {
                // LOCKING / POPPING
                getCalendar('o5gf1c9ila9jj21gkvipnposoo@group.calendar.google.com', "event-info", events, callback);
            },
            function (callback) {
                // Other Styles
                getCalendar('n339bp32ism75mr3qfms6jrdfk@group.calendar.google.com', "event-inverse", events, callback);
            },
            function (callback) {
                // ALLSTYLES TRAININGS
                getCalendar('77falh44dpf9mj35iakun2pt84@group.calendar.google.com', "event-special", events, callback);
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
    );

}).listen('8080');