
// ======================================================
// callback for option_selection.js
// ======================================================
// The following will have to be in your product template (without the comments wrapping it!) to initialize the option_selection.js

/* ======================== bootstrap-notify.min.js ===================== */

!function(t){"function"==typeof define&&define.amd?define(["jquery"],t):t("object"==typeof exports?require("jquery"):jQuery)}(function(t){function s(s){var e=!1;return t('[data-notify="container"]').each(function(i,n){var a=t(n),o=a.find('[data-notify="title"]').text().trim(),r=a.find('[data-notify="message"]').html().trim(),l=o===t("<div>"+s.settings.content.title+"</div>").html().trim(),d=r===t("<div>"+s.settings.content.message+"</div>").html().trim(),g=a.hasClass("alert-"+s.settings.type);return l&&d&&g&&(e=!0),!e}),e}function e(e,n,a){var o={content:{message:"object"==typeof n?n.message:n,title:n.title?n.title:"",icon:n.icon?n.icon:"",url:n.url?n.url:"#",target:n.target?n.target:"-"}};a=t.extend(!0,{},o,a),this.settings=t.extend(!0,{},i,a),this._defaults=i,"-"===this.settings.content.target&&(this.settings.content.target=this.settings.url_target),this.animations={start:"webkitAnimationStart oanimationstart MSAnimationStart animationstart",end:"webkitAnimationEnd oanimationend MSAnimationEnd animationend"},"number"==typeof this.settings.offset&&(this.settings.offset={x:this.settings.offset,y:this.settings.offset}),(this.settings.allow_duplicates||!this.settings.allow_duplicates&&!s(this))&&this.init()}var i={element:"body",position:null,type:"info",allow_dismiss:!0,allow_duplicates:!0,newest_on_top:!1,showProgressbar:!1,placement:{from:"top",align:"right"},offset:20,spacing:10,z_index:1031,delay:5e3,timer:1e3,url_target:"_blank",mouse_over:null,animate:{enter:"animated fadeInDown",exit:"animated fadeOutUp"},onShow:null,onShown:null,onClose:null,onClosed:null,icon_type:"class",template:'<div data-notify="container" class="col-xs-11 col-sm-4 alert alert-{0}" role="alert"><button type="button" aria-hidden="true" class="close" data-notify="dismiss">&times;</button><span data-notify="icon"></span> <span data-notify="title">{1}</span> <span data-notify="message">{2}</span><div class="progress" data-notify="progressbar"><div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div></div><a href="{3}" target="{4}" data-notify="url"></a></div>'};String.format=function(){for(var t=arguments[0],s=1;s<arguments.length;s++)t=t.replace(RegExp("\\{"+(s-1)+"\\}","gm"),arguments[s]);return t},t.extend(e.prototype,{init:function(){var t=this;this.buildNotify(),this.settings.content.icon&&this.setIcon(),"#"!=this.settings.content.url&&this.styleURL(),this.styleDismiss(),this.placement(),this.bind(),this.notify={$ele:this.$ele,update:function(s,e){var i={};"string"==typeof s?i[s]=e:i=s;for(var n in i)switch(n){case"type":this.$ele.removeClass("alert-"+t.settings.type),this.$ele.find('[data-notify="progressbar"] > .progress-bar').removeClass("progress-bar-"+t.settings.type),t.settings.type=i[n],this.$ele.addClass("alert-"+i[n]).find('[data-notify="progressbar"] > .progress-bar').addClass("progress-bar-"+i[n]);break;case"icon":var a=this.$ele.find('[data-notify="icon"]');"class"===t.settings.icon_type.toLowerCase()?a.removeClass(t.settings.content.icon).addClass(i[n]):(a.is("img")||a.find("img"),a.attr("src",i[n]));break;case"progress":var o=t.settings.delay-t.settings.delay*(i[n]/100);this.$ele.data("notify-delay",o),this.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow",i[n]).css("width",i[n]+"%");break;case"url":this.$ele.find('[data-notify="url"]').attr("href",i[n]);break;case"target":this.$ele.find('[data-notify="url"]').attr("target",i[n]);break;default:this.$ele.find('[data-notify="'+n+'"]').html(i[n])}var r=this.$ele.outerHeight()+parseInt(t.settings.spacing)+parseInt(t.settings.offset.y);t.reposition(r)},close:function(){t.close()}}},buildNotify:function(){var s=this.settings.content;this.$ele=t(String.format(this.settings.template,this.settings.type,s.title,s.message,s.url,s.target)),this.$ele.attr("data-notify-position",this.settings.placement.from+"-"+this.settings.placement.align),this.settings.allow_dismiss||this.$ele.find('[data-notify="dismiss"]').css("display","none"),(this.settings.delay<=0&&!this.settings.showProgressbar||!this.settings.showProgressbar)&&this.$ele.find('[data-notify="progressbar"]').remove()},setIcon:function(){"class"===this.settings.icon_type.toLowerCase()?this.$ele.find('[data-notify="icon"]').addClass(this.settings.content.icon):this.$ele.find('[data-notify="icon"]').is("img")?this.$ele.find('[data-notify="icon"]').attr("src",this.settings.content.icon):this.$ele.find('[data-notify="icon"]').append('<img src="'+this.settings.content.icon+'" alt="Notify Icon" />')},styleDismiss:function(){this.$ele.find('[data-notify="dismiss"]').css({position:"absolute",right:"10px",top:"5px",zIndex:this.settings.z_index+2})},styleURL:function(){this.$ele.find('[data-notify="url"]').css({backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)",height:"100%",left:0,position:"absolute",top:0,width:"100%",zIndex:this.settings.z_index+1})},placement:function(){var s=this,e=this.settings.offset.y,i={display:"inline-block",margin:"0px auto",position:this.settings.position?this.settings.position:"body"===this.settings.element?"fixed":"absolute",transition:"all .5s ease-in-out",zIndex:this.settings.z_index},n=!1,a=this.settings;switch(t('[data-notify-position="'+this.settings.placement.from+"-"+this.settings.placement.align+'"]:not([data-closing="true"])').each(function(){e=Math.max(e,parseInt(t(this).css(a.placement.from))+parseInt(t(this).outerHeight())+parseInt(a.spacing))}),this.settings.newest_on_top===!0&&(e=this.settings.offset.y),i[this.settings.placement.from]=e+"px",this.settings.placement.align){case"left":case"right":i[this.settings.placement.align]=this.settings.offset.x+"px";break;case"center":i.left=0,i.right=0}this.$ele.css(i).addClass(this.settings.animate.enter),t.each(Array("webkit-","moz-","o-","ms-",""),function(t,e){s.$ele[0].style[e+"AnimationIterationCount"]=1}),t(this.settings.element).append(this.$ele),this.settings.newest_on_top===!0&&(e=parseInt(e)+parseInt(this.settings.spacing)+this.$ele.outerHeight(),this.reposition(e)),t.isFunction(s.settings.onShow)&&s.settings.onShow.call(this.$ele),this.$ele.one(this.animations.start,function(){n=!0}).one(this.animations.end,function(){s.$ele.removeClass(s.settings.animate.enter),t.isFunction(s.settings.onShown)&&s.settings.onShown.call(this)}),setTimeout(function(){n||t.isFunction(s.settings.onShown)&&s.settings.onShown.call(this)},600)},bind:function(){var s=this;if(this.$ele.find('[data-notify="dismiss"]').on("click",function(){s.close()}),this.$ele.mouseover(function(){t(this).data("data-hover","true")}).mouseout(function(){t(this).data("data-hover","false")}),this.$ele.data("data-hover","false"),this.settings.delay>0){s.$ele.data("notify-delay",s.settings.delay);var e=setInterval(function(){var t=parseInt(s.$ele.data("notify-delay"))-s.settings.timer;if("false"===s.$ele.data("data-hover")&&"pause"===s.settings.mouse_over||"pause"!=s.settings.mouse_over){var i=(s.settings.delay-t)/s.settings.delay*100;s.$ele.data("notify-delay",t),s.$ele.find('[data-notify="progressbar"] > div').attr("aria-valuenow",i).css("width",i+"%")}t<=-s.settings.timer&&(clearInterval(e),s.close())},s.settings.timer)}},close:function(){var s=this,e=parseInt(this.$ele.css(this.settings.placement.from)),i=!1;this.$ele.attr("data-closing","true").addClass(this.settings.animate.exit),s.reposition(e),t.isFunction(s.settings.onClose)&&s.settings.onClose.call(this.$ele),this.$ele.one(this.animations.start,function(){i=!0}).one(this.animations.end,function(){t(this).remove(),t.isFunction(s.settings.onClosed)&&s.settings.onClosed.call(this)}),setTimeout(function(){i||(s.$ele.remove(),s.settings.onClosed&&s.settings.onClosed(s.$ele))},600)},reposition:function(s){var e=this,i='[data-notify-position="'+this.settings.placement.from+"-"+this.settings.placement.align+'"]:not([data-closing="true"])',n=this.$ele.nextAll(i);this.settings.newest_on_top===!0&&(n=this.$ele.prevAll(i)),n.each(function(){t(this).css(e.settings.placement.from,s),s=parseInt(s)+parseInt(e.settings.spacing)+t(this).outerHeight()})}}),t.notify=function(t,s){var i=new e(this,t,s);return i.notify},t.notifyDefaults=function(s){return i=t.extend(!0,{},i,s)},t.notifyClose=function(s){"warning"===s&&(s="danger"),"undefined"==typeof s||"all"===s?t("[data-notify]").find('[data-notify="dismiss"]').trigger("click"):"success"===s||"info"===s||"warning"===s||"danger"===s?t(".alert-"+s+"[data-notify]").find('[data-notify="dismiss"]').trigger("click"):s?t(s+"[data-notify]").find('[data-notify="dismiss"]').trigger("click"):t('[data-notify-position="'+s+'"]').find('[data-notify="dismiss"]').trigger("click")},t.notifyCloseExcept=function(s){"warning"===s&&(s="danger"),"success"===s||"info"===s||"warning"===s||"danger"===s?t("[data-notify]").not(".alert-"+s).find('[data-notify="dismiss"]').trigger("click"):t("[data-notify]").not(s).find('[data-notify="dismiss"]').trigger("click")}});

/* ======================== Sticky-kit.min.js ===================== */

(function(){var b,f;b=this.jQuery||window.jQuery;f=b(window);b.fn.stick_in_parent=function(d){var A,w,J,n,B,K,p,q,k,E,t;null==d&&(d={});t=d.sticky_class;B=d.inner_scrolling;E=d.recalc_every;k=d.parent;q=d.offset_top;p=d.spacer;w=d.bottoming;null==q&&(q=0);null==k&&(k=void 0);null==B&&(B=!0);null==t&&(t="is_stuck");A=b(document);null==w&&(w=!0);J=function(a,d,n,C,F,u,r,G){var v,H,m,D,I,c,g,x,y,z,h,l;if(!a.data("sticky_kit")){a.data("sticky_kit",!0);I=A.height();g=a.parent();null!=k&&(g=g.closest(k));
if(!g.length)throw"failed to find stick parent";v=m=!1;(h=null!=p?p&&a.closest(p):b("<div />"))&&h.css("position",a.css("position"));x=function(){var c,f,e;if(!G&&(I=A.height(),c=parseInt(g.css("border-top-width"),10),f=parseInt(g.css("padding-top"),10),d=parseInt(g.css("padding-bottom"),10),n=g.offset().top+c+f,C=g.height(),m&&(v=m=!1,null==p&&(a.insertAfter(h),h.detach()),a.css({position:"",top:"",width:"",bottom:""}).removeClass(t),e=!0),F=a.offset().top-(parseInt(a.css("margin-top"),10)||0)-q,
u=a.outerHeight(!0),r=a.css("float"),h&&h.css({width:a.outerWidth(!0),height:u,display:a.css("display"),"vertical-align":a.css("vertical-align"),"float":r}),e))return l()};x();if(u!==C)return D=void 0,c=q,z=E,l=function(){var b,l,e,k;if(!G&&(e=!1,null!=z&&(--z,0>=z&&(z=E,x(),e=!0)),e||A.height()===I||x(),e=f.scrollTop(),null!=D&&(l=e-D),D=e,m?(w&&(k=e+u+c>C+n,v&&!k&&(v=!1,a.css({position:"fixed",bottom:"",top:c}).trigger("sticky_kit:unbottom"))),e<F&&(m=!1,c=q,null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),
h.detach()),b={position:"",width:"",top:""},a.css(b).removeClass(t).trigger("sticky_kit:unstick")),B&&(b=f.height(),u+q>b&&!v&&(c-=l,c=Math.max(b-u,c),c=Math.min(q,c),m&&a.css({top:c+"px"})))):e>F&&(m=!0,b={position:"fixed",top:c},b.width="border-box"===a.css("box-sizing")?a.outerWidth()+"px":a.width()+"px",a.css(b).addClass(t),null==p&&(a.after(h),"left"!==r&&"right"!==r||h.append(a)),a.trigger("sticky_kit:stick")),m&&w&&(null==k&&(k=e+u+c>C+n),!v&&k)))return v=!0,"static"===g.css("position")&&g.css({position:"relative"}),
  a.css({position:"absolute",bottom:d,top:"auto"}).trigger("sticky_kit:bottom")},y=function(){x();return l()},H=function(){G=!0;f.off("touchmove",l);f.off("scroll",l);f.off("resize",y);b(document.body).off("sticky_kit:recalc",y);a.off("sticky_kit:detach",H);a.removeData("sticky_kit");a.css({position:"",bottom:"",top:"",width:""});g.position("position","");if(m)return null==p&&("left"!==r&&"right"!==r||a.insertAfter(h),h.remove()),a.removeClass(t)},f.on("touchmove",l),f.on("scroll",l),f.on("resize",
y),b(document.body).on("sticky_kit:recalc",y),a.on("sticky_kit:detach",H),setTimeout(l,0)}};n=0;for(K=this.length;n<K;n++)d=this[n],J(b(d));return this}}).call(this);

/* ====================== tricky3.infinite-scroll.v2.min.js ======================== */

var __extends=this&&this.__extends||function(e,t){function i(){this.constructor=e}for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);e.prototype=null===t?Object.create(t):(i.prototype=t.prototype,new i)},t3PageLoadHelpers;!function(e){e.loadImages=function(e,t){var i=this,n=$("img",e).length,s=1,o=!1;n.length?$("img",e).load(function(){++s>=n&&i.isRequestOn&&!o&&(t(e),o=!0)}).each(function(){this.complete&&$(this).load()}):t(e)},e.savePageState=function(t){if(void 0===t&&(t={key:"",value:""}),history.pushState){var i="",n=t.key,s=t.value;if(e.isQueryStringKeyInUrl(n))i=e.updateQueryStringParameter(window.location.href,n,encodeURIComponent(s));else{var o=n+"="+encodeURIComponent(s);o=""!=window.location.search?window.location.search+"&"+o:"?"+o,i=window.location.protocol+"//"+window.location.host+window.location.pathname+o}i+=window.location.hash,window.history.pushState({path:i},"",i)}else console.log("History pushstate not supported")},e.getQueryStringByKey=function(e,t){void 0===t&&(t=""),e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var i=new RegExp("[\\?&]"+e+"=([^&#]*)"),n=t?i.exec(t):i.exec(location.search);return null==n?"":decodeURIComponent(n[1].replace(/\+/g," "))},e.isQueryStringKeyInUrl=function(e){return-1!=location.search.indexOf(e)},e.updateQueryStringParameter=function(e,t,i){var n=new RegExp("([?&])"+t+"=.*?(&|$)","i"),s=-1!==e.indexOf("?")?"&":"?";return e.match(n)?e.replace(n,"$1"+t+"="+i+"$2"):e+s+t+"="+i},e.removeQueryStringParameter=function(e,t){var i=e.split("?");if(i.length>=2){for(var n=encodeURIComponent(t)+"=",s=i[1].split(/[&;]/g),o=s.length;o-- >0;)-1!==s[o].lastIndexOf(n,0)&&s.splice(o,1);return e=i[0]+"?"+s.join("&")}return e}}(t3PageLoadHelpers||(t3PageLoadHelpers={})),function(e){var t=function(){function t(i,n){this.isRequestOn=!1,this.currentLink=null,this.bothNextAndPreviousAvailableOnLoad=!1,this.links={next:"next",previous:"previous"},this.hasAllPagesLoaded=!1,this.element=i,this.settings=e.extend(t.defaultSettings,n),this.itemsWrapper=e(this.settings.selectors.itemsWrapper),this.paginationWrapper=e(this.settings.selectors.paginationWrapper),this.bothNextAndPreviousAvailableOnLoad=e(this.settings.selectors.nextPageLink,this.paginationWrapper).length&&e(this.settings.selectors.previousPageLink,this.paginationWrapper).length}return t.prototype.getPage=function(t,i){var n=this;this.isRequestOn||e.ajax({url:t,type:"get",beforeSend:function(){n.isRequestOn=!0,"function"==typeof n.settings.callBacks.beforePageLoad&&n.settings.callBacks.beforePageLoad()},success:function(e){i(e)}})},t.defaultSettings={selectors:{itemsWrapper:".collection-matrix",item:"li",nextPageLink:"#NextPaginationLink a",previousPageLink:"#PreviousPaginationLink a",paginationWrapper:".pagination",scrollableElem:null},manualLoading:!1,pageQueryStringKey:"page",waitForImagesToBeLoaded:!1,enablePageState:!1,throttleDelay:100,callBacks:{onAllPagesLoaded:function(){},onPageLoad:function(e){},beforePageLoad:function(){}}},t}(),i=function(t){function i(e,i){t.call(this,e,i)}return __extends(i,t),i.prototype.init=function(){this._bindEvents()},i.prototype._bindEvents=function(){var t=this;this.paginationWrapper.on("click",this.settings.selectors.nextPageLink,function(i){i.preventDefault(),t.linkedClicked=t.links.next,t.currentLink=e(this).attr("href"),t.getPage(t.currentLink,function(e){t._pageLoadedSuccess(e)})}),this.paginationWrapper.on("click",this.settings.selectors.previousPageLink,function(i){i.preventDefault(),t.linkedClicked=t.links.previous,t.currentLink=e(this).attr("href"),t.getPage(t.currentLink,function(e){t._pageLoadedSuccess(e)})})},i.prototype._updateNextAndPreviousLinks=function(t){var i=t.find(this.settings.selectors.nextPageLink),n=t.find(this.settings.selectors.previousPageLink),s=e(this.settings.selectors.nextPageLink,this.paginationWrapper),o=e(this.settings.selectors.previousPageLink,this.paginationWrapper),a=!0,r=!0;this.bothNextAndPreviousAvailableOnLoad&&(this.linkedClicked==this.links.previous&&(a=!1),this.linkedClicked==this.links.next&&(r=!1)),a=s.length&&a,r=o.length&&r,a&&(i.length?s.replaceWith(i):s.remove()),r&&(n.length?o.replaceWith(n):o.remove()),this.hasAllPagesLoaded=!e(this.settings.selectors.nextPageLink,this.paginationWrapper).length&&!e(this.settings.selectors.previousPageLink,this.paginationWrapper).length},i.prototype._pageLoadedSuccess=function(t){var i=this,n=e(t),s=n.find(this.settings.selectors.item);this._updateNextAndPreviousLinks(n),this.settings.waitForImagesToBeLoaded?t3PageLoadHelpers.loadImages(s,function(e){i._processingComplete(e)}):this._processingComplete(s)},i.prototype._processingComplete=function(t){if(this.itemsWrapper.append(e("<div/>").append(t).html()),this.settings.enablePageState){var i=this.currentLink,n=t3PageLoadHelpers.getQueryStringByKey(this.settings.pageQueryStringKey,i);t3PageLoadHelpers.savePageState({key:this.settings.pageQueryStringKey,value:n})}"function"==typeof this.settings.callBacks.onPageLoad&&this.settings.callBacks.onPageLoad(t),this.hasAllPagesLoaded&&"function"==typeof this.settings.callBacks.onAllPagesLoaded&&this.settings.callBacks.onAllPagesLoaded(),this.isRequestOn=!1},i}(t),n=function(t){function i(i,n){t.call(this,i,n),this.scrollTimer=0,this.resizeTimer=0,this.linkedLoaded=null,this.nextPageLink=null,this.previousPageLink=null,this.scrollableElement=e(this.settings.selectors.scrollableElem?this.settings.selectors.scrollableElem:window)}return __extends(i,t),i.prototype.init=function(){var e=this;this._loadLinks(),this.scrollableElement.on("scroll",function(t){i.throttle(function(t){e.isRequestOn||e._scrollEventHandler()},e.settings.throttleDelay)()})},i.prototype._loadLinks=function(){this.nextPageLink=e(this.settings.selectors.nextPageLink,this.paginationWrapper),this.previousPageLink=e(this.settings.selectors.previousPageLink,this.paginationWrapper)},i.prototype._scrollEventHandler=function(){var e=this;requestAnimationFrame(function(){e._trickyInfiniteScroll()})},i.prototype._trickyInfiniteScroll=function(){var t=this,i=e(this.scrollableElement).scrollTop()+e(this.scrollableElement).height(),n=e(this.settings.selectors.item+":visible:last",this.element);if((n.length?n.offset().top:e(this.settings.selectors.item+":last",this.element).offset().top)+e(this.settings.selectors.item+":visible:last",this.element).height()<=i&&this.nextPageLink){var s=this.nextPageLink.attr("href");this.getPage(s,function(e){t._pageLoadedSuccess(e)})}else this.isRequestOn=!1,this.nextPageLink||(e(this.settings.selectors.nextPageLink,this.paginationWrapper).remove(),this.hasAllPagesLoaded||(this.hasAllPagesLoaded=!0,"function"==typeof this.settings.callBacks.onAllPagesLoaded&&this.settings.callBacks.onAllPagesLoaded()))},i.prototype._updateNextAndPreviousLinks=function(e){var t=e.find(this.settings.selectors.nextPageLink);e.find(this.settings.selectors.previousPageLink);t.length?this.nextPageLink=t:this.nextPageLink=null},i.prototype._pageLoadedSuccess=function(t){var i=this,n=e(t),s=n.find(this.settings.selectors.item);this._updateNextAndPreviousLinks(n),this.settings.waitForImagesToBeLoaded?t3PageLoadHelpers.loadImages(s,function(e){i._processingComplete(e)}):this._processingComplete(s)},i.prototype._processingComplete=function(t){this.itemsWrapper.append(e("<div/>").append(t).html()),"function"==typeof this.settings.callBacks.onPageLoad&&this.settings.callBacks.onPageLoad(t),this.isRequestOn=!1},i.prototype._unbindScrollingEvent=function(){},i.throttle=function(e,t){void 0===t&&(t=10);var n,s,o=!1,a=function(){o=!1,e.apply(n,s)};return function(){n=this,s=arguments,o||(o=!0,setTimeout(a,t||i.SCROLL_THROTTLE_DEFAULT_DELAY))}},i.scrollEventHandlerFuncName="_scrollEventHandler",i.SCROLL_THROTTLE_DEFAULT_DELAY=500,i}(t);e.fn.t3PageLoad=function(t){var s=null;return(s=t.manualLoading?new i(e(this),t):new n(e(this),t)).init(),s}}(jQuery);

/* ======================= ajax pagination ================== */

(function($) {
  $(document).ready(function() {
    wst.go()
  });
  var wst = {
    atTimeout: null,
    go: function() {
      this._scrollTop();
      this._infinitescrolling();
    },

    _infinitescrolling: function() {
      if ($(".infinite-scrolling").length > 0) {
        $(".loading-product").hide();
        $(".infinite-scrolling a").click(function(n) {
          n.preventDefault();
          if (!$(this).hasClass("disabled")) {
            wst.doInfiniteScrolling()
          }
        })
      }
    },
    doInfiniteScrolling: function() {
      var n = $(".collection-wrapper .product-wrapper-grid");

      var j = $('.product-top-filter .collection-grid-view');

      if (!n.length) {
        n = $(".collection-wrapper .product-wrapper-grid.list-view")
      }
      if (n) {
        var r = $(".infinite-scrolling a").first();
        $.ajax({
          type: "GET",
          url: r.attr("href"),
          beforeSend: function() {
            $(".loading-product").show();
          },
          success: function(i) {
            wst.hideLoading();
            $(".loading-product").hide();
            var s = $(i).find(".collection-wrapper .product-wrapper-grid");
            if (!s.length) {
              s = $(i).find(".collection-wrapper .product-wrapper-grid .col-lg-12")
            }
            if (s.length) {
              if (s.hasClass("product-wrapper-grid")) {
                if (window.product_image_resize) {
                  s.children().find("img").fakecrop({
                    fill: window.images_size.is_crop,
                    widthSelector: ".product-wrapper-grid .product-box .img-wrapper",
                    ratioWrapper: window.images_size
                  })
                }
              }
              n.append(s.children());
              if ($(i).find(".infinite-scrolling").length > 0) {
                r.attr("href", $(i).find(".infinite-scrolling a").attr("href"))
              } else {
                r.hide();
                r.next().show()
              }
              if ($(".spr-badge").length > 0) {
                return window.SPR.registerCallbacks(), window.SPR.initRatingHandler(), window.SPR.initDomEls(), window.SPR.loadProducts(), window.SPR.loadBadges()
              }
            }
          },
          error: function(n, r) {
            wst.hideLoading();
            $(".loading-product").hide();
            $(".ajax-error-message").text($.parseJSON(n.responseText).description);
            wst.showModal(".ajax-error-modal")
          },
          complete: function() {
            $(j).find(".active img").trigger('click');
            $(".coll_sidebar, .collection-content").stick_in_parent();
          },
          dataType: "html"
        })
      }
    },

    _sidebargetContent: function(n) {
      $.ajax({
        type: "get",
        url: n,
        beforeSend: function() {
          wst.showLoading();
          $('.collection_ajax_loader').show();
        },
        success: function(e) {
          $('.collection_ajax_loader').hide();
          wst._infinitescrolling();
        },
        error: function(n, cart) {
          wst.hideLoading();
          $(".loading-modal").hide();
          $('.collection_ajax_loader').hide();
          $(".ajax-error-message").text($.parseJSON(n.responseText).description);
          wst.showModal(".ajax-error-modal")
        }
      })
    },

    _scrollTop: function() {
      $("#back-top").click(function() {
        $("body,html").animate({
          scrollTop: 0
        }, 400);
        return false
      })
    },
    showLoading: function() {
      $(".loading").show()
    },
    hideLoading: function() {
      $(".loading").hide()
    },

  }

  })(jQuery);

/* ================ compare ==================== */

var shop_currency_val = $('#shop-currency').text();

(function(e) {

  /* Compare Product*/
  var storage = e.localStorage;
  var compare = {};
  var total_compare = 4;
  if (storage.isSet('compare')) {
    compare = storage.get('compare');
  } else {
    storage.set('compare', {});
  }
  e(document).ready(function() {
    t.init()
  });
  var t = {
    KidsTimeout: null,
    init: function() {
      this.initCompare();
      this.initRemoveCompare();
      this.initModal();
    },
    showModal: function(n) {
      e(n).fadeIn(500);
    },
    initModal: function() {
      e(".close-modal").click(function() {
        clearTimeout(t.KidsTimeout);
        e(".compare_modal").hide()
      })
    },

    compare_to_table: function(data) {

      if (Object.keys(data).length <= 0) {
        return '';
      }
      var html = '';
      var i = 0;

      var end_check = (Object.keys(data).length - 1);
      var width_tr = (end_check > 0) ? (90 / (Object.keys(data).length)) : 90;
      var data_html = '';
      for (i = 0; i <= end_check; i++) {
        var el = data[i];
        var is_sale = false;
        if (el.compare_at_price > el.price) {
          is_sale = true
        }
        data_html = data_html + '<th class="item-row ' + el.handle + '"  id="product-' + el.id + '"><button type="button" class="remove-compare" aria-label="Close" data-handle="' + el.handle + '"> '+window.remove+ ' </button></th>';
        //Start title 
        if (i == 0) {
          html = html + '<tr>';
          html = html + '<th width="15%" class="product-name" >' + window.product_name + '</th>';
        }
        
        var _name = el.title;
        var _name_default = _name.split('|')[0];
        var _name_json = _name.substr(_name.indexOf(":") + 1);
        var _id = el.id;

        html = html + '<td width="' + width_tr + '%"  class="' + el.handle + ' grid-link__title"> <span class="compare_lang_trans" data-trans="#'+_id+'_pro_title">' + _name_default + '</span><span class="hide" id="'+_id+'_pro_title">'+_name_json+'</span></td>';
        
        if (i >= end_check) {
          html = html + '</tr>';
        }
        // End Title 
        
      }
      for (i = 0; i <= end_check; i++) {
        var el = data[i];
        var is_sale = false;
        if (el.compare_at_price > el.price) {
          is_sale = true
        }
        if (i == 0) {
          html = html + '<tr>';
          html = html + '<th width="15%" class="product-name " >' + window.product_image +'</th>';

        }
        // start product image
        html = html + '<td width="' + width_tr + '%" class="item-row ' + el.handle + '" id="product-'+el.variants[0].id+'"> <img src="' + el.featured_image + '"  width="185" class="featured-image"/> ' + '<div class="product-price product_price"> ';

        if (is_sale) {
          html = html + '<strong>On Sale</strong>' + '<span class="money">'+ Shopify.formatMoney(el.price, shop_currency_val) +'</span>';
        } else {
          html = html + '<span class="money">'+ Shopify.formatMoney(el.price, shop_currency_val) +'</span>';
        }
        html = html + '</div>';
        //convert_currency(el.price,'3');

        setTimeout(function(){
          currenciesCallbackSpecial('.product_price span.money');
        },100);

        if (el.variants.length > 1) {          
          html = html + '<a class="select-option-cls btn btn-solid" href="#" onclick="location.href=\'/products/' + el.handle + '\'">' + window.select_options + '</a>';
        } else {
          html = html + '<form  action="/cart/add" method="post" class="variants clearfix" id="cart-form-'  + el.variants[0].id  + '">';
          html = html + '<input type="hidden" name="id" value="' + el.variants[0].id +'" />';   
          html = html + '<button title="Add to Cart" data-pid="' + el.variants[0].id + '" class="add-to-cart btn btn-solid">Add to Cart</button>';
          html = html + '</form>';
        }
        html = html + '<p   class="' + el.handle + ' grid-link__title hidden"> ' + el.title + '  </p>';

        html = html + ' </td>';

        if (i >= end_check) {
          html = html + '</tr>';
        }
        // End product image
      }
      for (i = 0; i <= end_check; i++) {
        var el = data[i];
        var is_sale = false;
        if (el.compare_at_price > el.price) {
          is_sale = true
        }
        if (i == 0) {
          html = html + '<tr>';
          html = html + '<th width="15%" class="product-name" >' + window.product_desc +'</th>';

        }        
        html = html + '<td width="' + width_tr + '%" class="' + el.handle + ' "> <p class="description-compare"> ' + el.description.replace(/(<([^>]+)>)/ig, "").split(" ").splice(0, 15).join(" ") + "..." + ' </p> </td>';
        if (i >= end_check) {
          html = html + '<tr>';
        }

      }
      for (i = 0; i <= end_check; i++) {
        var el = data[i];
        var is_sale = false;
        if (el.compare_at_price > el.price) {
          is_sale = true
        }
        if (i == 0) {
          html = html + '<tr>';
          html = html + '<th width="15%" class="product-name" > ' + window.availability +' </th>';

        }

        var avai_stock = (el.available) ? window.available_stock : window.unavailable_stock;
        html = html + '<td   width="' + width_tr + '%" class="available-stock ' + el.handle + '"> <p> ' + avai_stock + ' </p> </td>';
        if (i >= end_check) {
          html = html + '<tr>';
        }

      }
      e(".th-compare").html('<td>Action</td>'+data_html);
      e("#table-compare").html(html);  


      e(document).on('click','.add-to-cart', function(event) {
        event.preventDefault();
        if (e(this).attr("disabled") != "disabled") {
          var r = e(this).parents(".item-row");
          var i = e(r).attr("id");
          i = i.match(/\d+/g);
          if (!window.ajax_cart) {
            e("#cart-form-" + i).submit()
          } else {
            var s = e("#cart-form-" + i + " select[name=id]").val();
            if (!s) {
              s = e("#cart-form-" + i + " input[name=id]").val()
            }
            var o = e("#cart-form-" + i + " input[name=quantity]").val();
            if (!o) {
              o = 1
            }
            var a = e(r).find(".featured-image").attr("src");
            var p = e(r).find(".grid-link__title").text();
            var amt = e(r).find(".product_price span.money").text();                         
            t.compareAjaxAddToCart(s, o, a, p, amt)

          }
        }
        return false

      });
      
      var valueSelected = $('#translate').find(':selected').attr('data-val');
        var item = $('.compare_lang_trans');
        var data_trans = $('.compare_lang_trans').attr('data-trans');
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

    },

    compareAjaxAddToCart: function(n, r, a, p, amt) {
      e.ajax({
        type: "post",
        url: "/cart/add.js",
        data: "quantity=" + r + "&id=" + n,
        dataType: "json",
        beforeSend: function() {
          e(".ajax-success-compare-modal").fadeOut(500);
          //t.showLoading()                    
        },
        success: function(n) {

          //t.hideLoading();  
          t.showModal(".ajax-success-modal");
          e(".ajax-success-modal").find(".ajax-product-image").attr("src", a);
          e(".ajax-success-modal").find(".added-to-wishlist").hide();
          e(".ajax-success-modal").find(".added-to-cart").show();
          e(".ajax-success-modal").find(".ajax-product-title").text(p);
          e(".ajax-success-modal").find(".ajax_price").text(amt);
          // t.updateDropdownCart()
        },
        error: function(n, r) {
          //t.hideLoading();
          e(".ajax-error-message").text(e.parseJSON(n.responseText).description);
          t.showModal(".ajax-error-modal")
        }
      })
    },

    modal_compare: function(compare){
      if (!e.isEmptyObject(compare)) {
        // e(".error-compare").hide(20);
        var list_id = '';
        var json_compare = [];
        var check_end = 0;
        var compare_size = (Object.keys(compare).length - 1);
        e.each(compare, function(index, el) {
          var json_url = "/products/" + el + ".js";
          if (e.trim(el) != "") {
            jQuery.getJSON(json_url, function(product) {
              json_compare[check_end] = product;
              if (check_end >= compare_size) {
                t.compare_to_table(json_compare);
              }
              check_end += 1;
            });
          }
        });
        e("#moda-compare").fadeIn();       
      }
    },

    initCompare: function(){
      e(document).on('click','.compare', function(event) {
        event.preventDefault();
        //t.showLoading();
        /* Act on the event */
        var ethis = e(this);
        var pid = e(this).data('pid');

        compare = storage.get('compare');

        if (e.isEmptyObject(compare)) {
          compare = {};
        }
        var check_compare = true;
        if (Object.keys(compare).length >= total_compare) {          
          $.notify({
            icon: 'fa fa-check',
            title: 'warning',
            message: window.compare_note
          },{
            element: 'body',
            position: null,
            type: "warning",
            allow_dismiss: true,
            newest_on_top: false,
            showProgressbar: false,
            placement: {
              from: "top",
              align: "left"
            },
            offset: 20,
            spacing: 10,
            z_index: 1031,
            delay: 2000,
            timer: 4000,
            animate: {
              enter: 'animated fadeInDown',
              exit: 'animated fadeOutUp'
            },
            icon_type: 'class'
          });
          setTimeout(function(){
            t.modal_compare(compare);
          },1500);

        } else {
          for (var i = 1; i <= 4; i++) {
            if (compare['p' + i] == "" || compare['p' + i] == undefined) {
              compare['p' + i] = pid;
              break;
            } else if (compare['p' + i] == pid) {
              ethis.addClass('added');
              check_compare = false;
              t.modal_compare(compare);

              break;
            }
          }
          if (check_compare) {
            storage.set('compare', compare);
            t.modal_compare(compare);
            ethis.addClass('add-success');
            e("[data-pid='"+pid+"']").addClass('added');//.text(window.added_to_cmp);          
          }
        }
        //t.hideLoading();
      });
    },

    initRemoveCompare: function(){
      e(document).on('click', '.remove-compare', function(event) {
        event.preventDefault();
        /* Act on the event */

        var id = e(this).data('handle');
        e("." + id).fadeOut(600).remove();
        e("[data-pid='"+id+"']").removeClass('added add-success');//.text(window.add_to_cmp);
        e.each(compare, function(index, el) {
          if (el == id) {
            compare[index] = "";
            delete compare[index];
          }
        });
        storage.set('compare', compare);
      });

    }
  }
  })(jQuery)

/* =============== quickview ================ */

var loadIcon = "//cdn.shopify.com/s/files/1/0350/6349/6839/t/2/assets/loading.gif?2408";

$(document).ready(function() {
  initQuickView();
  productImage();
});

var loadIcon = "//cdn.shopify.com/s/files/1/0350/6349/6839/t/2/assets/loading.gif?2408";
var productQuickview = {};

function getPriceByVariant(a) {
  for (var b = productQuickview.variants.length, c = 0, d = 0; d < b; d++) {
    var e = productQuickview.variants[d];
    if (e.id == a) return e.price
      }
  return c
}

var product = {};
var currentLinkQuickView = '';
var option1 = '';
var option2 = '';

function initQuickView() {
  if (theme.quickview_enable) {
    $(document).on("click", "#thumblist_quickview li", function() {
      changeImageQuickView($(this).find("img:first-child"), "#product-featured-image-quickview");
    });
    $(document).on('click', '.quick-view', function(e) {
      e.preventDefault();
      var producthandle = $(this).data("handle");
      currentLinkQuickView = $(this);
      Shopify.getProduct(producthandle, function(product) {
        productQuickview = product;
        
        var is_sale = false;
        if (product.compare_at_price > product.price) {
          is_sale = true
        }
        
        var qvhtml = $("#quickview-modal").html();
        $(".quick-view-product").html(qvhtml);
        var quickview = $(".quick-view-product");
        var str = product.description;

        var featured_image = product.featured_image;
        str = str.split(" ").splice(0, 40).join(" ") + "...";
        quickview.find(".view_full_size img").attr("src", featured_image);
        quickview.find(".view_full_size img").attr("alt", product.title);
        quickview.find(".view_full_size a").attr("title", product.title);
        quickview.find(".view_full_size a").attr("href", product.url);
        quickview.find(".product-url").attr("href", product.url);
        if (is_sale) {
          quickview.find(".prices").html('<strong>On Sale</strong><span class="money">'+ Shopify.formatMoney(product.price, shop_currency_val) +'</span>');
        }else{
          quickview.find(".prices").html('<span class="money">'+ Shopify.formatMoney(product.price, shop_currency_val) +'</span>');
        }
        setTimeout(function(){
          currenciesCallbackSpecial('.prices span.money, .compare-price span.money');
        },100);
        quickview.find(".product-item").attr("id", "product-" + product.id);
        quickview.find(".variants").attr("id", "product-actions-" + product.id);
        quickview.find(".variants select").attr("id", "product-select-" + product.id);
        
        var _name = product.title;
        var _name_default = _name.split('|')[0];
        var _name_json = _name.substr(_name.indexOf(":") + 1);
        var _id = product.id;

        quickview.find(".product-info .qwp-name").html('<span class="quickview_lang_trans" data-trans="#'+_id+'_pro_title">' + _name_default + '</span><span class="hide" id="'+_id+'_pro_title">'+_name_json+'</span>');
        
        var valueSelected = $('#translate').find(':selected').attr('data-val');
        var item = $('.quickview_lang_trans');
        var data_trans = $('.quickview_lang_trans').data('trans');
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
        
        quickview.find(".product-info .brand").append("<span>Brand: </span>" + product.vendor);
                                                      if (product.available) {
          quickview.find(".product-info .availability").append("<p class=\"available instock\">In stock</p>");
                                                               } else {
                                                               quickview.find(".product-info .availability").append("<p class=\"available outstock\" >Out of stock</p>");
                                                                                                                    }
                                                                                                                    quickview.find(".product-info .product-sku").append("<p>SKU:: <span>" + product.variants[0].sku + "</span></p>");

        quickview.find(".product-description").html(str);
          if (!product.available) {
            quickview.find("select, input, .dec, .inc, .variants label").remove();
            quickview.find(".add_to_cart_detail").text("Sold out").addClass("disabled").attr("disabled", "disabled");
                                                       $(".quantity_wanted_p").css("display", "none");
          } else {
            quickViewVariantsSwatch(product, quickview);
          }
          $("#quick-view-product").fadeIn(200).addClass('active');

          $(".view_scroll_spacer").removeClass("hidden");
          loadQuickViewSlider(product, quickview);

          $(".quick-view").fadeIn(200);
        });
        return false;
      });
    }
                   }

                   function loadQuickViewSlider(n, r) {
      productImage();
      var loadingImgQuickView = $('.loading-imgquickview');
      var s = Shopify.resizeImage(n.featured_image, "medium");
      r.find(".quickview-featured-image").append('<a href="' + n.url + '"><img src="' + s + '" title="' + n.title + '"/><div style="height: 100%; width: 100%; top:0; left:0 z-index: 2000; position: absolute; display: none; background: url(' + window.loading_url + ') 50% 50% no-repeat;"></div></a>');
      if (n.images.length > 0) {
        var o = r.find(".more-view-wrapper ul");
        for (i in n.images) {
          var u = Shopify.resizeImage(n.images[i], "medium");
          var a = Shopify.resizeImage(n.images[i], "475x");
          var f = '<li><a href="' + n.url + '" class="img-quick" data-imageid="' + n.id + '" data-image="' + n.images[i] + '" data-zoom-image="' + u + '" ><img src="' + a + '" alt="Proimage" /></a></li>';
          o.append(f)
        }
        o.find("a").click(function() {
          var t = r.find("#product-featured-image-quickview");
          if (t.attr("src") != $(this).attr("data-image")) {
            t.attr("src", $(this).attr("data-image"));
            loadingImgQuickView.show();
            t.load(function(t) {
              loadingImgQuickView.hide();
              $(this).unbind("load");
              loadingImgQuickView.hide()
            })
          }
        });
        o.slick({
          dots: true,
          arrows: true,
          autoplay: true,
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        }).css("visibility", "visible")
      } else {
        r.find(".quickview-more-views").remove();
        r.find(".quickview-more-view-wrapper-jcarousel").remove()
      }
    }
    var convertToSlug = function(e) {
      return e.toLowerCase().replace(/[^a-z0-9 -]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-")
    }
    var selectCallbackQuickView = function(variant, selector) {};

    function quickViewVariantsSwatch(t, quickview) {
      if (t.variants.length > 1) {
        for (var r = 0; r < t.variants.length; r++) {
          var i = t.variants[r];
          var s = '<option value="' + i.id + '">' + i.title + "</option>";
          quickview.find("form.variants > select").append(s)
        }
        var ps = "product-select-" + t.id;
        new Shopify.OptionSelectors(ps, {
          product: t,
          onVariantSelected: selectCallbackQuickView
        });
        /*if (t.options.length == 1) {
              	$(".selector-wrapper:eq(0)").prepend("<label>" + t.options[0].name + "</label>")
            }*/
        quickview.find("form.variants .selector-wrapper label").each(function(n, r) {
          if (typeof t.options[n] != 'undefined') {
            $(this).html(t.options[n].name);
          }
        })
        var o = theme.file_url.substring(0, theme.file_url.lastIndexOf("?"));
        var u = theme.asset_url.substring(0, theme.asset_url.lastIndexOf("?"));
        var a = "";
        for (var r = 0; r < t.options.length; r++) {
          a += '<div class="swatch clearfix item_square " data-option-index="' + r + '">';
          a += '<div class="header">' + t.options[r].name + "</div>";
          var f = false;
          if (/Color|Colour/i.test(t.options[r].name)) {
            f = true
          }
          var l = new Array;
          for (var c = 0; c < t.variants.length; c++) {
            var i = t.variants[c];
            var h = i.options[r];
            var p = this.convertToSlug(h);
            var d = "quickview-swatch-" + r + "-" + p;
            if (l.indexOf(h) < 0) {
              a += '<div data-value="' + h + '" class="swatch-element  ' + (f ? "color " : "") + p + (i.available ? " available " : " soldout ") + '">';
              if (f) {
                a += '<div class="tooltip">' + h + "</div>"
              }
              a += '<input id="' + d + '" type="radio" name="option-' + r + '" value="' + h + '" ' + (c == 0 ? " checked " : "") + (i.available ? "" : " disabled") + " />";
              if (f) {
                a += '<label class= "swatch_square ' + p + '" for="' + d + '" style="background-color: ' + p + '";></label>'
              } else {
                a += '<label class="' + p + '" for="' + d + '">' + h + '</label>'
              }
              a += "</div>";
              if (i.available) {
                $('.quick-view .swatch[data-option-index="' + r + '"] .' + p).removeClass("soldout").addClass("available").find(":radio").removeAttr("disabled")
              }
              l.push(h)
            }
          }
          a += "</div>"
        }
        quickview.find("form.variants > select").after(a);
        quickview.find(".swatch :radio").change(function() {
          var t = $(this).closest(".swatch").attr("data-option-index");
          var q = $(this).val();
          $(this).closest("form").find(".single-option-selector").eq(t).val(q).trigger("change");

        });
        addCheckedSwatch();
      } else {
        quickview.find("form.variants > select").remove();
        var v = '<input type="hidden" name="id" value="' + t.variants[0].id + '">';
        quickview.find("form.variants").append(v)
      }
    }

    function addCheckedSwatch() {
      $('.swatch .color label').on('click', function() {
        $('.swatch .color').each(function() {
          $(this).find('label').removeClass('checkedBox');
        });
        $(this).addClass('checkedBox');
      });
    }
    $(document).on('click', '.quickview-close, #quick-view-product .quickview-overlay', function(e) {
      $("#quick-view-product").fadeOut(200);
    });

    function productImage() {
      $('#thumbs_list').slick({
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [{
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: true,
            dots: true
          }
        }, {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2
          }
        }, {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }]
      });
      $('.thumbs_list_frame').height(parseInt($('.thumbs_list_frame >li').outerHeight(true) * $('.thumbs_list_frame >li').height) + 'px');
    }
    
    
    /********************************** portfolio ****************************************/
    
    jQuery(document).ready(function($) {


/*
|--------------------------------------------------------------------------
| Global myTheme Obj / Variable Declaration
|--------------------------------------------------------------------------
|
|
|
*/

	var myTheme = window.myTheme || {},
    $win = $( window );
	


/*
|--------------------------------------------------------------------------
| isotope
|--------------------------------------------------------------------------
|
|
|
*/		

	myTheme.Isotope = function () {
	
		// 4 column layout
		var isotopeContainer = $('.isotopeContainer');
		if( !isotopeContainer.length || !jQuery().isotope ) return;
		$win.on('load', function(){
			isotopeContainer.isotope({
				itemSelector: '.isotopeSelector'
			});
		$('.isotopeFilters').on( 'click', 'a', function(e) {
				$('.isotopeFilters').find('.active').removeClass('active');
				$(this).parent().addClass('active');
				var filterValue = $(this).attr('data-filter');
				isotopeContainer.isotope({ filter: filterValue });
				e.preventDefault();
			});
		});
		
		// 3 column layout
		var isotopeContainer2 = $('.isotopeContainer2');
		if( !isotopeContainer2.length || !jQuery().isotope ) return;
		$win.on('load', function(){
			isotopeContainer2.isotope({
				itemSelector: '.isotopeSelector'
			});
		$('.isotopeFilters2').on( 'click', 'a', function(e) {
				$('.isotopeFilters2').find('.active').removeClass('active');
				$(this).parent().addClass('active');
				var filterValue = $(this).attr('data-filter');
				isotopeContainer2.isotope({ filter: filterValue });
				e.preventDefault();
			});
		});
		
		// 2 column layout
		var isotopeContainer3 = $('.isotopeContainer3');
		if( !isotopeContainer3.length || !jQuery().isotope ) return;
		$win.on('load', function(){
			isotopeContainer3.isotope({
				itemSelector: '.isotopeSelector'
			});
		$('.isotopeFilters3').on( 'click', 'a', function(e) {
				$('.isotopeFilters3').find('.active').removeClass('active');
				$(this).parent().addClass('active');
				var filterValue = $(this).attr('data-filter');
				isotopeContainer3.isotope({ filter: filterValue });
				e.preventDefault();
			});
		});
		
		// 1 column layout
		var isotopeContainer4 = $('.isotopeContainer4');
		if( !isotopeContainer4.length || !jQuery().isotope ) return;
		$win.on('load', function(){
			isotopeContainer4.isotope({
				itemSelector: '.isotopeSelector'
			});
		$('.isotopeFilters4').on( 'click', 'a', function(e) {
				$('.isotopeFilters4').find('.active').removeClass('active');
				$(this).parent().addClass('active');
				var filterValue = $(this).attr('data-filter');
				isotopeContainer4.isotope({ filter: filterValue });
				e.preventDefault();
			});
		});
	
	};
	
	

/*
|--------------------------------------------------------------------------
| Fancybox
|--------------------------------------------------------------------------
|
|
|
*/		

	// myTheme.Fancybox = function () {
	//
	// 	$(".fancybox-pop").fancybox({
	// 		maxWidth	: 900,
	// 		maxHeight	: 700,
	// 		fitToView	: true,
	// 		width		: '80%',
	// 		height		: '80%',
	// 		autoSize	: false,
	// 		closeClick	: false,
	// 		openEffect	: 'elastic',
	// 		closeEffect	: 'none'
	// 	});
	//
	// };
	//
		
	
	
/*
|--------------------------------------------------------------------------
| Functions Initializers
|--------------------------------------------------------------------------
|
|
|
*/
	
	myTheme.Isotope();
	// myTheme.Fancybox();
});
    
    
/* ---------------------- footer-reveal.js -----------------------*/





