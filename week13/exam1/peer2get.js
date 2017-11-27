const curl = require('curl');
const express=require('express');
const app = express();

const printmember = (req, res, data) =>{
	console.log("-------------------");
	console.log("이름 : " + data.name);
	console.log("나이 : " + data.age);
	console.log("주소 : " + data.addr);
	console.log("연락처 : " + data.tel);
};

app.listen(65002, ()=>{
	console.log("peer1 : server is activied on 65002");
	curl.getJSON('http://localhost:65001/member', {}, printmember);
});
