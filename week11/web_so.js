const http = require('http');
const gpio = require('wiring-pi');
const fs = require('fs');
const socketio = require('socket.io');
const LED = 29;
const TRIG = 26;
const ECHO = 27;

var startTime;
var travelTime;
var index = 0;
var value = [];
var timerid;
var timeout = 800;
var cnt=1;

const server = http.createServer((req, res)=>{
	fs.readFile('views/web_so.html', 'utf8', (err, data)=>{
		if(err){
			console.log("No Page");
		}else{
			console.log('Load Page');
			res.writeHead(200, {'Content-Type':"text/html;charset='utf8';"});
			res.end(data);
		}
	});
}).listen(65005, ()=>{
	gpio.wiringPiSetup();
	gpio.pinMode(LED, gpio.OUTPUT);
	gpio.pinMode(ECHO, gpio.INPUT);
	gpio.pinMode(TRIG, gpio.OUTPUT);
	gpio.digitalWrite(LED, 0);
	console.log('Server Running at 65005');
});

const io = socketio.listen(server);
io.sockets.on('connection', (socket)=>{
	socket.on('startmsg', (data)=>{
		console.log('가동메시지 수신(측정주기 : %d)\n', data);
		timeout = data;
		watchon();
	});

	socket.on('stopmsg', (data)=>{
		console.log('중지 메시지 수신\n');
		clearTimeout(timerid);
	});

});


const watchon = ()=>{
	gpio.digitalWrite(TRIG, gpio.LOW);
	gpio.delayMicroseconds(2);
	gpio.digitalWrite(TRIG, gpio.HIGH);
	gpio.delayMicroseconds(20);
	gpio.digitalWrite(TRIG, gpio.LOW);

	while(gpio.digitalRead(ECHO) == gpio.LOW);
	startTime = gpio.micros();
	while(gpio.digitalRead(ECHO) == gpio.HIGH);
	travelTime = gpio.micros() - startTime;

	distance = travelTime / 58;

	if(distance < 400){
		if(index < 500){
			value[index++] = distance;
			console.log("근접거리 : %d cm", value[index-1]);
			io.sockets.emit('watchon', value[index-1]);
		}else{
			index = 0;
		}
		if((index%2)==0){
			gpio.digitalWrite(LED, 1);
		}else{
			gpio.digitalWrite(LED, 0);
		}
	}

	timerid = setTimeout(watchon, timeout);
}
