//Javascript for scroll bar here!
var setup = function(){
	drawScrollBar();
	setUpScroller();
}
var drawScrollBar = function(){
	var canvas = document.getElementById("scrollBG");
    var ctx = canvas.getContext('2d');
    var scroll = $("#scrollBG");
    ctx.fillStyle = "rgb(126,126,126)";
    ctx.clearRect(0,0,scroll.width(), scroll.height());    
    ctx.fillRect(0,0, scroll.width(), scroll.height());
}

var setUpScroller = function(){
	var thumb = $("#thumb");
	var size = thumb.width();
	var lastX = null;
	var lastY = null;
	thumb.mousedown(function(e){
		$(this).css("visibility", "hidden");
		var scroll = $("#scrollFG");
		scroll.css("z-index", 2);
		var x = e.pageX  - scroll.offset().left - size/2;
	  	var y = e.pageY  - scroll.offset().top - size/2;
	  	var offsetX = e.pageX - $(this).offset().left - size/2;
	  	var offsetY  = e.pageY - $(this).offset().top - size/2;
	  	drawThumb(x-offsetX, y-offsetY, size);

		scroll.mousemove(function(e){
			lastX = null;
			lastY = null;
			var x = e.pageX  - scroll.offset().left - size/2;
	  		var y = e.pageY  - scroll.offset().top - size/2;
	  		drawThumb(x-offsetX, y-offsetY, size);
		});

		scroll.mouseleave(function(e){			
			var x = e.pageX  - scroll.offset().left - size/2;
	  		var y = e.pageY  - scroll.offset().top - size/2;
	  		lastX = x-offsetX;
			lastY = y-offsetY;
			drawThumb(lastX, lastY, size);
		});
		$(window).mouseup(function(e){
	        var x = e.pageX  - scroll.offset().left - size/2;
	        var y = e.pageY  - scroll.offset().top - size/2;
	        scroll.css("z-index", -5);
	        scroll.off("mousemove");
	        scroll.off("mouseleave");
	        $(this).off("mouseup");
	        thumb.css("visibility", "visible");
	        if (lastX != null){
	        	setThumb(lastX, lastY);
	        }
	        else{
	        	setThumb(x-offsetX, y-offsetY);
	        } 
	        lastX = null;
			lastY = null;
	  })
	});
}

var drawThumb = function(x, y, size){
	var scroll =  $("#scrollFG");
	var canvas = document.getElementById("scrollFG");
	var ctx = canvas.getContext("2d");
	ctx.clearRect(0,0, scroll.width(), scroll.height());
	ctx.fillStyle = "rgb(0,0,255)"; 
	var boundedX = clamp(x, 0, scroll.width()-size);
	var boundedY = clamp(y, 0, scroll.height()-size);   
	ctx.fillRect(boundedX,boundedY, size, size);
	//ctx.drawImage(checkerImg, x, y, size, size );
}

var setThumb = function(x, y){
	var scroll =  $("#scrollBG");
	var thumb = $("#thumb");
	var size = thumb.width();
	var boundedX = clamp(x, 0, scroll.width()-size);
	var boundedY = clamp(y, 0, scroll.height()-size); 
	thumb.css("left", boundedX);
	thumb.css("top",boundedY);
}

var clamp = function(value, min, max){
	return Math.min(Math.max(min, value), max);
}