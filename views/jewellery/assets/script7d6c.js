$(function () {

  "use strict";

  /* _____________________________________

 Pre loader
 _____________________________________ */
  $(window).on('load', function() {
    $('.loader-wrapper').fadeOut('slow');
    $('.loader-wrapper').remove('slow');
  });
  /* _____________________________________

 Tap on Top
 _____________________________________ */
  $(window).on('scroll', function() {
    
    if ($(this).scrollTop() > 600) {
      $('.tap-top').fadeIn();
    } else {
      $('.tap-top').fadeOut();
    }
    
    
  });

  $( document ).ready(function() {
 
    if ($(window).width() > '991') {    
    
        $('.hover-cls').hover(
            function () {
                    $('.sm').addClass('hover-unset');
            }
        )
    }
    
    $('.mobile-search .ti-close').hide();
    $('.search_box_btn').on('click', function() {
      $(this).hide();
      $('.mobile-search .ti-close').show();
      $('#search-overlay').slideDown();
    });

    $('.mobile-search .ti-close').on('click', function() {
      $(this).hide();
      $('.search_box_btn').show();
      $('#search-overlay').slideUp();
    });

    $('.ajax-loader').css("display","none");

    $('.tap-top').on('click', function() {
      $("html, body").animate({
        scrollTop: 0
      }, 600);
      return false;
    });

    $('.close_shipping_bar').on('click', function() {
      $('.shipping-info').slideUp("slow");
      return false;
    });

    var contentwidth = jQuery(window).width();
    if ((contentwidth) < '992') {
      jQuery('.footer-title h4').append('<span class="according-menu"></span>');
      jQuery('.footer-title').click(function () {
        jQuery('.footer-title').removeClass('active');
        jQuery('.footer-contant').slideUp('normal');
        if (jQuery(this).next().is(':hidden') == true) {
          jQuery(this).addClass('active');
          jQuery(this).next().slideDown('normal');
        }
      });
      jQuery('.footer-contant').hide();
    } else {
      jQuery('.footer-contant').show();
    }

    var contentwidth = jQuery(window).width();
    if ((contentwidth) < '991') {
      jQuery('.menu-title h5').append('<span class="according-menu"></span>');
      jQuery('.menu-title').click(function () {
        jQuery('.menu-title').removeClass('active');
        jQuery('.menu-content').slideUp('normal');
        if (jQuery(this).next().is(':hidden') == true) {
          jQuery(this).addClass('active');
          jQuery(this).next().slideDown('normal');
        }
      });
      jQuery('.menu-content').hide();
    } else {
      jQuery('.menu-content').show();
    }

    /*---------   Add to cart quantity Counter   ---------*/
    $("button.add-button").click(function(){
      $(this).next().addClass("open");
      $(".qty-input").val('1');
    });
    $('.quantity-right-plus').on('click',function(){
      //var $add_cart_btn = $(this).parents(".cart_qty").prev().trigger( "click" );
      var $qty = $(this).siblings(".qty-input");
      var currentVal = parseInt($qty.val());
      if (!isNaN(currentVal)) {
        $qty.val(currentVal + 1);
      }
    });
    $('.quantity-left-minus').on('click',function(){
      var $qty = $(this).siblings(".qty-input");
      var _val =  $($qty).val();
      if(_val == '1') {
        var _removeCls = $(this).parents('.cart_qty');
        $(_removeCls).removeClass("open");
      }
      var currentVal = parseInt($qty.val());
      if (!isNaN(currentVal) && currentVal > 0) {
        $qty.val(currentVal - 1);
      }
    });


    /*---------   Quantity Counter   ---------*/
    $('.product-description .quantity-right-plus').on('click', function () {
      var $qty = $('.qty-box .input-number');
      var currentVal = parseInt($qty.val(), 10);
      if (!isNaN(currentVal)) {
        $qty.val(currentVal + 1);
      }
    });

    $('.product-description .quantity-left-minus').on('click', function () {
      var $qty = $('.qty-box .input-number');
      var currentVal = parseInt($qty.val(), 10);
      if (!isNaN(currentVal) && currentVal > 1) {
        $qty.val(currentVal - 1);
      }
    });

    /*---------------- portfolio ----------*/

    $('.zoom-gallery').magnificPopup({
      delegate: 'a',
      type: 'image',
      closeOnContentClick: false,
      closeBtnInside: false,
      mainClass: 'mfp-with-zoom mfp-img-mobile',
      image: {
        verticalFit: true,
        titleSrc: function(item) {
          return item.el.attr('title') + ' &middot;';
        }
      },
      gallery: {
        enabled: true
      },
      zoom: {
        enabled: true,
        duration: 300, // don't foget to change the duration also in CSS
        opener: function(element) {
          return element.find('img');
        }
      }

    });

    $(".filter-button").click(function(){
      $(this).addClass('active').siblings('.active').removeClass('active');
      var value = $(this).attr('data-filter');
      if(value == "all")
      {
        $('.filter').show('1000');
      }
      else
      {
        $(".filter").not('.'+value).hide('3000');
        $('.filter').filter('.'+value).show('3000');
      }
    });

    $("#formButton").click(function(){
      $("#form1").toggle();
    });

    /* _____________________________________

 Full slider
 _____________________________________ */
    if ($(window).width() > 767){
      var $slider = $(".full-slider");
      $slider.
      on('init', function () {
        mouseWheel($slider);
      }).
      slick({
        dots: true,
        nav: false,
        vertical: true,
        infinite: false });

      function mouseWheel($slider) {
        $(window).on('wheel', { $slider: $slider }, mouseWheelHandler);
      }
      function mouseWheelHandler(event) {
        event.preventDefault();
        var $slider = event.data.$slider;
        var delta = event.originalEvent.deltaY;
        if (delta > 0) {
          $slider.slick('slickNext');
        } else
        {
          $slider.slick('slickPrev');
        }
      }
    }
    else{
      var $slider = $(".full-slider");
      $slider.
      on('init', function () {
        mouseWheel($slider);
      }).
      slick({
        dots: true,
        nav: false,
        vertical: false,
        infinite: false });

      function mouseWheel($slider) {
        $(window).on('wheel', { $slider: $slider }, mouseWheelHandler);
      }
      function mouseWheelHandler(event) {
        event.preventDefault();
        var $slider = event.data.$slider;
        var delta = event.originalEvent.deltaY;
        if (delta > 0) {
          $slider.slick('slickNext');
        } else
        {
          $slider.slick('slickPrev');
        }
      }
    }


    /* _____________________________________

 slick slider
 _____________________________________ */

    $('.slide-1').slick();

    $('.slick_carousel').slick();

    $('.slick_carousel_verticle').slick();

    $('.slide-2').slick({
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 2,
      responsive: [
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

    $('.slide-3').slick({
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      // autoplay: true,
      // autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint:767,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

    $('.team-4').slick({
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 586,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    });

    $('.slide-4').slick({
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 586,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

    $('.product_4').slick({
      infinite: true,
      speed: 300,
      slidesToShow: 4,
      slidesToScroll: 4,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 991,
          settings: {
            slidesToShow:2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 420,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

    $('.product-3').slick({
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 3,
      // autoplay: true,
      // autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint:991,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        },
        {
          breakpoint: 420,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

    $('.slide-5').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 5,
      slidesToScroll: 5,
      responsive: [
        {
          breakpoint: 1367,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        }
      ]
    });

    $('.slide-6').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 6,
      slidesToScroll: 6,
      responsive: [
        {
          breakpoint: 1367,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: true
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true
          }
        },
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }

      ]
    });

    $('.slide-7').slick({
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 7,
      slidesToScroll: 7,
      responsive: [
        {
          breakpoint: 1367,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3
          }
        }
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
    });

    $('.slide-8').slick({
      infinite: true,
      slidesToShow: 8,
      slidesToScroll: 8,
      responsive: [

        {
          breakpoint: 1200,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6
          }
        }
      ]
    });

    $('.product-slick-gallery').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      arrows: true,
      infinite: true,
      dots: false,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 767,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

    // Tab Js

    $("#tab-1").css("display", "Block") ;
    $(".default").css("display", "Block");

    $(".tabs li a").click(function(event) {
      event.preventDefault();
      $('.slick_carousel').slick('unslick');
      $('.product-3').slick('unslick');
      $('.product_4').slick('unslick');
      $(this).parent().parent().find("li").removeClass("current");
      $(this).parent().addClass("current");
      var currunt_href = $(this).attr("href");
      $('#' + currunt_href).show();
      $(this).parent().parent().parent().parent().find(".tab-content").not('#' + currunt_href).css("display", "none");

      $(".slick_carousel").slick();
      $(".product-3").slick({
        arrows: false,
        dots: false,
        autoplay: true,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint:991,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 420,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
      $('.product_4').slick({
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow:2,
              slidesToScroll: 2
            }
          },
          {
            breakpoint: 420,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      });
    });

    $('ul.tabs li:first-child a').trigger( "click" );

    /* ================ customer templates Js ===================== */

    $('#RecoverPassword').on('click', function(evt) {
      console.log('click');
      evt.preventDefault();
      toggleRecoverPasswordForm();$('#RecoverPasswordForm').toggleClass();
    });

    $('#HideRecoverPasswordLink').on('click', function(evt) {
      console.log('click');
      evt.preventDefault();
      toggleRecoverPasswordForm();
    });

    function toggleRecoverPasswordForm() {
      $('#RecoverPasswordForm').toggleClass('hide');
      $('#CustomerLoginForm').toggleClass('hide');
    }

    var hash = window.location.hash;
    // Allow deep linking to recover password form
    if (hash === '#recover') {
      toggleRecoverPasswordForm();
    }

    var $formState = $('.reset-password-success');
    // check if reset password form was successfully submited.
    if (!$formState.length) {
      return;
    }
    // show success message
    $('#ResetSuccess').removeClass('hide'); 

  });

  //   $(window).load(function() {
  //     var max = -1;
  //     $('.product-box .img-wrapper').each(function() {
  //       var minHeight = $(this).innerHeight();
  //       max = minHeight > max ? minHeight : max;
  //     });  
  //     $('.product-box .img-wrapper').css({
  //       'min-height' : max,
  //       'max-height' : max
  //     });
  //   });

});

/*=====================
     14. RTL & Dark Light
     ==========================*/

$('').appendTo($('body'));
(function() {
})();
$('#ltr_btn').hide();
$("#ltr_btn").on('click', function (){
  $('body').addClass('ltr');
  $('body').removeClass('rtl');
  $('#ltr_btn').hide();
  $('#rtl_btn').show();
});
$("#rtl_btn").on('click', function (){
  $('body').addClass('rtl');
  $('body').removeClass('ltr');
  $('#rtl_btn').hide();
  $('#ltr_btn').show();
});
$(".setting_buttons li").on('click', function (){
  $(this).addClass('active').siblings().removeClass('active');
});
$(".color-picker li").on('click', function (){
  $(this).addClass('active').siblings().removeClass('active');
});   

// dark layout //
var body_event = $("body");
body_event.on("click", ".theme-layout-version" , function(){
  $(this).toggleClass('dark');
  $('body').removeClass('dark');
  if($('.theme-layout-version').hasClass('dark')){
    $('.theme-layout-version').text('Light');
    $('body').addClass('dark');
  }else{
    $('#theme-dark').remove();
    $('.theme-layout-version').text('Dark');
  }

  return false;
});

// menu //

$(function() {
  $('#main-menu').smartmenus({
    subMenusSubOffsetX: 1,
    subMenusSubOffsetY: -8
  });
  $('#sub-menu').smartmenus({
    subMenusSubOffsetX: 1,
    subMenusSubOffsetY: -8
  });
});

//toggle menu
$(".toggle-nav").click(function(){
  $('.sm-horizontal').css("right","0px");
});
$(".mobile-back").click(function(){
  $('.sm-horizontal').css("right","-410px");
});

//filter show
$('.filter-btn').on('click', function(e) {
  $('.collection-filter').css("left","-15px");
});
$('.filter-back').on('click', function(e) {
  $('.collection-filter').css("left","-365px");
});

//filter show
$('.sidebar-popup').on('click', function(e) {
  $('.collection-filter').css("left","-15px");
});
$('.filter-back').on('click', function(e) {
  $('.collection-filter').css("left","-365px");
});

// sidebar popup
$('.sidebar-popup').on('click', function(e) {
  $('.open-popup').toggleClass('open');
  $('.collection-filter').css("left","-15px");
});
$('.filter-back').on('click', function(e) {
  $('.collection-filter').css("left","-365px");
  $('.sidebar-popup').trigger('click');
});

$('.fixed_cart').on('click', function(e) {
  $('#cart_side').addClass('open-side');
});
$('#cart_side .close-cart, #cart_side .overlay').on('click', function(e) {
  $('#cart_side').removeClass('open-side');
});

// Address page //

// window.theme = theme || {};

// theme.customerTemplates = (function() {

  /**
   *
   *  Show/hide customer address forms
   *
   */
//   function customerAddressForm() {
//     var $newAddressForm = $('#AddressNewForm');

//     if (!$newAddressForm.length) {
//       return;
//     }

//     if (Shopify) {
//       new Shopify.CountryProvinceSelector(
//         'AddressCountryNew',
//         'AddressProvinceNew',
//         {
//           hideElement: 'AddressProvinceContainerNew'
//         }
//       );
//     }

//     $('.address-country-option').each(function() {
//       var formId = $(this).data('form-id');
//       var countrySelector = 'AddressCountry_' + formId;
//       var provinceSelector = 'AddressProvince_' + formId;
//       var containerSelector = 'AddressProvinceContainer_' + formId;

//       new Shopify.CountryProvinceSelector(countrySelector, provinceSelector, {
//         hideElement: containerSelector
//       });
//     });

//     $('.address-new-toggle').on('click', function() {
//       $newAddressForm.toggleClass('hide');
//     });

//     $('.address-edit-toggle').on('click', function() {
//       var formId = $(this).data('form-id');
//       $('#EditAddress_' + formId).toggleClass('hide');
//     });

//     $('.address-delete').on('click', function() {
//       var $el = $(this);
//       var formId = $el.data('form-id');
//       var confirmMessage = $el.data('confirm-message');

//       if (
//         confirm(
//           confirmMessage || 'Are you sure you wish to delete this address?'
//         )
//       ) {
//         Shopify.postLink('/account/addresses/' + formId, {
//           parameters: { _method: 'delete' }
//         });
//       }
//     });
//   }

//   return {
//     init: function() {
//       customerAddressForm();
//     }
//   };
// })();

// theme.init = function() {
//   theme.customerTemplates.init();
// };

// $(theme.init);

