import React, { useState } from 'react'
import './addgame.css'
import Form from 'react-bootstrap/Form';
import {Link} from "react-router-dom"


const Addgame = () => {
  const [booklist,SetBooklist] = useState([0,1,2,3,4])
  console.log(booklist)
  return (
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
</div>
<div className="addgame-middle section-margin ">
  <h1> Game List</h1>
  <div className="gamelist center-div">
  {booklist.map((element)=>{
    
    return <>
    <Link to="/addgame/gamedetails" className='link-a'>
    <div  className="gamelist-box ">
      <div className="gamelist-left">
        <img src="https://www.shutterstock.com/image-photo/red-snooker-ball-on-table-260nw-709795153.jpg"/>
      </div>
      <div className='gamelist-middle'>
        <span Style={"color: #a70d0dd1;"}> </span>
          <h3>ps4</h3>
          <p>category console</p>
          <p>₹ 621/h</p>
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
        <h1 class="modal-title fs-5" id="exampleModalLabel">Add Game</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <Form className="addtogame-form">

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className="addtogame-label">Name</Form.Label>
        <Form.Control type="text" placeholder="Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicNoofmemeber">
        <Form.Label className="addtogame-label">No of Table</Form.Label>
        <Form.Control type="number" placeholder="No of Table" />
      </Form.Group>
      
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label className="addtogame-label"> Pitcure Of Table</Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Desription</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <button  type="submit"  className='form-btn'  >
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
        <Form.Control type="text" placeholder="Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicNoofmemeber">
        <Form.Label className="addtogame-label">No Of Member</Form.Label>
        <Form.Control type="number" placeholder="No Of Member" />
      </Form.Group>
      
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label className="addtogame-label"> Pitcure Of game</Form.Label>
        <Form.Control type="file" multiple />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Desription</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <button  type="submit"  className='form-btn'  >
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