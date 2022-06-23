
const express = require('express');
const app = express();
// const cors = require('cors');
// app.use(cors());


// const bodyParser = require('body-parser');






app.use(express.static('abc'));
// app.use(bodyParser.json()); // support json encoded bodies
// app.use(bodyParser.urlencoded({ extended: true }));
// //whether you want nested objects support  or not

const mysql=require('mysql2');
const connection=mysql.createConnection({
	host:'localhost',
	user:'root',
	password:'cdac',
	database:'pleasework',
	port:3306
});

app.get("/addbooks",(req,res)=>{
	let bookid=req.query.bookid;
	let bookname=req.query.bookname;
	let price=req.query.price;
	let output={status:false,bookDetails:{bookid:"",bookname:"",price:""}};
	connection.query('insert into book values (?,?,?)',[bookid,bookname,price],(error,result)=>{
		if(error){
				console.log(error);
		}else{
			console.log(result);
			if(result.affectedRows>0){
				output.status=true;
				output.bookDetails.bookid=result[0].bookid;
				output.bookDetails.bookname=result[0].bookname;
				output.bookDetails.price=result[0].price;
			}
		}
		res.send(output);
	});
	
});


app.get("/showall",(req,res)=>{
	// let bookid=req.query.bookid;
	// let bookname=req.query.bookname;
	// let price=req.query.price;
	// let output={status:false,bookDetails:{bookid:"",bookname:"",price:""}};
	connection.query('select * from book',[],(error,result)=>{
		if(error){
				console.log(error);
		}else{
			console.log(result);
		}
		res.send(result);
	});
	
});




// var result;

// app.post('/poc1', function (req, res) {
	
// 		console.log("reading input " + req.body.v1 +  "  second " + req.body.v2)
		
//     	var xyz ={ v1:37, v2:35};
//         res.send(xyz);
//     });


// app.get('/poc2', function (req, res) {
    
	
//         console.log("reading input " + req.query.xyz);
		
//     	var xyz ={ v1:37, v2:35};

// 		res.send(xyz);

// 		});




app.listen(8081, function () {
    console.log("server listening at port 8081...");
});