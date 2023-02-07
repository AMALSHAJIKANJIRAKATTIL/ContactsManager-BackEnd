const express = require("express");
require('dotenv').config();

const dbconnect=require('./connections/conn')
dbconnect();


const app = express();

app.use(cors());

app.use(bodyParser.json());

const cors=require('cors');

const contactRoute=require('./routes/contactRoute');


app.use('/contacts',contactRoute)



app.listen(5000, () => {
  console.log("Server started on http://localhost:5000");
});
