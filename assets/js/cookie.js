$(function() {
    $("#cookie-accept").click(function() {
        set_cookie("cookie_bandeau__accept", "1", 90), $(".message-cookie").slideUp()
    })
});

function set_cookie(a, b, c) {
    var d = "";
    if (c) {
        var e = new Date;
        e.setTime(e.getTime() + 24 * c * 60 * 60 * 1e3), d = "; expires=" + e.toUTCString()
    }
    document.cookie = a + "=" + b + d + "; path=/"
}