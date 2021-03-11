const express = require('express')
const cors = require('cors')
const app = express()
const connectDB = require('./config/db');
require('dotenv').config();
app.use(cors())
app.use(express.json());

connectDB();


//Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));


var port=process.env.PORT || 4000;
app.listen(port,()=>{
        console.log(`Server is running on port: ${port}`)
});