require('underscore');
require('bootstrap-sass');
require('./calendar.js');
require('jarallax');
var imgParallax = require('./imgParallax');

var events = [];
var calendar = {};

function countOfSelectedClasses() {
    var count = 0;
    $('#classSelectors .classSelector').each(function () {
        if ($(this).hasClass("selected")) {
            count++;
        }
    });
    return count;
}

function updateEvents(button) {
    var activeEvents = [];

    // remove all tooltips
    $('#classSelectors .classSelector').each(function () {
        $(this).tooltip('destroy');
    });


    if (button.hasClass("selected")) {
        var classesCount = countOfSelectedClasses();

        // case: unselect a selected class
        if (classesCount === 7) {
            $('#classSelectors .classSelector').each(function () {
                if ($(this).attr('data-val') !== button.attr('data-val')) {
                    $(this).removeClass("selected");
                    $(this).addClass("unselected");
                }
            });
        } else if (classesCount === 1) {
            $('#classSelectors .classSelector').each(function () {
                $(this).removeClass("unselected");
                $(this).addClass("selected");
            });
        } else {
            button.removeClass("selected");
            button.addClass("unselected");
        }
    } else {
        // case: select a unselected class
        button.removeClass("unselected");
        button.addClass("selected");
    }

    // attach tooltip if only one element left
    if (countOfSelectedClasses() === 1) {
        $('#classSelectors .classSelector').each(function () {
            var _this = $(this);
            if (_this .hasClass("selected")) {
                _this .tooltip({
                    title: "click to show all categories"
                });
                _this .tooltip("show");
                setTimeout(function () {
                    _this .tooltip("hide");
                }, 2000);

            }
        });
    }

    $('#classSelectors .classSelector').each(function () {
        if ($(this).hasClass("selected")) {
            activeEvents.push($(this).attr('data-val'))
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

    // parallax effect
    jarallax($('section.header'), {
        speed: 0.5,
        noIos: false
    });
    new imgParallax($('.page-caption-background'), 0.05);

    var serverUrl = window.location.href.includes("localhost") ? "http://localhost:9000" : "https://udl.cloudno.de";

    $.get(serverUrl, function (data) {
        events = JSON.parse(data).result;


        var options = {
            events_source: events,
            tmpl_path: 'tmpls/',
            tmpl_cache: false,
            day: getDateString(),
            // modal: "#events-modal",
            // modal_title: function (e) {
            //     $(".gotowebsite").attr("href", e.url);
            //     return e.title
            // },
            first_day: 1,
            weekbox: false,
            display_week_numbers: false,
            onAfterViewLoad: function (view) {
                var _this = this;
                $('.current-view').text(this.getTitle());
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

        $('#classSelectors .classSelector').each(function () {
            $(this).addClass('selected');
            $(this).click(function () {
                updateEvents($(this));
            });
        });

    });

});

