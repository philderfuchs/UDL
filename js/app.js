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

    if (countOfSelectedClasses() === 7) {
        $(".showall").attr("disabled", "disabled");
    } else {
        $(".showall").removeAttr("disabled");
    }

    updateCalender();
}


function updateCalender() {
    var activeEvents = [];

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

    var date = new Date();
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 4, 0);

    $.get(serverUrl, {end: lastDay.getTime()}, function (data) {
        events = JSON.parse(data).result;

        var options = {
            events_source: events,
            tmpl_path: 'tmpls/',
            tmpl_cache: false,
            day: getDateString(),
            first_day: 1,
            weekbox: false,
            display_week_numbers: false,
            onAfterViewLoad: function (view) {
                var _this = this;
                $('.current-view').text(this.getTitle());
                $('.btn-group button').removeClass('active');
                $('button[data-calendar-view="' + view + '"]').addClass('active');
                $('.back-button').on('click', function () {
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

        // showall selector
        $(".showall").click(function () {
            if (!$(this).attr("disabled")) {
                $('#classSelectors .classSelector').each(function () {
                    $(this).removeClass("unselected");
                    $(this).addClass("selected");
                });
                updateCalender();
                $(this).attr("disabled", "disabled");
                $('#searchInput').val("");
            }
        });

        // search logic
        $('#searchInput').on('focusout', function () {
            if ($(this).val() === "") {
                calendar.setOptions({
                    events_source: events
                });
                calendar.view();
            } else {
                searchAndRefreshEvents()
            }
        });

        $('#searchInput').on('keypress', function (e) {
            if (e.which === 13) {
                if ($(this).val() === "") {
                    calendar.setOptions({
                        events_source: events
                    });
                    calendar.view();
                } else {
                    searchAndRefreshEvents()
                }
            }
        });

    }).fail(function () {
        $(".loading").html("Something went wrong :( Please check in later when our coding hamsters have fixed the issue.");
    });

});

function searchAndRefreshEvents() {
    //Disable textbox to prevent multiple submit
    var searchForm = $('#searchInput');
    searchForm.attr("disabled", "disabled");

    var userInput = searchForm.val().toLowerCase();
    calendar.setOptions({
        events_source: events.filter(function (event) {
            return event.title.toLowerCase().indexOf(userInput) !== -1;
        })
    });
    calendar.view();
    //Enable the textbox again if needed.
    searchForm.removeAttr("disabled");

    // enable showall
    $(".showall").removeAttr("disabled");

    // show all class selectors
    $('#classSelectors .classSelector').each(function () {
        $(this).removeClass("unselected");
        $(this).addClass("selected");
    });
}

