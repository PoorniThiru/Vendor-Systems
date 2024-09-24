const express = require("express")
const app = express()
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")
const PORT = process.env.PORT || 5000
const registermodel=require('./models/register')
const invoicemodel=require('./models/invoices')
const sampledata=require('./itemsCollection')
const fs=require('fs')
const itemmodel=require('./models/itemsModel')
const multer = require("multer")
const path=require('path')
const { type } = require("os")

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static("public"));
app.use('/public/',express.static(path.join(__dirname,'public/')))
app.use(cors())
app.use(function (req,res,next){
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Methods',
        'GET,HEAD,OPTIONS,POST,PUT,DELETE'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-with, Content-Type,Accept,Authorization'
    );
    next();
});

// connect to the mongodb database
 connectDB() 



 const storage=multer.diskStorage({
       destination: (req, images, cb)=>{
           cb(null, `./public/men`)
    },
    filename:(req,images,cb)=>{
        cb(null, images.fieldname + "_" + Date.now() + path.extname(images.originalname))
    }
 })
 const upload=multer({
    storage:storage
 })

 const storage1=multer.diskStorage({
    destination: (req, images, cb)=>{
        cb(null, `./public/women`)
 },
 filename:(req,images,cb)=>{
     cb(null, images.fieldname + "_" + Date.now() + path.extname(images.originalname))
 }
})
const upload1=multer({
 storage:storage1
})

const storage2=multer.diskStorage({
    destination: (req, images, cb)=>{
        console.log(images)
        cb(null, `./public/kids`)
 },
 filename:(req,images,cb)=>{
     cb(null, images.fieldname + "_" + Date.now() + path.extname(images.originalname))
     console.log(images.fieldname + "_" + Date.now() + path.extname(images.originalname))
 }
})
const upload2=multer({
 storage:storage2
})


//  app.use('/api/items', require("./routes/items"))
// app.use('/api/payment', cors(), require("./routes/payment"))

app.get('/api/items',(req,res)=>{
        
    // return res.json(sampledata)

    itemmodel.find()
    .then((resu)=>{
        res.json(resu)
    })
    .catch((err)=>{
        return res.json(err)
    })
    
})


app.post('/register',(req,res)=>{
    // const [firstname,lastname,email,password]=req.body;
    
    registermodel.create(req.body)
    .then(register=>res.json(register))
    .catch(err=>res.json(err))
})




// Adding Product

app.post('/product/add/men',upload.array('images'),(req,res)=>{
    
     itemmodel.create({image:req.files,name:req.body.name,category:req.body.category,color:req.body.color,type:req.body.type,description:req.body.description,price:req.body.price,size:req.body.size,highlights:req.body.highlights,detail:req.body.description})
     .then((resu)=>{
        res.json(resu);        
    })
    .catch((err)=>{
        console.log(err)
    })
   
})

app.post('/product/add/women',upload1.array('images'),(req,res)=>{
    
    itemmodel.create({image:req.files,name:req.body.name,category:req.body.category,color:req.body.color,type:req.body.type,description:req.body.description,price:req.body.price,size:req.body.size,highlights:req.body.highlights,detail:req.body.description})
    .then((resu)=>{
        res.json(resu);         
    })
    .catch((err)=>{
        console.log(err)
    })
   
})

app.post('/product/add/kids',upload2.array('images'),(req,res)=>{
    
    itemmodel.create({image:req.files,name:req.body.name,category:req.body.category,color:req.body.color,type:req.body.type,description:req.body.description,price:req.body.price,size:req.body.size,highlights:req.body.highlights,detail:req.body.description})
    .then((resu)=>{
        res.json(resu);       
    })
    .catch((err)=>{
        console.log(err)
    })
   
})

//Updating Product

app.post('/product/update/men',upload.array('images'),(req,res)=>{
    console.log(req.body)
    if(req.files.length===0){
        itemmodel.findOneAndUpdate({_id:req.body._id},{name:req.body.name,category:req.body.category,color:req.body.color,type:req.body.type,description:req.body.description,price:req.body.price,size:req.body.size,highlights:req.body.highlights,detail:req.body.description})
         .then((response)=>{
            res.json(response)
         })
         .catch(err=>console.log(err));
    }else{
        
            itemmodel.findOneAndUpdate({_id:req.body._id},{image:req.files,name:req.body.name,category:req.body.category,color:req.body.color,type:req.body.type,description:req.body.description,price:req.body.price,size:req.body.size,highlights:req.body.highlights,detail:req.body.description})
             .then((response)=>{
                res.json(response)
             })
             .catch(err=>console.log(err));
   
     
            }
})

app.post('/product/update/women',upload1.array('images'),(req,res)=>{
    console.log(req.body)
    if(req.files.length===0){
        itemmodel.findOneAndUpdate({_id:req.body._id},{name:req.body.name,category:req.body.category,color:req.body.color,type:req.body.type,description:req.body.description,price:req.body.price,size:req.body.size,highlights:req.body.highlights,detail:req.body.description})
         .then((response)=>{
            res.json(response)
         })
         .catch(err=>console.log(err));
    }else{
        
        itemmodel.findOneAndUpdate({_id:req.body._id},{image:req.files,name:req.body.name,category:req.body.category,color:req.body.color,type:req.body.type,description:req.body.description,price:req.body.price,size:req.body.size,highlights:req.body.highlights,detail:req.body.description})
         .then((response)=>{
            res.json(response)
         })
         .catch(err=>console.log(err));

 
        }
   
   
})

app.post('/product/update/kids',upload2.array('images'),(req,res)=>{
    console.log(req.body)
    if(req.files.length===0){
        itemmodel.findOneAndUpdate({_id:req.body._id},{name:req.body.name,category:req.body.category,color:req.body.color,type:req.body.type,description:req.body.description,price:req.body.price,size:req.body.size,highlights:req.body.highlights,detail:req.body.description})
         .then((response)=>{
            res.json(response)
         })
         .catch(err=>console.log(err));
    }else{
         console.log(req.files);
        itemmodel.findOneAndUpdate({_id:req.body._id},{image:req.files,name:req.body.name,category:req.body.category,color:req.body.color,type:req.body.type,description:req.body.description,price:req.body.price,size:req.body.size,highlights:req.body.highlights,detail:req.body.description})
         .then((response)=>{
            res.json(response)
         })
         .catch(err=>console.log(err));

 
        }
   
})



app.post('/delete/item',(req,res)=>{
    console.log(req.body._id)
    itemmodel.deleteOne({_id:req.body._id})
    .then((resu)=>(res.json(resu)))
    .catch(err=>(console.log(err)))
})

app.post('/invoicedata',(req,res)=>{
    // const [firstname,lastname,email,password]=req.body;
    invoicemodel.create(req.body)
    .then(register=>res.json(register))
    .catch(err=>res.json(err))
})

app.post('/invoicelist',(req,res)=>{
     
    invoicemodel.find({user_id:req.body.user_id})
    .then(invdatas=>{res.json(invdatas)})
    .catch(err=>{console.log(err);res.json(err)})

})

app.get('/invoicelist',(req,res)=>{
    invoicemodel.find()
   .then(invdatas=>{res.json(invdatas)})
   .catch(err=>{console.log(err);res.json(err)})

})


app.post('/login',(req,res)=>{
     
    registermodel.findOne({email:req.body.email})
    .then(user=>{
        if(user){
            if(user.password === req.body.password){
                res.json(user)
            }else{
                res.json("Password Incorrect")
            }
        }else{
            
            res.json("E-mail not registered")
        }
    })
    .catch(err=>{
        console.log(err)
        res.json(err)})
})

app.post('/updateuser',(req,res)=>{

    
    registermodel.findOne({_id:req.body.userid})
    .then(userdata=>{res.json(userdata)})
   .catch(err=>{console.log(err);res.json(err)})

})

app.post('/updateuserdata',(req,res)=>{
    registermodel.findOneAndUpdate({_id:req.body.userid},{firstname:req.body.fname,lastname:req.body.lname})
    .then(userdata=>{res.json(userdata)})
   .catch(err=>{console.log(err);res.json(err)})

})

app.post('/updateuserdelete',(req,res)=>{
     registermodel.findOneAndDelete({_id:req.body.userid})
    .then(userdata=>{res.json(userdata)})
   .catch(err=>{console.log(err);res.json(err)})

})


app.listen(PORT, console.log("Server is running on port ", PORT))