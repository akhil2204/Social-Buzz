import React, {useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import { UserContext } from '../App'

const NavBar=()=> {
const {state,dispatch} = useContext(UserContext)
 const history = useHistory()
  const renderList=()=>{
    if(state){

      return[
        <li><Link to="/subpost">Home</Link></li>,
        <li><Link to="/profile">Profile</Link></li>,
        <li><Link to="/createpost">Create Post</Link></li>,
        
        <li>
       <button className="btn waves-effect waves-light"
       onClick={()=>{
      localStorage.clear()
       dispatch({type:"CLEAR"}) 
      history.push('/login')
      }}
       >LogOut
       </button>
      </li>  


         ]}
    else{
      return[
      
      <li><Link to="/login">Login</Link></li>,
      <li><Link to="/signup">SignUp</Link></li>
    ]}
  }
  return(
    <nav>
    <div className="nav-wrapper  white">
    
      <Link to ={state?"/":"/login"} className="brand-logo left">Social Buzz</Link>
      <div class="row">
      <div class="col s12">
      <ul id="nav-mobile" className="right hide-on-small-only">
        {
          renderList()
        }
      </ul>

  

      </div>
      </div>
    </div>
  </nav>

  )  
}

export default NavBar;
