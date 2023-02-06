import React, { useState,useContext } from 'react'
import "./signin.css"
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link ,useLocation,useNavigate} from 'react-router-dom';
import Toast from "../../Toast"
import axios from '../../axios'
import {AuthContext} from '../../AuthProvider'

const Signin = props => {
  const location =useLocation();
  const from = location?.state?.from?.pathname
  
  const {setUserToken,setUserData} = useContext(AuthContext)
  const navigate  = useNavigate()
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [isLoading,setIsLoading] = useState()

  const login = async(e)=>{
    e.preventDefault()

     if(!email || !password ) return Toast("please fill properly")
    
     try{
      setIsLoading(true)
      const response= await axios({
        method: "post",
       url:'/login',
        data:{
          email,password
        },
        headers: {
          "Content-Type": "application/json",
          
        },
       })
       
       if(response.status===200){
        const data = response.data
        setUserToken(data.accessToken);
        setUserData(data.vendor)
        window.localStorage.setItem('userToken', JSON.stringify(data));
        Toast(data.message,response.status)
        navigate(from || '/')
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
  return (
    isLoading?<div id="cover-spin"></div>
    :
    <>
        <div className="signin center-div section-margin">
        <div className="signin-left center-div">
        <h1>Sign in via </h1>
        <div>
        {/* <i class="bi bi-twitter signin-icon"></i>
        <i class="bi bi-google signin-icon"></i>
        <i class="bi bi-facebook signin-icon"></i> */}
        heelo plz login your account 
        </div>
        <p> Create New Account ? <Link to="/signup" Style={"color:#894dd4"}>Sign Up</Link></p>
        </div>
        <div className="signin-right">
        <Form classname="signin-form">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="signin-label">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) =>setEmail(e.target.value)} />
        <Form.Text className="text-muted" Style={"color:#bbbbbbd6 !important"}>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="signin-label">Password</Form.Label>
        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) =>setPassword(e.target.value)}/>
      </Form.Group>
     
      <Form.Group className="mb-3 d-flex  justify-content-between" controlId="formBasicCheckbox"  Style={"color:#bbbbbbd6 !important"} >
        <Form.Check type="checkbox" label="Remember Me" />
        <Link to='/forgetpassword' Style={"color:#bbbbbbd6; text-decoration: none !important"}> Forget Password ?</Link>
      </Form.Group>
      
      <button  type="submit"  className='form-btn' onClick={login} >
        Signin
      </button>
    </Form>
        </div>
    </div>
    </>
  )
}



export default Signin