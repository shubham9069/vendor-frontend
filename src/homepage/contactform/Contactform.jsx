import React from 'react'
import './contactform.css'
import contactimg from '../assest/5124556-removebg-preview.png'

const Contactform = () => {
  return (
    <>
    <div className="contact_form section-margin">
        <div className="contact_form-left ">
    <img src={contactimg}  alt=""/>
        </div>
        <form className="contact_form-right ">
        <div className="contact_form-input">
            <label>Name</label>
            <input type="text" className="form-input" placeholder='write name' />
            </div>
        <div className="contact_form-input">
            <label>Email </label>
            <input type="email" className="form-input" placeholder='write email '/>
            </div>
        <div className="contact_form-input">
            <label>Phone No</label>
            <input type="number" className="form-input"  placeholder='write phone '/>
            </div>
        <div className="contact_form-input">
            <label>Message</label>
            <textarea className="text-area" placeholder='write message ' />
            </div>
        <div className='contact_form-input'>
            <button type="button" className='form-btn' >Submit</button>
            </div>
        
        </form>
    </div>
    </>
  )
}

export default Contactform