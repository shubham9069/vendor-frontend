import './App.css';
import React from 'react'
import {Navbar,Homepage,Footer} from './homepage/Exportfiles';
import { Route,Routes } from 'react-router-dom';
import {Signin,Signup,ForgetPassword } from './pages/Exportfiles'
import {Addgame ,BookingList,BookingDetails, GameDetails} from './vendorcomponent/Exportfiles'



const App=()=> {
  return (
    <>
    <Navbar/>
  
   <Routes> 
   <Route exact path='/' element={<Homepage/>}/>
   <Route path="/signup" element={<Signup/>}/>
   <Route path="/signin" element={<Signin/>}/>
   <Route path="/forgetpassword" element={<ForgetPassword/>}/>
   <Route exact path="/addgame/gamedetails" element={<GameDetails/>}/>
   <Route path="/addgame" element={<Addgame/>}/>

    <Route exact path="/bookinglist" element={<BookingList/>}/>
   <Route  path="/bookinglist/bookingdetails" element={<BookingDetails/>}/>
   
   </Routes>
  
   <Footer/> 
    </>
  )
}

export default App;
