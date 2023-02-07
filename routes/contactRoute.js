const router = require('express').Router();
const contactModel=require('../models/contacts/contactModel')



const multer = require("multer");
const csv = require("csvtojson");
const fs=require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads');

    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
const upload = multer({ storage: storage });
  

// Post contacts End Point
router.post("/", upload.single("file"),async  (req, res) => {
    console.log(req);
    if (!req.file) {
      return res.status(400).send("No file was uploaded.");
    }
    const file = req.file;
    const fileContents = fs.readFileSync(file.path, 'utf-8');
  
    await csv()
      .fromString(fileContents)
      .then(async (jsonObj) => {
        
        console.log(jsonObj);
  
        // Json insertion to database
        let files=await contactModel.insertMany(jsonObj);
        
        console.log(files);

        fs.unlink(file.path, (err) => {
          if (err) throw err;
          console.log(`${file.path} was deleted`);
        });
  
        res.send("File uploaded and parsed");
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send("Error parsing CSV file");
      });
  });


// Delete contact api 

router.delete('/delete',async (req,res)=>{
    try{
    let delIds=req.body.ids;
    let deleted= await contactModel.deleteMany({ id: { $in: delIds } });
    console.log(deleted.deletedCount);
    res.status(200).send({status: "Success"})
    }catch(e){
        res.status(500).send({status: "Failed", error : e})
    }
})


module.exports = router;