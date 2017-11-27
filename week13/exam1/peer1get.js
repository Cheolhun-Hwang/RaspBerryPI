const express=require('express');
const app = express();

var mydata = {
	name:'홍길동',
	age:27,
	addr:"수원",
	tel:"010-999-9999"
};

const getmember = (req, res) =>{
	console.log("peer2 : get request from peer1");
	res.send(mydata);
}

app.get('/member', getmember);

app.listen(65001, ()=>{
	console.log("peer1 : server is activied on 65001");
});
