import React,{useContext,useEffect,useState} from 'react'
import './bookingdetails.css'
import Form from 'react-bootstrap/Form';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import { AuthContext } from '../../AuthProvider';
import Toast from '../../Toast';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button';


const BookingDetails = () => {
  const {userToken} =useContext(AuthContext)
  const {booking_id} = useParams()
  const [playerdetails,setPlayerDetails] = useState([]);
  const [gamedetails,setgameDetails] = useState([]);
  const [closed_modal,set_Closed_modal] =useState(false)
  const [winner_id, setWinner_id] = useState("0");
  const [info, setInfo] = useState("");
  const [seasonValidity,setSeasonValidity] = useState("")
  const [isLoading,setIsLoading] = useState(true)
 
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
          setgameDetails(data?.booking);
          setInfo(data?.booking?.description)
          
        //   Toast(data.message,response.status)
         }
       }
       catch(err){
        const error = err?.response?.data
        Toast(error?.message);
        
  
  
       }
       finally{
        setIsLoading(false);
       }
}

useEffect(()=>{
  booking_detils()
},[])

const match_winner =async (e) => {
  e.preventDefault()
  const match_id=gamedetails.id.toString();
  const status="0"
try{
  const response= await axios({
    method: "post",
   url:`/close_match`,
   data:{
    winner_id,match_id,status,info
  },
    headers: {
      'Authorization': `Bearer ${userToken}`
      
    },
   })
   
   if(response.status===200){
    const data = response?.data;
    set_Closed_modal(false)
    booking_detils()
    Toast(data.message,response.status)
   }
 }
 catch(err){
  const error = err?.response?.data
  Toast(error?.message);

 }

}
const match_updated =async (e) => {
  e.preventDefault()
  const match_id=gamedetails.id.toString();
try{
  const response= await axios({
    method: "post",
   url:`/close_match`,
   data:{
    match_id,info
  },
    headers: {
      'Authorization': `Bearer ${userToken}`
      
    },
   })
   
   if(response.status===200){
    const data = response?.data;
    set_Closed_modal(false)
    booking_detils()
    Toast(data.message,response.status)
   }
 }
 catch(err){
  const error = err?.response?.data
  Toast(error?.message);

 }

}
 

  return (
    

    <>
    <div className="bookingdetails center-div">
        <div className="bookingdetails-container section-margin ">
        <h1>Booking Details</h1>
        <div className="bookingdetails-box">
          <h4>{
            playerdetails.map((element,index)=>{
            return index+1+".  "+element?.name+"  "
            }) 
          }</h4>
          <p >{gamedetails?.instructor_name} (instrusctor)</p>
          </div>
          <div className="bookingdetails-box-top ">
          <div></div>
            <h4>Session is {gamedetails.status==1? <span Style={"color:#18da18"}>Active</span>:<span Style={"color:red"}>InActive</span>}</h4>
            <p>Booking id : {gamedetails?.booking_id}</p>
            <p>Booking on : { new Date(gamedetails?.created_at).toLocaleString()} </p>
          </div>

          <div className="bookingdetails-box-middle">
            <h3> Booking Description </h3>
            <div>
            <i className="bi bi-currency-rupee"  Style={"color:#c7c6c6 !important"}></i>
            
              <div>
                <p Style={"color:#c7c6c6 !important"}>Amount</p>
                <p>{gamedetails?.game?.price}</p>
              </div>
            </div>
            <div>
            <i className="bi bi-calendar-check"  Style={"color:#c7c6c6 !important"}></i>
              <div>
                <p  Style={"color:#c7c6c6 !important"}>Season Validity</p>
                <p>{gamedetails?.start_time} To {gamedetails?.end_time}</p>
              </div>
            </div>
            <div>
            <i className="bi bi-clock-fill"  Style={"color:#c7c6c6 !important"}></i>
              <div>
                <p  Style={"color:#c7c6c6 !important"}>Winner</p>
                <p>{gamedetails?.winner_id==null?" Winner not decide ":gamedetails?.winner_id==0?"game Tie":gamedetails?.winner}</p>
              </div>
            </div>
          </div>
          <div className="bookingdetails-box-bottom">
            {/* <h4> Rate & Review </h4>
            <div>
            <i className="bi bi-star-fill" Style={"color: #daba07;"}></i>
            <i className="bi bi-star-fill" Style={"color: #daba07;"}></i>
            <i className="bi bi-star-fill" Style={"color: #daba07;"}></i>
            <i className="bi bi-star-fill" Style={"color: #daba07;"}></i>
            <i className="bi bi-star-fill"></i>
            </div>*/}
            <div> 
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={6} Style={" background: #7070708a;border: none; color:white" } value={info} onChange={(e)=>setInfo(e.target.value)}/>
      </Form.Group>
      <div className='bookingdetails-buttons'>
      <button  type="submit"  className='form-btn'  onClick={match_updated} >
        info updated 
      </button>
      <button  type="button" className='form-btn ' onClick={()=>set_Closed_modal(true)}  >
        Season Closed 
      </button>
      
      </div>
            
          </div>
            </div>
         
        
            
        </div>
    </div>
    {/* Modal season closed  */}
    <Modal show={closed_modal} onHide={()=>set_Closed_modal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Winner</Modal.Title>
        </Modal.Header>
        <Modal.Body>

        <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className="addtogame-label">Winner</Form.Label>
        <Form.Select aria-label="Default select example"  value={winner_id} onChange={(e)=>setWinner_id(e.target.value)} disabled={!playerdetails.length}>
        <option  selected value="0">Tie</option>
      {playerdetails?.map((element=>{
        return <option  value={element?.id}>{element?.name}</option>
      }))}
      
    </Form.Select>
      </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>set_Closed_modal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={match_winner}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>

    
    </>
  )
}

export default BookingDetails