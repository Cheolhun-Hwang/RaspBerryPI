const gpio = require('wiring-pi');

const touch = 26;
const R = 27;
const B = 28;
const G = 29;

var count = 0;


const LedHandler = ()=>{
		gpio.digitalWrite(B, 1);
}

const CheckBTN = () =>{
	let chk = gpio.digitalRead(touch);
	if(chk){
		console.log('Nodejs : Button was pressed!');
		setImmediate(LedHandler);
	}
	setTimeout(CheckBTN, 500);
}

process.on('SIGINT', ()=>{
	gpio.digitalWrite(B, 0);
	console.log("Program Exit..");
	process.exit();
});

gpio.wiringPiSetup();
gpio.pinMode(R, gpio.OUTPUT);
gpio.pinMode(G, gpio.OUTPUT);
gpio.pinMode(B, gpio.OUTPUT);
gpio.pinMode(touch, gpio.INPUT);
setImmediate(CheckBTN);


