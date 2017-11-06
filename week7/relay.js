const gpio = require('wiring-pi');
const RELAY = 22;

const TurnOn = ()=>{
	gpio.digitalWrite(RELAY, gpio.HIGH);
	console.log("Relay : ON");
	setTimeout(TurnOff, 3000);
}
const TurnOff = ()=>{
	gpio.digitalWrite(RELAY, gpio.LOW);
	console.log("Relay : OFF");
	setTimeout(TurnOn, 3000);
}

gpio.wiringPiSetup();
gpio.pinMode(RELAY, gpio.OUTPUT);
setTimeout(TurnOn, 200);
