const express=require("express");

const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");


const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){

  const firstName=req.body.fName;
  const lastName=req.body.lName;
  const email=req.body.email;

  


const data={
  members:[
    {
      email_address: email,
      status:"subscrided",
      merge_fields:{
        FNAME: firstName,
        LNAME: lastName,
      }
    }
  ]
};

const jsonData=JSON.stringify(data);

const url="https://us20.api.mailchimp.com/3.0/lists/891dfa6ecd";

const opitions = {
  method:"POST",
  auth:"bob1:836cdca68c240264dc602185b81bea9b-us20"
};

const request=https.request(url,opitions,function(response){
  if(response.statusCode === 400){
    res.send("成功")
  }else{
    res.send("失敗");
  }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
});

request.write(jsonData);
request.end();
});

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000.");
});


//API id
//836cdca68c240264dc602185b81bea9b-us20//
//list id
//.891dfa6ecd
