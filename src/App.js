import './App.css';
import React from 'react'
import {Navigationbar,Homepage,Footer} from './homepage/Exportfiles';
import { Route,Routes } from 'react-router-dom';
import {Signin,Signup,ForgetPassword, Otp, Logout } from './pages/Exportfiles'
import {Addgame ,BookingList,BookingDetails, GameDetails} from './vendorcomponent/Exportfiles'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Requiredlogin from './pages/Requiredlogin'
import PresistLogin from './pages/PresistLogin';



const App=()=> {
  return (
    <>
    <Navigationbar/>
  
   <Routes> 
   <Route element={<PresistLogin/>}>
   <Route exact path='/' element={<Homepage/>}/>
  
   <Route path="/signup" element={<Signup/>}/>
   <Route path="/otp" element={<Otp/>}/>
   <Route path="/signin" element={<Signin/>}/>

   <Route element={<Requiredlogin/>}>
   <Route path="/forgetpassword" element={<ForgetPassword/>}/>
   <Route exact path="/addgame/gamedetails/:game_id" element={<GameDetails/>}/>
   <Route path="/addgame" element={<Addgame/>}/>

    <Route exact path="/bookinglist" element={<BookingList/>}/>
   <Route  path="/bookinglist/bookingdetails/:booking_id" element={<BookingDetails/>}/>
   
   </Route>
   </Route>
   </Routes>

   
  
   <Footer/> 

   <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />
    </>
  )
}

export default App;
