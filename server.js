const express = require("express");
require('dotenv').config();
const cors=require('cors');
const dbconnect=require('./connections/conn');
const bodyParser=require('body-parser')
dbconnect();


const app = express();

app.use(cors());

app.use(bodyParser.json());


const contactRoute=require('./routes/contactRoute');


app.use('/contacts',contactRoute)



app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
