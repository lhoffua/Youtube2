const MongoClient = require('mongodb').MongoClient;
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
                    let user = data.name;
                    let pwd = data.password;


                    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
                        if(err) throw err;
                        bcrypt.hash(pwd, salt, function(err, hash){
                            if(err) throw err;

                            pwd = hash;

                            collection.insert({username: user, password: pwd});
                        });
                    });
            });
        });
    }

    catch{
        console.log(err);
    }
    
  
   


       
     
});
