const express = require('express');
const fs = require('fs');
const app = express();
const gpio = require('wiring-pi');
const mcpadc = require('mcp-adc');
const soundsensor = new mcpadc.Mcp3208();
const body = require('body-parser');

const CS_MCP3208 = 10;
const SPI_CHANNEL = 0;
const SPI_SPEED = 1000000
var QuietSound = 1997;
var sid;

app.use(body.urlencoded({extended:false}));

const SoundDetected = ()=>{
	soundsensor.readRawValue(SPI_CHANNEL, function(value){
		if(value > QuietSound){
			console.log("기준값: (%d), 아날로그 측정값: (%d)", QuietSound, value);
		}else{
			console.log("인식 불가");
		}
	});
	sid = setTimeout(SoundDetected, 200);
};

process.on('SIGINT', ()=>{
	console.log('Program Exit()...');	
	process.exit();
});

app.get('/', (req, res)=>{
	console.log('sensor호출!');
	fs.readFile('view/sen.html', 'utf8', (err, data)=>{
		if(err){
			res.send(500);
		}else{
			res.status(200).send(data);
		}
	});
});

app.post('/', (req,res)=>{
	let body = req.body;
	console.log('다음값으로 설정합니다.');
	console.log('==> : ' + body.threshold);
	QuietSound = body.threshold;
	res.redirect('/');
});


app.get('/1', (req, res)=>{
	console.log('sound sensor ON 호출');
	sid=setTimeout(SoundDetected, 200);
	res.redirect('/');
});
app.get('/0', (req, res)=>{
	console.log('sound sensor OFF 호출');
	clearTimeout(sid);
	res.redirect('/');
});

app.listen(60001, ()=>{
	gpio.wiringPiSetup();;
	gpio.wiringPiSPISetup(SPI_CHANNEL, SPI_SPEED);
	gpio.pinMode(CS_MCP3208, gpio.OUTPUT);
	console.log('아날로그 사운드 제어용 웹서버.');
	console.log('Server is Running : 60001');
});
