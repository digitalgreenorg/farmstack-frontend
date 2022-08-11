import React, { useState } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Dummy from "../../../Assets/Img/dummy.png";
import SliderCard from './SliderCard';
import styles from "./supportRequest.module.css"
// import Dummy from "../../../Assets/Img/dummy.png";

function CarouselSupportRequest() {
    // console.log(first)
    const [supportRequestData, setSupportRequestData] = useState([
        {openRequest:25,closeRequest:59,holdRequest:4, newRequestTitle:"Certificate is not working",newRequestCategory:"Certficate",newRequestDateAndTime:"28/02/2022",newRequestNameOfParticipant:"Kalgudi",newRequestNameOfTheParticipantUser:"Abhinesh Kumar" },
        {openRequest:25,closeRequest:59,holdRequest:4, newRequestTitle:"Certificate is not working",newRequestCategory:"Certficate",newRequestDateAndTime:"28/02/2022",newRequestNameOfParticipant:"Kalgudi",newRequestNameOfTheParticipantUser:"Abhinesh Kumar" },
        {openRequest:25,closeRequest:59,holdRequest:4, newRequestTitle:"Certificate is not working",newRequestCategory:"Certficate",newRequestDateAndTime:"28/02/2022",newRequestNameOfParticipant:"Kalgudi",newRequestNameOfTheParticipantUser:"Abhinesh Kumar" }
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