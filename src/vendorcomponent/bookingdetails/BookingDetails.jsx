import React, { useContext, useEffect, useState } from "react";
import "./bookingdetails.css";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { AuthContext } from "../../AuthProvider";
import Toast from "../../Toast";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const BookingDetails = () => {
  const { userToken } = useContext(AuthContext);
  const { booking_id } = useParams();
  const [playerdetails, setPlayerDetails] = useState([]);
  const [gamedetails, setgameDetails] = useState([]);
  const [closed_modal, set_Closed_modal] = useState(false);
  const [addItemModal, setAddItemModal] = useState(false);
  const [winner_id, setWinner_id] = useState("0");
  const [info, setInfo] = useState("");
  const [inventorydata,setInventoryData] =useState([])
  const [seasonValidity, setSeasonValidity] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [itemadd,setitemadd] = useState({product_id:"",user_id:"",quantity:""})
  const [get_all_order,setGet_All_Order] = useState([])


  const handleitem=(e)=>{
    e.preventDefault()
    const name=e.target.name;
    const value=e.target.value;

    setitemadd({...itemadd,[name]:value})
  }

  const booking_detils = async (e) => {
    console.log("hello");
    try {
      const response = await axios({
        method: "get",
        url: `/booking_details?booking_id=${booking_id}`,

        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.status === 200) {
        const data = response?.data;

        setPlayerDetails(data?.booking?.players);
        setgameDetails(data?.booking);
        setInfo(data?.booking?.description);
        setGet_All_Order(data?.booking?.orders)

        //   Toast(data.message,response.status)
      }
    } catch (err) {
      const error = err?.response?.data;
      Toast(error?.message);
    }
  };

  const Get_Inventory = async() =>{
    try{
      
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
    
  }
 

  useEffect(() => {
    try{
      booking_detils();
      Get_Inventory();
    }
    catch(err){

    }
    finally{
      setIsLoading(false)
    }
  
   
  }, []);

  const match_winner = async (e) => {
    e.preventDefault();
    const match_id = gamedetails.id.toString();
    const status = "0";
    try {
      
      const response = await axios({
        method: "post",
        url: `/close_match`,
        data: {
          winner_id,
          match_id,
          status,
          info,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.status === 200) {
        const data = response?.data;
        set_Closed_modal(false);
        booking_detils();
        Toast(data.message, response.status);
      }
    } catch (err) {
      const error = err?.response?.data;
      Toast(error?.message);
    }
    
  };
  const match_updated = async (e) => {
    e.preventDefault();
    const match_id = gamedetails.id.toString();
    try {
      
      const response = await axios({
        method: "post",
        url: `/close_match`,
        data: {
          match_id,
          info,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.status === 200) {
        const data = response?.data;
        set_Closed_modal(false);
        booking_detils();
        Toast(data.message, response.status);
      }
    } catch (err) {
      const error = err?.response?.data;
      Toast(error?.message);
    }
   
  };


  const add_item=async(e)=>{
    e.preventDefault();
    const booking_id= gamedetails?.id?.toString()
    const {product_id,user_id,quantity} =itemadd
    try {
      
      const response = await axios({
        method: "post",
        url: `/add_order`,
        data: {
         product_id,user_id,quantity,booking_id
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.status === 200) {
        const data = response?.data;
        booking_detils();
        Toast(data.message, response.status);
      }
    } catch (err) {
      const error = err?.response?.data;
      Toast(error?.message);
    }
    
  }
  return (
    isLoading?<div id="cover-spin"></div>
    :
    <>
    
      <div className="bookingdetails center-div">
        <div className="bookingdetails-container section-margin ">
          <h1>Booking Details</h1>
          <div className="bookingdetails-box">
            <h4>
              {playerdetails.map((element, index) => {
                return index + 1 + ".  " + element?.name + "  ";
              })}
            </h4>
            <p>{gamedetails?.instructor_name} (instrusctor)</p>
          </div>
          <div className="bookingdetails-box-top ">
            <div></div>
            <h4>
              Session is{" "}
              {gamedetails.status == 1 ? (
                <span Style={"color:#18da18"}>Active</span>
              ) : (
                <span Style={"color:red"}>InActive</span>
              )}
            </h4>
            <p>Booking id : {gamedetails?.booking_id}</p>
            <p>
              Booking on : {new Date(gamedetails?.created_at).toLocaleString()}{" "}
            </p>
          </div>

          <div className="bookingdetails-box-middle">
            <h3> Booking Description </h3>
            <div>
              <i
                className="bi bi-currency-rupee"
                Style={"color:#c7c6c6 !important"}
              ></i>

              <div>
                <p Style={"color:#c7c6c6 !important"}>Amount</p>
                <p>{gamedetails?.game?.price}</p>
              </div>
            </div>
            <div>
              <i
                className="bi bi-calendar-check"
                Style={"color:#c7c6c6 !important"}
              ></i>
              <div>
                <p Style={"color:#c7c6c6 !important"}>Season Validity</p>
                <p>
                  {gamedetails?.start_time} To {gamedetails?.end_time}
                </p>
              </div>
            </div>
            <div>
              <i
                className="bi bi-clock-fill"
                Style={"color:#c7c6c6 !important"}
              ></i>
              <div>
                <p Style={"color:#c7c6c6 !important"}>Winner</p>
                <p>
                  {gamedetails?.winner_id == null
                    ? " Winner not decide "
                    : gamedetails?.winner_id == 0
                    ? "game Tie"
                    : gamedetails?.winner}
                </p>
              </div>
            </div>
          </div>
          <div className="bookingdetails-box-bottom">
            {/* <h4> Rate & Review </h4>
            <div>
            <i className="bi bi-star-fill" Style={"color: #daba07;"}></i>
            <i className="bi bi-star-fill" Style={"color: #daba07;"}></i>
            <i className="bi bi-star-fill" Style={"color: #daba07;"}></i>
            <i className="bi bi-star-fill" Style={"color: #daba07;"}></i>
            <i className="bi bi-star-fill"></i>
            </div>*/}
            <div>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  as="textarea"
                  rows={6}
                  Style={" background: #7070708a;border: none; color:white"}
                  value={info}
                  onChange={(e) => setInfo(e.target.value)}
                />
              </Form.Group>
              <div className="bookingdetails-buttons">
                <button
                  type="submit"
                  className="form-btn"
                  onClick={match_updated}
                >
                  info updated
                </button>
                <button
                  type="button"
                  className="form-btn "
                  onClick={() => set_Closed_modal(true)}
                >
                  Season Closed
                </button>
                <button
                  type="button"
                  className="form-btn "
                  onClick={() => setAddItemModal(true)}
                >
                  Add Item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal season closed  */}
      <Modal show={closed_modal} onHide={() => set_Closed_modal(false)} >
      
        <Modal.Header closeButton >
          <Modal.Title>Winner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label className="addtogame-label">Winner</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={winner_id}
              onChange={(e) => setWinner_id(e.target.value)}
              disabled={!playerdetails.length}
            >
              <option selected value="0">
                Tie
              </option>
              {playerdetails?.map((element) => {
                return <option value={element?.id}>{element?.name}</option>;
              })}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => set_Closed_modal(false)}>
            No
          </Button>
          <Button variant="primary" onClick={match_winner}>
            Yes
          </Button>
        </Modal.Footer>
        
      </Modal>

      <Modal show={addItemModal} onHide={() => setAddItemModal(false)}  >
        <Modal.Header closeButton >
          <Modal.Title>Add item</Modal.Title>
        </Modal.Header>
        <Modal.Body  >
          <form id="sale_canteen_form">
            <input className="canteen_match_id" type="hidden" />

            <table className="table table-bordered">
              <thead>
                <tr>
                  <th style={{width:'50px'}}>#</th>
                  <th>Member</th>
                  <th>Item</th>
                  <th>Rate</th>
                  <th style={{width:'100px'}}>Quantity</th>
                  <th style={{width:'100px'}}>Total</th>
                </tr>
              </thead>
              <tbody className="match_canteen_list">
              {get_all_order?.map((element,index)=>{

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
              <tfoot>
                <tr className="grand-total-font">
                  <th className="text-right" colspan="5">
                    Total:
                  </th>
                  <th className="match_canteen_total">{gamedetails?.total_amount}</th>
                </tr>
                <tr className="grand-total-font">
                  <th colspan="5"></th>
                  <th>
                    <button
                      type="button"
                      className="btn bill_canteen_btn btn-warning"
                    >
                      <i className="fa fa-print"></i> Bill
                    </button>
                  </th>
                </tr>
                <tr>
                  <td colspan="2">
                 <select class="form-select" aria-label="Default select example" name="user_id" value={itemadd.user_id} onChange={handleitem}>
                   <option selected>player Name</option>
                    {playerdetails?.map((element)=>{


                      return <option value={element?.id}>{element?.name}</option>
                    })}
                  </select>
                  </td>
                  <td colspan="2">
                 <select class="form-select" aria-label="Default select example" name="product_id" value={itemadd.product_id} onChange={handleitem}>
                   <option selected>Item Name</option>
                    {inventorydata?.map((element)=>{


                      return <option value={element?.id}>{element?.name}</option>
                    })}
                  </select>
                  </td>
                  <td>
                    <input
                      placeholder="Qty"
                      className="form-control pick_canteen_qty"
                      type="number"
                      name="quantity"
                      value={itemadd.quantity}
                      onChange={handleitem}
                      Style={"border: 1px solid rgb(204, 204, 204)"}
                    />
                  </td>
                  <th>
                    <button
                      type="submit"
                      className="btn sale_canteen_btn btn-success"
                      onClick={add_item}
                    >
                      <i className="fa fa-check"></i> Add Item
                    </button>
                  </th>
                </tr>
              </tfoot>
            </table>
          </form>
          <div className="clearfix"></div>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={() => setAddItemModal(false)}>
            No
          </Button>
          <Button variant="primary">Yes</Button>
        </Modal.Footer> */}
        
      </Modal>
    </>
  );
};

export default BookingDetails;
