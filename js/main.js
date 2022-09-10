(function ($) {
  "use strict";

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function () {
    $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
    return false;
  });

  // Initiate the wowjs animation library
  new WOW().init();

  // Initiate superfish on nav menu
  $('.nav-menu').superfish({
    animation: {
      opacity: 'show'
    },
    speed: 400
  });

  // Mobile Navigation
  if ($('#nav-menu-container').length) {
    var $mobile_nav = $('#nav-menu-container').clone().prop({
      id: 'mobile-nav'
    });
    $mobile_nav.find('> ul').attr({
      'class': '',
      'id': ''
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
    $('body').append('<div id="mobile-body-overly"></div>');
    $('#mobile-nav').find('.menu-has-children').prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on('click', '.menu-has-children i', function (e) {
      $(this).next().toggleClass('menu-item-active');
      $(this).nextAll('ul').eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on('click', '#mobile-nav-toggle', function (e) {
      $('body').toggleClass('mobile-nav-active');
      $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
      $('#mobile-body-overly').toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Header scroll class
  $(window).scroll(function () {
    if ($(this).scrollTop() > 10) {
      $('#header').addClass('header-scrolled');
    } else {
      $('#header').removeClass('header-scrolled');
    }
  });

  if ($(window).scrollTop() > 100) {
    $('#header').addClass('header-scrolled');
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $('.nav-menu a, #mobile-nav a, .scrollto').on('click', function () {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($('#header').length) {
          top_space = $('#header').outerHeight();

          if (!$('#header').hasClass('header-scrolled')) {
            top_space = top_space - 20;
          }
        }

        $('html, body').animate({
          scrollTop: target.offset().top - top_space
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu').length) {
          $('.nav-menu .menu-active').removeClass('menu-active');
          $(this).closest('li').addClass('menu-active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
          $('#mobile-body-overly').fadeOut();
        }
        return false;
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, #mobile-nav');
  var main_nav_height = $('#header').outerHeight();

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop();

    nav_sections.each(function () {
      var top = $(this).offset().top - main_nav_height,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        main_nav.find('li').removeClass('menu-active menu-item-active');
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('menu-active menu-item-active');
      }
    });
  });

  // Intro carousel
  var introCarousel = $(".carousel");
  var introCarouselIndicators = $(".carousel-indicators");
  introCarousel.find(".carousel-inner").children(".carousel-item").each(function (index) {
    (index === 0) ?
      introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "' class='active'></li>") :
      introCarouselIndicators.append("<li data-target='#introCarousel' data-slide-to='" + index + "'></li>");

    $(this).css("background-image", "url('" + $(this).children('.carousel-background').children('img').attr('src') + "')");
    $(this).children('.carousel-background').remove();
  });

  $(".carousel").swipe({
    swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
      if (direction == 'left') $(this).carousel('next');
      if (direction == 'right') $(this).carousel('prev');
    },
    allowPageScroll: "vertical"
  });

  // Skills section
  $('#skills').waypoint(function () {
    $('.progress .progress-bar').each(function () {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, { offset: '80%' });

  // jQuery counterUp (used in Facts section)
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Porfolio isotope and filter
  var portfolioIsotope = $('.portfolio-container').isotope({
    itemSelector: '.portfolio-item',
    layoutMode: 'fitRows'
  });

  $('#portfolio-flters li').on('click', function () {
    $("#portfolio-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    portfolioIsotope.isotope({ filter: $(this).data('filter') });
  });

  // Clients carousel (uses the Owl Carousel library)
  $(".clients-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: { items: 2 }, 768: { items: 4 }, 900: { items: 6 }
    }
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

})(jQuery);

//Display years of experience
window.addEventListener("load", () => {
  //get current date
  const currentDate = new Date();
  //get current month
  const currentMonth = currentDate.getMonth();
  //get current full year
  const currentFullYear = currentDate.getFullYear();
  //when i started working
  const startYear = 2005;

  document.querySelector(".availability").innerText = getAvailability(currentMonth, currentFullYear);
  document.querySelector(".experience").innerText = getYearsExperience(startYear, currentFullYear);
});

function getAvailability(cMonth, cYear) {
  const defaultText = "Wieder verfügbar ab ";
  let availabilityDate;

  switch (cMonth) {
    case 0:
    case 1:
      availabilityDate = "März " + cYear;
      break;
    case 2:
    case 3:
    case 4:
      availabilityDate = "Juni " + cYear;
      break;
    case 5:
    case 6:
    case 7:
      availabilityDate = "September " + cYear;
      break;
    case 8:
    case 9:
    case 10:
    case 11:
      availabilityDate = "Januar " + (cYear + 1);
      break;
  }

  const infoText = defaultText + availabilityDate;
  // console.log(infoText);
  return infoText;
}

function getYearsExperience(sYear, cYear) {
  const experience = cYear - sYear;
  // console.log(experience);
  return experience;
}

//Animate the skill bars once in viewport
//https://stackoverflow.com/a/62536793/5263954
function callbackFunc(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // console.log("called!");
      const skillBars = document.querySelectorAll('.bar');
      skillBars.forEach(bar => {
        bar.style.setProperty('--anVar', 'load 4s 0s');
        bar.style.setProperty('--bgColor', '#dd0b2f'); //else the red part of the bar will be visible before animation start
      });
    }
  });
}

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3
};

const observer = new IntersectionObserver(callbackFunc, options);
observer.observe(document.querySelector(".kenntnisse-cols"));

//settings for lightbox-portfolio
lightbox.option({
  "albumLabel": "Bild %1 von %2",
  "alwaysShowNavOnTouchDevices": true
})

//Add a Leaflet map to the page
const mymap = L.map('map', {
  // center: [0, 0],
  // zoom: 1,
  gestureHandling: true
  // dragging: !L.Browser.mobile,
  // tap: !L.Browser.mobile
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

const inputGeoJson = {
"type": "FeatureCollection",
"features": [
  {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "MultiPolygon",
      "coordinates": [
        [
          [
            [
              -180,
              90
            ],
            [
              180,
              90
            ],
            [
              180,
              -90
            ],
            [
              -180,
              -90
            ],
            [
              -180,
              90
            ]
          ],
          [
            [
              8.64417961121,
              47.86569572539
            ],
            [
              9.00604179382,
              47.86615637372
            ],
            [
              9.57046440125,
              47.70606559776
            ],
            [
              9.71122673035,
              47.59042076513
            ],
            [
              9.76478507996,
              47.53574744181
            ],
            [
              9.7771446991,
              47.43366174319
            ],
            [
              9.68788078308,
              47.29087414158
            ],
            [
              9.63500907898,
              47.22702986516
            ],
            [
              9.58831718445,
              47.20837467993
            ],
            [
              9.56291130066,
              47.17244496953
            ],
            [
              9.62608268738,
              47.15283669335
            ],
            [
              9.63500907898,
              47.08274805199
            ],
            [
              9.60754325867,
              47.05842910513
            ],
            [
              9.56428459167,
              47.04626547044
            ],
            [
              9.54822760107,
              47.03022754105
            ],
            [
              9.59037712097,
              46.96713421815
            ],
            [
              9.53544548035,
              46.84422559876
            ],
            [
              9.48120048523,
              46.84375594201
            ],
            [
              9.44755485535,
              46.87286689622
            ],
            [
              9.37820365906,
              46.89867791978
            ],
            [
              9.24499443054,
              46.91275142543
            ],
            [
              9.196929245,
              46.88084617505
            ],
            [
              9.15779045105,
              46.88037683856
            ],
            [
              9.11041191101,
              46.85033076284
            ],
            [
              9.09942558289,
              46.87333629841
            ],
            [
              9.04518058777,
              46.86676429416
            ],
            [
              9.01702812195,
              46.81415928915
            ],
            [
              8.92776420593,
              46.79582938448
            ],
            [
              8.87557914734,
              46.81227958636
            ],
            [
              8.82957389832,
              46.78971802831
            ],
            [
              8.81309440613,
              46.7360964083
            ],
            [
              8.77876213074,
              46.72574223263
            ],
            [
              8.76228263855,
              46.74503705128
            ],
            [
              8.73962333679,
              46.73044892253
            ],
            [
              8.74717643738,
              46.71868142771
            ],
            [
              8.57688835144,
              46.64613704969
            ],
            [
              8.47801139832,
              46.62114794616
            ],
            [
              8.42513969421,
              46.62350590169
            ],
            [
              8.29192977905,
              46.65226516156
            ],
            [
              8.2260118103,
              46.71350338759
            ],
            [
              8.06121688843,
              46.74833106915
            ],
            [
              7.89230209351,
              46.67582654018
            ],
            [
              7.7687059021,
              46.65037980766
            ],
            [
              7.63824325562,
              46.68995843841
            ],
            [
              7.52014091492,
              46.746919103
            ],
            [
              7.35053947449,
              46.84422559876
            ],
            [
              7.28393486023,
              46.8911705393
            ],
            [
              7.20497062683,
              46.90149291649
            ],
            [
              7.2022240448,
              46.99383655836
            ],
            [
              7.06420829773,
              47.02473839747
            ],
            [
              6.94404533386,
              46.95963642726
            ],
            [
              6.84173446655,
              46.99243197287
            ],
            [
              6.6915129,
              47.0666703
            ],
            [
              6.7146622,
              47.0881954
            ],
            [
              6.7429952,
              47.0918803
            ],
            [
              6.7405487,
              47.1096216
            ],
            [
              6.8060991,
              47.1307661
            ],
            [
              6.8499278,
              47.1563748
            ],
            [
              6.8588143,
              47.165261
            ],
            [
              6.8409761,
              47.1711995
            ],
            [
              6.8739978,
              47.1854493
            ],
            [
              6.8804605,
              47.2005177
            ],
            [
              6.9554611,
              47.2429925
            ],
            [
              6.940793,
              47.2863723
            ],
            [
              6.996388,
              47.2956997
            ],
            [
              7.0157833,
              47.3132902
            ],
            [
              7.0099836,
              47.3245152
            ],
            [
              7.0456146,
              47.3264816
            ],
            [
              7.0569839,
              47.3343682
            ],
            [
              7.0623707,
              47.3440342
            ],
            [
              7.0498342,
              47.3477181
            ],
            [
              7.0498885,
              47.3613968
            ],
            [
              7.0154774,
              47.372915
            ],
            [
              6.9746009,
              47.3601278
            ],
            [
              6.9024206,
              47.3593555
            ],
            [
              6.8793259,
              47.3525796
            ],
            [
              6.883607,
              47.3728593
            ],
            [
              6.913415,
              47.3880784
            ],
            [
              6.9132014,
              47.4045971
            ],
            [
              6.9384103,
              47.4060862
            ],
            [
              6.9402723,
              47.4333274
            ],
            [
              6.9637101,
              47.4357772
            ],
            [
              6.9702926,
              47.4471132
            ],
            [
              7.0021261,
              47.4541577
            ],
            [
              6.9829674,
              47.494551
            ],
            [
              7.0215035,
              47.5044581
            ],
            [
              7.0748517,
              47.4881832
            ],
            [
              7.1279794,
              47.5039313
            ],
            [
              7.1622737,
              47.4900176
            ],
            [
              7.2012133,
              47.4942181
            ],
            [
              7.1775007,
              47.4680487
            ],
            [
              7.1702182,
              47.4429793
            ],
            [
              7.1999041,
              47.4351303
            ],
            [
              7.2308748,
              47.4393953
            ],
            [
              7.2465183,
              47.4203421
            ],
            [
              7.2818303,
              47.4347794
            ],
            [
              7.3302124,
              47.4417583
            ],
            [
              7.385599,
              47.431814
            ],
            [
              7.403093,
              47.4354815
            ],
            [
              7.4558246,
              47.4707007
            ],
            [
              7.429391,
              47.4829407
            ],
            [
              7.420816,
              47.4803666
            ],
            [
              7.4331412,
              47.497168
            ],
            [
              7.477074,
              47.4800728
            ],
            [
              7.5110674,
              47.497027
            ],
            [
              7.4978704,
              47.5212476
            ],
            [
              7.5022782,
              47.5149066
            ],
            [
              7.5222003,
              47.5140915
            ],
            [
              7.5312249,
              47.5281589
            ],
            [
              7.5193537,
              47.5347178
            ],
            [
              7.5022985,
              47.5284046
            ],
            [
              7.4991749,
              47.5401125
            ],
            [
              7.5573002,
              47.5650334
            ],
            [
              7.5665034,
              47.5776581
            ],
            [
              7.5846534,
              47.5755163
            ],
            [
              7.59395565033,
              47.6036169765
            ],
            [
              7.56442989349,
              47.63601516667
            ],
            [
              7.52803768158,
              47.65475066603
            ],
            [
              7.51464809418,
              47.69982708554
            ],
            [
              7.66262020111,
              47.72177328584
            ],
            [
              7.7669903183,
              47.68249460966
            ],
            [
              7.84526790619,
              47.69012160873
            ],
            [
              7.96371391296,
              47.7356295133
            ],
            [
              8.12370231628,
              47.76425355861
            ],
            [
              8.3798210907,
              47.79101663958
            ],
            [
              8.52470329285,
              47.84542314581
            ],
            [
              8.64417961121,
              47.86569572539
            ]
          ]
        ]
      ]
    }
  }
]
};

const myStyle = {
  "color": "#555555",
  "weight": 1,
  "opacity": .4,
  "fillOpacity": .5
};

const jsonLayer = L.geoJSON(inputGeoJson, {
  style: myStyle,
})

jsonLayer.addTo(mymap);

//Center and zoom the map according to 2 corner points
const corner1 = L.latLng(47.896, 6.679), corner2 = L.latLng(46.593, 9.8);
const bounds = L.latLngBounds(corner1, corner2);
mymap.fitBounds(bounds);