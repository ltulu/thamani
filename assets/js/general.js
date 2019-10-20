function lazyload() {
    $(".lazy").Lazy({
        effect: "fadeIn",
        effectTime: 1e3,
        threshold: 0
    });
}
function wrapperclic() {
    $(".wrapperClic").click(function(a) {
        a.target.classList.contains("ignoreWrapperClic") || (a.preventDefault(),
        "_blank" == $(this).find("a").attr("target") ? window.open($(this).find("a").attr("href"), "_blank") : redirect($(this).find("a").attr("href")))
    });
}
function wrapperclicAjax() {
    $(".wrapperClic").off("click");
    wrapperclic();
}
function mobileScreen() {
    return !!Modernizr.mq("screen and (max-width:767px)");
}
function collapseScreen() {
    return !!Modernizr.mq("screen and (max-width:991px)");
}
function footer() {
    var a = $(window).outerHeight();
    $("header").outerHeight() + $("main").outerHeight() + $("footer").outerHeight() < a ? $("footer").addClass("footer-sticky") : $("footer").removeClass("footer-sticky")
}

$(function(){
	lazyload();
	wrapperclic();
	wrapperclicAjax();
	mobileScreen();
	collapseScreen();
}),
$(window).load(function() {
    footer()
});