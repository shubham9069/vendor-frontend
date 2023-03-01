import React,{useEffect, useState,useContext} from 'react'
import './report.css' 
import * as echarts from 'echarts';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Toast from '../../Toast';
import axios from '../../axios';
import { AuthContext } from '../../AuthProvider';


const Expense= () => {
  const {userToken} = useContext(AuthContext)
  const [isLoading,setIsLoading] = useState(false)
  const [ReportData,setReportData] = useState({})

  
  const Get_expenseReport = async(e) =>{
    var days = e.target?.value || 1
    console.log(days)
    try{
      setIsLoading(true)
      const response= await axios({
        method: "post",
       url:'/get_analytics_records',
       data:{days},
        headers: {
          'Authorization': `Bearer ${userToken}`
          
        },
       })
       
       if(response.status===200){
        const data = response.data;
        setReportData(data?.report)
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
    Get_expenseReport(1)
  },[])

  return (
   <>
   {isLoading && (<div id="cover-spin"></div>)}
    <div className="container reports section-padding">
    <h4 style={{color:'rgb(23, 191, 99)'}}>Expense Reports </h4>
        <div>
        <span style={{fontSize:20,fontWeight:600,}}>expense</span>
        <span>
        <select class="form-select" aria-label="Default select example" style={{width: 'max-content',margin: '0 auto'}} onChange={Get_expenseReport}>
  <option selected value={1}>1Days</option>
  <option value={7}>7days</option>
  <option value={30}>30days</option>
  
  
</select>
</span>
         </div>
        {Object.keys(ReportData).map((key)=>{


          return <div>
        <span>{key}</span>
       <span> <p style={{background:(key=="profit" ? ReportData[key] >=0? "#bee5c2 ":"#e6ad9b":"") ,margin:'5px auto' , width:"fit-content",borderRadius:6,padding:'3px 8px'}}>{ReportData[key]}</p> </span>
         </div>
        })}
      
    </div>






   </>
  )
}

export default Expense