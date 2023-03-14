import { height } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../AuthProvider';
import axios from '../../axios';
import Toast from '../../Toast';
import './Tournament.css'


const Tournament = () => {
  const {userToken } = useContext(AuthContext)
  const [allGameData ,setAllGameData] = useState([])
  const [Tournament_Data,setTournament_Data] = useState({no_of_players:"",game_id:"",schedule_type:""})
  const [getTournament_Data,setGet_Tournament_Data] = useState([])
const HandleChnage=(e)=>{
  console.log(e.target.value)
  e.preventDefault();


  setTournament_Data({...Tournament_Data,[e.target.name]:e.target.value})
}



  const getgame = async(e)=>{
  
    try{
     
     const response= await axios({
       method: "get",
      url:'/get_all_games',
       headers: {
         'Authorization': `Bearer ${userToken}`
         
       },
      })
      
      if(response.status===200){
       const data = response.data;
       
       setAllGameData(data.games)
       Toast(data.message,response.status)
      }
    }
    catch(err){
     const error = err.response.data
     Toast(error.message);
     


    }
    // finally{
    //  setIsLoading(false)
    // }
 }

 const getTournament = async(e)=>{
  
  try{
   
   const response= await axios({
     method: "get",
    url:'/get_tournaments',
     headers: {
       'Authorization': `Bearer ${userToken}`
       
     },
    })
    
    if(response.status===200){
     const data = response.data;
     
     setGet_Tournament_Data(data.tournaments)
     Toast(data.message,response.status)
    }
  }
  catch(err){
   const error = err.response.data
   Toast(error.message);
   


  }
  // finally{
  //  setIsLoading(false)
  // }
}

 
 useEffect(()=>{
  getgame();
  getTournament();
 },[])

 const Add_Tournament = async(e)=>{
  const {game_id,no_of_players,schedule_type} = Tournament_Data
  
  try{
   
   const response= await axios({
     method: "post",
    url:'/add_tournament',
    data:{game_id,no_of_players,schedule_type},
     headers: {
       'Authorization': `Bearer ${userToken}`
       
     },
    })
    
    if(response.status===200){
     const data = response.data;
     
     getTournament()
     Toast(data.message,response.status)
    }
  }
  catch(err){
   const error = err.response.data
   Toast(error.message);
   


  }
  // finally{
  //  setIsLoading(false)
  // }
}




  return (
    <>
    <div className=" container section-padding" style={{maxWidth:'800px'}}>
    <div>
    <h1 style={{fontWeight:'900',fontSize:'50px'}}>Sports schedule maker</h1>
    <h2 style={{fontWeight: 200}}>Save time with our free Sports tournament scheduler</h2>
    </div>
    <div className='' style={{margin :'2rem 0 '}}>
    <Form>
      <Form.Group className="my-4" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:600, color:'#4a5568' ,fontSize:'20px'}}>Sport </Form.Label>
        <Form.Select aria-label="Default select example" className="sport-select" name='game_id' value={Tournament_Data?.game_id} onChange={HandleChnage}>
      <option selected hidden >Select your Sport </option>
     {allGameData?.map((element)=>{

      return <option value={element?.id}>{element?.name}</option>
     })}
    </Form.Select>
      </Form.Group>
      <Form.Group className="my-4" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:600, color:'#4a5568' ,fontSize:'20px'}}>No.Of.player</Form.Label>
        <Form.Control type="number" aria-label="Default select example" className="sport-select" name='no_of_players'  value={Tournament_Data?.no_of_players} onChange={HandleChnage}>
      
    </Form.Control>
      </Form.Group>
      <Form.Group className="my-4" controlId="exampleForm.ControlInput1">
        <Form.Label style={{fontWeight:600, color:'#4a5568' ,fontSize:'20px'}}>type of schedule</Form.Label>
        <Form.Select aria-label="Default select example" className="sport-select"  name='schedule_type' value={Tournament_Data?.schedule_type} onChange={HandleChnage}>
      <option selected hidden >Tournament Elimintate Sport  </option>
      <option value={1}>One</option>
      <option value={2}>Two</option>
      <option value={3}>Three</option>
    </Form.Select>
      </Form.Group>
      
    </Form>
   



    </div>
    <div style={{display: 'flex', flexDirection:'column',gridGap:'40px'}}>
    <button type="button" class="btn btn-success" style={{width:'50%',height:'50%',backgroundColor:'#17bf63',fontSize: '1.5rem',padding:"1rem 0 ",borderRadius: '9999px'}} onClick={Add_Tournament}>Success</button>
    <p style={{color:'#718096'}}>Select the number of teams and type of schedule above. Next, you can customize your Sports schedule's courts, dates, and times.</p>
    </div>



    </div>

    <div className=" ">
     
    <div className="gamelist center-div">
  {getTournament_Data?.map((element)=>{
    
    return <>
    <Link to={'/TournamentDetails/'+ element.id } state={{type:element.type}} className='link-a'>
    <div  className="gamelist-box ">
      <div className="gamelist-left">
        <img src={element?.game?.images?.length ? element?.game?.images[0]:"/images/default.jpg"} />
      </div>
      <div className='gamelist-middle'>
        <span Style={"color: #a70d0dd1;"}> </span>
          <h3>{element?.game?.name}</h3>
          <p>Tournament</p>
          <p>{element?.game?.price}</p>
      </div>
      <div className='gamelist-right'>
       
        <button className='btn-design'> View</button>
      </div>
    </div>
    </Link>
    </>
  })}
   
    
  </div>


    </div>
        
    </>
  )
}

export default Tournament