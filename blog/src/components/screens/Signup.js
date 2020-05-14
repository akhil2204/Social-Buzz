import React,{useState,useEffect }from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'


const Signup = ()=>{

 
const history = useHistory()

const[name,setName]=useState("")

const[email,setEmail]=useState("")

const[password,setPassword]=useState("")

const[url,setUrl]=useState(undefined)

const[image,setImage]=useState("")

useEffect(() =>{
if(url){
    uploadFields()
}
},[url])




const uploadFields = ()=>{
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
    {
     M.toast({html:"Invalid Email",classes:"#c62828 red darken-3"})
       return     
    }
     fetch("/signup",{
         method:"post",
         headers:{
             "Content-Type":"application/json"
         },
         body:JSON.stringify({
             name,
             password,
             email,
             img:url
         })
     }).then(res=>res.json())
      .then(data=>{
         if(data.error){
            M.toast({html: data.error,classes:"#c62828 red darken-3"})
         }
         else{
             M.toast({html:data.message,classes:"#43a047 green darken-1"})
             history.push('/login')
         }
 
     })
     .catch(err=>{
         console.log(err);
     })

}

const SignUpPic=()=>{
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","blog-img")
    data.append("cloud_name","dckjxg2pz")
    fetch("https://api.cloudinary.com/v1_1/dckjxg2pz/image/upload",{
      method:"post",
      body:data
    })
     .then(res=>res.json())
     .then(data=>{
       setUrl(data.url)
     })
     .catch(err=>{
       console.log(err)
     })
}
const PostData = ()=>{
    if(image){
        SignUpPic()}
        else{
            uploadFields()
        }
    }
   


    return(
        <div className="mycard">
      <div className="card authcard">
       <h2 className="font">Social Buzz</h2>

       <input type="text"
       placeholder = "Name"
       value={name}
       onChange={(e)=>setName(e.target.value)}/>
       
       <input type="text"
       placeholder = "email"
       value={email}
       onChange={(e)=>setEmail(e.target.value)}/>
      

       <input type="password"
       placeholder = "password"
       value={password}
       onChange={(e)=>setPassword(e.target.value)}/>
      
      <div className="file-field input-field">
      <div className="btn #ffa000 amber darken-1">
        <span>UPLOAD IMAGE</span>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])}   />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" placeholder="Upload one or more files"/>
      </div>
      
    </div>
       
        <button className="btn #0288d1 light-blue darken-2waves-effect waves-light" 
        onClick={()=> PostData()}
        >Sign UP</button>
       
        <Link to="/login"> <h5>Aleady Have an Account</h5></Link>

        </div>
        </div>
    )

}
export default Signup 
