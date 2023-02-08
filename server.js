const express = require("express");
require('dotenv').config();
const cors=require('cors');
const dbconnect=require('./connections/conn');
const bodyParser=require('body-parser')
dbconnect();


const app = express();


const contactRoute=require('./routes/contactRoute')
const resisterAndLogin = require('./routes/ResisterAndLogin');
const contactDetails=require('./routes/contactDetailsRoute')

app.use(cors());

app.use(bodyParser.json());




app.use('/contacts',contactRoute)
app.use(resisterAndLogin)
app.use(contactDetails)


app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
