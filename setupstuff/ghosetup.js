$(document).ready(function () {


$.extend({
        getHashVars : function() {
            var vars = [], hash;
            var hashes = window.location.href.slice(
                    window.location.href.indexOf('#') + 1).split('&');
            for ( var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        },
        getHashVar : function(name) {
            return $.getHashVars()[name];
        }
    });

$(window).on('hashchange', function() {
if($.getHashVar('split') != null) {
	$("#splitinput").hide();
	$("#nosplitinput").hide();
	$("#distanceinput").hide();
	$("#nodistanceinput").hide();
	$("#paceinput").show();
	$("#nopaceinput").show();
	$("#nexttext").hide();
	$("#ghotext").show();
	$("#nopacebtn").addClass("buttonselect");
	$("#pacebtn").removeClass("buttonselect");
	$("#pace")[0].value="";
} else if ($.getHashVar('dist') != null) {
	$("#distanceinput").hide();
	$("#nodistanceinput").hide();
	$("#paceinput").hide();
	$("#nopaceinput").hide();
	$("#splitinput").show();
	$("#nosplitinput").show();
	$("#nexttext").hide();
	$("#ghotext").show();
	$("#nosplitbtn").addClass("buttonselect");
	$("#splitbtn").removeClass("buttonselect");
	$("#split")[0].value="";
} else {
	$("#splitinput").hide();
	$("#nosplitinput").hide();
	$("#paceinput").hide();
	$("#nopaceinput").hide();
	$("#distanceinput").show();
	$("#nodistanceinput").show();
	$("#nexttext").show();
	$("#ghotext").hide();
	$("#nodistancebtn").addClass("buttonselect");
	$("#distancebtn").removeClass("buttonselect");
	$("#distance")[0].value="";
}
return false;
});

$(window).trigger('hashchange');


$("#backbtn").on('click', function(){
if($.getHashVar('split') != null){
	location.hash="dist="+$.getHashVar('dist');
} else if ($.getHashVar('dist') != null){
	location.hash="";
} else {
	location.href="index.html"
}

});

$("#forwardbtn").on('click', function(){
if($.getHashVar('split') != null){
	if($("#pacebtn").hasClass("buttonselect")){
		location.href="running.html"+location.hash+"&pace="+$("#pace")[0].value;
	} else {
		location.href="running.html"+location.hash+"&pace=";
	}
} else if($.getHashVar('dist') != null){
	if($("#splitbtn").hasClass("buttonselect")){
		location.hash+="&split="+$("#split")[0].value;
	} else {
		location.href="running.html"+location.hash+"&split=&pace=";
	}
} else {
	if($("#distancebtn").hasClass("buttonselect")){
		location.hash+="dist="+$("#distance")[0].value;
	} else {
		location.hash+="dist=";
	}
}

});

$("#nodistancebtn").on('click', function(){
	$("#nodistancebtn").addClass("buttonselect");
	$("#distancebtn").removeClass("buttonselect");
});

$("#nosplitbtn").on('click', function(){
	$("#nosplitbtn").addClass("buttonselect");
	$("#splitbtn").removeClass("buttonselect");
	$("#nexttext").hide();
	$("#ghotext").show();
});

$("#nopacebtn").on('click', function(){
	$("#nopacebtn").addClass("buttonselect");
	$("#pacebtn").removeClass("buttonselect");
});

$("#distancebtn").on('click',function(){
	$("#nodistancebtn").removeClass("buttonselect");
	$("#distancebtn").addClass("buttonselect");
	var totalmiles = {};
	var totaldivisions = {}
	for (var i = 0; i<31; i++){
		totalmiles[i] = i;
	}
	for (var j = 0; j<100; j += 5){
		if (j<10){
			totaldivisions[j] = '0'+j;
		} else {
			totaldivisions[j]=j;
		}
	}
	SpinningWheel.addSlot(totalmiles, 'right');
	SpinningWheel.addSlot({separator: '.'}, 'readonly shrink');
	SpinningWheel.addSlot(totaldivisions, 'left');
	
	SpinningWheel.setDoneAction(distanceDone);

	SpinningWheel.open();
});


function distanceDone() {
	$("#distance")[0].value = SpinningWheel.getSelectedValues().values.join().replace(/,/g, '');
	$("#forwardbtn").focus();
}

$("#splitbtn").on('click',function(){
	$("#nosplitbtn").removeClass("buttonselect");
	$("#splitbtn").addClass("buttonselect");
	$("#nexttext").show();
	$("#ghotext").hide();

	var splitmiles = {};
	var splitdivisions = {};
	for (var k = 0; k<11; k++){
		splitmiles[k]=k;
	}
	for (var l = 0; l<100; l+=5){
		if(l<10){
		 	splitdivisions[l] = '0'+l;
		} else {
			splitdivisions[l] = l;
		}
	}
	
	SpinningWheel.addSlot(splitmiles, 'right');
	SpinningWheel.addSlot({separator: '.'}, 'readonly shrink');
	SpinningWheel.addSlot(splitdivisions, 'left');

	SpinningWheel.setDoneAction(splitDone);

	SpinningWheel.open();
});

function splitDone() {
	$("#split")[0].value = SpinningWheel.getSelectedValues().values.join().replace(/,/g, '');
	$("#forwardbtn").focus();
}

$("#pacebtn").on('click',function(){
	$("#nopacebtn").removeClass("buttonselect");
	$("#pacebtn").addClass("buttonselect");

	var paceminutes = {};
	var paceseconds = {};
	for (var m = 0; m<16; m++){
		paceminutes[m] = m;
	}
	for (var n = 0; n<60; n++){
		if (n<10){
			paceseconds[n] = '0'+n;
		} else {
			paceseconds[n] = n;
		}
	}

	SpinningWheel.addSlot(paceminutes, 'right');
	SpinningWheel.addSlot({separator: ':'}, 'readonly shrink');
	SpinningWheel.addSlot(paceseconds, 'left');

	SpinningWheel.setDoneAction(paceDone);
	
	SpinningWheel.open();
	
});

function paceDone(){
	$("#pace")[0].value = SpinningWheel.getSelectedValues().values.join().replace(/,/g, '');
	$("#forwardbtn").focus();
}



});