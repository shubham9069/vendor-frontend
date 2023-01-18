import React from 'react'
import './signup.css'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';






const Signup = () => {
  return (
    <>
    <div className="signup center-div section-margin">
        <div className="signup-left center-div">
        <h1>Sign Up</h1>
        <div>
        <i class="bi bi-twitter signup-icon"></i>
        <i class="bi bi-google signup-icon"></i>
        <i class="bi bi-facebook signup-icon"></i>
        </div>
        <p> Are You Already memeber ? <Link to='/signin' Style={"color:#894dd4;"}>Sign in</Link></p>
        </div>
        <div className="signup-right">
        <Form className="signup-form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="signup-label">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted" Style={"color:#bbbbbbd6 !important"}>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="signup-label">Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="signup-label">Confirm Password</Form.Label>
        <Form.Control type="password" placeholder=" Confirm Password" />
      </Form.Group>
      
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label className="signup-label"> Pitcure Of Club</Form.Label>
        <Form.Control type="file" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCity">
        <Form.Label className="signup-label">City</Form.Label>
        <Form.Control type="text" placeholder="city" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLocation">
        <Form.Label className="signup-label">Location</Form.Label>
        <Form.Control type="text" placeholder="Location" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Number">
        <Form.Label className="signup-label">Pincode</Form.Label>
        <Form.Control type="number" placeholder="Number" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox"  Style={"color:#bbbbbbd6 !important"} >
        <Form.Check type="checkbox" label="I Agree to the Terms & Condition" />
      </Form.Group>
      <button  type="submit"  className='form-btn'  >
        Submit
      </button>
    </Form>
        </div>
    </div>
    </>
  )
}

export default Signup