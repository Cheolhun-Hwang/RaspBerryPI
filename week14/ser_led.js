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

app.post('/humi', (req, res)=>{
	let num = req.body.num;
	
	console.log("Server Num : " + num);	
	
	nowR +=parseInt(num);

	if(nowR > 100){
		nowR = 100;
	}else if(nowR < 1){
		nowR =1;
	}

	console.log("R Light : " + nowR)
	gpio.softPwmWrite(R, nowR);

});

process.on("SIGINT", ()=>{
	console.log("Exit");
	gpio.softPwmWrite(R, 0);
	process.exit();
});

app.listen(65001, ()=>{
	console.log("Server Running : 65001");
	gpio.wiringPiSetup();
	gpio.pinMode(R, gpio.OUTPUT);
	gpio.pinMode(G, gpio.OUTPUT);
	gpio.pinMode(B, gpio.OUTPUT);
	gpio.softPwmCreate(R, 1, 100);
	gpio.softPwmCreate(G, 1, 100);
	gpio.softPwmCreate(B, 1, 100);
	nowR=0;
	nowG=0;
	nowB=0;
});
