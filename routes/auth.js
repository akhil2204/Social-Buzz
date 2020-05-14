const express = require('express')

const router = express.Router()

const mongoose = require('mongoose');

const bcryptjs = require('bcryptjs')

const User = mongoose.model("User")

const jwt  = require('jsonwebtoken')

const{JWT_SECRET}= require('../config/keys')
const requireLogin = require('../middleware/requireLogin')
router.get('/',(req,res)=>{
res.send("hi there")
})
// router.get('/protected',requireLogin,(req,res) =>{
//      res.send("protectetd")
// })

router.post('/signup',(req,res)=>{
   const {name,email,password,img}= req.body
   if(!email||!password||!name){
     res.status(422).json({error:"please fill all fields"})  
   }
User.findOne({email:email})
.then((savedUser)=>{
    if(savedUser){
        return res.status(422).json({error:"user email  already exist"})
    }
    bcryptjs.hash(password,12)
    .then(hashedpassword=>{
    const user = new User({
        email,
        password:hashedpassword,
        name,
        img
    })
    user.save()
    .then(user=>{
        res.json({message:"saved sucessfully"})
    }).catch(err=>{
       console.log(err) 
    })

})  
.catch(err=>{
    console.log(err)
})
})
})

router.post('/login',(req,res)=>{
    const {email,password}=req.body
    if(!email||!password){
       return res.status(422).json({error:"please fill details"})
    }
    User.findOne({email:email})
   .then(savedUser=>{
       if(!savedUser){
           return res.status(422).json({error:"invalid Email or password"})
       }
       bcryptjs.compare(password,savedUser.password)
       .then(doMatch=>{
           if(doMatch){
          // res.json({message:"sucessfully signed in"})
        const token = jwt.sign({_id:savedUser._id},JWT_SECRET)   
        const{_id,name,email,following,followers,img}= savedUser
        res.json({token,user:{_id,name,email,followers,following,img}})    
    
    }
           else{
            return res.status(422).json({error:"invalid Email or password"})
      
           }
        })
        .catch(err=>{
         console.log(err)
        })
   })
})


module.exports = router