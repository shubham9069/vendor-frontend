import React,{useEffect, useState,useContext} from 'react'
import './report.css' 
import * as echarts from 'echarts';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Toast from '../../Toast';
import axios from '../../axios';
import {AuthContext} from '../../AuthProvider'


const Report = ({title,url}) => {
  const [data,setData] = useState([])
  const {userToken} = useContext(AuthContext)
  const [isLoading,setIsLoading] = useState(false)



  const Get_Report = async(e) =>{
    
  
    try{
      setIsLoading(true)
      const response= await axios({
        method: "get",
       url:url,
        headers: {
          'Authorization': `Bearer ${userToken}`
          
        },
       })
       
       if(response.status===200){
        const data = response.data;
        setData(data?.slots)
        Toast(data.message,response.status)
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

  useEffect(()=>{
    Get_Report();

  },[url])
  return (
   <>
   {isLoading && <div id="cover-spin"></div>}
    <div className="container reports section-padding">
    <h4 style={{color:'rgb(23, 191, 99)'}}>{title} Reports </h4>
        <div>
        <span style={{fontSize:20,fontWeight:600,}}>{title}</span>
        <span style={{fontSize:20,fontWeight:600,}}>crowd</span>
         </div>
        {data?.map((element)=>{


          return <div>
        <span>{element?.name}</span>
        <span><ProgressBar now={element?.crowd} /></span>
         </div>
        })}
      
    </div>






   </>
  )
}

export default Report