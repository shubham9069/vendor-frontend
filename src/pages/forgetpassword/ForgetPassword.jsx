import React from 'react'
import './forgetpassword.css'
import Form from 'react-bootstrap/Form';


const ForgetPassword = () => {
  return (
    <>
         <div className="forget center-div section-margin">
        <div className="forget-left center-div">
        <h1>Forget</h1>

        <p> we will send you a genreated password on you email id its one-time-password after logiin you need to changed your password </p>
        </div>
        <div className="forget-right">
        <Form classname="forget-form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="forget-label">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted" Style={"color:#bbbbbbd6 !important"}>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="forget-label">Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="forget-label">Confirm Password</Form.Label>
        <Form.Control type="password" placeholder=" Confirm Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox"  Style={"color:#bbbbbbd6 !important"} >
        <Form.Check type="checkbox" label="I Agree to the Terms & Condition" />
      </Form.Group>
      <button  type="submit"  className='form-btn'  >
        Send otp
      </button>
    </Form>
        </div>
    </div>
    </>
  )
}

export default ForgetPassword