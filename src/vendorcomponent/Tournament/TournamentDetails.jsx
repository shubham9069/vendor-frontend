import React, { useState, useEffect, useContext } from "react";
import "./Tournament.css";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../AuthProvider";
import axios from "../../axios";
import Toast from "../../Toast";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

const TournamentDetails = () => {
  const { userToken } = useContext(AuthContext);
  const { id } = useParams();
  const [tournament_Data, setTournament_Data] = useState([]);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");
  const [getuser, setGetuser] = useState([]);
  const [match_id,setMatch_Id] = useState("");
  const [winner_id, setWinner_id] = useState("0");
  const [closed_modal, set_Closed_modal] = useState(false);
  var length = [1, 2];

  const getTournament = async (e) => {
    try {
      const response = await axios({
        method: "get",
        url: `/get_tournament_detail?tournament_id=${id}`,
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;

        setTournament_Data(data.tournament);
        Toast(data.message, response.status);
      }
    } catch (err) {
      const error = err.response.data;
      Toast(error.message);
    }
    // finally{
    //  setIsLoading(false)
    // }
  };
  const getuser_details = async () => {
    try {
      const response = await axios({
        method: "get",
        url: "/get_users",

        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.status === 200) {
        const data = response.data;
        setGetuser(data.users);
        //   Toast(data.message,response.status)
      }
    } catch (err) {
      const error = err.response.data;
      Toast(error.message);
    }
  };

  useEffect(() => {
    getuser_details();
    getTournament();
  }, []);

  const match_updated = async (e) => {
    e.preventDefault();
    
    var players_id=JSON.stringify({player1,player2})
    
    try {
      
      const response = await axios({
        method: "post",
        url: `/close_match`,
        data: {
          match_id:match_id?.id,
          players_id
          
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.status === 200) {
        const data = response?.data;
        
        getTournament()
        Toast("player assign successfully ", response.status);
      }
    } catch (err) {
      const error = err?.response?.data;
      Toast(error?.message);
    }
   
  };

  const match_winner= async (e) => {
    e.preventDefault();
  
    try {
      
      const response = await axios({
        method: "post",
        url: `/close_match`,
        data: {
          match_id:match_id?.id,
          winner_id
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.status === 200) {
        const data = response?.data;
        set_Closed_modal(false);
        getTournament()
        Toast(data.message, response.status);
      }
    } catch (err) {
      const error = err?.response?.data;
      Toast(error?.message);
    }
   
  };
  // console.log(match_id)

  return (
    <>
      <div>
        <div
          className="container max-w-3xl mb-12 sm:mb-16 print:hidden"
          style={{ backgroundColor: "#f7fafc" }}
        >
          <div className="mb-8" style={{ marginBottom: "2rem" }}>
            <img
              alt="6 Boxer Boxing Single Elimination Schedule"
              src="https://s3.amazonaws.com/playpass-discovery/production/sports/photos/28/wide_boxing.jpg?1452820386"
              style={{ height: "100%", width: "100%" }}
            />
          </div>

          <div className="sm:flex items-end">
            <h3 className="subtitle sm:flex-grow sm:mb-0 sm:mr-2 ">
              {tournament_Data?.no_of_players +
                " " +
                tournament_Data?.game?.name +
                " " +
                "single elimination"}
            </h3>

            {/* <!-- Action Buttons -->
    <div id="action_buttons" className="subtitle flex-shrink-0 print:hidden mb-0">
      
      <a className="btn btn-sm mb-0 btn-secondary" rel="nofollow" href="/x/6-boxer-boxing-single-elimination-schedule-PB6GjjP?s=share">Share</a>

    </div>  */}
          </div>

          <div className="my-6 print:hidden print:hidden">
            {/* <!-- Tabs --> */}
            <div className="hidden sm:block">
              <div className="border-b border-grayer">
                <nav
                  id="tabs"
                  className="-mb-px flex space-x-8"
                  aria-label="Tabs"
                >
                  <a
                    className="border-primary text-primary border-b-2 font-medium whitespace-nowrap py-4 px-1 text-base lg:text-lg no-underline-all"
                    aria-current="page"
                  >
                    All
                  </a>
                </nav>
              </div>
            </div>
          </div>

          {/* <!-- Pills --> */}
          <ul id="pills" className="pills">
            <li>
              <a aria-selected="true">Manage</a>
            </li>

            <li>
              <a aria-selected="false">Edit</a>
            </li>

            <li>
              <a aria-selected="false">Share</a>
            </li>

            <li>
              <a aria-selected="false">Download</a>
            </li>

            <li>
              <a aria-selected="false">Embed</a>
            </li>

            {/* <!-- More -->
  <!-- Dropdown menu --> */}
            {/* <li>
  <div className="relative" data-controller="toggle">
    <a href="#menu" role="button" data-action="click->toggle#toggle click@window->toggle#hide">
      <span className="appearance-none flex items-center leading-none">
        <span>
          More
        </span>

        
<svg className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
</svg>

      </span>
    </a>
    <div data-toggle-target="target" className="absolute sm:right-0 mt-2 hidden">
      <ul className="dropdown-menu list-menu shadow border-grayer">
        
    <li>
      
<a className="link-accent" data-disable-with="Publishing..." rel="nofollow" data-method="patch" href="/dashboard/x/playoffs/B6GjjP?playoff%5Bpublished%5D=true">Publish</a>

    </li>

    <li>
      <a href="/x/6-boxer-boxing-single-elimination-schedule-PB6GjjP?s=preview">Preview</a>
    </li>

    <li>
      <a href="/x/6-boxer-boxing-single-elimination-schedule-PB6GjjP?s=print">Print</a>
    </li>

    <li>
      
<a className="link-accent" data-disable-with="Archiving..." rel="nofollow" data-method="patch" href="/dashboard/x/playoffs/B6GjjP?playoff%5Barchived%5D=true">Archive</a>

    </li>

      </ul>
    </div>
  </div>
</li> */}
          </ul>

          <div className="rounded-md p-4 alert-warning ">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>

              <div className="ml-3">
                <div className="text-sm font-medium">
                  Only you can view this schedule.
                  <a
                    className="link-accent"
                    data-disable-with="Publishing..."
                    rel="nofollow"
                    data-method="patch"
                    href="/dashboard/x/playoffs/B6GjjP?playoff%5Bpublished%5D=true"
                  >
                    {" "}
                    Publish{" "}
                  </a>
                  it now.
                </div>
              </div>
            </div>
          </div>

          <div id="schedule">
            {/* <!-- Schedule --> */}
            <h6 className="heading">Schedule</h6>

            <div
              className="d-flex"
              style={{ flexWrap: "wrap", gridGap: "20px" }}
            >
              {tournament_Data?.matches?.map((element, i) => {
                return (
                  <div className="game">
                  <p style={{ textAlign: "center" }}>{element?.type==1 && ("normal match") || element?.type==2 && ("quater final") || element?.type==3 && ("semi-final ") || element?.type==4 && ("Final")}</p>
                    <div>
                      <p style={{ textAlign: "center" }}>Match id: {element?.id}</p>
                    </div>

                    <div className="d-flex justify-content-between">
                      <p style={{ marginBottom: "1rem", color: "#008d36" }}>
                        {element?.players?.length ? element.players[0]?.name :element?.type==1 && ("player 1") || element?.type==2 &&("normal winner1") || element?.type==3 &&("quater winner1") || element?.type==4 &&("semi-final winner1")}
                        {element?.players?.length ?( element.players[0]?.id==element?.winner_id &&(<img src="https://img.icons8.com/color/30/null/first-place-ribbon.png"/>)):""}
                     
                      </p>
                      <p style={{ marginBottom: "1rem", color: "#008d36" }}>
                      {element?.players?.length==2 ? element.players[1]?.name :element?.type==1 && ("player 2") || element?.type==2 &&("normal winner2") || element?.type==3 &&("quaeer winner2") || element?.type==4 &&("semi-final winner2")}
                      {element?.players?.length ?( element.players[1]?.id==element?.winner_id &&(   <img src="https://img.icons8.com/color/30/null/first-place-ribbon.png"/>)):""}
                      </p>
                    </div>

                    <div className="center-div">
                      <a
                        style={{ padding: "0 8px", color: "#008d36" }}
                        data-bs-toggle="modal"
                        data-bs-target={"#exampleModal0"}
                        value={element?.id}
                        onClick={(e)=>setMatch_Id(element)}
                      >
                        <img src="https://img.icons8.com/color/30/null/player-male.png"/>
                      </a>
                      <a style={{ padding: "0 8px", color: "#008d36" }}
                      onClick={()=>{setMatch_Id(element);set_Closed_modal(true)}} >
                        <img src="https://img.icons8.com/color/30/null/trophy.png" />
                      </a>
                      <a style={{ padding: "0 8px", color: "#008d36" }}>
                        <img src="https://img.icons8.com/color/30/null/swing-time.png" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="exampleModal0"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" Style={" max-width:500px !important;"}>
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Add Booking
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <Form className="addtogame-form ">
                <div className="modal-input justify-content-between">
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label className="addtogame-label">
                      Player 1
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ maxWidth: "350px" }}
                      value={player1}
                      onChange={(e) => setPlayer1(e.target.value)}
                    >
                      <option selected>Player no 1</option>
                      {getuser.map((element) => {
                        return (
                          <option value={element.id}>{element.name}</option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label className="addtogame-label">
                      Player 2
                    </Form.Label>
                    <Form.Select
                      aria-label="Default select example"
                      style={{ maxWidth: "350px" }}
                      value={player2}
                      onChange={(e) => setPlayer2(e.target.value)}
                    >
                      <option selected>Player no 2</option>
                      {getuser.map((element) => {
                        return (
                          <option value={element.id}>{element.name}</option>
                        );
                      })}
                    </Form.Select>
                  </Form.Group>
                </div>

                <button className="form-btn" onClick={match_updated}>book now</button>
              </Form>
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
            
          >
            <option selected value="0">
              Tie
            </option>
            {match_id?.players?.map((element) =>{

              return  <option value={element?.id}>{element?.name}</option>;
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
    </>
  );
};

export default TournamentDetails;
