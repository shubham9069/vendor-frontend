import React, { useEffect,useContext,useState } from 'react'
import Toast from '../../Toast'
import axios from '../../axios';
import { AuthContext } from '../../AuthProvider';

const Viewmember = () => {
  const {userToken} = useContext(AuthContext);
  const [getuser,setGetuser] = useState([])
  const [isLoading,setIsLoading] = useState(true)

  const getuser_details =async () => {

    try{
      setIsLoading(true)
        const response= await axios({
          method: "get",
         url:'/get_users',
         
          headers: {
            'Authorization': `Bearer ${userToken}`
            
          },
         })
         
         if(response.status===200){
          const data = response.data;
          setGetuser(data.users)
        //   Toast(data.message,response.status)
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
useEffect(() => {
  getuser_details()

}, [])

  return (
    isLoading?<div id="cover-spin"></div>
    :
    <>
    <div className="container section-margin ">
      <table className="table">
  <thead>
    <tr>
      <th scope="col" style={{border: '1px solid #9b9797'}}>No</th>
      <th scope="col" style={{border: '1px solid #9b9797'}}>Name</th>
      <th scope="col" style={{border: '1px solid #9b9797'}}>email</th>
      <th scope="col" style={{border: '1px solid #9b9797'}}>Phone</th>
    </tr>
  </thead>
  <tbody>
  {getuser.map((element,i) => {

    return  <tr>
      <th scope="row" style={{border: '1px solid #9b9797'}}>{i+1}</th>
      <td style={{border: '1px solid #9b9797'}}>{element.name}</td>
      <td style={{border: '1px solid #9b9797'}}>{element.email}</td>
      <td style={{border: '1px solid #9b9797'}}>{element.mobile}</td>
    </tr>
  })}
   
   
  </tbody>
</table>
</div>
    </>
  )
}

export default Viewmember