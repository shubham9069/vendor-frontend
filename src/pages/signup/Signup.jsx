import React , {useState} from 'react'
import './signup.css'
import { Link,useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from '../../axios'

import Toast from '../../Toast'
import { toast } from 'react-toastify';
import validator from 'validator';






const Signup = () => {
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState()
  const toast_msg = Toast()
  const [vendor, setVendor]= useState({
    name:"",email:"",mobile:"",password:"",confirmpassword:"",city:"",location:"",pincode:"",agreement:false
  })


  const handlechange=(e)=>{
    
    const name = e.target.name;              
   const value = e.target.value;
 

    setVendor({...vendor,[name]:value})
  }


  const vendor_signup = async(e)=>{
    e.preventDefault()
   const {name,email,mobile,password,confirmpassword,city,location,pincode,agreement}=vendor;
    
   console.log(password,confirmpassword) 
     if(!name ||!email ||!mobile ||!password ||!confirmpassword ||!city ||!location ||!pincode ) return Toast("please fill properly")
     if( !validator.isEmail(email)) return Toast("email is not valid")
     if( !validator.isMobilePhone(mobile)) return Toast("mobile no  is not valid")
     if( !validator.isStrongPassword(password)) return Toast("password is not strong")
     if( password !== confirmpassword ) return Toast("password and confirm is not match")
     if( agreement===false) return Toast("plz reead terms & condition ")

     try{
      setIsLoading(true)
      const response= await axios({
        method: "post",
       url:'/signup',
        data:{
          name,email,mobile,password,confirmpassword,city,location,pincode,agreement
        },
        headers: {
          "Content-Type": "application/json",
          
        },
       })
       
       if(response.status===200){
        const data = response.data
        Toast(data.message,response.status)
        navigate('/otp',{state:{email}})
       }
     }
     catch(err){
      const error = err.response.data
      Toast(error.message)

     }
     finally{
      setIsLoading(false)
     }
  }
  return (
    isLoading?<div id="cover-spin"></div>
    :
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
        <Form.Label className="signup-label">name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" name="name" value={vendor.name} onChange={handlechange} />
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="signup-label">Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={vendor.email} onChange={handlechange} />
        <Form.Text className="text-muted" Style={"color:#bbbbbbd6 !important"}>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label className="signup-label">mobile Number</Form.Label>
        <Form.Control type="number" placeholder="Enter mobile" name="mobile" value={vendor.mobile} onChange={handlechange} />
       
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="signup-label">Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name='password' value={vendor.password} onChange={handlechange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label className="signup-label">Confirm Password</Form.Label>
        <Form.Control type="password" placeholder=" Confirm Password" name="confirmpassword" value={vendor.confirmpassword} onChange={handlechange} />
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicCity">
        <Form.Label className="signup-label">City</Form.Label>
        <Form.Control type="text" placeholder="city" name="city" value={vendor.city} onChange={handlechange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicLocation">
        <Form.Label className="signup-label">Location</Form.Label>
        <Form.Control type="text" placeholder="Location" name="location" value={vendor.location} onChange={handlechange}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="Number">
        <Form.Label className="signup-label">Pincode</Form.Label>
        <Form.Control type="number" placeholder="Number" name="pincode" value={vendor.pincode} onChange={handlechange}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox"  Style={"color:#bbbbbbd6 !important"} >
        <Form.Check type="checkbox" label="I Agree to the Terms & Condition" name="agreement" onChange={(e)=>setVendor({...vendor,[e.target.name]:!vendor.agreement})}   />
      </Form.Group>
      <button  type="submit"  className='form-btn' onClick={vendor_signup}  >
        Submit
      </button>
    </Form>
        </div>
    </div>
    </>
  )
}

export default Signup