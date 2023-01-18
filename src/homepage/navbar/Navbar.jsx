import React from 'react'
import './navbar.css'
import { Link } from 'react-router-dom'
import { Button } from 'bootstrap'

function navigationbar() {
  const showhide=()=>{
    var nav = document.getElementsByClassName('navigation-humburger')[0].style;
    
    if(nav.display=="none"){
      nav.display='flex'
    }
    else{
      nav.display='none'
    }

      
  }
  return (
    <div className='navigationbar '>
    <Link to="/" className='navigationbar-logo link-a'>
    <h4 Style={'color:white !important ; zIndex:10'}>LOGO</h4>
    </Link>
    <div>
    <i className="bi bi-list humburger"  onClick={()=>showhide()}></i>

    
    <div className='navigation-humburger' Style={'display:none'}>
    <a Href='/' className='navigationbar-a'> about us </a>
        <a  Href='/' className='navigationbar-a'> Booking</a>
        <Link  to='/addgame' className='navigationbar-a '> add game</Link>
        <Link to="/signin" className='navigationbar-a ' >Sign in </Link>
         <Link to='/signup' className='btn-design navigationbar-a humburger-btn'>Sign Up</Link>
    </div>
    </div>
    
    
    <div className='navigationbar-button'>
        <a Href='/' className='navigationbar-a'> about us </a>
        <a  Href='/' className='navigationbar-a'> Booking</a>
        <Link  to='/addgame' className='navigationbar-a'> add game</Link>
        <Link to="/signin" className='navigationbar-a' >Sign in </Link>
         <Link to='/signup' className='btn-design navigationbar-a'>Sign Up</Link>
    </div>
        
    </div>
  )
}

export default navigationbar