const bodyParser =require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html")
});

app.post("/",function(req,res){

    const firstname = req.body.fname;
    const lastname = req.body.lname;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status:"subscribed",
                merge_fields:{
                    FNAME: firstname,
                    LNAME: lastname,
                }

            }

        ]
    };
const jsonData = JSON.stringify(data);
const url = "https://us11.api.mailchimp.com/3.0/lists/97f7a4c0b3"
const options = {
    method:"POST",
    auth:"pratyasha:54ff843d3eac1dafc75f4ea0c9cbf74d-us11"
}
 const requ = https.request(url,options,function(response){
  

    response.on("data",function(data){
 
        if(response.statusCode ===200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }    });
    });

    requ.write(jsonData);
    requ.end();
});

 app.post("/failure",function(req,res){
    res.redirect("/");
 });

app.listen(3000,function(){
    console.log("server is running");
});