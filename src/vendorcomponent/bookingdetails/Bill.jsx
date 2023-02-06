import React, { useContext } from 'react'
import { AuthContext } from '../../AuthProvider'

const Bill = ({gamedata}) => {
    const {userData} = useContext(AuthContext)
    const {orders} = gamedata 
    console.log(gamedata)
    

    const span={
        padding:'0.3rem 1rem',
        border:'1px solid #a3a3a3',
        backgroundColor:'#dfdedead',
        borderRadius:'5px',
        fontWeight:'600',
        
        
       
    }
   
  return (
    <>
    <div className="section-margin">
    <header className="center-div" style={{background:'black', color:'white',marginBottom:'2rem',flexDirection:'column'}}>
        <h3> CANTEEN INVOICE </h3>
        <p>GST no #12541BHCA & TIN no #125412589 CERTIFIED </p>
        
    </header>
    <div className="clubdetails d-flex justify-content-between" style={{marginBottom:'2rem'}}>
    <div>
        <p>{userData.name}</p>
        <p>{userData.email}</p>
        <p>{userData.mobile}</p>
    </div>
    <div>
    <p ><span style={span}>INVOICE  #</span> : {gamedata?.booking_id}</p>
    <p><span style={span}>TABLE NO</span> : {gamedata?.table_id}</p>
    <p ><span style={span}>DATE</span>  : {new Date().toLocaleDateString() }</p>
    <p ><span style={span}>TIME</span> : {new Date().toLocaleTimeString()}</p>
    
    


    </div> 
    </div>
    <table className="table table-bordered" style={{marginBottom:'2rem'}} >
              <thead>
                <tr>
                  <th style={{width:'50px',...span}}>#</th>
                  <th style={span}>Member</th>
                  <th style={span}>Item</th>
                  <th style={span}>Rate</th>
                  <th style={{width:'100px',...span}}>Quantity</th>
                  <th style={{width:'100px',...span}}>Total</th>
                </tr>
              </thead>
              <tbody className="match_canteen_list">
              {orders?.map((element,index)=>{

                return  <tr>
                  <td>{index+1}</td>
                  <td>{element?.customer}</td>
                  <td>{element.product}</td>
                  <td>{element?.unit_price}</td>
                  <td>{element?.quantity}</td>
                  <td data-total="">{element?.amount}</td>
                </tr>
              })}
               
              </tbody>
              </table>
              <div style={{float: 'right'}}>
                <p><span style={{fontWeight:600}}>Total</span> : <strong>&#8377;</strong> {gamedata.total_amount} /-</p>
                <p><span style={{fontWeight:600}}>GST 5%</span> : <strong>&#8377;</strong> {gamedata.total_amount*0.05} /-</p>
                <p><span style={{fontWeight:600}}>SERVICE CHARGE 5%</span> : <strong>&#8377;</strong> {gamedata.total_amount*0.05} /-</p>
                <p><span style={span}>NET AMT</span> : <strong>&#8377;</strong> {gamedata?.total_amount+2*(gamedata.total_amount*0.05)} /-</p>
               
              </div>
         </div>     
    </>
  )
}

export default Bill