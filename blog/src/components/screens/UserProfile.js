import React ,{useEffect,useState, useContext}from 'react'
import {Link} from 'react-router-dom'
import { UserContext } from '../../App'
import {useParams} from 'react-router-dom'
const UserProfile = ()=>{
  
    const[userProfile,SetuserProfile]= useState(null)
   
    const {state,dispatch}=useContext(UserContext)
    const {userid}  =useParams()
    const [showfollow,SetShowfollow] = useState(state?!state.following.includes(userid):true)

    console.log(userid)    
        useEffect(()=>{
            fetch(`/user/${userid}`,{
               headers:{ 
                  
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
            }).then(res=>res.json())
            .then(result=>{
              console.log(result) 

              SetuserProfile(result)
            })
         },[])
         

         const followUser=()=>{
           fetch('/follow',{
             method:"put",
             headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },

              body:JSON.stringify({
                followId:userid
              })
           })
           .then(res=>res.json())
           .then(data=>{
             console.log(data)

             dispatch ({type:"UPDATE",payload:
             {following:data.following,
              followers:data.followers}})
              localStorage.setItem("user",JSON.stringify(data))
              SetuserProfile((prevState)=>{
                  return {
                      ...prevState,
                      user:{
                          ...prevState.user,
                          followers:[...prevState.user.followers,data._id]
                         }
                  }
              })
              SetShowfollow(false)
         })
         
        }

        
        const unfollowUser=()=>{
          fetch('/unfollow',{
            method:"put",
            headers:{
             "Content-Type":"application/json",
             "Authorization":"Bearer "+localStorage.getItem("jwt")
         },

             body:JSON.stringify({
               unfollowId:userid
             })
          })
          .then(res=>res.json())
          .then(data=>{
            console.log(data)

            dispatch ({type:"UPDATE",payload:
            {following:data.following,
             followers:data.followers}})
             localStorage.setItem("user",JSON.stringify(data))
               
      
             SetuserProfile((prevState)=>{


              const newFollower = prevState.user.followers.filter(item=>item != data._id )
              return {
                     ...prevState,
                     user:{
                         ...prevState.user,
                         followers:newFollower}

                         
                 }
             })
             SetShowfollow(true)
       
        })
        
      }


      
        return(

           <>
            {userProfile ?
           <div className = "container">
               <div style ={{
                   display:"flex",
                   justifyContent:"space-around"
                ,margin:"18px 0px",
                borderBottom:"1px solid grey"
               }}>
                     <div className="profilepic">
                      <img style={{width:"160px" ,height:"160px" ,borderRadius:"80px"}}  
                      
                      src={userProfile.user.img} />
                     </div>
                      <div  >
                        <h4>{userProfile.user.name}</h4>
                        <h5>{userProfile.user.email}</h5>
                          <div  style={{ display:"flex",
                        justifyContent:"space-between",
                        width:"110%"}}>
                              <h6> {userProfile.posts.length} Posts</h6>
                              <h6>{userProfile.user.followers.length} Followers </h6>
                              <h6>{userProfile.user.following.length} Following </h6>


                              </div>

               { showfollow?              
       <button className=" follow btn waves-effect waves-light"
       onClick={()=>followUser()}
       >Follow</button>
       :
       <button className=" follow btn waves-effect waves-light"
       onClick={()=>unfollowUser()}
       >UnFollow</button>
       }
                          
                          
    
                      </div>
                     
                    
                
                
                
                </div>
                <div  className = "profile_pics">
    
    
                {
                       userProfile.posts.map(item=>{
                           return(
                            <img key={item._id} className="item" src={item.photo} alt={item.title}/>  
                           )
                       })
                   }
    
                
                
                    </div>
            </div>
            
            :<h2>Loading!!</h2>}
            </>
        )
    
    }
    export default UserProfile

