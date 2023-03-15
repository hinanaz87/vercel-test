const express = require('express')
const mongoose = require('mongoose')
const fs = require('fs')
const fileupload = require('express-fileupload');

const cors = require("cors");
const bcrypt = require('bcrypt');
const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm"
const admin = require("firebase-admin") ;
// import admin from "firebase-admin";

const app = express()
app.use(express.json());
 app.use(cors());
// app.use(cors({
//   origin: ['http://localhost:3000', 'https://odd-gold-squid-robe.cyclic.app',"https://hackathon-hina-naz.netlify.app", "*"],
  
// }));
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: "/tmp",
}))
const PORT = process.env.PORT || 5000;

 const Product = require("./schemas/Product")
 const User = require("./schemas/User")

// mongoose.connect("mongodb+srv://admin:admin@cluster0.fhb0ddn.mongodb.net/test")
// let dbURI = "mongodb://127.0.0.1:27017/hackathon";
let dbURI = "mongodb+srv://admin:admin@cluster0.fhb0ddn.mongodb.net/hackathon";
mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
    console.log("Mongoose is connected");
})

// ----------------INITIALIZE FIRABASE STORAGE BUCKET----------------

// https://firebase.google.com/docs/storage/admin/start
var serviceAccount = {
  "type": "service_account",
  "project_id": "crud-74b2d",
  "private_key_id": "f762839b6380115e91bd48e4cac436ed9ac4fa25",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC2m4453B6j5tlO\nXzOT7qqVElgJ8Q1lkfR5kbJdX8axEw5KqtJauuXAhcXEi5U+rXIG+ZRheZD9gkTw\nQ32ttdWU8m0dUmEUzmztuNEgdjlBBdPTHDgOQLNgD3j2hKUfWZOS2ULPXipRlq3e\nlRicOrgAbR1/Oxc5IcJnA/y2GDI53NQaSywgGfugOIA6MpZf1TmrdV5z8H0PtN3E\njzNsLBju2SkUR7MQCIElxqV7RdMhKpIDL9LAF2cLRj0DEDHG+f8K5fjcKuwSnHF4\n616cqsXKFdSiP3apbGePm06upySf0mrn/udB5TbciEYVKsS9khTNo+8kD6ZQFVcR\nFKZsNyHpAgMBAAECggEAKQdYdG2dwMvMhYxkZVeZojbl6w3rKagamvn+bnZniT+z\n1Vj+PH6DwrcL0XZfSR7lYOXQzfnndt4/KRCw+0fAvl+d3pm00Fz1IpCFBFsr0A1E\nI8nSWnl1FB9F2XXCOAIDY1pHZZpNvdkyJbGwPuH+l7Hsj7qyJBcOu+CsdimHl3JB\n6BtWmXX5Rtd2zleLC61gWn2Gofrdhc79lejA+S2zlgT6XqelM55WD/JsFuclLA6K\nGK6/NjUWq8BFcZmvhm8kmkIqIQKxl5eTMqONqNzwLJrQdU81TQ8WkETZsCH+XAZe\nBckQz/h0qMdtT/fMNK7ERX8S7ySjZ+dgiwHktcnTlQKBgQDt0KBn9qVu5GFCFCIl\n4TcgxorN4qO1rsQrKzZ0B5EyhefqlpuMG0kB2lCOnPJgNrC/U6Q73XGvHhDxrsAM\nyjxMsifIgCGyIlrX49qy+C5JKU32tU607uAl1yMKVuDVx1Q43qwzvRFSQwJ4rMMK\nqs01g0v9gP5WeX9AliHN8tNNiwKBgQDEkjZKCHKkVDX/0027zeewaQeu4QDZGZ3M\nFnanDfqymzYMesBftvxaCG6hX03d62b9783vFQ9NVumT1CVJi/NHH7kNsKLwAsTP\nqh+HoU/OQqx72jRtcIyBtcSSfZN26y/fl5qG/oVVtHxlMWDkMJXhWs0u/Hz4WHEM\nlM99Fazk2wKBgATA7NPnLDthOUh22o/jRpTTIycmZptVGPq77GS5Wf+miZI43Hca\nfIUa9g1DudyOe033wAqqTIFxmmkaUyBuUnI+BWmOlh3XbfVuyopVR6eSuco6qY4Y\nUEaxXDPytJ/RUi+o08xc9SGt0TjUSznFXEC7lSNGFs9nslF6LsbNGcgtAoGAVj9c\n6KDKREXap5O78KIIfUOoJlf8+kSeEtTsXKHqlIE7dsBJNfXgxVQbzlw1myBVQSf9\nsGAKJcHznHQhpCJurI9Dr7kH1M0yM3eOfAEQNgzVB0aXaElQrPzm8et9T1kj2TP4\njjCQqikVx4Sh4Z1btdQUYQBRiNmtSHrmixh+kq8CgYBab07TqrucJze7bDXirW1B\nzhM5nX9hpAXbK38+8bI/yDfcLBprR6JHZnC+dzNRVzQpZJoSrTtZiu/TEUvc/EIE\nAQnW4HMSRT4Hfqf4Uy1+RWHZvwUAmbT2mcU7B7W8qAnJZLB0nNxnGKAErwJqhKhp\n8NvdT/QY606cfmk2kbZEhQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-1w3gh@crud-74b2d.iam.gserviceaccount.com",
  "client_id": "113159752347859375580",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1w3gh%40crud-74b2d.iam.gserviceaccount.com"
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://crud-74b2d.firebaseio.com"
});
const bucket = admin.storage().bucket("gs://crud-74b2d.appspot.com");


//==============================================
const multer = require('multer');;
const storageConfig = multer.diskStorage({ // https://www.npmjs.com/package/multer#diskstorage
    destination: './uploads/',
    filename: function (req, file, cb) {

        console.log("mul-file: ", file);
        cb(null, `${new Date().getTime()}-${file.originalname}`)
    }
})
var upload = multer({ storage: storageConfig })

//==============================================




// // ------------------IMAGE API-----------------

app.post('/newproduct', upload.any(), async (req, res) => {
  try {
    // Get the data from the request body
    const {
      productName,
      productDescription,
      productPrice,
      productCategory,
      shopName,
      userId
    } = req.body;

    // Check if all required fields are present
    if (
      !productName ||
      !productDescription ||
      !productPrice ||
      !productCategory ||
      
      !shopName ||
      !req.files[0]
    ) {
      res.status(400).send({
        error: 'Required fields missing',
        exampleRequest: {
          productName: 'Product name',
          productDescription: 'Product description',
          productPrice: 123.45,
          productCategory: 'USD',
          isApproved: true,
          shopName: 'Shop name',
          productImage: '<file>',
        },
      });
      return;
    }

    // Upload the product image to the bucket
    const imageFile = req.files[0];
    const destination = `productImages/${Date.now()}_${imageFile.originalname}`;
    const [file] = await bucket.upload(imageFile.path, {
      destination,
    });

    // Get a signed URL for the uploaded file
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-09-2491',
    });

    // Delete the uploaded file from the local filesystem
    fs.unlinkSync(imageFile.path);

    // Save the product data to the database
    const product = await Product.create({
      productName,
      productDescription,
      productPrice,
      productCategory,
      shopName,
      isApproved: false,
      userId,
      productImage: url,
    });

    res.send({ message: 'Product created successfully', product });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: 'Server error' });
  }
});
  

//------------------------------------------------
 app.get('/', (req, res) => {
  res.send('Hello World! Comin from backend')
})


// ------------ALL USERS-------------

app.get("/users", async (req,res) =>{
  let result = await User.find().exec().catch(e =>{
    console.log("error in db: ", e);
    res.status(500).send({message:"error in getting all Users"})
    return
  })
  res.send({
    message:"all Users are received successfully",
    data: result
  });
});


// ----------VIEW PRODUCTS BASED ON USER ID------------------

app.get("/products/:id",  async(req,res)=>{
  Product.find({userId:req.params.id})
  .then(productsfound =>{
      if(!productsfound){
          return res.status(404).end(); 
        console.log(res)
      }
          return res.status(200).json(productsfound);
  })
  .catch(err=> next(err));
})


//-----------------ALL PRODUCTS API------------
app.get("/products", async (req,res) =>{
  let result = await Product.find().exec().catch(e =>{
    console.log("error in db: ", e);
    res.status(500).send({message:"error in getting all Products"})
    return
  })
  res.send({
    message:"all products are received successfully",
    data: result
  });
});

// // ---------------SINGLE USER API------------

app.get("/user/:id", async(req,res)=>{
  try{
let user = await User.findOne({_id: req.params.id}).exec();
res.send(user);

  }catch(error){
    res.status(500).send({message: "error getting user"})

  }
})

app.put('/user/:id', async (req,res)=>{
  let result = await User.updateOne(
     {_id:req.params.id},
     {
         $set:req.body
     }
  )
  res.send(result)
 })
 

 app.get('/searchproducts', async (req, res) => {
  const { isApproved } = req.query;
  try {
    const products = await Product.find({ isApproved: false });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/displayproducts', async (req, res) => {
  const { isApproved } = req.query;
  try {
    const products = await Product.find({ isApproved: true });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//------------------GET SINGLE PRODUCT----------------
app.get("/product/:id", async (req,res) =>{
  let result = await Product.findOne({_id:req.params.id}).exec().catch(e =>{
    console.log("error in db: ", e);
    res.status(500).send({message:"error in getting a Product"})
    return
  })
  res.send({
    message:"product is received successfully",
    data: result
  });
});


app.put('/editproduct/:id', async (req,res)=>{
  let result = await Product.updateOne(
     {_id:req.params.id},
     {
         $set:req.body
     }
  )
  res.send(result)
 })

// ------------SEARCH BY CATEGORY----------------

app.get("/search/:key", async (req,res)=>{
  let result = await Product.find({
    "$or": [
      {productCategory: { $regex: req.params.key}}
    ]
  });
  res.send(result)
})




app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})



// -----------------USER REGISTER API -------------

app.post('/register', async (req, res) => {
  
  
    // Check if user already exists in the database
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).send('User already exists');
    }
  
  
   
    try {
        let user = new User(req.body);
        
        let result = await user.save();
        result = result.toObject();
        delete result.password
        delete result.confirmpassword
        // res.send(result);
        Jwt.sign({result}, jwtKey, {expiresIn:"2h"}, (err, token) =>{
          if(err) {
            res.send({result:"Something went wrong, Please try again after some time"})
          }res.send({result, auth:token})
        })
    
    
    } catch (err) {
      res.status(400).send(err.message);
    }
  });


// ---------------------USER LOGIN API----------------

app.post("/login", async (req, res) =>{
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).send({message: 'Invalid username or password'});
    }
    
    const result = await bcrypt.compare(req.body.password, user.password);
    if (result) {
      const token = await Jwt.sign({result}, jwtKey, {expiresIn:"2h"});
      res.send({user :{
        email:user.email,
        fullname:user.fullname,
        username:user.username,
        role:user.role,
        userId:user._id
      }, auth: token});
    } else {
      return res.status(401).send({message :'Invalid username or password' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send(err);
  }
});

app.get("/profile/:id", async (req,res) =>{
  let result = await User.findOne({_id:req.params.id}).exec().catch(e =>{
    console.log("error in db: ", e);
    res.status(500).send({message:"error in getting a User"})
    return
  })
  res.send({
    message:"User is received successfully",
    data: result
  });
});

// -------------TOKEN VARIFICATION------------------

function verifyToken(req,res,next){
  let token = req.headers['authorization'];
  if(token){
    token = token.split(" ")[1];
    Jwt.verify(token, jwtKey,(err, valid) =>{
      if(err){
        res.status(401).send({result:"Please provide valid token"})
      } else {
        next();
      }
    })
  } else {
    res.status(403).send({result:"Please add token with Header"})
  }
}
