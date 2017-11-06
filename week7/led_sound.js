const gpio = require('wiring-pi');
const SOUND = 7;
const BLUELED = 29;

const DetectSound = ()=>{
	gpio.digitalWrite(BLUELED, 0);
	var data = gpio.digitalRead(SOUND);
	if(data){
		gpio.digitalWrite(BLUELED, 1);
		console.log("Sound Loud!!");
	}
	setTimeout(DetectSound, 10);
	
};

process.on('SIGINT', ()=>{
	gpio.digitalWrite(BLUELED, 0);
	console.log("Program Exit...");
	process.exit();
});

gpio.wiringPiSetup();
gpio.pinMode(SOUND, gpio.INPUT);
gpio.pinMode(BLUELED, gpio.OUTPUT);
console.log("소리 탐색중");
setTimeout(DetectSound, 1);
