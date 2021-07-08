/* Custom ajax */

var shop_currency_val = $('#shop-currency').text();

var shop_currency;
if(typeof $.cookie('currency') === 'undefined'){
  shop_currency = shop_currency_val;
} else{
  shop_currency = $.cookie('currency');
}

var shipping_price = $('#free_shipping_price span').text();
var shipp_price =  parseFloat(shipping_price.replace(/[^0-9-.]/g, ''));
localStorage.setItem("current_shipping_price", shipp_price);
var currentPrice = localStorage.getItem("current_shipping_price") || 0;

var theme_source = {
  lib_source:{
    ajax_error: function(error, message){
      var data = eval('('+error.responseText+')');
      
      if (!!data.message) {
        $.notify({
          title: 'Warning:',
          message: data.description 
        },{
          type: 'danger'
        });
      }
      
    },
    on_cart_update: function(item){
      setTimeout(function(){
        jQuery.getJSON('/cart.js', function(cart) {
          if ($(window).width() > 1199) {
            $('.cart_qty_cls').html(cart.item_count );
          }else{
            $('.cart_qty_cls').html(cart.item_count);
          }
          if ($(window).width() > 1199) {
            $('.cart_qty_cls_1').html(cart.item_count );
          }else{
            $('.cart_qty_cls_1').html(cart.item_count );
          }
           if(cart.item_count > 0){
            var cart_price = Shopify.formatMoney(cart.total_price, shop_currency_val);
            if($('.items_carts span').hasClass('money')){
              $('.items_carts span').remove();
              $('.items_carts').html("<span class='money'>"+cart_price+"</span>");
            } else{
              $('.items_carts').html("<span class='money'>"+cart_price+"</span>");
            }
          } else{
            $('.items_carts span').remove();
            $('.items_carts').html("<span class='money'>$0.00</span>");
          }
        });

        var shipping_price = $('#free_shipping_price').text();
        var cart_total = $('#cart_container_id .total span').text();
        var cart_priceVal = parseFloat(cart_total.replace(/[^0-9-.]/g, ''));
        var shipp_price =  parseFloat(shipping_price.replace(/[^0-9-.]/g, ''));

        
         if(shipp_price == ''){
           $('#free_shipping_price').html('Free shipping for orders above');
        }
       else if(cart_priceVal < shipp_price) {
          var shipping_minus = shipp_price - cart_priceVal;
          var rate_count = Shopify.formatMoney(shipping_minus*100 , '');
                                               $('#free_shipping_price ').html('<span class="money">'+ rate_count +'</span> away from free shipping');

        } else if (cart_priceVal == shipp_price || cart_priceVal > shipp_price) {
          $('#free_shipping_price').text('free shipping achieved');
        }
       
        else{
          
          $('#free_shipping_price').html('Free shipping for orders above<span class="money">$500.00 USD</span>');                             
          
                                                                        }
                                                                        
                                                                        setTimeout(function(){
            currenciesCallbackSpecial('#free_shipping_price span.money');
          },100);
          

        },100);
      },
    on_item_added: function(item){
      ajaxCart.load();
    },
    on_product: function(e){
      alert("Received everything we ever wanted to know about " + e.title);
    },
    addtocart_product: function(id, qty, callback){
      var qty = qty || 1;
      var ajax = {
        type: "POST",
        url: "/cart/add.js",
        data: "quantity=" + qty + "&id=" + id,
        dataType: "json",
        success: function(item){
          if((typeof callback) === 'function'){
            callback(item, id);
          } else{
            theme_source.lib_source.on_item_added(item);
          }
        },
        error: function(XMLHttpRequest, textStatus){
          theme_source.lib_source.ajax_error(XMLHttpRequest, textStatus);
        }
      };
      jQuery.ajax(ajax);
    },
    get_product: function(handle, callback){
      jQuery.getJSON("/products/" + handle + ".js", function(product, n){
        theme_source.lib_source.on_product(product);
      });
    },
    get_cart: function(callback){
      jQuery.getJSON("/cart.js", function(cart, textstatus){
        if((typeof callback) === 'function'){
          callback(cart);
        } else{
          console.log(cart);
          theme_source.lib_source.on_cart_update(cart);
        }
      });
    },
    addtocart_form: function(form_id, callback, errorCallback){
      var custgomTag;
      var coll_id = jQuery('#' + form_id).parents('.product-box').find('.hide').text();
      var pro_id = jQuery('#' + form_id).parents('.product-box').attr('data-pro-id');
      var tags = jQuery('#' + form_id).parents('.product-box').find('#pro_tags').text();
      var array = tags.split(',');
      $(array).each(function(index, item){
        var upsell = 'upsell_';
        if(item.includes(upsell)){
          var tag = this;
          custgomTag = tag;
        }
      });
      var ajax = {
        type: 'POST',
        url: '/cart/add.js',
        data: jQuery('#' + form_id).serialize(),
        dataType: 'json',
        success: function(item){
          if((typeof callback) === 'function'){
            callback(item, form_id);
          } else{
            theme_source.lib_source.on_item_added(item);
          }     
          
          $.notify({
            icon: 'fa fa-check',
            title: 'Success!',
            message: 'Item Successfully added to your cart',
            url: '/cart',
            target: '_blank'
          },{
            element: 'body',
            position: null,
            type: "success",
            allow_dismiss: true,
            newest_on_top: false,
            showProgressbar: true,
            placement: {
              from: "top",
              align: "right"
            },
            offset: 20,
            spacing: 10,
            z_index: 1031,
            delay: 5000,
            animate: {
              enter: 'animated fadeInDown',
              exit: 'animated fadeOutUp'
            },
            icon_type: 'class',
            template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<span data-notify="icon"></span> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
          });
          
          

          
        },
        error: function(XMLHttpRequest, textStatus){
          if((typeof errorCallback) === 'function'){
            errorCallback(XMLHttpRequest, textStatus);
          } else{
            theme_source.lib_source.ajax_error(XMLHttpRequest, textStatus);
          }
        }
      };
      jQuery.ajax(ajax);
    },
    upsell_collection(coll_id, pro_id, custgomTag) {
      $.ajax({
        type: 'GET',
        url: "/collections/all/"+custgomTag+"?view=upsell",
      })
      .done(function(data) {
        var productList = data;
        var html = '';
        $(JSON.parse(productList)).each(function(index, item){

          var curr_pro_id = item.id;
          var _name = item.title;
          var _name_default = _name.split('|')[0];
          var _name_json = _name.substr(_name.indexOf(":") + 1);
          var _price = Shopify.formatMoney(item.price, shop_currency_val);
          var _url = item.url;
          var _img = item.featured_image;

          //if(curr_pro_id != pro_id){
          html = html + '<div class="product-box"><div class="img-wrapper"><div class="front">';
          html = html + '<a href="' + _url + '">';
          html = html + '<img src="' + _img + '" class="img-fluid mb-1" alt="' + _name + '">';
          html = html + '</a></div>';
          html = html + '<div class="product-detail">' + '<a href="' + _url + '">';
          html = html + '<h6><span class="upsell_lang_trans" data-trans="#'+curr_pro_id+'_pro_title">' + _name_default + '</span><span class="hide" id="'+curr_pro_id+'_pro_title">'+_name_json+'</span></a>';
          html = html + '<h4><span class="money">' + _price + '</span></h4>';
          html = html + '</div></div></div>';
          // End Title         

          setTimeout(function(){
            currenciesCallbackSpecial('#upsell_product .product-box h4 span.money');
          },300);

          //}
          return index < 3;
        });        
        $("#upsell_product").html(html);
        var valueSelected = $('#translate').find(':selected').attr('data-val');
        $('.upsell_lang_trans').each(function(index) {  
          var item = $(this);
          var data_trans = $(this).attr('data-trans');
          var data_trans_val = data_trans.replace('#', '');
          var trans_id = $(item).next().attr('id');
          var trans_content = $(item).next().text();
          var array = trans_content.split(',');
          $.each(array,function(i){
            var val = array[i];
            var _name = val.split(':')[0];
            var lang_name = _name.replace(/[^A-Z0-9]/ig, "");
            var _content = val.substr(val.indexOf(":") + 1);
            var lang_content = _content.toString().replace(/"/g, "");
            var lang_content = lang_content.toString().replace(/[{}]/g, "");
            if(data_trans_val == trans_id){
              if(valueSelected == lang_name){
                item.text(lang_content);
              }
            }
          });
        });
      })
      .fail(function(data) {});
    },
    cart_remove_item: function(line, callback){
      var ajax = {
        type: "POST",
        url: "/cart/change.js",
        data: "quantity=0&line=" + line,
        dataType: "json",
        beforeSend: function(){
          jQuery('.cart_loader_cls_id').show();
        },
        success: function(cart){
          if((typeof callback) === 'function'){
            callback(cart);
          } else{
            console.log(cart);
            theme_source.lib_source.on_cart_update(cart);
          }
        },
        error: function(XMLHttpRequest, textStatus){
          theme_source.lib_source.ajax_error(XMLHttpRequest, textStatus);
        }
      };
      jQuery.ajax(ajax);
    },
    cart_change_item: function(line, qty, callback){
      var ajax = {
        type: 'POST',
        url: '/cart/change.js',
        data: 'quantity=' + qty + '&line=' + line,
        dataType: 'json',
        success: function(cart){
          if((typeof callback) === 'function'){
            callback(cart);
          } else{
            theme_source.lib_source.on_cart_update(cart);
          }
        },
        error: function(XMLHttpRequest, textStatus){
          theme_source.lib_source.ajax_error(XMLHttpRequest, textStatus);
        }
      };
      jQuery.ajax(ajax);
    },
    update_cart_form: function(form){
      var ajax = {
        type: "POST",
        url: "/cart/update.js",
        data: jQuery("#" + form).serialize(),
        dataType: "json",
        success: function(cart){
          theme_source.lib_source.on_cart_update(cart);
        },
        error: function(XMLHttpRequest, textStatus){
          theme_source.lib_source.ajax_error(XMLHttpRequest, textStatus);
        }
      };
      jQuery.ajax(ajax);
    },
    cart_clear_all: function(){
      var ajax = {
        type: "POST",
        url: "/cart/clear.js",
        data: "",
        dataType: "json",
        success: function(cart){
          theme_source.lib_source.on_cart_update(cart);
        },
        error: function(XMLHttpRequest, textStatus){
          theme_source.lib_source.ajax_error(XMLHttpRequest, textStatus);
        }
      };
      jQuery.ajax(ajax);
    }
  }
}
jQuery(document).on('click', '.add_to_cart_btn_cls', function(){
  var temp_form_id = jQuery(this).closest('form').attr('id');
  theme_source.lib_source.addtocart_form(temp_form_id);
  
  return false;
});

jQuery(document).on('click', '.quantity-right-plus, .quantity-left-minus', function(){
  var temp_form_id = jQuery(this).closest('form').attr('id');
  console.log(temp_form_id);
  theme_source.lib_source.on_cart_update(cart);
});

jQuery(document).on('click', '.close_upsell', function(){
  jQuery('#cart-upsell-popup').hide("fade", 100);
});


jQuery(document).on('click', '.fly_addtocart', function(){
  var cart = jQuery('.fixed_cart');
  var imgtodrag = jQuery(this).parents(".product-box").find("img.img-fluid").eq(0);
  jQuery(imgtodrag).addClass('fly-cart-img');
});


jQuery('.wishlist_add_btn_cls').click(function(){
  var temp_form_id = jQuery(this).closest('form').attr('id');
  var remove_var = jQuery(this).parents('.cartItem').find('.remove_btn_wislist');
  theme_source.lib_source.addtocart_form(temp_form_id);
  return false;
});

jQuery(document).ready(function(){
  ajaxCart.load();
});	

/* custome ajax */

theme.Currency = (function(){
  var moneyFormat = $('#shop-currency').text();

  function formatMoney(cents, format) {
    if (typeof cents === 'string') {
      cents = cents.replace('.', '');
    }
    var value = '';
    var placeholderRegex = /\{\{\s*(\w+)\s*\}\}/;
    var formatString = (format || moneyFormat);

    function formatWithDelimiters(number, precision, thousands, decimal) {
      precision = precision || 2;
      thousands = thousands || ',';
      decimal = decimal || '.';

      if (isNaN(number) || number == null) {
        return 0;
      }

      number = (number / 100.0).toFixed(precision);

      var parts = number.split('.');
      var dollarsAmount = parts[0].replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + thousands);
      var centsAmount = parts[1] ? (decimal + parts[1]) : '';

      return dollarsAmount + centsAmount;
    }

    switch (formatString.match(placeholderRegex)[1]) {
      case 'amount':
        value = formatWithDelimiters(cents, 2);
        break;
      case 'amount_no_decimals':
        value = formatWithDelimiters(cents, 0);
        break;
      case 'amount_with_comma_separator':
        value = formatWithDelimiters(cents, 2, '.', ',');
        break;
      case 'amount_no_decimals_with_comma_separator':
        value = formatWithDelimiters(cents, 0, '.', ',');
        break;
      case 'amount_no_decimals_with_space_separator':
        value = formatWithDelimiters(cents, 0, ' ');
        break;
    }

    return formatString.replace(placeholderRegex, value);
  }

  return {
    formatMoney: formatMoney
  }
})();

/*============================================================================
  Ajax Shopify Add To Cart
==============================================================================*/
var ajaxCart = (function(module, $){
    
  var shop_currency = $('#shop-currency').text();
  'use strict';

  // Public functions
  var init, loadCart;

  // Private general variables
  var settings, isUpdating, $body;

  // Private plugin variables
  var $formContainer, $addToCart, $cartCountSelector, $cartCostSelector, $cartContainer, $drawerContainer;

  // Private functions
  var updateCountPrice, formOverride, itemAddedCallback, itemErrorCallback, cartUpdateCallback, buildCart, cartCallback, adjustCart, adjustCartCallback, validateQty;

  /*============================================================================
    Initialise the plugin and define global options
  ==============================================================================*/
  init = function (options){

    // Default settings
    settings = {
      formSelector       : 'form[action^="/cart/add"]',
      cartContainer      : '#cart_container_id',
      addToCartSelector  : 'button[type="submit"]',
      cartCountSelector  : null,
      cartCostSelector   : null,
      moneyFormat        : shop_currency,
      disableAjaxCart    : false,
      enableQtySelectors : false
    };

    // Override defaults with arguments
    $.extend(settings, options);

    // Select DOM elements
    $formContainer     = $(settings.formSelector);
    $cartContainer     = $(settings.cartContainer);
    $addToCart         = $formContainer.find(settings.addToCartSelector);
    $cartCountSelector = $(settings.cartCountSelector);
    $cartCostSelector  = $(settings.cartCostSelector);

    // General Selectors
    $body = $('body');

    // Track cart activity status
    isUpdating = false;

    // Take over the add to cart form submit action if ajax enabled
    if (!settings.disableAjaxCart && $addToCart.length) {
      formOverride();
    }

    // Run this function in case we're using the quantity selector outside of the cart
    adjustCart();
  };

  loadCart = function () {
    theme_source.lib_source.get_cart(cartUpdateCallback);
  };

  updateCountPrice = function (cart) {
    if ($cartCountSelector) {
      $cartCountSelector.html(cart.item_count).removeClass('hidden-count');

      if (cart.item_count === 0) {
        $cartCountSelector.addClass('hidden-count');
      }
    }
    if ($cartCostSelector) {
      $cartCostSelector.html(Shopify.formatMoney(cart.total_price, ''));
                                                 }
                                                 };

                                                 formOverride = function () {
                             $formContainer.on('submit', function(evt) {
        evt.preventDefault();
        theme_source.lib_source.addtocart_form(evt.target, itemAddedCallback, itemErrorCallback)
      });
    };

    itemAddedCallback = function (product) {
      theme_source.lib_source.get_cart(cartUpdateCallback);
    };

    itemErrorCallback = function (XMLHttpRequest, textStatus) {
      var data = eval('(' + XMLHttpRequest.responseText + ')');
      $addToCart.removeClass('is-adding is-added');

      if (!!data.message) {
        if (data.status == 422) {
          $formContainer.after('<div class="errors qty-error">'+ data.description +'</div>')
        }
      }
    };

    cartUpdateCallback = function (cart){
      // Update quantity and price
      updateCountPrice(cart);
      buildCart(cart);
    };

    buildCart = function(cart){
      // Start with a fresh cart div
      $cartContainer.empty();

      // Show empty cart
      if (cart.item_count === 0) {
        $cartContainer
        .append('<h5 class="empty_cart_slide_cls" data-trans-key="cart.general.empty">'+"Your cart is currently empty."+'</h5>');
        cartCallback(cart);
        return;
      }

      // Handlebars.js cart layout
      var items = [],
          item = {},
          data = {},
          source = $("#CartTemplate").html(),
          template = Handlebars.compile(source);

      // Add each item to our handlebars.js data
      $.each(cart.items, function(index, cartItem) {

        /* Hack to get product image thumbnail
       *   - If image is not null
       *     - Remove file extension, add _small, and re-add extension
       *     - Create server relative link
       *   - A hard-coded url of no-image
      */
        if (cartItem.image != null){
          var prodImg = cartItem.image.replace(/(\.[^.]*)$/, "_small$1").replace('http:', '');
        } else {
          var prodImg = "//cdn.shopify.com/s/assets/admin/no-image-medium-cc9732cb976dd349a0df1d39816fbcc7.gif";
        }

        if (cartItem.properties !== null) {
          $.each(cartItem.properties, function(key, value) {
            if (key.charAt(0) === '_' || !value) {
              delete cartItem.properties[key];
            }
          });
        }

        var item_id = cartItem.id;

        var pro_name = cartItem.product_title; 
        var _name_default = pro_name.split('|')[0];
        var _name_json = pro_name.substr(pro_name.indexOf(":") + 1);
        var cart_id = cartItem.id;

        // Create item's data object and add to 'items' array
        item = {
          id: cart_id,
          key: cartItem.key,
          line: index + 1, // Shopify uses a 1+ index in the API
          url: cartItem.url,
          img: prodImg,
          name: _name_default,
          name_josn: _name_json,
          variation: cartItem.variant_title,
          properties: cartItem.properties,
          itemAdd: cartItem.quantity + 1,
          itemMinus: cartItem.quantity - 1,
          itemQty: cartItem.quantity,
          price: Shopify.formatMoney(cartItem.price, shop_currency),
          lineprice: Shopify.formatMoney(cartItem.line_price, shop_currency),
          discountedPrice: Shopify.formatMoney((cartItem.price - (cartItem.total_discount/cartItem.quantity)), shop_currency) ,
          discounts: cartItem.discounts,
          discountsApplied: cartItem.price === (cartItem.price - cartItem.total_discount) ? false : true,
          vendor: cartItem.vendor
        };

        items.push(item);

        
        setTimeout(function(){
          currenciesCallbackSpecial('span.money');
        },500);
        

      });

      // Gather all cart data and add to DOM
      data = {
        items: items,
        note: cart.note,
        totalPrice: Shopify.formatMoney(cart.total_price, shop_currency),
        totalCartDiscount: cart.total_discount === 0 ? 0 : "translation missing: en.cart.general.savings_html".replace('[savings]', theme.Currency.formatMoney(cart.total_discount, settings.moneyFormat))
      };

      $cartContainer.append(template(data));
      cartCallback(cart);
    };

    cartCallback = function(cart){
      $body.trigger('ajaxCart.afterCartLoad', cart);
      theme_source.lib_source.on_cart_update(cart);
      if (window.Shopify && Shopify.StorefrontExpressButtons) {
        Shopify.StorefrontExpressButtons.initialize();
      }
    };

    adjustCart = function(){

      // Add or remove from the quantity
      $body.on('click', '.ajaxcart__qty-adjust', function() {
        if (isUpdating) {
          return;
        }
        var $el = $(this),
            line = $el.data('line'),
            $qtySelector = $el.parents('ul.QuantityBox').find('.ajaxcart__qty-num'),
            qty = parseInt($qtySelector.val());

        var qty = validateQty(qty);

        // Add or subtract from the current quantity
        if ($el.hasClass('ajaxcart__qty--plus')) {
          qty += 1;
        } else {
          qty -= 1;
          if (qty <= 0) qty = 0;
        }

        // If it has a data-line, update the cart.
        // Otherwise, just update the input's number
        if (line) {
          updateQuantity(line, qty);
        } else {
          $qtySelector.val(qty);
        }
      });

      $body.on('click', '.cart_remove_item', function(){
        var line = $(this).attr('data-line');
        theme_source.lib_source.cart_remove_item(line, adjustCartCallback)
      });

      // Update quantity based on input on change
      $body.on('change', '.ajaxcart__qty-num', function() {
        if (isUpdating) {
          return;
        }
        var $el = $(this),
            line = $el.data('line'),
            qty = parseInt($el.val().replace(/\D/g, ''));

        var qty = validateQty(qty);

        // If it has a data-line, update the cart
        if (line) {
          updateQuantity(line, qty);
        }
      });

      // Prevent cart from being submitted while quantities are changing
      $body.on('submit', 'form.ajaxcart', function(evt) {
        if (isUpdating) {
          evt.preventDefault();
        }
      });

      // Highlight the text when focused
      $body.on('focus', '.ajaxcart__qty-adjust', function() {
        var $el = $(this);
        setTimeout(function() {
          $el.select();
        }, 50);
      });

      function updateQuantity(line, qty) {
        isUpdating = true;

        // Add activity classes when changing cart quantities
        var $row = $('.Quantity_cart_slider[data-line="' + line + '"]').addClass('is-loading');

        if (qty === 0) {
          $row.parent().addClass('is-removed');
        }

        // Slight delay to make sure removed animation is done
        setTimeout(function() {
          theme_source.lib_source.cart_change_item(line, qty, adjustCartCallback);
        }, 250);
      }

    };

    adjustCartCallback = function (cart) {
      // Update quantity and price
      updateCountPrice(cart);

      // Reprint cart on short timeout so you don't see the content being removed
      setTimeout(function() {
        theme_source.lib_source.get_cart(buildCart);
        isUpdating = false;
      }, 150)
    };

    validateQty = function (qty) {
      if((parseFloat(qty) == parseInt(qty)) && !isNaN(qty)) {
        // We have a valid number!
      } else {
        // Not a number. Default to 1.
        qty = 1;
      }
      return qty;
    };

    module = {
      init: init,
      load: loadCart
    };

    return module;

  }(ajaxCart || {}, jQuery));