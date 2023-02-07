const express = require("express");
require('dotenv').config();

const dbconnect=require('./connections/conn')
dbconnect();


const app = express();
const cors=require('cors');
const contactRoute=require('./routes/contactRoute')
const resisterAndLogin = require('./routes/ResisterAndLogin');

app.use(cors());
app.use('/contacts',contactRoute)
app.use(resisterAndLogin)



app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
