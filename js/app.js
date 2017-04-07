$(function () {

    "use strict";

    var options = {
//                events_source: [
//                    {
//                        "id": 293,
//                        "title": "Event 1",
//                        "url": "http://example.com",
//                        "class": "event-important",
//                        "start": 1491472800000, // Milliseconds
//                        "end": 1491476400000 // Milliseconds
//                    }],
        events_source: "http://localhost:3000",
        tmpl_path: 'tmpls/',
        tmpl_cache: false,
        display_week_numbers: false,
        day: '2017-04-06',
        modal: "#events-modal",
        first_day: 1,
        onAfterViewLoad: function (view) {
            $('.page-header h3').text(this.getTitle());
            $('.btn-group button').removeClass('active');
            $('button[data-calendar-view="' + view + '"]').addClass('active');
        },
        classes: {
            months: {
                general: 'label'
            }
        }
    };

    var calendar = $('#calendar').calendar(options);

    $('.btn-group button[data-calendar-nav]').each(function () {
        var $this = $(this);
        $this.click(function () {
            calendar.navigate($this.data('calendar-nav'));
        });
    });

//            $('.btn-group button[data-calendar-view]').each(function () {
//                var $this = $(this);
//                $this.click(function () {
//                    calendar.view($this.data('calendar-view'));
//                });
//            });

    $('#first_day').change(function () {
        var value = $(this).val();
        value = value.length ? parseInt(value) : null;
        calendar.setOptions({first_day: value});
        calendar.view();
    });

    $('#events-modal .modal-header, #events-modal .modal-footer').click(function (e) {
        //e.preventDefault();
        //e.stopPropagation();
    });

    $('#toggleImportant').click(function(e) {
        $('#calendar').find("[data-event-class=event-important]").hide();
        $('#calendar').find(".event-important").hide();
    });
});