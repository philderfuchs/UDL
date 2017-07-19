require('underscore');
require('bootstrap-sass');
require('./calendar.js');
require('jarallax');
var config = require('./config.json');
var imgParallax = require('./imgParallax');

// templates
var classSelectorBarTmpl = require('../tmpls/classSelectors_bar.hbs');

var env = window.location.href.includes("localhost") ? 'dev' : 'prod';
var serverUrl = env === 'prod' ? "https://udl.cloudno.de" : "http://localhost:9000";

var events = [];
var calendar = {};

var weekViewCutoff = 1000;

$(function () {

    // parallax effect
    jarallax($('section.header'), {
        imgSrc: '../img/header.jpg',
        speed: 0.5,
        noIos: false
    });
    new imgParallax($('.page-caption-background'), 0.05);

    var date = new Date();
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 4, 0);

    if (env === 'dev' && config.useCached) {
        events = require("./sampledata.json").result;
        setUpCalendar();

    } else {

        $.get(serverUrl, {end: lastDay.getTime()}, function (data) {
            events = JSON.parse(data).result;
            setUpCalendar();
        }).fail(function () {
            $(".loading").html("Something went wrong :( Please check in later when our coding hamsters have fixed the issue.");
        });
    }

});

function setUpCalendar() {
    $('#classSelectorContainer').append(classSelectorBarTmpl());
    preProcessEvents(events);

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

    // set week view if window too small
    if ($(window).width() < weekViewCutoff) {
        options.view = "week";
    }

    calendar = $('#calendar-body').calendar(options);

    $('.btn-group button[data-calendar-nav]').each(function () {
        var $this = $(this);
        $this.click(function () {
            calendar.navigate($this.data('calendar-nav'));
        });
    });

    $('#classSelectors .classSelector').each(function () {
        $(this).addClass('selected');
        $(this).click(function () {
            updateClassSelectors($(this));
        });
    });

    // showall selector
    $(".showall").click(function () {
        if (!$(this).attr("disabled")) {
            $('#classSelectors .classSelector').each(function () {
                $(this).removeClass("unselected");
                $(this).addClass("selected");
            });
            $('#searchInput').val("");
            updateCalender();
            $(this).attr("disabled", "disabled");
        }
    });

    // search logic
    $('#searchInput').on('keyup', function () {
        var searchForm = $(this);
        searchForm.attr("disabled", "disabled");
        updateCalender();
        searchForm.removeAttr("disabled");
        searchForm.focus();
        if (searchForm.val() !== "") {
            $(".showall").removeAttr("disabled");
        }
    });
}

function updateClassSelectors(button) {

    if (button.hasClass("selected")) {
        var classesCount = getCountOfSelectedClasses();

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

    if (getCountOfSelectedClasses() === 7) {
        $(".showall").attr("disabled", "disabled");
    } else {
        $(".showall").removeAttr("disabled");
    }

    updateCalender();
}


function updateCalender() {
    var activeClasses = [];

    $('#classSelectors .classSelector').each(function () {
        if ($(this).hasClass("selected")) {
            activeClasses.push($(this).attr('data-val'))
        }
    });

    var filteredEvents = events.filter(function (event) {
        return activeClasses.includes(event.class);
    });

    var searchForm = $('#searchInput');
    if (searchForm.val() !== "") {
        var userInput = searchForm.val().toLowerCase();
        filteredEvents = filteredEvents.filter(function (event) {
            return event.title.toLowerCase().indexOf(userInput) !== -1;
        });
        if (filteredEvents.length === 0) {
            searchForm.addClass("empty");
        } else {
            searchForm.removeClass("empty");
        }
    }

    calendar.setOptions({
        events_source: filteredEvents
    });
    calendar.view();
}

/*
SOME STATIC HELPER CLASSES
 */

function preProcessEvents(events) {
    events.forEach(function (value) {
        if (value.title.includes("//")) {
            value.title = "<strong>" + value.title.replace("//", "</strong> at").replace("//", "with");
        }
    });
}

function getCountOfSelectedClasses() {
    var count = 0;
    $('#classSelectors .classSelector').each(function () {
        if ($(this).hasClass("selected")) {
            count++;
        }
    });
    return count;
}

function getDateString() {
    var today = new Date();
    var monthString = (today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : today.getMonth() + 1;
    var dayString = today.getDate() < 10 ? "0" + today.getDate() : today.getDate();
    return today.getFullYear() + "-" + monthString + "-" + dayString;
}