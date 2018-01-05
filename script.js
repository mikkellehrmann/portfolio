$(window).on("load", slideUp);

function slideUp() {
    console.log("slideUp");

    $("#overlay").addClass("slide_up");
}

$(document).ready(function () {

    $('.profile_icon, .cross').click(function () {
        var menu = $('.profile');
        menu.toggleClass('profile_active')
    });

});


$(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 100) {
        $(".text_test").addClass("blue");
    } else {
        $(".text_test").removeClass("blue");
    }
});
