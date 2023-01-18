import React from 'react'
import './bookingdetails.css'
import Form from 'react-bootstrap/Form';


const BookingDetails = () => {
  return (
    <>
    <div className="bookingdetails center-div">
        <div className="bookingdetails-container section-margin ">
        <h1>Booking Details</h1>
        <div className="bookingdetails-box">
          <h4>vinay singh</h4>
          <p >shalini gupta (instrusctor)</p>
          </div>
          <div className="bookingdetails-box-top ">
          <div></div>
            <h4>Session is <span Style={"color:#18da18"}>active</span></h4>
            <p>Booking id : 452</p>
            <p>Booking on : 01 jan 2020 15:52 pm </p>
          </div>

          <div className="bookingdetails-box-middle">
            <h3> Booking Description </h3>
            <div>
            <i class="bi bi-currency-rupee"  Style={"color:#c7c6c6 !important"}></i>
            
              <div>
                <p Style={"color:#c7c6c6 !important"}>Amount</p>
                <p>7000</p>
              </div>
            </div>
            <div>
            <i class="bi bi-calendar-check"  Style={"color:#c7c6c6 !important"}></i>
              <div>
                <p  Style={"color:#c7c6c6 !important"}>Season Validity</p>
                <p>04 feb 2020, 20:45pm </p>
              </div>
            </div>
            <div>
            <i class="bi bi-clock-fill"  Style={"color:#c7c6c6 !important"}></i>
              <div>
                <p  Style={"color:#c7c6c6 !important"}>Season Timing</p>
                <p>05:12 AM - 08:24 pm </p>
              </div>
            </div>
          </div>
          <div className="bookingdetails-box-bottom">
            <h4> Rate & Review </h4>
            <div>
            <i class="bi bi-star-fill" Style={"color: #daba07;"}></i>
            <i class="bi bi-star-fill" Style={"color: #daba07;"}></i>
            <i class="bi bi-star-fill" Style={"color: #daba07;"}></i>
            <i class="bi bi-star-fill" Style={"color: #daba07;"}></i>
            <i class="bi bi-star-fill"></i>
            </div>
            <div>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Control as="textarea" rows={6} Style={" background: #7070708a;border: none; color:white" } />
      </Form.Group>
      <button  type="submit"  className='form-btn'  >
        Submit
      </button>
            
          </div>
            </div>
         
        
            
        </div>
    </div>
    </>
  )
}

export default BookingDetails