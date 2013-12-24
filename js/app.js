;(function ($, window, document, undefined) {
	"use strict";

	var stage = new Kinetic.Stage({
		container: 'container',
		width: $(document).width(),
		height: $(document).height()
	});

	var staticClockLayer = new Kinetic.Layer();
	var hoursLayer = new Kinetic.Layer(); 
	var minutesLayer = new Kinetic.Layer();
	var secAndMsecLayer = new Kinetic.Layer();


	var setup = {
		refreshTime: 1,
		startX: 10,
		startY: 10,
		ledWidth: 50,
		peakThickness: 10,
		ledX: 30,
		ledY: 30,
		digitSpace: 15,
		secondsSpace: 60,
		ledSecRadius: 10,
		ledDisabled: '#262626',
		ledEndabled: '#D30000',
		clock: '#000000'
	}

	var clock_bg = new Kinetic.Rect({
		x: setup.startX,
		y: setup.startY,
		width: setup.ledX*2+setup.ledWidth*9+setup.peakThickness*17+setup.digitSpace*5+setup.secondsSpace*3,
		height: setup.ledY*2+setup.ledWidth*2+setup.peakThickness*2,
		fill: setup.clock
	});	

	function drawLed(peakX, peakY, rotDeg){
		if ( rotDeg == undefined ) rotDeg = 0;
		var peakXabsolute = peakX + setup.startX;
		var peakYabsolute = peakY + setup.startX;
		return new Kinetic.Polygon({
			x: peakXabsolute,
			y: peakYabsolute,
			points : [
				0,										0,
				setup.peakThickness/2, 					-setup.peakThickness/2,
				setup.ledWidth+setup.peakThickness/2, 	-setup.peakThickness/2,
				setup.ledWidth+setup.peakThickness, 	0,
				setup.ledWidth+setup.peakThickness/2, 	+setup.peakThickness/2,
				setup.peakThickness/2,					+setup.peakThickness/2
			],
			fill: setup.ledDisabled,
			rotationDeg: rotDeg,
			strokeWidth: 0
		});
	}

	function drawDigit(startX, startY){

		return {
			top : drawLed(startX, startY),
			middle : drawLed(startX, startY+setup.ledWidth+setup.peakThickness),
			bottom : drawLed(startX, startY+(setup.ledWidth+setup.peakThickness)*2),
			top_left : drawLed(startX, startY, 90),
			bottom_left : drawLed(startX, startY+setup.ledWidth+setup.peakThickness, 90),
			top_right : drawLed(startX+setup.ledWidth+setup.peakThickness, startY, 90),
			bottom_right : drawLed(startX+setup.ledWidth+setup.peakThickness, startY+setup.ledWidth+setup.peakThickness, 90)
		}
	}

	var led_h1 = drawDigit(setup.ledX,setup.ledY);
	var led_h2 = drawDigit(setup.ledX+setup.ledWidth+setup.peakThickness*2+setup.digitSpace,setup.ledY);

	var led_sd1 = new Kinetic.Circle({
		x: setup.startX+(setup.ledWidth+setup.peakThickness*2)*2+setup.digitSpace+setup.secondsSpace/2+setup.ledX-setup.peakThickness/2,
		y: setup.startY+setup.ledY+setup.ledWidth/2+setup.peakThickness,
		fill: setup.ledEndabled,
		radius: setup.ledSecRadius
	});

	var led_sd2 = new Kinetic.Circle({
		x: setup.startX+(setup.ledWidth+setup.peakThickness*2)*2+setup.digitSpace+setup.secondsSpace/2+setup.ledX-setup.peakThickness/2,
		y: setup.startY+setup.ledY+setup.ledWidth*1.5+setup.peakThickness,
		fill: setup.ledEndabled,
		radius: setup.ledSecRadius
	});

	var led_m1 = drawDigit(setup.ledX+(setup.ledWidth+setup.peakThickness*2)*2+setup.digitSpace+setup.secondsSpace,setup.ledY);
	var led_m2 = drawDigit(setup.ledX+(setup.ledWidth+setup.peakThickness*2)*3+setup.digitSpace*2+setup.secondsSpace,setup.ledY);

	var led_sd3 = new Kinetic.Circle({
		x: setup.startX+(setup.ledWidth+setup.peakThickness*2)*4+setup.digitSpace*4+setup.secondsSpace+setup.ledX-setup.peakThickness/2,
		y: setup.startY+setup.ledY+setup.ledWidth/2+setup.peakThickness,
		fill: setup.ledEndabled,
		radius: setup.ledSecRadius
	});

	var led_sd4 = new Kinetic.Circle({
		x: setup.startX+(setup.ledWidth+setup.peakThickness*2)*4+setup.digitSpace*4+setup.secondsSpace+setup.ledX-setup.peakThickness/2,
		y: setup.startY+setup.ledY+setup.ledWidth*1.5+setup.peakThickness,
		fill: setup.ledEndabled,
		radius: setup.ledSecRadius
	});

	var led_s1 = drawDigit(setup.ledX+(setup.ledWidth+setup.peakThickness*2)*4+setup.digitSpace*2+setup.secondsSpace*2,setup.ledY);
	var led_s2  = drawDigit(setup.ledX+(setup.ledWidth+setup.peakThickness*2)*5+setup.digitSpace*3+setup.secondsSpace*2,setup.ledY);

	var led_sd5 = new Kinetic.Circle({
		x: setup.startX+(setup.ledWidth+setup.peakThickness*2)*6+setup.digitSpace*5+setup.secondsSpace*2+setup.ledX-setup.peakThickness/2,
		y: setup.startY+setup.ledY+setup.ledWidth/2+setup.peakThickness,
		fill: setup.ledEndabled,
		radius: setup.ledSecRadius
	});

	var led_sd6 = new Kinetic.Circle({
		x: setup.startX+(setup.ledWidth+setup.peakThickness*2)*6+setup.digitSpace*5+setup.secondsSpace*2+setup.ledX-setup.peakThickness/2,
		y: setup.startY+setup.ledY+setup.ledWidth*1.5+setup.peakThickness,
		fill: setup.ledEndabled,
		radius: setup.ledSecRadius
	});

	var led_ms1 = drawDigit(setup.ledX+(setup.ledWidth+setup.peakThickness*2)*6+setup.digitSpace*3+setup.secondsSpace*3,setup.ledY);
	var led_ms2 = drawDigit(setup.ledX+(setup.ledWidth+setup.peakThickness*2)*7+setup.digitSpace*4+setup.secondsSpace*3,setup.ledY);
	var led_ms3 = drawDigit(setup.ledX+(setup.ledWidth+setup.peakThickness*2)*8+setup.digitSpace*5+setup.secondsSpace*3,setup.ledY);

	staticClockLayer
	.add(clock_bg)
	.add(led_sd1)
	.add(led_sd2)
	.add(led_sd3)
	.add(led_sd4)
	.add(led_sd5)
	.add(led_sd6)
	;

	hoursLayer
	.add(led_h1.top)
	.add(led_h1.middle)
	.add(led_h1.bottom)
	.add(led_h1.top_left)
	.add(led_h1.bottom_left)
	.add(led_h1.top_right)
	.add(led_h1.bottom_right)
	.add(led_h2.top)
	.add(led_h2.middle)
	.add(led_h2.bottom)
	.add(led_h2.top_left)
	.add(led_h2.bottom_left)
	.add(led_h2.top_right)
	.add(led_h2.bottom_right)
	;

	minutesLayer
	.add(led_m1.top)
	.add(led_m1.middle)
	.add(led_m1.bottom)
	.add(led_m1.top_left)
	.add(led_m1.bottom_left)
	.add(led_m1.top_right)
	.add(led_m1.bottom_right)
	.add(led_m2.top)
	.add(led_m2.middle)
	.add(led_m2.bottom)
	.add(led_m2.top_left)
	.add(led_m2.bottom_left)
	.add(led_m2.top_right)
	.add(led_m2.bottom_right)
	;

	secAndMsecLayer
	.add(led_s1.top)
	.add(led_s1.middle)
	.add(led_s1.bottom)
	.add(led_s1.top_left)
	.add(led_s1.bottom_left)
	.add(led_s1.top_right)
	.add(led_s1.bottom_right)
	.add(led_s2.top)
	.add(led_s2.middle)
	.add(led_s2.bottom)
	.add(led_s2.top_left)
	.add(led_s2.bottom_left)
	.add(led_s2.top_right)
	.add(led_s2.bottom_right)
	.add(led_ms1.top)
	.add(led_ms1.middle)
	.add(led_ms1.bottom)
	.add(led_ms1.top_left)
	.add(led_ms1.bottom_left)
	.add(led_ms1.top_right)
	.add(led_ms1.bottom_right)
	.add(led_ms2.top)
	.add(led_ms2.middle)
	.add(led_ms2.bottom)
	.add(led_ms2.top_left)
	.add(led_ms2.bottom_left)
	.add(led_ms2.top_right)
	.add(led_ms2.bottom_right)
	.add(led_ms3.top)
	.add(led_ms3.middle)
	.add(led_ms3.bottom)
	.add(led_ms3.top_left)
	.add(led_ms3.bottom_left)
	.add(led_ms3.top_right)
	.add(led_ms3.bottom_right)
	;

	stage
	.add(staticClockLayer)
	.add(hoursLayer)
	.add(minutesLayer)
	.add(secAndMsecLayer);

	function setDigit(digit, setting){
		var digitSettings = [
			{'top' : true, 'middle' : false, 'bottom' : true, 'top_right' : true, 'bottom_right' : true, 'bottom_left' : true, 'top_left' : true},			//0
			{'top' : false, 'middle' : false, 'bottom' : false, 'top_right' : true, 'bottom_right' : true, 'bottom_left' : false, 'top_left' : false},		//1
			{'top' : true, 'middle' : true, 'bottom' : true, 'top_right' : true, 'bottom_right' : false, 'bottom_left' : true, 'top_left' : false},			//2
			{'top' : true, 'middle' : true, 'bottom' : true, 'top_right' : true, 'bottom_right' : true, 'bottom_left' : false, 'top_left' : false},			//3
			{'top' : false, 'middle' : true, 'bottom' : false, 'top_right' : true, 'bottom_right' : true, 'bottom_left' : false, 'top_left' : true},		//4
			{'top' : true, 'middle' : true, 'bottom' : true, 'top_right' : false, 'bottom_right' : true, 'bottom_left' : false, 'top_left' : true},			//5
			{'top' : true, 'middle' : true, 'bottom' : true, 'top_right' : false, 'bottom_right' : true, 'bottom_left' : true, 'top_left' : true},			//6
			{'top' : true, 'middle' : false, 'bottom' : false, 'top_right' : true, 'bottom_right' : true, 'bottom_left' : false, 'top_left' : false},		//7
			{'top' : true, 'middle' : true, 'bottom' : true, 'top_right' : true, 'bottom_right' : true, 'bottom_left' : true, 'top_left' : true},			//8
			{'top' : true, 'middle' : true, 'bottom' : true, 'top_right' : true, 'bottom_right' : true, 'bottom_left' : false, 'top_left' : true},			//9
		]

		if ( digitSettings[setting].top == true ) digit.top.setFill(setup.ledEndabled)
			else digit.top.setFill(setup.ledDisabled);
		if ( digitSettings[setting].middle == true ) digit.middle.setFill(setup.ledEndabled);
			else digit.middle.setFill(setup.ledDisabled);
		if ( digitSettings[setting].bottom == true ) digit.bottom.setFill(setup.ledEndabled);
			else digit.bottom.setFill(setup.ledDisabled);
		if ( digitSettings[setting].top_right == true ) digit.top_right.setFill(setup.ledEndabled);
			else digit.top_right.setFill(setup.ledDisabled);
		if ( digitSettings[setting].bottom_right == true ) digit.bottom_right.setFill(setup.ledEndabled);
			else digit.bottom_right.setFill(setup.ledDisabled);
		if ( digitSettings[setting].bottom_left == true ) digit.bottom_left.setFill(setup.ledEndabled);
			else digit.bottom_left.setFill(setup.ledDisabled);
		if ( digitSettings[setting].top_left == true ) digit.top_left.setFill(setup.ledEndabled);
			else digit.top_left.setFill(setup.ledDisabled);
	}

	function setTime(){
		
		var date = new Date();
		var milliseconds = date.getMilliseconds();
		var seconds = date.getSeconds();
		var minutes = date.getMinutes();
		var hours = date.getHours();
		var h2 = hours % 10;
		var h1 = (hours - h2) / 10;
		var m2 = minutes % 10;
		var m1 = (minutes - m2) / 10;
		var s2 = seconds % 10;
		var s1 = (seconds - s2) / 10;
		var ms3 = milliseconds % 10;
		var ms2 = ((milliseconds - ms3) / 10) % 10;
		var ms1 = (milliseconds - ms3 - ms2 * 10) / 100;
		setDigit(led_h1,h1);
		setDigit(led_h2,h2);
		setDigit(led_m1,m1);
		setDigit(led_m2,m2);
		setDigit(led_s1,s1);
		setDigit(led_s2,s2);
		setDigit(led_ms1,ms1);
		setDigit(led_ms2,ms2);
		setDigit(led_ms3,ms3);
		if(s1+s2 == 0) minutesLayer.draw();
		if(m1+m2 == 0) hoursLayer.draw();
		secAndMsecLayer.draw();
	}

	setTime();

	secAndMsecLayer.draw();
	minutesLayer.draw();
	hoursLayer.draw();

	setInterval(setTime, setup.refreshTime)

}(jQuery, this, this.document));