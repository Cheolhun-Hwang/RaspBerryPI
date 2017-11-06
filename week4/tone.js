const gpio = require('wiring-pi');
const  BZR = 29;

var tones = [65, 73, 82, 87, 97, 110, 123, 130,
		146, 164, 174, 195, 220, 246, 261,
		294, 330, 349, 392, 440, 494, 523];
		
var index = 0;

const Turnon = ()=>{
	gpio.softToneCreate(BZR);
	if(index >= tones.lenth -1){index = 0}
	gpio.softToneWrite(BZR, tones[index++]);
	console.log('Nodejs : %d 번째(frequency : %d)', index, tones[index]);
	setTimeout(Turnon, 1000);
}

gpio.wiringPiSetup();
gpio.pinMode(BZR, gpio.OUTPUT);
setImmediate(Turnon);
