const express      =     require('express'),
      mongoose     =     require('mongoose');
const app          =     express();
const PORT         =     process.env.PORT||5000;
const {MONGOURI}   =     require('./config/keys');

mongoose.connect(MONGOURI,{useNewUrlParser: true , useUnifiedTopology: true })

mongoose.connection.on('connected',()=>{
    console.log('connected to mongo db')
})
mongoose.connection.on('err',()=>{
    console.log(err)
})
require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('blog/build'))

  const path = require('path')
  app.get("*",(req,res)=>{
      res.sendFile(path.resolve(__dirname,'blog','build','index.html'))
  })

}
app.listen(PORT,()=>{
console.log("server started ",PORT);
}) 