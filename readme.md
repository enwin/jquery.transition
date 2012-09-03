jQuery Transition
=================

Use css transition instead of jQuery.animate when available.

Synthax
-------

.transition() uses the same synthax as the .animate() method:

.transition( properties [, duration] [, easing] [, complete] [, delay] )<br/>
**properties** A map of CSS properties that the animation will move toward.<br/>
**duration** A string or number determining how long the animation will run.<br/>
**easing** A string of CSS3 only easing function || only applied to CSS3 compliant browsers.<br/>
**complete** A function to call once the animation is complete.<br/>
**delay** A string or number determining how long the animation will be delayed.<br/>


	jQuery('#child').transition({
		"left": "200px",
		"top": "20px"
	},300,"ease-in-out",function(){
		//when animation is complete
	},20)

