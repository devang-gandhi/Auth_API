const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const users = require('../models/user');
const {rvalidation, loginvalidation} = require('../validate')

//routes

router.post('/register' , async (req,res) => {

    const {error} = rvalidation(req.body); 
    if(error) return res.status(400).send(error.details[0].message);

    const checkemail = await users.findOne({email: req.body.email});
    if(checkemail) return res.status(400).send('Email is already in database!');

    //generating hash for passwords
    const salt = await bcrypt.genSalt(10);
    const hashforpassword = await bcrypt.hash(req.body.password, salt);

    const user = new users({
        name:req.body.name,
        email:req.body.email,
        password:hashforpassword
    });
    try {
        const savedusers = await user.save();
        res.send({user:user._id});
    } catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
});

router.post('/login', async (req,res) => {
    const {error} = loginvalidation(req.body); 
    if(error) return res.status(400).send(error.details[0].message);

    const checkemail = await users.findOne({email: req.body.email});
    if(!checkemail) return res.status(400).send('Email must be registered! Please check your credentials.');

    const checkpassword = await bcrypt.compare(req.body.password, checkemail.password);
    if(!checkpassword) return res.status(400).send('Invalid password! Please check your credentials.');

    const token = jwt.sign({_id:users.id}, process.env.TOKEN)
    res.header('auth-token' , token).send(token);
    
})

module.exports = router;