const gpio = require('wiring-pi');
const BZR = 29;
const LED = 25;

const TurnOn = ()=>{
	gpio.digitalWrite(BZR, 0);
	gpio.digitalWrite(LED, 1);
	console.log('BZR Off, LED on');
	setTimeout(TurnOff, 1000);
}

const TurnOff = () =>{
	gpio.digitalWrite(LED, 0);
	gpio.digitalWrite(BZR, 1);
	console.log('BZR On, LED off');
	setTimeout(TurnOn, 200);
}

process.on('SIGINT', ()=>{
	gpio.digitalWrite(LED, 0);
	gpio.digitalWrite(BZR, 0);
	cnosole.log('Exit..');
	process.exit();
});

gpio.wiringPiSetup();
gpio.pinMode(BZR, gpio.OUTPUT);
gpio.pinMode(LED, gpio.OUTPUT);
setTimeout(TurnOn, 200);
