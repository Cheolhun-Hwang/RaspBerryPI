const gpio = require('wiring-pi');
const DT = 25;
const CLK = 24;
const request = require('request');

var rotate = 0;

var data = {
	actid:"rotary",
	num:-1
};

const SenseRotate = ()=>{
	var checked = 0;

	while(gpio.digitalRead(DT)==0){
		if(checked == 0){
			rotate ++;
			checked ++;
			console.log(rotate);
		
			switch(rotate){
				case 0:
					data.num=0;
					send();
					break;
				case 1 : 
					data.num =1;
					send();
					break;
				case 2 :
					data.num = 2;
					send();
					break;
				case 3 :
					data.num = 3;
					send();
					break;

				case 4 :
					data.num = 4;
					send();
					break;

				default :
					console.log("None");
					break;
			}
		
		}
	
		while(gpio.digitalRead(CLK)==0){}
	}

	while(gpio.digitalRead(CLK)==0){
		if(checked==0){
			rotate --;
			checked ++;
			console.log(rotate);
		

			switch(rotate){
				case 0:
					data.num=0;
					send();
					break;
				case 1 : 
					data.num =1;
					send();
					break;
				case 2 :
					data.num = 2;
					send();
					break;
				case 3 :
					data.num = 3;
					send();
					break;
				case 4 : 
					data.num=4;
					send();
					break;
				default:
					break;
			}
		}
		while(gpio.digitalRead(DT)==0){}
	}

	setTimeout(SenseRotate, 20);
}


var send = ()=>{
	request.put(
		{url:"http://192.9.112.87:65001/rotary",
		form:data,
		header:{"content-type":"application/x-www-form-urlencoded"}
		
		},
		function(err, res, body){
			if(!err && res.statusCode == 200){
				console.log(body);
			}
		}
	);
};

gpio.wiringPiSetup();
gpio.pinMode(DT, gpio.INPUT);
gpio.pinMode(CLK, gpio.INPUT);
setImmediate(SenseRotate);

