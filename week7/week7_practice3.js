const gpio = require('wiring-pi');

const BZR = 25;
const LED_B = 27;
const LED_G = 28;
const LED_R = 29;
const LED = 21;
const BTN = 24;
const Light = 26;
const Touch = 23;
const Relay = 22;

var TouchSens;
var Btn;
var Sensing;

var count = 0;

const TurnOnBZR = () =>{
	gpio.digitalWrite(BZR, 1);
	setTimeout(TurnOffBZR, 100);
}

const TurnOnBZRTS = () =>{
	gpio.digitalWrite(BZR, 1);
	setTimeout(TurnOffBZR, 200);
}

const TurnOffBZR = () =>{
	gpio.digitalWrite(BZR, 0);
}

const TurnOnLed = ()=>{
	gpio.digitalWrite(LED, 1);
	setTimeout(TurnOffLed, 200);
}

const TurnOffLed = ()=>{
	gpio.digitalWrite(LED, 0);
}

const pressTouch = ()=>{
	let chk = gpio.digitalRead(Touch);
	if(chk){
		setImmediate(TurnOnBZRTS);
		setImmediate(TurnOnLed);
	}
}

const TurnOnLed3 = ()=>{
	gpio.digitalWrite(LED_B, 1);
	gpio.digitalWrite(LED_G, 1);
	gpio.digitalWrite(LED_R, 1);
	console.log("LED3 : Light");
	Sensing = setInterval(CheckLight);
}

const TurnOffLed3 = ()=>{
	gpio.digitalWrite(LED_B, 0);
	gpio.digitalWrite(LED_G, 0);
	gpio.digitalWrite(LED_R, 0);
	console.log("LED3 : OUT");
	clearInterval(CheckLight);
}

const TurnOnRelay = ()=>{
	gpio.digitalWrite(Relay, gpio.HIGH);
	console.log("Relay : ON");
}

const TurnOffRelay = () =>{
	gpio.digitalWrite(Relay, gpio.LOW);
	console.log("Relay : Off");
}

const CheckLight = ()=>{
	var data = gpio.digitalRead(Light);
	if(!data){
		setImmediate(TurnOffRelay);
	}else{
		setImmediate(TurnOnRelay);
	}
}

const pressBTN = ()=>{
	let chk = gpio.digitalRead(BTN);
	if(!chk){
		if(count == 0){
			setImmediate(TurnOnBZR);
			setImmediate(TurnOnLed3);
		}else if(count == 1){
			setImmediate(TurnOnBZR);
			setImmediate(TurnOffLed3);
		}else{
			console.log("Error");
		}
	}
}



process.on('SIGINT', ()=>{
	gpio.digitalWrite(LED_B, 0);
	gpio.digitalWrite(LED_G, 0);
	gpio.digitalWrite(LED_R, 0);
	gpio.digitalWrite(LED, 0);
	gpio.digitalWrite(BZR, 0);
	clearInterval(TouchSens);
	clearInterval(Btn);
	process.exit();
})

gpio.wiringPiSetup();
gpio.pinMode(BZR, gpio.OUTPUT);
gpio.pinMode(LED_R, gpio.OUTPUT);
gpio.pinMode(LED_G, gpio.OUTPUT);
gpio.pinMode(LED_B, gpio.OUTPUT);
gpio.pinMode(Relay, gpio.OUTPUT);
gpio.pinMode(BTN, gpio.INPUT);
gpio.pinMode(Light, gpio.INPUT);
gpio.pinMode(LED, gpio.INPUT);

TouchSens = setInterval(pressTouch, 500);
Btn = setInterval(pressBTN, 500);
