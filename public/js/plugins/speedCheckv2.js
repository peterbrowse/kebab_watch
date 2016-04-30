var test_started = false,
    test_finished = true,
    internet_speed = 0
    
function checkSpeed() {
	test_started = true;
	test_started = false;
	
	internet_speed = measureConnectionSpeed(num_of_tests);
}

(function ( $ ) {
	"use strict";
	
	function Check(element, settings) {
		this.element = element;
		this.settings = settings;
		this.debug = true;
		
		this.init();
		
		return this;
	};
	
	Check.prototype = {
		
	}
	
	$.fn.check = function (track, options) {
    	var settings = $.extend({}, options);
    	return new Check(element, settings);
    };
 
}( jQuery ));