import React,{useContext, useState} from 'react'
import './otp.css'
import Form from 'react-bootstrap/Form';
import axios from '../../axios'
import { useNavigate,useLocation } from 'react-router-dom';
import Toast from '../../Toast'
import { AuthContext } from '../../AuthProvider';


const Otp = () => {
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState()
  const {setUserToken,setUserData} = useContext(AuthContext)
    const[input1,setInput1]  = useState("")
    const[input2,setInput2]  = useState("")
    const[input3,setInput3]  = useState("")
    const[input4,setInput4]  = useState("")
     const location = useLocation();
     const email = location?.state?.email  

    const checkotp=async(e)=>{
        e.preventDefault()
        
        if(!input1 || !input2 || !input3 || !input4) return Toast('plz filled otp');

        const otp = input1+input2+input3+input4
        console.log(email,otp)
        try{
          setIsLoading(true)
            const response= await axios({
              method: "post",
             url:'/verify-otp',
              data:{
                email,otp
              },
              headers: {
                "Content-Type": "application/json",
                
              },
             })
             
             if(response.status===200){
              const data = response.data;
              setUserToken(data.accessToken);
              setUserData(data.vendor)
              window.localStorage.setItem('userToken', JSON.stringify(data));
              Toast(data.message,response.status);
              navigate('/')
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
    const resendotp=async(e)=>{
        e.preventDefault()
        try{
          setIsLoading(true)
            const response= await axios({
              method: "post",
             url:'/resend-otp',
              data:{
                email
              },
              headers: {
                "Content-Type": "application/json",
                
              },
             })
             
             if(response.status===200){
              const data = response.data
              Toast(data.message,response.status)
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
    
    function otphandler(e){
      


      var element = document.getElementsByClassName('form-control')
      // console.log(element)
      

      // keycode 8 for backspace 
      if(e.keyCode == 8 && e.target.value.length ==0 &&  e.target.previousElementSibling !==null){
      e.target.previousElementSibling.focus()
     

      }if( e.target.value.length >=e.target.maxLength && e.target.nextElementSibling !==null){
        e.target.nextElementSibling.focus()
      }
      

    }
  return (
   isLoading? <div id="cover-spin"></div>
   :
   <>
    <div className="otp center-div section-margin">
        <div className="otp-left center-div">
        <h1>OTP</h1>

        <p> it is neccessary for user validation without otp verification you data is not secure </p>
        </div>
        <div className="otp-right">
        <Form classname="otp-form">
      
            <h3 style={{color: 'white',marginBottom:'1rem'}}>OTP</h3>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        
        <div className="d-flex " style={{gridGap:'20px'}}>
        <Form.Control type="text"  maxLength={1} onKeyUp={otphandler} style={{maxWidth:'50px'}} value={input1} onChange={(e)=>{setInput1(e.target.value)}} />
        <Form.Control type="text"  maxLength={1} onKeyUp={otphandler} style={{maxWidth:'50px'}} value={input2} onChange={(e)=>{setInput2(e.target.value)}}/>
        <Form.Control type="text"  maxLength={1} onKeyUp={otphandler} style={{maxWidth:'50px'}} value={input3} onChange={(e)=>{setInput3(e.target.value)}}/>
        <Form.Control type="text"  maxLength={1} onKeyUp={otphandler} style={{maxWidth:'50px'}} value={input4} onChange={(e)=>{setInput4(e.target.value)}}/>
        </div>
      </Form.Group>
      
        
      <Form.Group className="mb-3" controlId="formBasicCheckbox"  Style={"color:#bbbbbbd6 !important"} >
        <p onClick={resendotp} style={{cursor:"pointer"}}>Resend Otp</p>
      </Form.Group>
      
      <button  type="submit"  className='form-btn' onClick={checkotp}  >
        submit otp
      </button>
    </Form>
        </div>
    </div>
   </>
  )
}

export default Otp