import React,{useState} from 'react'
import './gamedetails.css'
import { Dayjs } from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

const GameDetails = () => {
    const [value,setValue] = useState("")

  const checkRating = (rating) => {
    let width = rating * 20
    let str = width.toString() + '%'
    return str
}
  const reviews = [
    { id: 1, rating: 5, reviews: '43,125' },
    { id: 2, rating: 3, reviews: '23,100' },
    { id: 3, rating: 4, reviews: '32,500' },
    { id: 4, rating: 2, reviews: '3,125' },
    { id: 5, rating: 1, reviews: '1,250' },
]


  const getStars = (ratings) => {
    let content = [];
    for (let i = 0; i < ratings; i++) {
        content.push(
            <i className="bi bi-star-fill star" key={content.length + 1}></i>
        );
    }
    if (ratings < 5) {
        let len = 5 - ratings;
        for (let i = 0; i < len; i++) {
            content.push(
                <i className="bi bi-star star" key={content.length + 1}></i>
            );
        }
    }
    return content
}

  return (
    <>
        <div className='container section-margin'>


<div className='row'>


    <div className='col-md-5 columnAlign alignStart'>



        <div class="img-big-wrap img-thumbnail" style={{ border: 'none'}}>

            <a data-fslightbox="mygalley" data-type="image" href="images/items/detail1/big.webp">
                <img style={{ height: "250px", width: "250px", borderRadius: "2rem"}} src="https://media.istockphoto.com/id/1292610462/photo/colorful-billiard-balls-on-a-green-billiard-table.jpg?s=612x612&w=0&k=20&c=zu6IuiNUsnDnuwiCNmG_3H0RjOENJyD6M3MYDIDPPPY=" />
            </a>

        </div>


        <div className='row' style={{ marginTop: 15 }}>
          
                <div className='col-md-4'  style={{ display: 'flex', flexDirection: 'row',gridGap:'20px',width: '100%', justifyContent: 'flex-start', alignItems: 'center', }}>
                   <img src="https://media.istockphoto.com/id/1292610462/photo/colorful-billiard-balls-on-a-green-billiard-table.jpg?s=612x612&w=0&k=20&c=zu6IuiNUsnDnuwiCNmG_3H0RjOENJyD6M3MYDIDPPPY="  style={{ width: '50px', objectFit: 'contain', cursor: 'pointer', height: "70px",  }}></img>
                    <img src="https://media.istockphoto.com/id/1292610462/photo/colorful-billiard-balls-on-a-green-billiard-table.jpg?s=612x612&w=0&k=20&c=zu6IuiNUsnDnuwiCNmG_3H0RjOENJyD6M3MYDIDPPPY="  style={{ width: '50px', objectFit: 'contain', cursor: 'pointer', height: "70px",  }}></img>
                    <img src="https://media.istockphoto.com/id/1292610462/photo/colorful-billiard-balls-on-a-green-billiard-table.jpg?s=612x612&w=0&k=20&c=zu6IuiNUsnDnuwiCNmG_3H0RjOENJyD6M3MYDIDPPPY="  style={{ width: '50px', objectFit: 'contain', cursor: 'pointer', height: "70px",  }}></img>

                </div>
            

        </div>




        <br></br>
        <br></br>

        {/* {data[selectedTab].desc.map((item, index) => */}
   
        <br></br>

        <>

                <div className='columnAlign alignCenter' style={{ marginBottom: 10 }}>

                         <h5>Snooker Details</h5>
                         <div style={{ width: 130, backgroundColor: '#894dd4', height: 2 }}></div>
                         </div>
               
            
                <div  className='game-details-deep' style={{ width: '100%', margin: '5px 0' }}>
                    <span style={{ color: '#000' }}>Availability  </span>
                    <span style={{ color: '#000' }}>24H</span>
                </div>
                <div  className='game-details-deep' style={{ width: '100%', margin: '5px 0' }}>
                    <span style={{ color: '#000' }}>Maximum Person</span>
                    <span style={{ color: '#000' }}>4Person </span>
                </div>
                <div  className='game-details-deep' style={{ width: '100%', margin: '5px 0' }}>
                    <span style={{ color: '#000' }}>Table Size</span>
                    <span style={{ color: '#000' }}>32 inch</span>
                </div>
                <div  className='game-details-deep' style={{ width: '100%', margin: '5px 0' }}>
                    <span style={{ color: '#000' }}> No of Table  </span>
                    <span style={{ color: '#000' }}>10</span>
                </div>
                <div  className='game-details-deep' style={{ width: '100%', margin: '5px 0' }}>
                    <span style={{ color: '#000' }}>Stick</span>
                    <span style={{ color: '#000' }}>yes</span>
                </div>
            
    
        </>

        <br></br>

        <>
            <div className='columnAlign alignCenter' style={{ marginBottom: 10 }}>
                <h5>Price Break Up</h5>
                <div style={{ width: 130, backgroundColor: '#894dd4', height: 2 }}></div>
            </div>

            <div className='rowAlign spaceBetween alignCenter' style={{ width: '100%', margin: '5px 0' }}>
                <span style={{ color: '#000' }}>1h/2 Person</span>
                <span style={{ color: '#000' }}>₹100/-</span>
            
            </div>
            <div className='rowAlign spaceBetween alignCenter' style={{ width: '100%', margin: '5px 0' }}>
                <span style={{ color: '#000' }}>1h/4 Person</span>
                <span style={{ color: '#000' }}>₹200/-</span>
            
            </div>
            <div className='rowAlign spaceBetween alignCenter' style={{ width: '100%', margin: '5px 0' }}>
                <span style={{ color: '#000' }}>1 match book</span>
                <span style={{ color: '#000' }}>₹500/-</span>
            
            </div>
            <div className='rowAlign spaceBetween alignCenter' style={{ width: '100%', margin: '5px 0' }}>
                <span style={{ color: '#000' }}>GST</span>
                <span style={{ color: '#000' }}>12%</span>
            
            </div>
            

        </>


        <br></br>


    </div>




    <div className='col-md-7' style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 10, cursor: 'pointer' }} >
         <i className="bi bi-heart-fill" style={{ color: '#f00', fontSize: 20 }}></i>
        </div>


       
            <h3  >Soonker</h3>
       
        <div style={{ marginBottom: 5 }}>
            {getStars(4)} (115)
        </div>
   
        {/* {pricee[selectedTab].desc.map((item, index) => */}
        <span style={{ fontSize: 16, color: "#000" }} > ₹445 
        
        </span>
        {/* )} */}

        {/* <span style={{ color: '#000', marginTop: 5 }}>
            {product}
        </span> */}

        <hr style={{ backgroundColor: '#ccc', margin: '20px 0px' }}></hr>

        <h6>Desription</h6>
        <div style={{ display: 'flex' }}>
                <div className='karateWrapper' >
                Hello, world! Open the page in your browser of choice to see your Bootstrapped page. Now you can start building with Bootstrap by creating your own layout, adding dozens of components, and utilizing our official examples.
                </div>

            
        </div>

    

 


        {/* {allproductDetails?allproductDetails.map((item,index)=>
      

        ):null} */}
      
  
        <hr style={{ backgroundColor: '#ccc', margin: '5px 0px 15px 0' }}></hr>

            <a style={{ marginTop: "10px",width:'fit-content'}} className='btn-design link-a' data-bs-toggle="modal" data-bs-target="#exampleModalslot" >New Slot</a>

        <div style={{ margin: '10px 0', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            
            <span style={{ color: 'red', }}>
                few table are left </span>
        </div>

        <span style={{}}> Any Questions? please feel free to reach us at: +1800-456-1232</span>


        <div className='row'>
            <div className='col-md-6'>
                <div className='shadowCard rowAlign' style={{ margin: '20px 0', width: 250, }}>
                <i class="bi bi-award" style={{ marginRight: 15, height: 30, objectFit: 'contain' }}></i>
                    <div className='columnAlign'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
      style={'zIndex:9999999 !important'}
    label="Start time "
    // value={value}
    // onChange={(newValue) => {
    //   setValue(newValue);
    // }}
    renderInput={(params) => <TextField {...params} />}
  />
</LocalizationProvider>
                        <span>Started Time Of Slot  </span>
                    </div>
                </div>
            </div>
            <div className='col-md-6'>
                <div className='shadowCard rowAlign' style={{ margin: '20px 0', width: 250, }}>
                <i class="bi bi-wind" style={{ marginRight: 15, height: 30, objectFit: 'contain' }} ></i> 
                    <div className='columnAlign'>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
      style={'zIndex:9999999 !important'}
    label="end time "
    // value={value}
    // onChange={(newValue) => {
    //   setValue(newValue);
    // }}
    renderInput={(params) => <TextField {...params} />}
  />
</LocalizationProvider>
                        <span>End Time Of Slot</span>
                    </div>
                </div>
            </div>
            <div className='col-md-6'>
                <div className='shadowCard rowAlign' style={{ margin: '20px 0', width: 250, }}>
                <i class="bi bi-egg-fried" style={{ marginRight: 15, height: 30, objectFit: 'contain' }}></i> 
                    <div className='columnAlign'>
                    <Slider
                     aria-label="Temperature"
                     defaultValue={1500}
                    //   getAriaValueText={valuetext}
                      valueLabelDisplay="on"
                     step={250}
                     marks
                    min={500}
                    max={2500}
                    color="secondary"
                    />
                        <span>Price Of The Slot </span>
                    </div>
                </div>
            </div>
        </div>



    </div>
</div>
 </div>

{/* <ProductCards heading={'You Might Also Like'} data={appData.products} /> */}

<div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '75px 0px' }}>
    <h3>What They Say About Us</h3>
    

    <div className="what-they-say " style={{ margin: "10px 0px" }}>
        <div className="row what-they-say-row">
            <div className='col-md-5 columnAlign'>
                <div className='' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <h5>Rating</h5>
                    <h6>4.8/5
                        {/* <i className="bi bi-star-fill star" style={{ marginLeft: 10 }}></i> */}
                    </h6>
                    <div className='rowAlign'>{getStars(5)}</div>
                    <span>60,669 Rating &
                        5,364   Reviews</span>
                </div>

                <div style={{ margin: '15px 0' }}>
                    {reviews.map((item, index) =>
                        <div key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', fontSize: 14 }}>
                            {item.rating}
                            <i className="bi bi-star-fill star" style={{ marginLeft: 5, }}></i>
                            <div style={{ height: 5, width: 160, backgroundColor: '#C4C4C4', margin: '0px 5px', display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', borderRadius: 5, }}>
                                <div style={{ height: 5, width: checkRating(item.rating), backgroundColor: index == 3 ? '#EC8F5A' : index == 4 ? '#F55936' : '#34A853', borderRadius: 5, }}></div>
                            </div>
                            {item.reviews}
                        </div>
                    )}
                </div>
            </div>

            <div className='col-md-7 shadowCard'>
                <div className='rowAlign' style={{ margin: '10px 0', position: 'relative' }}>
                    <img src="https://lh3.googleusercontent.com/a/AEdFTp4GSK5Eamn44VVjLbQCHMOahseAT32sGBMnbaLz=s432-p-rw-no" alt='package' style={{ marginRight: 15, height: 30, objectFit: 'contain' }} />
                    <div className='columnAlign'>
                        <span style={{ fontWeight: 500, marginBottom: 10 }}>Rajeev Kumar </span>
                        <span style={{ color: 'black', fontWeight: 500, marginBottom: 5 }}>Awesome Purchase </span>
                        <span style={{ fontSize: 12 }}>Extremely Satisfied</span>
                    </div>
                    <span style={{ color: 'black', fontSize: 12, position: 'absolute', top: 0, right: 0 }}>4 March 2022</span>
                </div>

                <hr style={{ backgroundColor: '#ccc', margin: '20px 0px' }}></hr>

                <div className='rowAlign' style={{ margin: '10px 0 0 0', position: 'relative' }}>
                    <img src="https://lh3.googleusercontent.com/a/AEdFTp4GSK5Eamn44VVjLbQCHMOahseAT32sGBMnbaLz=s432-p-rw-no" alt='package' style={{ marginRight: 15, height: 30, objectFit: 'contain' }} />
                    <div className='columnAlign'>
                        <span style={{ fontWeight: 500, marginBottom: 10 }}>Kiraa Kapoor  </span>
                        <span style={{ color: 'black', fontWeight: 500, marginBottom: 5 }}>Awesome Purchase </span>
                        <span style={{ fontSize: 12 }}>Extremely Satisfied</span>
                    </div>
                    <span style={{ color: 'black', fontSize: 12, position: 'absolute', top: 0, right: 0 }}>4 March 2022</span>
                </div>
                
            </div>
            


        </div>
        <p className='view-all' style={{color:'#894dd4' ,fontWeight:600}}  >View all 186 reviews</p>

 
    </div>
</div>




{/* modal */}


    </>
  )
}

export default GameDetails