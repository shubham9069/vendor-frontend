import React from 'react'
import './footer.css'

function Footer() {
  return (
    <>
    <div className="main-footer">
    <div className="footer">
        <div className="footer-left">
            <h3>GET IN TOUCH </h3>
            <div>
                <h4>India</h4>
                <p>3MD MEGAPOLIS, 323-324, 3rd Floor, Badshahpur Sohna Rd Hwy, Sector 48, Gurugram, Haryana 122019</p>
            </div>
            <div>
                <h4>Australia</h4>
                <p>MD MEGAPOLIS, 323-324, 3rd Floor, Badshahpur Sohna Rd Hwy, Sector 48, Gurugram, Haryana 122019</p>
            </div>
            <div>
                <h4>Phone No </h4>
                <p>45154875421</p>
            </div>
        </div>
        <div className="footer-middle">
            <h3>USEFULL LINK</h3>
               <div>
                <p>Add Game </p>
                <p>Add To club</p>
                <p>Fill Your Details</p>
                <p>Procedure Of How We Work</p>
                <p>Best Offers </p>
                
               </div>
            </div>
        <div className="footer-middle">
            <h3>ABOUT</h3>
               <div>
                <p>About Us</p>
                <p>Careers</p>
                <p>Send A Message</p>
                <div id="social-icon">
                <img src="https://img.icons8.com/3d-fluency/40/null/instagram-new.png"/>
                <img src="https://img.icons8.com/fluency/40/null/facebook-circled.png"/>
                <img src="https://img.icons8.com/fluency/40/null/whatsapp.png"/>
                </div>
                
               </div>
            </div>
        
       
        
    </div>
    <div className="footer-bottom">
        
    <img src="https://images.dmca.com/Badges/dmca-badge-w150-5x1-10.png?ID=aa83d204-e9e0-41e9-b56b-27d4182d29d9" alt="DMCA.com Protection Status"/>
    <p>MADE IN INDIA </p>
    <p>Y.V.S © 2022. All Rights Reserved</p>

        
    </div>
    </div>
    </>
  )
}

export default Footer