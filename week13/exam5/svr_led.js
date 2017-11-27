const express = require('express');
const gpio = require('wiring-pi');
const bodyparser = require("body-parser");
const app = express();

const G = 29;
const R = 28;
const B = 27;

var mydata = {
	actid:"LED3",
	red:"OFF",
	green:"OFF",
	blue:"OFF"
};

app.use(bodyparser.urlencoded({extended:false}));

app.put('/led', led3control);

app.get('/led', (req, res)=>{
	console.log('Get Method');
	res.send('OK');
});

app.listen(65001, ()=>{
	console.log("65001 running");
	gpio.wiringPiSetup();
	gpio.pinMode(G, gpio.OUTPUT);
	gpio.pinMode(B, gpio.OUTPUT);
	gpio.pinMode(R, gpio.OUTPUT);
});

const led3control = (req, res)=>{
	console.log("PUT Method");
	if(req.body.actid == "LED3"){
		if(req.body.red == "ON"){
			gpio.digitalWrite(R, 1);
			gpio.digitalWrite(B, 0);
			gpio.digitalWrite(G, 0);
		}else if(req.body.green == "ON"){
			gpio.digitalWrite(R, 0);
			gpio.digitalWrite(B, 0);
			gpio.digitalWrite(G, 1);
		}else if(req.body.blue == "ON"){
			gpio.digitalWrite(R, 0);
			gpio.digitalWrite(B, 1);
			gpio.digitalWrite(G, 0);
		}
		res.send("OK");
	}else{
		res.send("Fail");
	}
}


