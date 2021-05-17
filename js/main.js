function testWebP(callback) {
  var webP = new Image();
  webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
  };
  webP.src =
    "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}

testWebP(function (support) {
  if (support == true) {
    document.querySelector("body").classList.add("webp");
  } else {
    document.querySelector("body").classList.add("no-webp");
  }
});

$(document).ready(function () {
  // MAIN SLIDER
  let introSlider = $(".intro__slider");
  let introProgressLine = $(".intro__slider-line");

  // NAV SCROLL
  $("a[href^='#']").click(function () {
    var _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });

  // SCROLL OF NEWS-HEADER
  if (!window.matchMedia("(max-width: 1030px)").matches) {
    $(window).on("scroll", () => {
      if ($(window).scrollTop() > 20) {
        $(
          ".news-header, .events-header, .header, .events-header__burger, .person-header"
        ).addClass("on-scroll");
      } else {
        $(
          ".news-header, .events-header, .header, .events-header__burger, .person-header"
        ).removeClass("on-scroll");
      }

      if ($(window).scrollTop() > 100) {
        $(".scroll").addClass("unactive");
      } else {
        $(".scroll").removeClass("unactive");
      }
    });

    // FANCYBOX
    $("[data-fancybox]").fancybox({
      touch: false,
    });
  }

  // NEWS-HEADER
  $(".burger").click(() => {
    $(".burger, .nav").toggleClass("active");
    $("body").toggleClass("fixed");
  });

  // EVENTS TABS
  $(".events-info__tab").click(function () {
    let currTab = $(this).index();

    $(".events-info__tab").removeClass("active");
    $(this).addClass("active");

    $(".events-info__description").removeClass("active");
    $(".events-info__description").eq(currTab).addClass("active");
  });

  // TEAM TABS
  $(".team__tab").click(function () {
    let currTab = $(this).index();

    $(".team__tab").removeClass("active");
    $(this).addClass("active");

    $(".team__description").removeClass("active");
    $(".team__description").eq(currTab).addClass("active");
  });

  //INTRO SLIDER
  introSlider.on("init reInit", () => {
    let totalSlides = introSlider.find($(".intro__slider-slide")).length;
    let total = `${parseInt(totalSlides / 10)}${totalSlides}`;
    $(".intro__slider-total, .intro__slider-end").text(total);
  });

  introSlider.slick({
    slidesToShow: 1,
    fade: true,
    appendArrows: $(".intro__container"),
  });

  introSlider.on(
    "init reInit beforeChange",
    (event, slick, currentSlide, nextSlide) => {
      let currentIndex = `${parseInt(nextSlide / 10)}${(nextSlide % 10) + 1}`;
      $(".intro__slider-number, .intro__slider-current").text(currentIndex);
    }
  );

  introSlider.on("beforeChange", (event, slick, currentSlide, nextSlide) => {
    let calc = (nextSlide / (slick.slideCount - 1)) * 100;
    introProgressLine.css("width", calc + "%");
  });

  // MEDIA SLIDER
  let mediaSlider = $(".media__slider");

  mediaSlider.on("init reInit", () => {
    let totalSlides = mediaSlider.find($(".media__slider-slide")).length;
    let total = `${totalSlides}`;
    $(".media__slider-current").text(
      mediaSlider.find($(".media__slider-slide.slick-active")).length
    );
    $(".media__slider-total").text(total);
  });

  mediaSlider.slick({
    slidesToShow: 4,
    infinite: false,
    appendArrows: $(".media .container"),
    draggable: false,

    responsive: [
      {
        breakpoint: 1900,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  mediaSlider.on("beforeChange", (event, slick, currentSlide, nextSlide) => {
    let numberActiveSlides = mediaSlider.find(
      $(".media__slider-slide.slick-active")
    ).length;
    let currentIndex = `${nextSlide + numberActiveSlides}`;
    $(".media__slider-current").text(currentIndex);
  });

  mediaSlider.on("init afterChange", (event, slick, currentSlide) => {
    overlayedSlide = $(".media__slider-slide.slick-active")[
      $(".media__slider-slide.slick-active").length - 1
    ];
    $(".media__slider-slide.slick-active").removeClass("overlay");
    $(overlayedSlide).addClass("overlay");
    $(".media__slider-slide").not(".slick-active").addClass("overlay");
  });

  // EVENTS SLIDER
  let eventsSliedr = $(".events__slider");

  eventsSliedr.slick({
    speed: 700,
    dots: true,
    arrows: false,
    appendDots: ".events__flex",
    responsive: [
      {
        breakpoint: 800,
        settings: {
          appendDots: ".events__body",
        },
      },
    ],
  });
});
