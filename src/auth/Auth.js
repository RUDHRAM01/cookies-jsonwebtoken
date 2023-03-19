const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Studentmodel = require('../model/Student');


router.post("/checkuserlogin", async (req, res) => {
    const { email, password } = req.body;
    console.log("calling post");
    if (!email || !password) {
        return res.status(400).json({ msg: "Please enter all fields" });
    }

    if (password.length < 6) {
        return res.status(400).json({ msg: "Password must be at least 6 characters" });
    }

    Studentmodel.findOne({ email: email }).then(async (userLogin) => {
        console.log("calling findOne");
        const token = await userLogin.generateAuthToken();
        res.cookie("jwt-k", token, {
            maxAge: 60*60*24*30*1000, //30 days
            secure: false,
            httpOnly: false
        }).status(200).json({ msg: "Login Success" });
        if (!userLogin) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        
        
    }).catch((err) => {
        console.log(err);
    })

});


module.exports = router;