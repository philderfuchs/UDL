let events = [];
let calendar = {};

function updateEvents() {
    let activeEvents = [];
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

$(function () {

    $.get("http://localhost:3000", function (data) {
        events = JSON.parse(data).result;

        var options = {
            events_source: events,
            tmpl_path: 'tmpls/',
            tmpl_cache: false,
            day: '2017-04-06',
            modal: "#events-modal",
            first_day: 1,
            weekbox: false,
            display_week_numbers: false,
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

