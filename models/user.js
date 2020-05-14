const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const userSchema= new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true
},
password:{
    type:String,
    required:true

},

img:{
    type:String,
    default:"https://res.cloudinary.com/dckjxg2pz/image/upload/v1588977474/profiledefault_n69ft7.jpg"
},
followers:[{type:ObjectId,ref:"User"}],

following:[{type:ObjectId,ref:"User"}]

})

mongoose.model("User",userSchema)
