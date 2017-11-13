const gpio = require('wiring-pi');
const TRIG = 26;
const ECHO = 27;

var startTime; // 초음파 송출 시간 output
var travelTime; // 초음파 수신까지 경과 시간 input

const Triggering = ()=>{
	gpio.digitalWrite(TRIG, gpio.LOW);
	gpio.delayMicroseconds(2);
	gpio.digitalWrite(TRIG, gpio.HIGH);
	gpio.delayMicroseconds(20);
	gpio.digitalWrite(TRIG, gpio.LOW);

	while(gpio.digitalRead(ECHO) == gpio.LOW);

	startTime = gpio.micros();
	while(gpio.digitalRead(ECHO) == gpio.HIGH);
	travelTime = gpio.micros() -  startTime;

	distance = travelTime / 58;  
	/* 거리 구하는 공식에 따른 58 값을 나눔 */
	if(distance > 400)
		console.log("Distance : %d cm\n", distance);
	setTimeout(Triggering, 500);
}

process.on('SIGINT', ()=>{
	console.log('Program Exit..');
	process.exit();
});

gpio.wiringPiSetup();
gpio.pinMode(TRIG, gpio.OUTPUT);
gpio.pinMode(ECHO, gpio.INPUT);
setTimeout(Triggering, 1);
