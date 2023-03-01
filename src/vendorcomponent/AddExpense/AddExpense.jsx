import React,{useEffect, useState} from 'react'
import '../canteen/canteen.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import axios from '../../axios';
import Toast from '../../Toast';
import Modal from 'react-bootstrap/Modal';
import { AuthContext } from '../../AuthProvider';
import { useContext } from 'react';


const AddExpense = () => {
  const {userToken} = useContext(AuthContext)
  const [isLoading,setIsLoading] = useState(true)
  const [Expenseget,setExpenseget] = useState([])
  const [Expensedata,setExpenseData] = useState({expense_name:"",expense_amount:"" })
  const [expense_name,setexpense_name] = useState("")
  const [expense_amount,setexpense_amount] = useState("")
  
  
  const [expense_id,setexpense_id] = useState({})
  const [show, setShow] = useState(false);
  
 

    const handleChange=(e)=>{
      e.preventDefault();
      const name = e.target.name;
      const value = e.target.value;

      setExpenseData({...Expensedata,[name]:value})
    }
   
    const Modal=(data)=>{
      setexpense_name(data?.expense_name)
      setexpense_amount(data?.expense_amount)
        setexpense_id(data?.id)
    }
  
    

    const Get_Inventory = async() =>{
      try{
        setIsLoading(true)
        const response= await axios({
          method: "get",
         url:'/get_expenses',
          headers: {
            'Authorization': `Bearer ${userToken}`
            
          },
         })
         
         if(response.status===200){
          const data = response.data;
          setExpenseget(data?.expenses)
          Toast(data.message,response.status)
         }
       }
       catch(err){
        setExpenseget([])
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
    const {expense_amount,expense_name} = Expensedata
       if( !expense_amount || !expense_name) return Toast("plz filled properly ")
     
       
        try{
         setIsLoading(true)
         const response= await axios({
           method: "post",
          url:'/add_expense',
          data:{expense_amount,expense_name},
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
        finally{setIsLoading(false)}
        
     }
    const update_Inventory = async(e)=>{
      e.preventDefault()
        try{
         setIsLoading(true)
         const response= await axios({
           method: "post",
          url:'/edit_expense',
          data:{expense_id,expense_amount,expense_name},
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
        finally{
          setIsLoading(false)
        }
        
     }
    const Delete_inventory = async(e)=>{
      e.preventDefault()
        try{
         setIsLoading(true)
         const response= await axios({
           method: "get",
          url:`delete_expense?expense_id=${expense_id}`,
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
        finally{
          setIsLoading(false)
        }
        
     }
  return (
    <>

    {isLoading && (<div id="cover-spin"></div>)}
         <div className="cateen-padding ">
    <div className='container-fluid '>
    <h3>Expenses</h3>
     <hr style={{color:"gray"}}></hr></div>





    <div className='main-div'>
    <div className='row ' style={{ maxWidth:'500px',maxHeight: '500px'}}>
      <Form.Group className="col-md-12" controlId="formBasicEmail" style={{marginBottom:"15px"}}>
        <Form.Label>Add Expense Name </Form.Label>
        <Form.Control type="text"   className="form-input" name="expense_name" value={Expensedata.expense_name} onChange={handleChange} />
       
      </Form.Group>
     
     
      <Form.Group className="col-md-12" controlId="formBasicPassword" style={{marginBottom:"15px"}}>
        <Form.Label>Amount</Form.Label>
        <Form.Control type="number" className="form-input" name="expense_amount" value={Expensedata.expense_amount} onChange={handleChange} />
      </Form.Group>


      <button  onClick={Add_Inventory}  className="btn-design" style={{maxWidth:'200px',margin:'2rem auto'}}>
        Add Expense
      </button>

      
</div>

{/* <div><hr style={{color:"gray"}}></hr></div> */}
<div class="vr" style={{marginLeft:"10px"}}></div>
<div className='col-md-8 '>
<h3>Expenses List</h3>
<Table >

    <thead>
      <tr className='table-text'>
        <th>#</th>
        <th >Expense</th>
        <th >Date </th>
        <th >Amount</th>
      </tr>
    </thead>
    <tbody>
      {Expenseget?.map((element,index)=>{


        return  <tr className='table-text'>
        <td >{index+1}</td>
        <td>{element?.expense_name}</td>
        <td>{element?.expense_amount}</td>
        <td>  <Button variant="success" onClick={() =>{Modal(element)}} data-bs-toggle="modal" data-bs-target="#exampleModal" >edit</Button></td>
        <td>  <Button variant="danger" onClick={() =>{Modal(element)}} data-bs-toggle="modal" data-bs-target="#exampleModalDelete" >Delete</Button></td>
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
        <Form.Label className="addtogame-label"> expense_Name</Form.Label>
        <Form.Control type="text" placeholder="Name" name="table_name" value={expense_name} onChange={(e)=>setexpense_name(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label className="addtogame-label">Expense_price</Form.Label>
        <Form.Control type="number" placeholder="Name" name="table_name"  value={expense_amount} onChange={(e)=>setexpense_amount(e.target.value)} />
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


<div class="modal fade" id="exampleModalDelete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Are You Sure ?</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
     expense Name : {expense_name}
     <br></br>
     <br></br>
     expense Amount : {expense_amount}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">no</button>
        <button type="button" class="btn btn-primary"  data-bs-dismiss="modal" onClick={Delete_inventory}>Yes</button>
      </div>
    </div>
  </div>
</div>
  
    

   
    </>
  )
}

export default AddExpense