import React from 'react'
import "./signin.css"
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Signin = props => {
  return (
    <>
        <div className="signin center-div section-margin">
        <div className="signin-left center-div">
        <h1>Sign in via </h1>
        <div>
        <i class="bi bi-twitter signin-icon"></i>
        <i class="bi bi-google signin-icon"></i>
        <i class="bi bi-facebook signin-icon"></i>
        </div>
        <p> Create New Account ? <Link to="/signup" Style={"color:#894dd4"}>Sign Up</Link></p>
        </div>
        <div className="signin-right">
        <Form classname="signin-form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="signin-label">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted" Style={"color:#bbbbbbd6 !important"}>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="signin-label">Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
     
      <Form.Group className="mb-3 d-flex  justify-content-between" controlId="formBasicCheckbox"  Style={"color:#bbbbbbd6 !important"} >
        <Form.Check type="checkbox" label="Remember Me" />
        <Link to='/forgetpassword' Style={"color:#bbbbbbd6; text-decoration: none !important"}> Forget Password ?</Link>
      </Form.Group>
      
      <button  type="submit"  className='form-btn'  >
        Signin
      </button>
    </Form>
        </div>
    </div>
    </>
  )
}



export default Signin