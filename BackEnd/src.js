const express= require('express')
const app = express();
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose= require('mongoose')
require('dotenv').config()
var bodyParser =require('body-parser')


const userRouter=require('./routes/user')
const adminRouter=require('./routes/admin');
// const { request } = require('express');


app.use(bodyParser.json({limit:'50mb'}));

app.use(express.json())
app.use(cookieParser())
app.use(cors())



////////dbConnection
mongoose.set('strictQuery',false)
mongoose.connect(process.env.MONGODB_CONNECT_online,
).then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.log("Database not connected");
    console.log(err);
})




///////Routes
app.use('/',userRouter)
app.use('/admin',adminRouter)



const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
    });