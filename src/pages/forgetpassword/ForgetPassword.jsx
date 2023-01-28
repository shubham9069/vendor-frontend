import React,{useState} from 'react'
import './forgetpassword.css'
import Form from 'react-bootstrap/Form';
import axios from '../../axios'

import Toast from '../../Toast'
import { useNavigate } from 'react-router-dom';
import validator from 'validator';


const ForgetPassword = () => {
  const navigate = useNavigate()
  const [email,setEmail] =useState("")
  const [isLoading,setLoading] = useState()


  const forget_password=async(e) => {
    e.preventDefault()

    if(!email) return Toast("please fill properly")
    if( !validator.isEmail(email)) return Toast("email is not valid")

    try{
      setLoading(true)
      const response= await axios({
        method: "post",
       url:'/reset-password',
        data:{
          email,
        },
        headers: {
          "Content-Type": "application/json",
          
        },
       })
       
       if(response.status===200){
       
        const data = response.data
        Toast(data.message,response.status)
        navigate('/')
       }
     }
     catch(err){
      const error = err.response.data
      Toast(error.message)

     }
     finally{
      setLoading(false)
     }
  }
  return (
    isLoading?<div id="cover-spin"></div>
    :
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
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        <Form.Text className="text-muted" Style={"color:#bbbbbbd6 !important"}>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

     
      <button  type="submit"  className='form-btn' onClick={forget_password} >
        Send mail
      </button>
    </Form>
        </div>
    </div>
    </>
  )
}

export default ForgetPassword