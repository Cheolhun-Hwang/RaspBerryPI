const gpio = require('wiring-pi');
const SOUND = 29;
var count = 0;

const DetectSound = ()=>{
	let data = gpio.digitalRead(SOUND);
	if(data){
		console.log("%d !", count++);
	}
	setTimeout(DetectSound, 10);
	
};

process.on('SIGINT', ()=>{
	console.log("Program Exit...");
	precess.exit();
});
