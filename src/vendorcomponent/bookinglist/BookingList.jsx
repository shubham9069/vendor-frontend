import React, { useContext, useState } from 'react'
import './bookinglist.css'
import { Link } from 'react-router-dom'
import Toast from '../../Toast'
import axios from '../../axios'
import { AuthContext } from '../../AuthProvider'
import { useEffect } from 'react'

const BookingList = () => {
  const {userToken}=useContext(AuthContext)
    const [bookinglist,setbookinglist] = useState([])
    const [isLoading,setIsLoading]=useState(true)


  const get_bookinglist = async() =>{

    try{
      setIsLoading(true)
      const response= await axios({
        method: "get",
       url:'/bookings',
        headers: {
          'Authorization': `Bearer ${userToken}`
          
        },
       })
       
       if(response.status===200){
        const data = response.data;
        setbookinglist(data.bookings)
      //   Toast(data.message,response.status)
       }
     }
     catch(err){
      const error = err.response.data
      Toast(error.message);
      


     }
     finally{
      setIsLoading(false)
     }
    }

    useEffect(()=>{
      get_bookinglist()
    },[])
  return (
    isLoading?<div id="cover-spin"></div>
    :
    <>
        <div className="addgame-middle section-margin ">
  <h1> Booking List</h1>
  <div className="Bookinglist center-div">
  {bookinglist?.map((element)=>{
    return  <Link to={'/bookinglist/bookingdetails/'+element.id} className="link-a">
    <div  className="Bookinglist-box ">
      <div className="Bookinglist-left">
        <img src={element?.game?.images[0]}/>
      </div>
      <div className='Bookinglist-middle'>
        <span Style={"color: #a70d0dd1;"}>{"Booking no" + element.booking_id }</span>
          <h3>{element?.game?.name}</h3>
          <p>{element?.table_id}</p>
          <p>{element?.game?.price}</p>
      </div>
      <div className='Bookinglist-right'>
        <p>{new Date(element.created_at).toLocaleString()}</p>
        <button className='btn-design'> Booked</button>
      </div>
    </div>
    </Link>
  })}
   
   
  
  
   
    
  </div>
</div>
    </>
  )
  }


export default BookingList