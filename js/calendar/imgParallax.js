
module.exports = function(element, speed) {
    var _this = this;
    _this.origMarginTop = parseInt(element.css("margin-top"), 10);

    $(window).scroll(function (event) {
        var scroll = $(window).scrollTop();
        element.css("margin-top",  _this.origMarginTop + 1 * speed * scroll + "px");
    });
};