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
  
  // SCROLL OF NEWS-HEADER
  if(!window.matchMedia('(max-width: 768px)').matches){
    $(window).on('scroll', () => {
      if ($(window).scrollTop() > 20) {
        $('.news-header').addClass('on-scroll');
      }
      else {
        $(".news-header").removeClass("on-scroll");
      }
    });
  }

});
