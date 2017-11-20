const gpio=require('wiring-pi');  
const mysql=require('mysql');  
const express = require('express');
const http = require('http');
const app = express();
const fs = require('fs');
const socketio=require('socket.io');


const TRIG=9;  
const ECHO=8;  

var startTime;//초음파송출시간  
var travelTime;//초음파수신까지경과시간 
var cntTirgger;
var cntRetrieve;

const client=mysql.createConnection({  
	host:'localhost',//DB서버IP주소  
	port:3306,//DB서버Port주소  
	user:'hooney',//DB접속아이디  
	password:'hch',//암호 
	database:'sensor7'//사용할DB명  
});  

const server = http.createServer(function(request,response){  
	fs.readFile('view/webdb_so.html','utf8',function(error,data){  
		response.writeHead(200,{'Content-Type':'text/html'});  
		response.end(data);  });  
}).listen(65001,function(){  
	gpio.wiringPiSetup();  
	gpio.pinMode(TRIG,gpio.OUTPUT);  
	gpio.pinMode(ECHO,gpio.INPUT);  
	console.log('Serverrunningathttp://IP주소:65001');  
});



const Triggering=function(){  
	gpio.digitalWrite(TRIG,gpio.LOW);  
	gpio.delayMicroseconds(2);
	gpio.digitalWrite(TRIG,gpio.HIGH);  
	gpio.delayMicroseconds(20);
	
	gpio.digitalWrite(TRIG,gpio.LOW);  
	while(gpio.digitalRead(ECHO)==gpio.LOW);  
	startTime=gpio.micros();  
	
	while(gpio.digitalRead(ECHO)==gpio.HIGH);  
	travelTime=gpio.micros()-startTime;  
	distance=travelTime/58;  
	if(distance<400){ 
		console.log("Distance : " + distance);
		if(distance<10){  
			let stamptime=new Date();  
			console.log("stamptime : " + stamptime + " / distance : " + distance);
			client.query('INSERT INTO sensor72 VALUES(?,?)',[stamptime,distance],(err,result)=>{  
				if(err){  
					console.log("DB저장실패!");  
					console.log(err);  
				}  
				else{
					console.log("DB저장완료");
				}
			});
		/*client.query*/  
		}  
	}  
	
}

const Retrieve=function(){  
	let stamp_distance;  
	client.query('SELECT * FROM sensor72',function(error,results,fields){  
		/*results.forEach(function(element,i){  
			stamp_distance='';  
			stamp_distance+=element.stamp.toLocaleString()+'.';  
			stamp_distance+=element.stamp.getMilliseconds()+'';  
			stamp_distance+=element.distance;//거리(distance)추가  
			io.sockets.emit('watch', results);
		});*/
			io.sockets.emit('watch', results);
	});
}

const io=socketio.listen(server);  
io.sockets.on('connection',function(socket){  
	socket.on('startmsg',function(){  
		//Triggering();//타이머가동(초음파가동)  
		cntTrigger = setInterval(Triggering,700);  
		cntRetrieve = setInterval(Retrieve, 3000);
	});  
	socket.on('stopmsg',function(){  
		console.log('중지메시자수신!');  
		clearInterval(cntTrigger);  
		clearInterval(cntRetrieve);
	});  
});
