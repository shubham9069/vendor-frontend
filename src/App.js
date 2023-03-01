import './App.css';
import React from 'react'
import {Navigationbar,Homepage,Footer} from './homepage/Exportfiles';
import { Route,Routes } from 'react-router-dom';
import {Signin,Signup,ForgetPassword, Otp, Logout, Viewmember } from './pages/Exportfiles'
import {Addgame ,BookingList,BookingDetails, GameDetails, Canteen, Tournament, Report, AddExpense, TournamentDetails} from './vendorcomponent/Exportfiles'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Requiredlogin from './pages/Requiredlogin'
import PresistLogin from './pages/PresistLogin';
import * as echarts from 'echarts';
import Expense from './vendorcomponent/report/Expense';

var WeeksArr={
  name:"Weeks",
  data:["sun",'mon','tues','wed','thu','fri','sat']
}
var DaysArr={
  name:"Days",
  data:["1hrs - 2hrs",'1hrs - 4hrs','12hrs <','16hrs <','24hrs <']
}
var expense={
  name:"expense",
  data:["Canteen",'game','Snookers','Table']
}

const App=()=> {
  return (
    <>
    <Navigationbar/>
  
   <Routes> 
   <Route element={<PresistLogin/>}>
   <Route  path='/' element={<Homepage/>}/>
  
   <Route path="/signup" element={<Signup/>}/>
   <Route path="/otp" element={<Otp/>}/>
   <Route path="/signin" element={<Signin/>}/>
   <Route path="/forgetpassword" element={<ForgetPassword/>}/>
   <Route element={<Requiredlogin/>}>
   
   <Route  path="/Tournament" element={<Tournament/>}/>
   <Route  path="/canteen" element={<Canteen/>}/>
   <Route  path="/AddExpense" element={<AddExpense/>}/>
   <Route  path="/addgame" element={<Addgame/>}/>
   <Route  path="/addgame/gamedetails/:game_id" element={<GameDetails/>}/>
   <Route  path="/TournamentDetails/:id" element={<TournamentDetails/>}/>

    <Route  path="/bookinglist" element={<BookingList/>}/>
   <Route  path="/bookinglist/bookingdetails/:booking_id" element={<BookingDetails/>}/>
   <Route  path="/viewmember" element={<Viewmember/>}/>
   <Route  path="/daysreport" element={<Report title="days" url="/get_report_by_slots"  />}/>
   <Route  path="/weeksreport" element={<Report title="weeks" url = "/get_report_by_days"  />}/>
   <Route  path="/expense" element={<Expense  />}/>
   
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
