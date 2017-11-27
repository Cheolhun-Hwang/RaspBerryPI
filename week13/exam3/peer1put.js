const express=require('express');
const bodyparser = require('body-parser');
const app = express();

var mydata = {
	name:'홍길동',
	age:27,
	addr:"수원",
	tel:"010-999-9999"
};

app.use(bodyparser.urlencoded({extended:false}));


app.put('/member', function(req, res){
	console.log("PUT method 수신");
	console.log("이름 : " + req.body.name);
	console.log("나이 : " + req.body.age);
	res.send("True");
});

app.listen(65001, ()=>{
	console.log("peer1 : server is activied on 65001");
});
