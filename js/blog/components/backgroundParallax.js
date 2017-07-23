module.exports = function (element, speed) {
    var _this = this;
    element.css("background-position", "50% 40%");
    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop() - element.offset().top;

        element.css("background-position", "50%" + (40 - speed * scroll) + "%");
    });
};