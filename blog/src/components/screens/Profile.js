import React ,{useEffect,useState, useContext}from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../../App'

const Profile = ()=>{

    const[image,SetImage]= useState("")
    const [img1,SetImg]= useState([])


const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        fetch('/mypost',{
           headers:{ 
              
        "Authorization":"Bearer "+localStorage.getItem("jwt")
      }
        }).then(res=>res.json())
        .then(result=>{
          
          SetImg(result.mypost)
        })
     },[])

useEffect(()=>{
if(image){
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

      fetch('updateprofilepic',{
        method:"put",
        headers:{
          "Content-Type":"application/json",
          "Authorization":"Bearer "+localStorage.getItem("jwt")
      },
      body:JSON.stringify({
        img:data.url
      })
      }).then(res=>res.json())
      .then(result=>{
   
        console.log(result)
     localStorage.setItem("user",JSON.stringify({...state,img:result.img}))
     dispatch({type:"UPDATEPROFILE",payload:result.img})
      })
     
    })
   .catch(err=>{
     console.log(err)
   })
}

},[image])
     
const SignUpPic=(file)=>{
  SetImage(file)
  
  }
  return(
       <div className = "container">
          <div style ={{
               
            margin:"18px 0px",
            borderBottom:"1px solid grey"
           }}>
           <div style ={{
               display:"flex",
               justifyContent:"space-around"
           
           }}>
      <div className="profilepic">
                  <img style={{ margin:"0px" ,width:"160px" ,height:"160px" ,borderRadius:"80px"}} 
                   src={state?state.img:"loading"}  />
                  </div>
                  <div  >
                      <h4>
                    {state?state.name:"Loading"}
                      </h4>
                      <h5>
                    {state?state.email:"Loading"}
                      </h5>
                      <div  style={{ display:"flex",
                    justifyContent:"space-between",
                    width:"110%"}}>
                          <h6> {img1.length}Posts </h6>
                          <h6>{state?state.followers.length:"0"} Followers </h6>
                          <h6>{state?state.following.length:"0"}Following </h6>    
                      </div>
                      </div>

                  </div>
                  <div className="file-field input-field" style={{margin:"10px"}}>
            <div className="btn #64b5f6 blue darken-1">
                <span>Update pic</span>
                <input type="file" onChange={(e)=>SignUpPic(e.target.files[0])} />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text" />
            </div>
            </div>
            </div>
            <div  className = "profile_pics">
                     {
                   img1.map(item=>{
                       return(
                        <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                       )
                   })
               }
                  </div>
        </div>
    )

}
export default Profile