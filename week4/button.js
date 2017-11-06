const gpio = require('wiring-pi');

const BTN = 25;
const LED = 29;

var count = 0;


const LedHandler = ()=>{
	if(count > 0){
		gpio.digitalWrite(LED, 1);
		console.log('Nodejs : LED ON');
		count=0;
	}else{
		gpio.digitalWrite(LED, 0);
		console.log('Nodejs : LED OFF');
		count=1;
	}
}

const CheckBTN = () =>{
	let chk = gpio.digitalRead(BTN);
	if(!chk){
		console.log('Nodejs : Button was pressed!');
		setImmediate(LedHandler);
	}
	setTimeout(CheckBTN, 500);
}

process.on('SIGINT', ()=>{
	console.log("Program Exit..");
	process.exit();
});

gpio.wiringPiSetup();
gpio.pinMode(BTN, gpio.INPUT);
setImmediate(CheckBTN);


