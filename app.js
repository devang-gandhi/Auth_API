const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const router = require('./routes/auth')
const displayrouter = require('./routes/display')
const app = express()

dotenv.config()

app.listen(3000 , console.log('Server is listening'));
mongoose.connect(process.env.URI , console.log('Database is connected successfully!'))

app.use(express.json());

app.use('/api/user' , router);
app.use('/api/display' , displayrouter);
