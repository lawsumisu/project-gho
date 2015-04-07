//Javascript for scroll bar here!
var Point = function(x,y){
	this.x =x;
	this.y = y;

	this.move = function(V, distance){
		var dV = V.multiply(distance);
		return this.add(new Point(dV.x, dV.y));
	}

	this.add = function(P){
		return new Point(this.x+P.x, this.y+P.y);
	}
}

var Vector = function(p1, p2){
	this.x = p2.x-p1.x;
	this.y = p2.y-p1.y;
	this.length = Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2));

	var create = function(x,y){
		return new Vector(new Point(0,0), new Point(x,y));
	}

	this.perpendicular = function(){
		return create(-this.y,this.x);
	}

	this.normalized = function(){
		return create(this.x/this.length, this.y/this.length);
	}

	this.multiply = function(f){
		return create(this.x*f, this.y*f);
	}

	this.angle = function(V){
		return Math.acos(this.x*V.x + this.y*V.y);
	}
	this.toString = function(){
		return "Vector <" +this.x + "," +this.y +">";
	}

	
}
var setup = function(){
	drawScrollBar();
	setUpScroller();
}
var drawScrollBar = function(){
	var canvas = document.getElementById("scrollBG");
    var ctx = canvas.getContext('2d');
    var scroll = $("#scrollBG");
    var topCurveAnchors = [new Point(20,25), new Point(scroll.width()-20, 25)]
    ctx.fillStyle = "rgb(126,126,126)";
    ctx.clearRect(0,0,scroll.width(), scroll.height());    
    //ctx.fillRect(0,0, scroll.width(), scroll.height());
   	//Draw curved arc.
   	ctx.beginPath();
    ctx.moveTo(20,25);
    ctx.bezierCurveTo(60,0,120,0,scroll.width()-20,25);
    var P = new Point(scroll.width()-20, 25);
    var V = new Vector(new Point(120,0), new Point(scroll.width()-20, 25));
    console.log(V.angle(V.perpendicular()));
    var radius = 15;
    var circleCenter = P.move(V.normalized().perpendicular(), radius);
    var P3 = P.move(V.normalized().perpendicular(), radius*2);
    var angle = Math.atan2(25, scroll.width()-140) - Math.PI/2;
    //ctx.lineTo(newP.x, newP.y);
    ctx.arc(circleCenter.x, circleCenter.y, radius, angle, angle+Math.PI);
    var V2 = new Vector(new Point(20, 25), new Point(60,0));
    var P3 = (new Point(20,25)).move(V2.normalized().perpendicular(), radius*2);
    var M2 = (new Point(20,25)).move(V2.normalized().perpendicular(), radius);
    ctx.bezierCurveTo(120,45,60,45,P3.x,P3.y);
    //ctx.lineTo(20, 25);
    var diff = Math.PI/2-Math.atan2(25, scroll.width()-140);
    var angle2 = angle+2*diff;
    ctx.arc(M2.x, M2.y, radius,  angle2, angle2 + Math.PI);
    ctx.stroke();
    ctx.fill();
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