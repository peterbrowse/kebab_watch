var url = "http://d3u3pil9o8kwzq.cloudfront.net/kebab_meat.jpg",
    fileSize = 1047977,
	test_started = false,
    test_finished = true,
	num_of_tests = 10,
    internet_speed = 0,
    downloads = [],
    debug = true;
    
//url = "http://d3u3pil9o8kwzq.cloudfront.net/kebab_load.jpg";
//413773
    

function checkSpeed(callback) {
	test_started = true;
	test_started = false;
	
	internet_speed = measureConnectionSpeed(num_of_tests, function(speed_returned){
		callback(speed_returned);
	});
}

function measureConnectionSpeed(tests, callback) {
	var speed_result_array = [];
	var speed_result = 0;
	var test_count = 0;
	var test_count_finished = 0;
	downloads = [];
	
	var test_loop = function() {
	    the_test(test_count, function(result) {
	        speed_result_array[result.test_number] = result;
	        
	        test_count_finished++;
	        
	        if(test_count_finished > tests - 1) {
		        done();
		    } else {
			    test_count++;
			    test_loop();
		    }
	    });
	}
	
	test_loop();

	function done() {
		if(debug) { console.log(speed_result_array); }

    	var speed_sum = 0;
    	
    	for(var i = 0, len = speed_result_array.length; i < len; i++) {
	    	speed_sum = speed_sum + speed_result_array[i].speedBps;
    	}
    	
    	var averageSpeedBps = speed_sum / tests;
    	var speedKbps = (averageSpeedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        
        if(debug) {
	        console.log("Average speed of " + tests + " tests is: " + speedMbps + " Mpbs");
	    }
	    
	    speed_result = speedMbps;
    	
    	callback(speed_result);
	}
}

function the_test(test_number, callback) {
    downloads[test_number] = new Image();
    downloads[test_number].onload = function () {
        downloads[test_number].endTime = (new Date()).getTime();
        
        downloads[test_number].duration = (downloads[test_number].endTime - downloads[test_number].startTime) / 1000;
        var bitsLoaded = fileSize * 8;
        var speedBps = parseInt((bitsLoaded / downloads[test_number].duration).toFixed(2));
        
        var results = {
	        test_number: test_number,
	        speedBps: speedBps
		}
        
        callback(results);
        
        test_started = false;
        test_finished = true;
    }
    
    downloads[test_number].onerror = function (err, msg) {
        console.log("Invalid image, or error downloading");
    }
    
    downloads[test_number].startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + downloads[test_number].startTime + test_number;
    downloads[test_number].src = url + cacheBuster;
}