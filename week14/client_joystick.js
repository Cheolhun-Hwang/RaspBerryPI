const express = require('express');
const app = express();
const gpio = require('wiring-pi');
const mcpadc = require('mcp-adc');
const joystick = new mcpadc.Mcp3208();
const request = require('request');

const CS_MCP3208 = 10;
const X_CHANNEL = 0;
const Y_CHANNEL = 1;
const SPI_SPEED = 1000000;
var sid;

var data = {
	action:"led",
	index:-1
}

const getjoystick = ()=>{
	joystick.readRawValue(X_CHANNEL, function(value){
		if(value > 3000){
			// up
			console.log("X : " + value);
			data.index = 1;
			sendPost();

		}else if(value < 1000){
			// down
			console.log("X : " + value);
			data.index = 3;
			sendPost();
		}
	});
	joystick.readRawValue(Y_CHANNEL, function(value){
		if(value > 3000){
			// right
			console.log("Y : " + value);
			data.index = 0;
			sendPost();
		}else if(value < 1000){
			//left
			console.log("Y : " + value);
			data.index = 2;
			sendPost();
		}
	});
	sid = setTimeout(getjoystick, 200);
}

const sendPost = () =>{
	request.post(
		{ 
			url:'http://192.9.112.177:65001/led',
			form:data,
			headers : {"content-type":"application/x-www-form-urlencoded"}
		},
		function(err, res){
			if(!err && res.statusCode == 200){
				console.log("Post Send OK.");
			}else if(err){
				console.log("Post Send Error");
			}
		}
	);
}

gpio.wiringPiSetup();
gpio.wiringPiSPISetup(X_CHANNEL, SPI_SPEED);
gpio.wiringPiSPISetup(Y_CHANNEL, SPI_SPEED);
gpio.pinMode(CS_MCP3208, gpio.OUTPUT);
setImmediate(getjoystick);




