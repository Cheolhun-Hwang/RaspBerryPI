const gpio = require('wiring-pi');
const ejs = require('ejs');
const fs = require('fs');
const express = require('express');

const app = express();

const BUZ = 24;
const LEDR = 28;
const LEDG = 29;
const LEDB = 27;
const LIGHT = 25;
const SOUND = 26;

var timerid, index, value=[];
var soundid, index_s, value_s=[];
var ledRstate = '#b0b0b0';
var ledGstate = '#b0b0b0';
var ledBstate = '#b0b0b0';
var buzState = '#b0b0b0';
var lightState = '#b0b0b0';
var soundState = '#b0b0b0';

app.get("/", (req, res)=>{
	fs.readFile('view/contpage.ejs', 'utf8', (err, data)=>{
		if(err){
			res.send(500);
		}else{
			res.status(200).send(ejs.render(data, {
				LEDR:ledRstate,
				LEDG:ledGstate,
				LEDB:ledBstate,
				BUZ:buzState,
				LIGHT:lightState
			}));
		}
	});
});

app.get('/LEDB/1', (req, res)=>{
	console.log('LEDB ON');
	gpio.digitalWrite(LEDB, 1);
	ledBstate = '#0000FF';
	res.redirect('/');
});
app.get('/LEDB/0', (req, res)=>{
	console.log('LEDB OFF');
	gpio.digitalWrite(LEDB, 0);
	ledBstate = '#b0b0b0';
	res.redirect('/');
});
app.get('/LEDR/1', (req, res)=>{
	console.log('LEDR ON');
	gpio.digitalWrite(LEDR, 1);
	ledBstate = '#FF0000';
	res.redirect('/');
});
app.get('/LEDR/0', (req, res)=>{
	console.log('LEDR OFF');
	gpio.digitalWrite(LEDR, 0);
	ledBstate = '#b0b0b0';
	res.redirect('/');
});
app.get('/LEDG/1', (req, res)=>{
	console.log('LEDG ON');
	gpio.digitalWrite(LEDG, 1);
	ledBstate = '#00FF00';
	res.redirect('/');
});
app.get('/LEDG/0', (req, res)=>{
	console.log('LEDG OFF');
	gpio.digitalWrite(LEDG, 0);
	ledBstate = '#b0b0b0';
	res.redirect('/');
});
app.get('/BUZ/1', (req, res)=>{
	console.log('BUZ ON');
	gpio.digitalWrite(BUZ, 1);
	ledBstate = '#0000FF';
	res.redirect('/');
});
app.get('/BUZ/0', (req, res)=>{
	console.log('BUZ OFF');
	gpio.digitalWrite(BUZ, 0);
	ledBstate = '#b0b0b0';
	res.redirect('/');
});

const lightctl = () =>{
	if(index < 500){
		value[index++] = gpio.digitalRead(LIGHT);
		console.log('value:'+value[index-1]);
	}else{
		index = 0;
	}
	timerid = setTimeout(lightctl, 1000);
}

app.get('/LIGHT/1', (req, res)=>{
	console.log('LIGHT 1');
	timerid = setTimeout(lightctl, 100);
	lightState = '#00ffff';
	res.redirect('/');
});
app.get('/LIGHT/0', (req, res)=>{
	console.log('LIGHT 0');
	clearTimeout(timerid);
	lightSstate = '#b0b0b0';
	res.redirect('/');
});
app.get('/LIGHT/2', (req, res)=>{
	console.log('LIGHT 2');
	fs.readFile('view/lightdata.ejs', 'utf8', (err, data)=>{
		if(err){
			res.send(500);
		}else{
			res.status(200).send(ejs.render(data, {lightdata:value}));
		}
	});
	
	
});
 
const soundctl = () =>{
	if(index_s < 500){
		value_s[index_s++] = gpio.digitalRead(SOUND);
		console.log('value_s:'+value_s[index_s-1]);
	}else{
		index_s = 0;
	}
	soundid = setTimeout(soundctl, 1000);
}

app.get('/SOUND/1', (req, res)=>{
	console.log('SOUND 1');
	soundid = setTimeout(soundctl, 100);
	soundState = '#00ffff';
	res.redirect('/');
});
app.get('/SOUND/0', (req, res)=>{
	console.log('SOUND 0');
	clearTimeout(soundid);
	soundSstate = '#b0b0b0';
	res.redirect('/');
});
app.get('/SOUND/2', (req, res)=>{
	console.log('SOUND 2');
	fs.readFile('view/sounddata.ejs', 'utf8', (err, data)=>{
		if(err){
			res.send(500);
		}else{
			res.status(200).send(ejs.render(data, {sounddata:value_s}));
		}
	});
});

app.listen(60001, ()=>{
	gpio.wiringPiSetup();
	gpio.pinMode(LEDR, gpio.OUTPUT);
	gpio.pinMode(LEDG, gpio.OUTPUT);
	gpio.pinMode(LEDB, gpio.OUTPUT);
	gpio.pinMode(BUZ, gpio.OUTPUT);
	gpio.pinMode(LIGHT, gpio.INPUT);
	gpio.pinMode(SOUND, gpio.INPUT);
	console.log('Server Running : 60001');
});
