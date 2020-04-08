$(document).ready(function() {
    $("a[href*=#]").on("click", function(e) {
        var anchor = $(this);
        $("html, body")
            .stop()
            .animate(
                {
                    scrollTop: $(anchor.attr("href")).offset().top
                },
                777
            );
        e.preventDefault();
        return false;
    });
});

var top_show = 250;
var delay = 1000;

$(window).scroll(function() {
    // При прокрутке попадаем в эту функцию
    /* В зависимости от положения полосы прокрукти и значения top_show, скрываем или открываем кнопку "Наверх" */
    if ($(this).scrollTop() > top_show) $(".header__top-button").fadeIn();
    else $(".header__top-button").fadeOut();
});

//$(window).on('load', function () {
//    $preloader = $('.preloader'),
//      $loader = $preloader.find('.preloader-img');
//    $loader.fadeOut();
//    $preloader.delay(150).fadeOut('slow');
//});

    