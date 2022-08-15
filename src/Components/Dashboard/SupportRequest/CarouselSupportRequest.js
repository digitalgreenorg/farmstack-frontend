import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Dummy from "../../../Assets/Img/dummy.png";
import SliderCard from './SliderCard';
import styles from "./supportRequest.module.css"
// import Dummy from "../../../Assets/Img/dummy.png";

function CarouselSupportRequest() {
    // console.log(first)
    const [supportRequestData, setSupportRequestData] = useState([
        {openRequest:25,closeRequest:59,holdRequest:4, newRequestTitle:"Certificate is working",newRequestCategory:"Certficate",newRequestDateAndTime:"28/02/2022",newRequestNameOfParticipant:"Kalgudi",newRequestNameOfTheParticipantUser:"Kanhaiya Suthar" },
        {openRequest:5,closeRequest:81,holdRequest:12, newRequestTitle:"Certificate is not working",newRequestCategory:"Certficate",newRequestDateAndTime:"21/03/2022",newRequestNameOfParticipant:"Kalgudi",newRequestNameOfTheParticipantUser:"Abhinesh Kumar" },
        {openRequest:100,closeRequest:131,holdRequest:3, newRequestTitle:"Certificate is working",newRequestCategory:"Certficate",newRequestDateAndTime:"23/05/2022",newRequestNameOfParticipant:"Kalgudi",newRequestNameOfTheParticipantUser:"Waseem" }
    ])
  return (<div className={styles.my__carousel_main}>

    <Carousel controls={false} indicators={true} >
        {supportRequestData.map((supportRequestDataEach)=>(<Carousel.Item>
        <SliderCard supportRequestData={supportRequestDataEach}/>
        <Carousel.Caption>
          {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>)
        )}

    </Carousel>
        </div>
  );
}

export default CarouselSupportRequest;