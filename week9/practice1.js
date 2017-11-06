const gpio = require('wiring-pi');

const touch = 26;
const BZR = 25;
const R = 27;
const G = 28;
const B = 29;
const Light=24;

var cntLight;
var count = 0;
var time;
const onBZR = function(){
	console.log("on BZR time : " + time);
	gpio.digitalWrite(BZR, 1);
	setTimeout(offBZR, time);
}

const offBZR = function(){
	console.log("off BZR");
	gpio.digitalWrite(BZR, 0);
}

const onGreen = function(){
	console.log("on GREEN");
	gpio.digitalWrite(G, 1);
}

const offGreen = function(){
	console.log("off GREEN");
	gpio.digitalWrite(G, 0);
}

const onRed = function(){
	console.log("on RED");
	gpio.digitalWrite(R, 1);
}

const offRed = function(){
	console.log("off RED");
	gpio.digitalWrite(R, 0);
}

const onBlue = function(){
	console.log("on BLUE");
	gpio.digitalWrite(B, 1);
}

const offBlue = function(){
	console.log("off BLUE");
	gpio.digitalWrite(B, 0);
}

const onLight = function(){
	console.log("On Touch");
	let isLight = gpio.digitalRead(Light);
	if(!isLight){
		console.log("Light!!!");
	//밝음
	setImmediate(offRed);
	}else{
		console.log("Dark!!");
	setImmediate(onRed);
	}
}

const onTouch = function(){
	console.log("On Touch");
	let isTouch = gpio.digitalRead(touch);
	if(isTouch){
		if(count ==0){
			console.log("Touch 1");
			time = 50;
			setImmediate(onBZR);
			setImmediate(onGreen);
			setImmediate(onBlue);
			cntLight = setInterval(onLight, 2000);
			count = 1;
		}else if(count ==1){
			console.log("Touch 2");
			time=80;
			setImmediate(onBZR);
			setImmediate(offGreen);
			setImmediate(offBlue);
			clearInterval(cntLight);
			count=2;
		}else if(count == 2){
			console.log("Touch 3");
			time=100;
			setImmediate(onBZR);
			gpio.delay(100);
			setImmediate(onBZR);
			count=0;

			setImmediate(offRed);
			setImmediate(offBlue);
			setImmediate(offGreen);
			process.exit();
		}
	}
	gpio.delay(500);
}


gpio.wiringPiSetup();
gpio.pinMode(BZR, gpio.OUTPUT);
gpio.pinMode(R, gpio.OUTPUT);
gpio.pinMode(G, gpio.OUTPUT);
gpio.pinMode(B, gpio.OUTPUT);
gpio.pinMode(Light, gpio.INPUT);
gpio.pinMode(touch, gpio.INPUT);

gpio.wiringPiISR(touch, gpio.INT_EDGE_RISING, onTouch);
