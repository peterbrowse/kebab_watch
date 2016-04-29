var url = "http://d3u3pil9o8kwzq.cloudfront.net/kebab_meat.jpg",
    fileSize = 413773,
    test_started = false,
    test_finished = false,
    internet_speed = 0;

function InitiateSpeedDetection() {
    console.log("Test Started...");
    test_started = true;
    window.setTimeout(MeasureConnectionSpeed, 1);
};    

if (window.addEventListener) {
    window.addEventListener('load', InitiateSpeedDetection, false);
} else if (window.attachEvent) {
    window.attachEvent('onload', InitiateSpeedDetection);
}

function MeasureConnectionSpeed() {
	var startTime, endTime;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
        test_started = false;
        test_finished = true;
    }
    
    download.onerror = function (err, msg) {
        console.log("Invalid image, or error downloading");
    }
    
    startTime = (new Date()).getTime();
    var cacheBuster = "?nnn=" + startTime;
    download.src = url + cacheBuster;
    
    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = fileSize * 8;
        internet_speed = (bitsLoaded / duration).toFixed(2);
        
        var speedKbps = (internet_speed / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        console.log("Your connection speed is: " + speedMbps + "Mbps");
    }
}