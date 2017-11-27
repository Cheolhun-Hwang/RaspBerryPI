const express=require('express');
const bodyParser = require('body-parser');
const app = express();

var mydata = {
	name:'',
	age:0,
	addr:"",
	tel:""
};

app.use(bodyParser.urlencoded({extended:false}));



const postmember = (req, res) =>{
	console.log("POST Method");
	console.log("이름 : " + req.body.name);
	console.log("나이 : " + req.body.age);
	res.send("True");
}

app.post('/member', postmember);

app.listen(65001, ()=>{
	console.log("peer1 : server is activied on 65001");
});
