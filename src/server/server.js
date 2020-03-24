const express = require('express');

const app = express();

const PORT = process.env.PORT || 5000;

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(PORT, console.log('server started on port ${PORT}'));

/*const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://gdadulla:34rtsdcv@cluster0-mno4t.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true});

const socketClient = require('socket.io').listen(4000).sockets;

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

client.connect(err => {
    try{
    const collection = client.db("login").collection("users");
    console.log("Connected to database");
        
        
        socketClient.on('connection', function(socket){
            socket.on('submit', function(data){
                    let usern = data.name;
                    let pwd = data.password;
                    let mail = data.email;
                    collection.findOne({email : mail})
                        .then(user => {
                            if(user){
                                console.log("Email has been already registered");
                            } else {
                                bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
                                    if(err) throw err;
                                    bcrypt.hash(pwd, salt, function(err, hash){
                                        if(err) throw err;
            
                                        pwd = hash;
            
                                        collection.insert({username: usern, password: pwd, email: mail});
                                    });
                                });
                            }
                        });
                   
            });
        });
    }

    catch{
        console.log(err);
    }
    
  
   


       
     
});
*/