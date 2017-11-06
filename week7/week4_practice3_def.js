const gpio = require('wiring-pi');

const BZR = 25;
const LED_B = 27;
const LED_G = 28;
const LED_R = 29;
const BTN = 24;
const Light = 26;

var count = 0;
var repeat;
const TurnOnBZR = () =>{
	gpio.digitalWrite(BZR, 1);
	setTimeout(TurnOffBZR, 500);
}

const TurnOffBZR = () =>{
	gpio.digitalWrite(BZR, 0);
}

const CheckLight = ()=>{
	var data = gpio.digitalRead(Light);
	if(!data){
		console.log("Stat : Light");
		gpio.digitalWrite(LED_B, 0);
		gpio.digitalWrite(LED_R, 0);
		gpio.digitalWrite(LED_G, 0);
	}else{
		console.log("Stat : Dark");
		gpio.digitalWrite(LED_B, 1);
		gpio.digitalWrite(LED_R, 1);
		gpio.digitalWrite(LED_G, 1);
	}
}


const pressBTN = () =>{
	let chk = gpio.digitalRead(BTN);
	if(!chk){
		if(count == 0){
		console.log("Stat : On");
		repeat = setInterval(CheckLight, 200);
		setImmediate(TurnOnBZR);
		count = 1;
		}else if(count ==1){
		count = 0;
		clearInterval(repeat);
		console.log("Stat : Off");
		}
	}
	setTimeout(pressBTN, 200);
}

process.on('SIGINT', ()=>{
	gpio.digitalWrite(LED_B, 0);
	gpio.digitalWrite(LED_G, 0);
	gpio.digitalWrite(LED_R, 0);
	gpio.digitalWrite(BZR, 0);
	process.exit();
})

gpio.wiringPiSetup();
gpio.pinMode(BZR, gpio.OUTPUT);
gpio.pinMode(LED_R, gpio.OUTPUT);
gpio.pinMode(LED_G, gpio.OUTPUT);
gpio.pinMode(LED_B, gpio.OUTPUT);
gpio.pinMode(BTN, gpio.INPUT);
gpio.pinMode(Light, gpio.INPUT);
setImmediate(pressBTN);
