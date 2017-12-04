const express = require('express');
const app = express();
const body = require('body-parser');
const gpio = require('wiring-pi')

const R = 27;
const G = 28;
const B = 29;

var nowR, nowG, nowB;

var index;

app.use(body.urlencoded({extended:false}));

var data = {
	action : "led",
	index : -1
}

const RedLight = ()=>{
	nowR  = nowR+10;
	if(nowR> 99){
		nowR = 99;
	}
	console.log("R Light : " + nowR)
	gpio.softPwmWrite(R, nowR);
}

const RedDown = () =>{
	nowR = nowR-10;
	if(nowR<0){
		nowR = 0;
	}
	console.log("R Light : " + nowR);
	gpio.softPwmWrite(R, nowR);
}

const BlueLight = () => {
	nowB = nowB+10;
	if(nowB> 99){
		nowB = 99;
	}
	console.log("B Light  : " + nowB);
	gpio.softPwmWrite(B, nowB);
}

const BlueDown = ()=>{
	nowB = nowB-10;
	if(nowB<0){
		nowB = 0;
	}
	console.log("B Light : " + nowB);
	gpio.softPwmWrite(B, nowB);
}

app.post('/led', (req, res)=>{
	let pos = req.body.index;
	index = pos;
	console.log("Server Position : " + pos);
	switch(index){
		case "0":
			RedLight();
			break;
		case "1":
			BlueLight();
			break;
		case "2":
			RedDown();
			break;
		case "3":
			BlueDown();
			break;
		default:
			console.log("pos Error");
			break;
	}
});


app.listen(65001, ()=>{
	console.log("Server Running : 65001");
	gpio.wiringPiSetup();
	gpio.pinMode(R, gpio.OUTPUT);
	gpio.pinMode(G, gpio.OUTPUT);
	gpio.pinMode(B, gpio.OUTPUT);
	gpio.softPwmCreate(R, 0, 99);
	gpio.softPwmCreate(G, 0, 99);
	gpio.softPwmCreate(B, 0, 99);
	nowR=0;
	nowG=0;
	nowB=0;
});
