import React, { useContext } from 'react'
import { AuthContext } from '../../AuthProvider'

const BillGame = ({gamedetails}) => {
    const {userData} = useContext(AuthContext)
    const {game} = gamedetails
    console.log(gamedata)
    

   
   
  return (
    <>
    <div className="section-margin">
    <header className="center-div" style={{background:'black', color:'white',marginBottom:'2rem'}}>
        <h1> game Invoice </h1>
        
    </header>
    <div className="clubdetails d-flex justify-content-between" style={{marginBottom:'2rem'}}>
    <div>
        <p>{userData.name}</p>
        <p>{userData.email}</p>
        <p>{userData.mobile}</p>
        <p >{new Date().toLocaleString() }</p>

    </div>
    <div>
    <p ><span style={span}>INVOICE  #</span> : {gamedetails?.booking_id}</p>
    <p><span style={span}>TABLE NO</span> : {gamedata?.table_id}</p>
    <p><span style={span}>GAME</span> : {gamedata?.game?.name}</p>
    
    
    


    </div> 
    </div>
    <table className="table table-bordered" style={{marginBottom:'2rem'}} >
              <thead>
                <tr>
                 
                  <th style={span}>game name </th>
                  <th style={span}>No of member </th>
                  <th style={span}>description</th>
                  <th style={{width:'100px',...span}}>Price</th>
                </tr>
              </thead>
              <tbody className="match_canteen_list">
            <tr>
               
                  <td>{game?.name}</td>
                  <td>{game?.no_of_members}</td>
                  <td>{gamedata?.description}</td>
                  <td data-total="">{game?.price}</td>
                </tr>
            
               
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

export default BillGame