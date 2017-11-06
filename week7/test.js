const gpio = require('wiring-pi');
const LED = 29;

const TurnOn = ()=>{
	gpio.digitalWrite(LED, 1);
	console.log("Relay : ON");
	setTimeout(TurnOff, 3000);
}
const TurnOff = ()=>{
	gpio.digitalWrite(LED, 0);
	console.log("Relay : OFF");
	setTimeout(TurnOn, 3000);
}

gpio.wiringPiSetup();
gpio.pinMode(LED, gpio.OUTPUT);
setTimeout(TurnOn, 200);
