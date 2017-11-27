const gpio.require('wiring-py');
const DT = 25;
const CLK = 24;
const request = require('request');

var rotate = 0;

var data = {
	actid:"rotary",
	red:"OFF",
	green:"OFF",
	blue:"OFF"
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
					data.red="OFF";
					data.green="OFF";
					data.blue="OFF";
					break;
				case 1 : 
					data.red ="ON";
					data.green ="OFF";
					data.blue ="OFF";
					break;
				case 2 :
					data.red = "OFF";
					data.green = "ON";
					data.blue = "OFF";
					break;
				case 3 :
					data.red="OFF";
					data.green="OFF";
					data.blue = "ON";
					break;

				case 4 :
					data.red="ON";
					data.green="ON";
					data.blue = "ON";
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
		}

			switch(rotate){
				case 0:
					data.red="OFF";
					data.green="OFF";
					data.blue="OFF";
					break;
				case 1 : 
					data.red ="ON";
					data.green ="OFF";
					data.blue ="OFF";
					break;
				case 2 :
					data.red = "OFF";
					data.green = "ON";
					data.blue = "OFF";
					break;
				case 3 :
					data.red="OFF";
					data.green="OFF";
					data.blue = "ON";
					break;
				case 4 : 
					data.red="ON";
					data.green="ON";
					data.blue="ON";
					break;
				default:
					break;
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
}
