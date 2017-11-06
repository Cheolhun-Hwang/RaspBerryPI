const gpio = require('wiring-pi');
const LEDPIN = 4;
var count = 0;

const TimeOutHandler = function(){
	if(count>0){
		gpio.digitalWrite(LEDPIN, 1);
		console.log("Node : LED on");
		count = 0;
	}
	else{
		gpio.digitalWrite(LEDPIN, 0);
		console.log("Node : LED off");
		count = 1;
	}
	setTimeout(TimeOutHandler, 1000);
}
	gpio.wiringPiSetup();
	gpio.pinMode(LEDPIN, gpio.OUTPUT);
	setTimeout(TimeOutHandler, 1000);

