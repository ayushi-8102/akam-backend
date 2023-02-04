var express = require('express');
var router = express.Router();
const gpsdata = require("../models/gpsdata");
const police = require("../models/police.js")
const user = require("../models/user");
const q = require("../models/quotes.js");
const jwt = require("jsonwebtoken");
const emergency_point = require("../models/emergency.js");






















/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post("/addgpsdata",(req,res) =>{
  const {idnumber, latitude, longitude} = req.body;
  console.log(req.body);
  let errors = [];

  if(!idnumber || !latitude || !longitude){
    errors.push({msg : "Parameters are missing"});
  }
  if(errors.length>0){
    res.json({Message : errors})
  }else{
    const newgpsdata = new gpsdata({
      idnumber,
      latitude,
      longitude
    });

    newgpsdata
    .save()
    .then(newgpsdata => {
      res.json({ Message: "Data Inserted"});
    })
    .catch(err => console.log(err));
  }
});
module.exports = router;
router.get("/getgpsdata/:idnumber",(req,res) =>{
  var idnumber = req.params.idnumber;
  console.log(idnumber);

  gpsdata.find({idnumber: idnumber}).exec((err, notenumber)=>{
    console.log(notenumber);
    res.json(notenumber);
  });

});

router.get("/getpolicedata/:idnumber",(req,res) =>{
  var idnumber = req.params.idnumber;
  console.log(idnumber);

  user.find({Id: idnumber}).exec((err, notenumber)=>{
    console.log(notenumber);
    res.json(notenumber);
  });
});


router.get("/updatepolicedata/:idnumber",(req,res) =>{
  user.findOne({Id: req.params.idnumber}, function(err, contact) {
    console.log(contact)
    if(!err) {



      console.log(contact.checkpoint)

let arr = contact.checkpoint
console.log(arr)
arr.push([req.body.longitude, req.body.latitude])
console.log('arr',arr)
         contact.checkpoint = arr

        contact.save(function(err) {
            if(!err) {

                res.json(contact)
            }
            else {
                console.log("Error: could not save contact " + contact.phone);
            }
        });
    }
});
});



router.post("/addpolicedata",(req,res) =>{



  const newpolicedata = new police({
    idnumber: req.body.idnumber,
    name:req.body.name
  });

  newpolicedata
  .save()
  .then(newgpsdata => {
    res.json({ Message: "Data Inserted"});
  })
  .catch(err => console.log(err));

});
module.exports = router;




router.post("/user/signup",(req,res) =>{

  try{
    
  console.log(req.body)
  const newuserdata = new user({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    Id:  req.body.Id,
    password:   req.body.password

  });

  newuserdata
  .save()
  .then(c => {
    res.json({ Message: "Data Inserted"});
  })
  .catch(err => console.log(err));
  }
  catch(err){res.json({ Message:"internal server error"+err})};



});



router.post("/user/login", async (req, res) => {
	console.log(req.body);
	try {
console.log(1)
		data = await user.collection.findOne({ Id: req.body.Id });
    console.log(2)
		if (!data)
			return res.status(401).send({ message: "Invalid Id or Password" +data.Id+data.password });


		if (!(req.body.password == data.password))
			return res.status(401).send({ message: "Invalid Id or Password" +data.Id+data.password});

		//  token = user.generateAuthToken();

      token = jwt.sign(
      {
        Id: data.Id,
        password: data.password
      },
      "jwtkey",
      {
        expiresIn: "100000000"
      }
    );
		res.status(200).send({ token: token, message: "logged in successfully" });
	} catch (error) {
    console.log(error)
		res.status(500).send({ message: error });
	}
});



















const validate = (data) => {
	const schema = Joi.object({
		Id: Joi.string().required().label("Id"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};























let quotes = [
  "people sleep peacefully because of you ",
  "There are people that put their life in harm way everyday. It's not something they do. It 's something they are",
  "It takes courage to risk your life to others",
  "Bravery is not absence of fear but action in face of fear",
  "Excellence is achieviable but not without Sacrifice and dicipline",
]



router.get('/quotes',(req,res)=>  {


  randomNum = Math.floor(Math.random() * quotes.length)
  
  res.json({q: quotes[randomNum]})



})

router.post('/emergency',(req,res)=> {

  const {latitude, longitude} = req.body;
  console.log(req.body);
  let errors = [];

  if(!latitude || !longitude){
    errors.push({msg : "Parameters are missing"});
  }
  if(errors.length>0){
    res.json({Message : errors})
  }else{
    const newgpsdata = new emergency_point({
      
      latitude,
      longitude
    });

    newgpsdata
    .save()
    .then(newgpsdata => {
      res.json({ Message: "Data Inserted"});
    })
    .catch(err => console.log(err));
  }

})


router.get('/emergency',(req,res)=> {

  emergency_point.find().exec((err, notenumber)=>{
    console.log(notenumber);
    res.json(notenumber);
  });

})



 






 



router.get("/checkpoint/:idnumber",async(req,res) =>{
  var idnumber = req.params.idnumber;
  console.log(idnumber);
  data = await user.find({ Id: idnumber});
    let nn = data
    console.log(nn);
    console.log('a',nn.firstName)
    res.json(nn[0].checkpoint);

});
