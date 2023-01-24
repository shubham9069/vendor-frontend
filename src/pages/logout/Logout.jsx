import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../AuthProvider'
import axios from '../../axios'
import Toast from '../../Toast'
import { useNavigate } from 'react-router-dom'

const Logout =  () => {
    const navigate =useNavigate()
    const {userData,userToken,setUserData,setUserToken} = useContext(AuthContext)

  

    const logout =async ()=>{
    try{
        const response= await axios({
          method: "get",
         url:'/logout',
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${userToken}`
          },
         })
         
         if(response.status===200){
          const data = response.data
          setUserToken();
          setUserData();
          window.localStorage.clear();
          Toast(data.message,response.status)
          navigate('/')
         }
       }
       catch(err){
        const error = err.response.data
        Toast(error.message)
        navigate('/')
       }

}
return logout
}





export default Logout