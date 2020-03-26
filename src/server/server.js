const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');


const app = express();

require('./config/passport')(passport);

const PORT = process.env.PORT || 5000;


const db = require('./config/keys').MongoURI;

mongoose.connect(db, { useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

    app.use(expressLayouts);
    app.set('view engine', 'ejs');

    
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}));

app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);


// Passport middleware


app.use(passport.initialize());
app.use(passport.session());
 
app.use(flash());

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