const req = require('request');

var peer2data = {
	name:"bmlee",
	age:89,
	addr:"성남",
	tel:"010-222-3333"
};

req.post(
	{
		url:"http://192.9.112.87:65001/member",
		form:peer2data,
		headers:{"content-type":"application/x-www-form-urlencoded"},
		function(err, res, body){
			if(!err && res.statusCode == 200){
				console.log(body);
			}
		}
	}
);

