// requiring the pacakages 
const express = require("express");
const path = require('path')
const app = express();
const userModel =require('/Users/anubhavmishra/Documents/PortFolio_AnubhavMishra/models/user')
const cookieParser= require('cookie-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// setting up the view engine
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true }));
app.use(express.static(path.join(__dirname , 'public')));

// setting up the routes
app.get("/",(req,res)=>{
    res.render("index");
});
app.get("/about", (req,res)=>{
    res.render("profile");
});
app.get("/expeemusic",(req,res)=>{
    res.render("expeemusic")
});
app.get("/login",(req,res)=>{
    res.render("login");
});
app.post("/expeemusic/login",  (req, res)=>{
    let { name , username , image , password }=req.body;
    bcrypt.genSalt(10,(err,salt)=>{
        bcrypt.hash(password, salt, async (err, hash)=>{
                let createdUser = await userModel.create({
                name , 
                username ,
                image ,
                password: hash ,
        
            });
            let token = jwt.sign({username}, "sh382349237");
            res.cookie("token", token);
            console.log(createdUser);
            
        })
    });
    



});
// login route
app.post('/expeemusic/userlogin', async (req,res)=>{
    let user = await userModel.findOne({username: req.body.username});
    if(!user) return res.send("Something went ");
    bcrypt.compare(req.body.password_final, user.password, function(err,result){
        if (result){
            console.log("Access granted");
            // redirecting to main page
        }
    });
    res.render("user" ,{user:user});
});
app.get("/profilelogin",(req,res)=>{
    res.render("profilelogin");
});
app.get("/comingsoon",(req,res)=>{
    res.render("comingsoon");
});
app.get('/expeemusic/user/:username',async (req,res)=>{
    let user= userModel.findOne({username:req.params.username});
    res.render("user",{user});
    req.params.username=req.body.username;
});
app.get('/expeemusic/comingsoon',(req,res)=>{
    res.render("comingsoon");

});
app.get('/expeemusic/originals/:username',(req,res)=>{
    let name=req.params.username;
    res.render("originals",{name});

});
app.get("/contact/:username",(req,res)=>{
    let name=req.params.username;
    res.render("contact",{name});
});
app.get("/socials",(req,res)=>{
    res.render("socials");
})

app.listen(3000);