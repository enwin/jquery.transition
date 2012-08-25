jQuery Transition
=================

Use css transition instead of jQuery.animate when available.

Synthax
-------

.transition() uses the same synthax as the .animate() method:

.transition( properties [, duration] [, complete] )<br/>
**properties** A map of CSS properties that the animation will move toward.<br/>
**duration** A string or number determining how long the animation will run.<br/>
**complete** A function to call once the animation is complete.<br/>


	jQuery('#child').transition({
		left: "200px",
		top: "20px"
	},300,function(){
		//when animation is complete
	})

Todo
----

Easing integration for css3 capable browsers only.