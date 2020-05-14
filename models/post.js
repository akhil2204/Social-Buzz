const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
const postSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"Image cant be Displayed"
      ,  required:true
    },
// img:{
//     type:String,
//     default:"https://res.cloudinary.com/dckjxg2pz/image/upload/v1588977474/profiledefault_n69ft7.jpg"
// },


    likes:[{type:ObjectId,ref:"User"}],
     
    comments:[{
    text:String,
    postedBy:{type:ObjectId ,ref:"User"}
}],
    postedBy:{
        type:ObjectId,
        ref:"User"

    }

})

mongoose.model("Post",postSchema)