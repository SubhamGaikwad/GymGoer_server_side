const express = require('express');
const app = express();
require('dotenv').config();
const connectDB = require('./database/connect')
const userAuth = require('./routes/user');
const cookieParser = require("cookie-parser")

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cookieParser())
app.use('/api/v1', userAuth);


const start =  async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(process.env.PORT, ()=> console.log(`the server is running on ${process.env.PORT}...`))
        
    } catch (error) {
        console.log(error);
    }

}
start();