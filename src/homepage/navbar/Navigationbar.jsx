import React, { useState ,useContext} from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { Button } from 'bootstrap'
import { Logout } from '../../pages/Exportfiles'
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthContext } from '../../AuthProvider'

const Navigationbar=()=> {
  const {userToken} = useContext(AuthContext)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const logout =Logout() 
  const showhide=()=>{
    var nav = document.getElementsByClassName('navigation-humburger')[0].style;
    
    if(nav.display=="none"){
      nav.display='flex'
    }
    else{
      nav.display='none'
    }

      
  }


  const add_new_user=()=>{

  }
  return (
   
  

    <div className='navigationbar '>
    <Link to="/" className='navigationbar-logo link-a'>
    <h4 Style={'color:white !important ; zIndex:10'}>LOGO</h4>
    </Link>
    <div>
    <i className="bi bi-list humburger"  onClick={()=>showhide()}></i>

  {/* for mobile    */}
    <div className='navigation-humburger' Style={'display:none'}>
   
    {userToken?
    <>
    <a class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Reports
  </button>
  <ul class="dropdown-menu">
    <li><Link to="/daysreport" class="dropdown-item">Days</Link></li>
    <li><a class="dropdown-item" href="#">Weeks</a></li>
    <li><a class="dropdown-item" href="#">Analytics</a></li>
    <li><Link to="/viewmember"  className='dropdown-item'> View member</Link></li>
  </ul>
</a>
    <Link to='/Tournament' className='navigationbar-a '> Tournament</Link>
    <Link to='/canteen' className='navigationbar-a '> Canteen</Link>
    <Link to="/AddExpense"  className='navigationbar-a '> Add Expense </Link>
        <Link to='/bookinglist' className='navigationbar-a'> Booking</Link>
        <Link  to='/addgame' className='navigationbar-a'> add game</Link>
        <a onClick={()=>logout()} className='navigationbar-a btn-design'> logout </a>

    </>:
    <>
    <a  className='navigationbar-a'> about us </a>
    <a  className='navigationbar-a'> Contact Us </a>
        
        <Link to="/signin" className='navigationbar-a' >Sign in </Link>
         <Link to='/signup' className='btn-design navigationbar-a'>Sign Up</Link>
    </>}
    </div>
    </div>
    
    {/* for computer  */}
    <div className='navigationbar-button'>
    {userToken?
    <>
    <a class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Reports
  </button>
  <ul class="dropdown-menu">
  <li><Link to="/daysreport" class="dropdown-item">Days</Link></li>
    <li><Link to='/weeksreport'   class="dropdown-item" >Weeks</Link></li>
    <li><Link  to='/expense' class="dropdown-item" >Analytics</Link></li>
    <li><Link to="/viewmember"  className='dropdown-item'> View member</Link></li>
  </ul>
</a>
    <Link to='/Tournament' className='navigationbar-a '> Tournament</Link>
    <Link to='/canteen' className='navigationbar-a '> Canteen</Link>
    <Link to="/AddExpense"  className='navigationbar-a '> Add Expense</Link>
        <Link to='/bookinglist' className='navigationbar-a'> Booking</Link>
        <Link  to='/addgame' className='navigationbar-a'> add game</Link>
        <a onClick={()=>logout()} className='navigationbar-a btn-design'> logout </a>

    </>:
    <>
    <a  className='navigationbar-a'> about us </a>
    <a  className='navigationbar-a'> Contact Us </a>
        
        <Link to="/signin" className='navigationbar-a' >Sign in </Link>
         <Link to='/signup' className='btn-design navigationbar-a'>Sign Up</Link>
    </>}
        
    </div>
    
    </div>

    
    
  )
}

export default Navigationbar