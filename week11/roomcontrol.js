const humitemp = require('node-dht-sensor');
const gpio = require('wiring-pi');
const RELAY = 29;

var beforTemp;
var index = 0;
var cntRelay;

const TurnOn = ()=>{
	gpio.digitalWrite(RELAY, gpio.HIGH);
	console.log('Relay On');
}

const TurnOff = ()=>{
	gpio.digitalWrite(RELAY, gpio.LOW);
	console.log("Relay Off");
}

const htsensor = {
	sensors:[{name:"Outdoor(White)",
			type:22, pin:16}
	],
	read : function(){
			let result;
			result = humitemp.read(this.sensors[index].type, this.sensors[index].pin);
			console.log(this.sensors[index].name + ":"
			+ result.temperature.toFixed(1)+"C,"
			+ result.humidity.toFixed(1) + "%");
		let nowtemp = result.temperature.toFixed(1);
		console.log('BeforTemp : ' + beforTemp + " / NowTemp : " + nowtemp);
		if((beforTemp != undefined)){
			let temp = nowtemp - beforTemp;

			console.log('temp : ' + temp);
			if(temp > 0){
				console.log('need Fan');
				if(temp >= 1){
				cntRelay = setInterval(TurnOn, 500);
				}

				beforTemp = result.temperature.toFixed(1);
			}else if(temp < 0){
				console.log('out Fan');
				if(temp <= -1){
				clearTimeout(cntRelay);
				}
			}
		}else{
			beforTemp = result.temperature.toFixed(1);
		}


		setTimeout(function(){htsensor.read();}, 2500);
	}
};

gpio.wiringPiSetup();
gpio.pinMode(RELAY, gpio.OUTPUT);

htsensor.read();


