const mongoose =require('mongoose');

const contactSchema = new mongoose.Schema({


    name: String,
    designation: String,
    company: String,
    industry: String,
    email: String,
    phone: Number,
    country: String,
    user : {type : mongoose.Schema.Types.ObjectId , ref: 'User' }


})

const Contacts = mongoose.model('contacts', contactSchema);

module.exports = Contacts;