jQuery(document).ready(function(){
	jQuery('[data-transition]').on('click',function(e){
		e.preventDefault();
		var params = jQuery(this).data('transition'),
			callback = function(){
				console.log('callback '+e.currentTarget.nodeName.toLowerCase())
			};

		jQuery(this).transition(
			params.css,
			params.duration,
			callback,
			params.easing
		);
	});
})