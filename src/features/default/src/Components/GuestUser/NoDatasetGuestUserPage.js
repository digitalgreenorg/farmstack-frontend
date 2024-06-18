import loding-setting-img from '../../Assets/Img/loding-setting-img.svg';
import React from "react";
import "./noDatasetGuestUser.css"



export default function NoDatasetGuestUser (){


    return (<>
    <div className="loding-img-container" >
        <div className="loding-img-div">
            <img  src={loding-setting-img}  />
            <h1>Configuration not completed yet.</h1>
            <h3>Please drop by after sometime.</h3>
        </div>

    </div>
    </>)
}