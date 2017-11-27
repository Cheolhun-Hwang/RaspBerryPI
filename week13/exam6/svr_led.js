const express = require('express');
const bodyparser = require('body-parser');
const gpio = require('wiring-pi');
const app = express();

const R = 29;
const G = 27;
const B = 28;

app.use(bodyparser.urlencoded({extended:false}));

var data= {
	actid:"rotary",
	num:-1
}

app.put("/rotary", (req, res)=>{
	console.log("server rotary!!");
	if(req.body.actid == 'rotary'){
		if(req.body.num == 0){
			gpio.digitalWrite(R, 0);
			gpio.digitalWrite(G, 0);
			gpio.digitalWrite(B, 0);
		}else
		if(req.body.num == 1){
			gpio.digitalWrite(R, 1);
			gpio.digitalWrite(G, 0);
			gpio.digitalWrite(B, 0);
		}else
		if(req.body.num == 2){
			gpio.digitalWrite(R, 0);
			gpio.digitalWrite(G, 1);
			gpio.digitalWrite(B, 0);
		}else
		if(req.body.num == 3){
			gpio.digitalWrite(R, 0);
			gpio.digitalWrite(G, 0);
			gpio.digitalWrite(B, 1);
		}else
		if(req.body.num == 4){
			gpio.digitalWrite(R, 1);
			gpio.digitalWrite(G, 1);
			gpio.digitalWrite(B, 1);
		}
		
		res.send("OK");
	}else{
		res.send("None Rotary");
	}
});


app.listen(65001, ()=>{
	console.log("65001 Running");
	gpio.wiringPiSetup();
	gpio.pinMode(R, gpio.OUTPUT);
	gpio.pinMode(G, gpio.OUTPUT);
	gpio.pinMode(B, gpio.OUTPUT);
});

