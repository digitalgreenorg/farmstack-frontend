import React from 'react'
// import styles from "./supportRequest.module.css"
import  "../../../Assets/CSS/common.css"
import CarouselSupportRequest from './CarouselSupportRequest'
const SupportRequest = () => {
  return (
    <div style={{display:"flex", flexDirection:"column", padding:"20px"}} className="widht640andheight368pxandborderradius10andborder1pxsolidE4E4E4">
    
    <div style={{textAlign:"left", marginBottom:"15px", color:"#3D4A52", fontSize:"20px", fontWeight:"700"}} >Support Request</div>
    <CarouselSupportRequest/>
    </div>
  )
}

export default SupportRequest