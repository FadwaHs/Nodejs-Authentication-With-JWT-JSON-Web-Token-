const express = require("express");
const { sendStatus } = require("express/lib/response");
const { verify } = require("jsonwebtoken");
const jsonwebtoken = require("jsonwebtoken");
const app = express();


app.get('/api',(req,res) =>{
    res.json({

        message : 'hey there welcome to this Api service',
    });
});

app.post('/api/posts',verifyToken,(req,res) =>{

    jsonwebtoken.verify(req.token, 'secretkey', (err,authData)=>{
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message:'posts created ....',
                authData
            });
        }
    });

});

app.post('/api/login',(req,res) =>{

    const user = {
        id:1,
        username:'fadwa',
        email:'hsissou.fadwa@gmail.com'
    }

    jsonwebtoken.sign({user: user }, "secretkey",(err, token) => {
        res.json({
            token, //encrypted user
        });
    });
});

function verifyToken(req,res,next){

    const bearerHeader = req.headers['authorization']

    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1]
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403) //forbiden
    }
}


//set the server to listen at port
app.listen(3000, () => {

    console.log('server started on port 3000');
})