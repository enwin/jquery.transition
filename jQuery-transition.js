// jQuery.transition : jQuery animate with css transtitions if available.
(function(jQuery) {
  var lastTime = 0;
  var vendors = ['ms', 'moz', 'webkit', 'o'];
  for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
      window.cancelAnimationFrame =
        window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
  }

  if (!window.requestAnimationFrame)
      window.requestAnimationFrame = function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
          lastTime = currTime + timeToCall;
          return id;
      };

  if (!window.cancelAnimationFrame)
      window.cancelAnimationFrame = function(id) {
          clearTimeout(id);
      };

  var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd',
      'MozTransition'    : 'transitionend',
      'OTransition'      : 'oTransitionEnd otransitionend',
      'msTransition'     : 'MSTransitionEnd',
      'transition'       : 'transitionend'
  };
  window.Modernizr.transEndEventName = transEndEventNames[window.Modernizr.prefixed('transition')];

  jQuery.fn.extend({
    transition: function(o,speed,easing,callback,delay){
      var lastElmt = this.last(),
        opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
          complete: delay && callback || !delay && jQuery.isFunction( callback) && callback || easing && jQuery.isFunction( easing ) && easing ||
            jQuery.isFunction( speed ) && speed,
          duration: speed+"ms",
          easing: callback && easing || easing && !jQuery.isFunction( easing ) && !jQuery.isNumeric( easing ) && easing || "ease-in-out",
          delay: (delay || !delay && !jQuery.isFunction( callback ) && callback || !delay && !callback && !jQuery.isFunction ( easing ) && easing || "0") +"ms"
        };

      if(Modernizr.csstransitions){
        this.each(function(i,el){
          var that = jQuery(this),
            iStyles = 0;
            iObject = 0;
            props = [],
            transition = " "+opt.duration + " " + opt.easing + " " + opt.delay;


          for(i in o){
            iObject++

            i = Modernizr.prefixed(i).replace(/([A-Z])/g,function(str,m1){ // transform string to lowercase & - css property
              return '-'+m1.toLowerCase();
            }).replace(/^ms-/,'-ms-');

            props.push(i+transition);
            if(that.css(i) == o[i]){
              iStyles++
            }
          }
          if(iObject> iStyles){
            (function(props){
              window.requestAnimationFrame(function(){
                that[0].style[Modernizr.prefixed('transition')] = props.join();
                that.one(Modernizr.transEndEventName,function(e){
                  e.currentTarget.style[Modernizr.prefixed('transition')] = "";
                  if(!!opt.complete && lastElmt.is(that)){
                    opt.complete();
                  }
                })
                window.requestAnimationFrame(function(){
                  that.css(o);
                })
              });
            })(props)
          }else{
            if(!!opt.complete){
              opt.complete();
            }
          }
        });
      }else{
        this.delay(opt.delay).animate(o,opt.duration,function(){
          if(!!opt.complete && lastElmt.is(this)){
            opt.complete();
          }
        });
      }
    }
  });
}(jQuery));