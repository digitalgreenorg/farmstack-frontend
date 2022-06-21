import React from 'react';
import "./Rightintro.css";
import Farmstack from "../../Assets/Img/farmstack.jpg";

export default function Rightintro() {
  return (
    <div>
      <img src={Farmstack} alt="FarmStack" className="rightimg" />
      <h3 className="rightcontent">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac tellus
        gravida, elementum magna ut, viverra purus.
      </h3>
    </div>
  );
}
