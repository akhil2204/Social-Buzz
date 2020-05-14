import React,{useState,useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'
import {UserContext} from '../../App'
const Login = ()=>{

const {state,dispatch} = useContext(UserContext)
const history = useHistory()
const[email,setEmail]=useState("")

const[password,setPassword]=useState("")
const PostData = ()=>{
    if(!(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email))
   {
    M.toast({html:"Invalid Email",classes:"#c62828 red darken-3"})
      return     
   }
    fetch("/login",{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
             password,
            email
        })
    }).then(res=>res.json())
     .then(data=>{
         console.log(data)
        if(data.error){
           M.toast({html: data.error,classes:"#c62828 red darken-3"})
        }
        else{
            localStorage.setItem("jwt",data.token)
            localStorage.setItem("user",JSON.stringify(data.user))
            dispatch({type:"USER",payload:data.user})
            M.toast({html:"Sucessfully Signed In",classes:"#43a047 green darken-1"})
            history.push('/')
        }

    })
    .catch(err=>{
        console.log(err);
    })
}
    return(
        <div className="mycard">
      <div className="card authcard">
       <h2 className="font">Social Buzz</h2>
        
       <input type="text"
       placeholder = "email"
       value={email}
       onChange={(e)=>setEmail(e.target.value)}/>
      

       <input type="password"
       placeholder = "password"
       value={password}
       onChange={(e)=>setPassword(e.target.value)}/>
       
       <button className="btn waves-effect waves-light"
       onClick={()=>PostData()}
       >Login</button>


       
       <Link to="/signup"> <h5>Click Here To Create An Account</h5></Link>

        </div>
        
  
        </div>
    )

}
export default Login