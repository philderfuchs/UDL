require('underscore');
require('bootstrap-sass');
require('./calendar.js');

var events = [];
var calendar = {};

function updateEvents() {
    var activeEvents = [];
    $('.event-class-selector').each(function () {
        if ($(this).is(":checked")) {
            activeEvents.push($(this).val())
        }
    });

    calendar.setOptions({
        events_source: events.filter(function (event) {
            return activeEvents.includes(event.class);
        })
    });
    calendar.view();

}

function getDateString() {
    var today = new Date();
    var monthString = (today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
    var dayString = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    return today.getFullYear() + "-" + monthString + "-" + dayString;
}

$(function () {
    $.get("http://udl.cloudno.de/", function (data) {
        events = JSON.parse(data).result;


        var options = {
            events_source: events,
            tmpl_path: 'tmpls/',
            tmpl_cache: false,
            day: getDateString(),
            modal: "#events-modal",
            first_day: 1,
            weekbox: false,
            display_week_numbers: false,
            onAfterViewLoad: function (view) {
                var _this = this;
                $('.page-header .current-view').text(this.getTitle());
                $('.btn-group button').removeClass('active');
                $('button[data-calendar-view="' + view + '"]').addClass('active');
                $('.back-button').on('click', function () {
                    console.log("yo");
                    _this.view('month');
                });
            },
            classes: {
                months: {
                    general: 'label'
                }
            }
        };

        calendar = $('#calendar').calendar(options);

        $('.btn-group button[data-calendar-nav]').each(function () {
            var $this = $(this);
            $this.click(function () {
                calendar.navigate($this.data('calendar-nav'));
            });
        });

        $('#events-modal .modal-header, #events-modal .modal-footer').click(function (e) {
            //e.preventDefault();
            //e.stopPropagation();
        });

        $('.event-class-selector').each(function () {
            $(this).prop('checked', true);
            $(this).click(function () {
                updateEvents();
            });
        });

    });

});

