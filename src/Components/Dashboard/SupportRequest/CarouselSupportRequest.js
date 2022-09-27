import React, { useEffect, useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Dummy from "../../../Assets/Img/dummy.png";
import NoDataAvailable from '../NoDataAvailable/NoDataAvailable';
import SliderCard from './SliderCard';
import styles from "./supportRequest.module.css"
// import Dummy from "../../../Assets/Img/dummy.png";
import back from "../../../Assets/Img/back.png"
import next from "../../../Assets/Img/next.png"
function CarouselSupportRequest({supportRequestData}) {
    // console.log(first)
    const [ticketDetails, setTicketDetails] = useState(null)
    const [supportRequestDatafinal, setSupportRequestData] = useState([])
    
    useEffect(()=>{
      if(supportRequestData){
        console.log("ASASASA", supportRequestData)
        setTicketDetails({closed_requests: supportRequestData.closed_requests, hold_requests:supportRequestData.hold_requests , open_requests : supportRequestData.open_requests})
        
        setSupportRequestData([...supportRequestData.recent_tickets])

      }else{
        return
      }
      // console.log("Caroisel",supportRequestData)
    },[supportRequestData])
  return (<div className={styles.my__carousel_main}>

{supportRequestDatafinal.length > 0 ? 
    <Carousel controls={true} indicators={true} >
      {supportRequestDatafinal ? 
        supportRequestDatafinal.map((supportRequestDataEach)=>(<Carousel.Item>
         <SliderCard ticketDetails={ticketDetails}  supportRequestData={supportRequestDataEach}/> 
          <Carousel.Caption>
          {/* <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
        </Carousel.Item>)
        )
        
       : ""}
       
        </Carousel> : <NoDataAvailable/> }
        {/* <div style={{display:"flex",zIndex:11, justifyContent:"space-around", width:"200px",margin:"auto", position:"absolute",  bottom:"5px", left:"318px", transform:"translate(-50%, 0%)"}}>
        <div style={{cursor:"pointer"}}><img  src={back} alt=""/></div>
        <div style={{cursor:"pointer"}}><img  src={next} alt=""/></div>
      </div> */}
        </div>
  );
}

export default CarouselSupportRequest;