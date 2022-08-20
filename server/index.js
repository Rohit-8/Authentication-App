const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { response } = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/myLoginRegisterDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB connected")
})

// create schema for user
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// create model
const User = new mongoose.model("User", userSchema);

// define routes

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    User.findOne({email: email}, (err, user) => {
        if(user) {
            if(password === user.password) {
                res.send({message: "Login successful...", user: user});
            }
            else {
                res.send({message: "Password not matched..."});
            }
        } else {
            res.send({message: "User not registered..."});
        }
    });
});

app.post("/register", (req, res) => {
    const {name, email, password} = req.body;
    User.findOne({email: email}, (err, user) => {
        if(user){
            res.send({message: "User already registered.."});
        } else {
            const user = new User({
                name,
                email,
                password
            });
            user.save( err => {
                if(err) {
                    res.send(err);
                } else {
                    res.send({message : " Successfully registered" });
                }
            });
        }
    });
    
});

app.listen(9002, () => {
    console.log("Backend started on port 9002");
})