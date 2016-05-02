$(document).ready(function(){
	console.log('bob');
	
	var results = $(document).check({
		'fileSize': 413773,
		'url': "http://d3u3pil9o8kwzq.cloudfront.net/kebab_meat.jpg"
	});
	
	console.log(results.results);
});