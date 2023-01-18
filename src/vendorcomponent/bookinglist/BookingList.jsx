import React, { useState } from 'react'
import './bookinglist.css'
import { Link } from 'react-router-dom'

const BookingList = () => {
    const [bookinglist,setbookin] = useState([0,1,2,3,4,5,6,7,8,9,77])
  return (
    <>
        <div className="addgame-middle section-margin ">
  <h1> Booking List</h1>
  <div className="Bookinglist center-div">
  {bookinglist.map((element)=>{
    
    return <>
    <Link to='/bookinglist/bookingdetails' className="link-a">
    <div to='/bookinglist/bookingdetails' className="Bookinglist-box ">
      <div className="Bookinglist-left">
        <img src="https://www.shutterstock.com/image-photo/red-snooker-ball-on-table-260nw-709795153.jpg"/>
      </div>
      <div className='Bookinglist-middle'>
        <span Style={"color: #a70d0dd1;"}> Booking no #212482 </span>
          <h3>Snooker</h3>
          <p>Table no #22</p>
          <p>₹ 621/h</p>
      </div>
      <div className='Bookinglist-right'>
        <p>21 may 2022</p>
        <button className='btn-design'> Booked</button>
      </div>
    </div>
    </Link>
    </>
  })}
   
    
  </div>
</div>
    </>
  )
}

export default BookingList