const humi = require('node-dht-sensor');
const req = require('request');

var bfHumi;
var isfirst = true;

var data = {
	action:'humi',
	humi:0,
	num:0
}

const htsensor={
	sensors:[
		{name:"humi(white)",
		type:22,
		pin:4
		}
	],

	read : function(){
		for(let index in this.sensors){
			let result;
			result = humi.read(this.sensors[index].type, this.sensors[index].pin);
			console.log(this.sensors[index].name + " : " + result.humidity.toFixed(1)+"%");
			
			bfHumi = data.humi;
			data.humi = result.humidity.toFixed(1);
			if(isfirst){
				bfHumi = data.humi;
				isfirst = false;
			}

			console.log("bfHumi : " + parseFloat(bfHumi));
			console.log("data.humi : " + parseFloat(data.humi));
			console.log( parseFloat(data.hunmi) - parseFloat(bfHumi));
			
			if(parseFloat(data.humi)-parseFloat(bfHumi) >= 1){
				data.num = parseFloat(data.humi)-parseFloat(bfHumi);
				sendPost();
			}

		}
		setTimeout(function(){htsensor.read();}, 2500);
	}
};

const sendPost = () =>{
	req.post(
		{
			url:"http://192.9.112.177:65001/humi",
			form:data,
			header:{"content-type":"application/x-www-form-urlencoded"}
		},
		function(err, res){
			if(err){
				console.log("Post Send Error");
			}else{
				console.log("Post Send Ok");
			}
		}
	);
}

process.on("SIGINT", ()=>{
	console.log("Program Exit..");
	process.exit();
});

htsensor.read();
