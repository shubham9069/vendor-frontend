import React, { useState,useContext, useEffect } from 'react'
import './addgame.css'
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom"
import axios from '../../axios';
import Toast from '../../Toast';
import {AuthContext} from '../../AuthProvider'
import validator from 'validator';
import { findAllByAltText } from '@testing-library/react';


const Addgame = () => {
  const { userToken} = useContext(AuthContext)
  const [gamelist,setGamelist] = useState([])
  const [tablelist,setTablelist] = useState([])
  const [addgame,setAddGame] = useState({game_name:"",no_of_member:"",description:"",price:"" })
  const [images,setimages]=useState("")
  const [addtable,setAddtable] = useState({table_name:"",no_of_table:"",description:""}) 
  const [table_images,settable_images] = useState("")
  const [member_name,setMember_name] = useState("")
  const [member_mobile,setMember_mobile] = useState("")
  const [isLoading,setIsLoading] = useState(true)
  const [data , setData] = useState([])
  

  const handlechange=(e)=>{

    const name = e.target.name;
    const value = e.target.value;

      setAddGame({...addgame,[name]:value})
    
   
  }
  const handlechange_table=(e)=>{
    
    const name = e.target.name;
    const value = e.target.value;

      setAddtable({...addtable,[name]:value})
    
   
  }

  const postgame = async(e)=>{
   
    e.preventDefault();
    const {game_name,no_of_member,description,price }= addgame

     if(!game_name || !no_of_member ) return Toast("please fill properly")

     const formdata= new FormData();
     formdata.append('game_name',game_name);
     formdata.append('no_of_member',no_of_member);
     formdata.append('description',description);
     formdata.append('price',price);
     for(var i=0;i<images.length;i++){
      formdata.append('images[]',images[i]);
      
     }
    
     try{
      
      const response= await axios({
        method: "post",
       url:'/add_product',
        data:formdata,
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${userToken}`
          
        },
       })
       
       if(response.status===200){
        const data = response.data
        Toast(data.message,response.status)
        getgame()
       }
     }
     catch(err){
      const error = err.response.data
      Toast(error.message);
      


     }
     
  }
  const posttable = async(e)=>{
    console.log(table_images)
    e.preventDefault();
    const {table_name,no_of_table,description }= addtable

     if(!table_name || !no_of_table || !description) return Toast("please fill properly")
    

     const formdata= new FormData();
     formdata.append('table_name',table_name);
     formdata.append('no_of_table',no_of_table);
     formdata.append('description',description);
     for(var i=0;i<table_images.length;i++){
      formdata.append('table_images[]',table_images[i]);
      
     }
     
     
     try{
      
      const response= await axios({
        method: "post",
       url:'/add_table',
        data:formdata,
        headers: {
          "Content-Type": "multipart/form-data",
          'Authorization': `Bearer ${userToken}`
          
        },
       })
       
       if(response.status===200){
        const data = response.data
        gettable()
        Toast(data.message,response.status)
       
       }
     }
     catch(err){
      const error = err.response.data
      Toast(error.message);
    
     }
    
  }
  useEffect(()=>{
   
    (async()=>{
   try {
     const getable = await gettable();
       const gegame = await getgame();
       
   } catch (error) 
   {console.log(error)}
     })();

},[])

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
        setGamelist(data.games)
        setData(data.games)
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

  const gettable = async(e)=>{
  
    try{
     
     const response= await axios({
       method: "get",
      url:'/get_all_tables',
       headers: {
         'Authorization': `Bearer ${userToken}`
         
       },
      })
      
      if(response.status===200){
       const data = response.data;
       setTablelist(data.tables)
       setData(data?.tables)
       Toast(data.message,response.status)
      }
    }
    catch(err){
     const error = err.response.data
     Toast(error.message);
     


    }
   
 }
  const create_member = async(e)=>{
   e.preventDefault()
    if(!member_name || !member_mobile) return Toast("plz filled properly ")
    if( !validator.isMobilePhone(member_mobile)) return Toast("mobile no  is not valid")
    
     try{
      
      const response= await axios({
        method: "post",
       url:'/new_member',
       data:{member_mobile,member_name},
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${userToken}`
          
        },
       })
       
       if(response.status===200){
        const data = response.data;
        Toast(data.message,response.status)
       }
     }
     catch(err){
      const error = err.response.data
      Toast(error.message);

     }
     
  }

console.log(gamelist)

  return (
    isLoading?<div id="cover-spin"></div>
    :
    <>
<div className="addgame-top center-div section-margin">
  <div className="addgame-container center-div" data-bs-toggle="modal" data-bs-target="#exampleModal" >
    <h1 Style={"color:#a70d0dd1;"}>+</h1>
   
    <h3>Add game</h3>
  </div>
  <div className="addtable-container center-div"  data-bs-toggle="modal" data-bs-target="#exampleModal2">
  <h1 Style={"color:#a70d0dd1;"}>+</h1>
  <h3>Add Table</h3>
  </div>
  <div className="addtable-container center-div"  data-bs-toggle="modal" data-bs-target="#exampleModal3">
  <h1 Style={"color:#a70d0dd1;"}>+</h1>
  <h3>Add member</h3>
  </div>
</div>
<div className="addgame-middle section-margin ">
<div className="toggle d-flex justify-content-between" >
  <h1 onClick={() => setData(gamelist)}> Game List</h1>
  <h1 onClick={() => setData(tablelist)}>Table List</h1>
  </div>
  <div className="gamelist center-div">
  {data.map((element)=>{
    
    return <>
    <Link to={'/addgame/gamedetails/'+ element.id } state={{type:element.type}} className='link-a'>
    <div  className="gamelist-box ">
      <div className="gamelist-left">
        <img src={element.images.length? element.images[0]:"/images/default.jpg"} />
      </div>
      <div className='gamelist-middle'>
        <span Style={"color: #a70d0dd1;"}> </span>
          <h3>{element.name}</h3>
          <p>category console</p>
          <p>element</p>
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


    {/* Modal */}
    <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add Table</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <Form className="addtogame-form">

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className="addtogame-label">Name</Form.Label>
        <Form.Control type="text" placeholder="Name" name="table_name" value={addtable.table_name} onChange={handlechange_table}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicNoofmemeber">
        <Form.Label className="addtogame-label">No of Table</Form.Label>
        <Form.Control type="number" placeholder="No of Table" name="no_of_table" value={addtable.no_of_table} onChange={handlechange_table} />
      </Form.Group>
      
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label className="addtogame-label"> Pitcure Of Table</Form.Label>
        <Form.Control type="file" multiple  onChange={(e)=>settable_images(e.target.files)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Desription</Form.Label>
        <Form.Control as="textarea" rows={3} name="description" value={addtable.description} onChange={handlechange_table} />
      </Form.Group>
      <button  type="submit"  className='form-btn'  onClick={posttable}  >
        Submit
      </button>
    </Form>
      </div>
     
    </div>
  </div>
</div>
    {/* Modal table*/}
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add Game</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <Form className="addtogame-form">

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className="addtogame-label">Name</Form.Label>
        <Form.Control type="text" placeholder="Name" name="game_name" value={addgame.game_name} onChange={handlechange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicNoofmemeber">
        <Form.Label className="addtogame-label">No Of Member</Form.Label>
        <Form.Control type="number" placeholder="No Of Member" name="no_of_member" value={addgame.no_of_member} onChange={handlechange}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasic">
        <Form.Label className="addtogame-label">Price</Form.Label>
        <Form.Control type="number" placeholder="price" name="price" value={addgame.price} onChange={handlechange}/>
      </Form.Group>
      
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label className="addtogame-label" > Pitcure Of game</Form.Label>
        <Form.Control type="file" multiple onChange={(e)=>setimages(e.target.files)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Desription</Form.Label>
        <Form.Control as="textarea" rows={3} name="description" value={addgame.description} onChange={handlechange}/>
      </Form.Group>
      <button  type="submit"  className='form-btn' onClick={postgame}  >
        Submit
      </button>
    </Form>
      </div>
     
    </div>
  </div>
</div>
    {/* Modal table*/}
    <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add Game</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <Form className="addtogame-form">

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className="addtogame-label">Name</Form.Label>
        <Form.Control type="text" placeholder="Name" value={member_name} onChange={(e)=>setMember_name(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className="addtogame-label">Mobile</Form.Label>
        <Form.Control type="number" placeholder="your Number"  value={member_mobile} onChange={(e)=>setMember_mobile(e.target.value)}/>
      </Form.Group>
      
      <button  type="submit"  className='form-btn' onClick={create_member}  >
        Submit
      </button>
    </Form>
      </div>
     
    </div>
  </div>
</div>

    </>
  )
}


export default Addgame