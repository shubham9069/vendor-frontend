import React,{useEffect, useState} from 'react'
import './canteen.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import axios from '../../axios';
import Toast from '../../Toast';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../../AuthProvider';
import { useContext } from 'react';


const Canteen = () => {
  const {userToken} = useContext(AuthContext)
  const [isLoading,setIsLoading] = useState(true)
  const [inventorydata,setInventoryData] = useState([])
  // const [preInvdata,setPreInvdata] = useState({})
  const [canteendata,setcanteenData] = useState({name: "",qty:"",purchase_price:"",sell_price:""})
  const [name,setname] = useState("")
  const [qty,setqty] = useState("")
  const [purchase_price,setpurchase_price] = useState("")
  const [sell_price,setsell_price] = useState("")
  
  const [inventory_id,setinventory_id] = useState({})
  const [show, setShow] = useState(false);
  
 

    const handleChange=(e)=>{
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;

      setcanteenData({...canteendata,[name]:value})
    }
   
    const Modal=(data)=>{
      setname(data?.name)
      setqty(data?.qty)
      setsell_price(data?.sell_price)
      setpurchase_price(data?.purchase_price)
      setinventory_id(data?.id.toString())
    }
  
    

    const Get_Inventory = async() =>{
      try{
        setIsLoading(true)
        const response= await axios({
          method: "get",
         url:'/get_all_inventories',
          headers: {
            'Authorization': `Bearer ${userToken}`
            
          },
         })
         
         if(response.status===200){
          const data = response.data;
          setInventoryData(data?.inventories)
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
      Get_Inventory()
    },[])


    const Add_Inventory = async(e)=>{
      e.preventDefault()
      const {name,qty,purchase_price,sell_price} = canteendata
       if(!name || !sell_price ) return Toast("plz filled properly ")
     
       
        try{
         
         const response= await axios({
           method: "post",
          url:'/add_inventory',
          data:{name,qty,purchase_price,sell_price},
           headers: {
             "Content-Type": "application/json",
             'Authorization': `Bearer ${userToken}`
             
           },
          })
          
          if(response.status===200){
           const data = response.data;
           Get_Inventory()
           Toast(data.message,response.status)
          }
        }
        catch(err){
         const error = err.response.data
         Toast(error.message);
   
        }
        
     }
    const update_Inventory = async(e)=>{
      e.preventDefault()
        try{
         
         const response= await axios({
           method: "post",
          url:'/update_inventory',
          data:{inventory_id,name,qty,purchase_price,sell_price},
           headers: {
             "Content-Type": "application/json",
             'Authorization': `Bearer ${userToken}`
             
           },
          })
          
          if(response.status===200){
           const data = response.data;
           Get_Inventory()
           setShow(false)
           Toast(data.message,response.status)
          }
        }
        catch(err){
         const error = err.response.data
         Toast(error.message);
   
        }
        
     }
  return (
    <>
         <div className="cateen-padding ">
    <div className='container-fluid '>
    <h3>Inventory</h3>
     <hr style={{color:"gray"}}></hr></div>





    <div className='main-div'>
    <div className='row ' style={{ maxWidth:'500px',maxHeight: '500px'}}>
      <Form.Group className="col-md-12" controlId="formBasicEmail" style={{marginBottom:"15px"}}>
        <Form.Label>New item Name:*</Form.Label>
        <Form.Control type="text"   className="form-input" name="name" value={canteendata.name} onChange={handleChange} />
       
      </Form.Group>
     
     
      <Form.Group className="col-md-12" controlId="formBasicPassword" style={{marginBottom:"15px"}}>
        <Form.Label>Purchase Price:</Form.Label>
        <Form.Control type="number" className="form-input" name="purchase_price" value={ canteendata.purchase_price} onChange={handleChange} />
      </Form.Group>



      <Form.Group className="col-md-12" controlId="formBasicPassword" style={{marginBottom:"15px"}}>
        <Form.Label>Sale Price:</Form.Label>
        <Form.Control type="number"  className="form-input" name="sell_price" value={ canteendata.sell_price} onChange={handleChange} /> 
      </Form.Group>



      <Form.Group className="col-md-12" controlId="formBasicPassword" style={{marginBottom:"15px"}}>
        <Form.Label>Quantity:</Form.Label>
        <Form.Control type="number"  className="form-input" name="qty" value={canteendata.qty} onChange={handleChange} />  
      </Form.Group>

      <button  onClick={Add_Inventory}  className="btn-design" style={{maxWidth:'200px',margin:'2rem auto'}}>
        Create Item
      </button>

      
</div>

{/* <div><hr style={{color:"gray"}}></hr></div> */}
<div class="vr" style={{marginLeft:"10px"}}></div>
<div className='col-md-8 '>
<h3>Inventory List</h3>
<Table >

    <thead>
      <tr className='table-text'>
        <th>#</th>
        <th >Item </th>
        <th >Purchase </th>
        <th >sell </th>
        <th >Quantity </th>
        <th >Options</th>
      </tr>
    </thead>
    <tbody>
      {inventorydata?.map((element,index)=>{


        return  <tr className='table-text'>
        <td >{index+1}</td>
        <td>{element?.name}</td>
        <td>{element?.purchase_price}</td>
        <td>{element?.sell_price}</td>
        <td><button style={{border:"0.5px solid gray",padding:"3px 25px",borderRadius:"2px",backgroundColor:"white"}}>{element.qty}</button></td>
        <td>  <Button variant="success" onClick={() =>{Modal(element)}} data-bs-toggle="modal" data-bs-target="#exampleModal" >edit</Button></td>
      </tr>
      })}
     
     
    </tbody>
  </Table>

</div>
 </div>    
    </div>



    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <Form>
        <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className="addtogame-label">Name</Form.Label>
        <Form.Control type="text" placeholder="Name" name="table_name" value={name} onChange={(e)=>setname(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className="addtogame-label">quantity</Form.Label>
        <Form.Control type="number" placeholder="Name" name="table_name" value={qty} onChange={(e)=>setqty(e.target.value)}/>
      </Form.Group>
      
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className="addtogame-label">purchase price </Form.Label>
        <Form.Control type="number" placeholder="Name" name="table_name" value={purchase_price} onChange={(e)=>setpurchase_price(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className="addtogame-label">sell price </Form.Label>
        <Form.Control type="number" placeholder="Name" name="table_name" value={sell_price} onChange={(e)=>setsell_price(e.target.value)}/>
      </Form.Group>
      </Form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary"  data-bs-dismiss="modal" onClick={update_Inventory}>update</button>
      </div>
    </div>
  </div>
</div>
  
    

   
    </>
  )
}

export default Canteen