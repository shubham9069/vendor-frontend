import React,{useContext,useEffect,useState} from 'react'
import './bookingdetails.css'
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import { AuthContext } from '../../AuthProvider';
import Toast from '../../Toast';


const BookingDetails = () => {
  const {userToken} =useContext(AuthContext)
  const {booking_id} = useParams()
  const [playerdetails,setPlayerDetails] = useState([]);
  const [gamedetails,setgameDetails] = useState([]);

  const booking_detils =async (e) => {
        console.log("hello")
    try{
        const response= await axios({
          method: "get",
         url:`/booking_details?booking_id=${booking_id}`,
         
          headers: {
            'Authorization': `Bearer ${userToken}`
            
          },
         })
         
         if(response.status===200){
          const data = response?.data;
          
          setPlayerDetails(data?.booking?.players)
          setgameDetails(data?.booking)
        //   Toast(data.message,response.status)
         }
       }
       catch(err){
        const error = err?.response?.data
        Toast(error?.message);
        
  
  
       }
}

useEffect(()=>{
  booking_detils()
},[])

 

  return (
    

    <>
    <div className="bookingdetails center-div">
        <div className="bookingdetails-container section-margin ">
        <h1>Booking Details</h1>
        <div className="bookingdetails-box">
          <h4>vinay singh</h4>
          <p >{gamedetails?.instructor_name} (instrusctor)</p>
          </div>
          <div className="bookingdetails-box-top ">
          <div></div>
            <h4>Session is {gamedetails.status==1? <span Style={"color:#18da18"}>Active</span>:<span Style={"color:red"}>InActive</span>}</h4>
            <p>Booking id : {gamedetails.booking_id}</p>
            <p>Booking on : { new Date(gamedetails.created_at).toLocaleString()} </p>
          </div>

          <div className="bookingdetails-box-middle">
            <h3> Booking Description </h3>
            <div>
            <i class="bi bi-currency-rupee"  Style={"color:#c7c6c6 !important"}></i>
            
              <div>
                <p Style={"color:#c7c6c6 !important"}>Amount</p>
                <p>{gamedetails?.game?.price}</p>
              </div>
            </div>
            <div>
            <i class="bi bi-calendar-check"  Style={"color:#c7c6c6 !important"}></i>
              <div>
                <p  Style={"color:#c7c6c6 !important"}>Season Validity</p>
                <p>{gamedetails?.session_time}</p>
              </div>
            </div>
            <div>
            <i class="bi bi-clock-fill"  Style={"color:#c7c6c6 !important"}></i>
              <div>
                <p  Style={"color:#c7c6c6 !important"}>Season Timing</p>
                <p>{gamedetails?.starting_time} - {gamedetails?.session_time}</p>
              </div>
            </div>
          </div>
          <div className="bookingdetails-box-bottom">
            {/* <h4> Rate & Review </h4>
            <div>
            <i class="bi bi-star-fill" Style={"color: #daba07;"}></i>
            <i class="bi bi-star-fill" Style={"color: #daba07;"}></i>
            <i class="bi bi-star-fill" Style={"color: #daba07;"}></i>
            <i class="bi bi-star-fill" Style={"color: #daba07;"}></i>
            <i class="bi bi-star-fill"></i>
            </div>*/}
            <div> 
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={6} Style={" background: #7070708a;border: none; color:white" } value={gamedetails.description}/>
      </Form.Group>
      <button  type="submit"  className='form-btn'  >
        info updated 
      </button>
      <button  type="submit"  className='form-btn'  >
        season closed 
      </button>
            
          </div>
            </div>
         
        
            
        </div>
    </div>
    </>
  )
}

export default BookingDetails