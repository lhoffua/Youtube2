const mongo = require('mongodb').MongoClient;
const uri = "mongodb+srv://gdadulla:34rtsdcv@cluster0-mno4t.mongodb.net/test?retryWrites=true&w=majority";
const client = new mongo(uri);
const socketClient = require('socket.io').listen(4000).sockets;

const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

try{
    client.connect();
    console.log("MongoDB successfully connected");

    socketClient.on('connection', function(socket){
        let login = db.collection('login');
        socket.on('submit', function(data){

        })
    })
}

catch(e){
    console.error(e);
}