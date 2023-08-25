import React from "react";

const NumberCard=({title,sum})=>{
    return(
        <div display="grid" style={{border:"2px solid #ccc",borderRadius:"5px",padding:"5px"}}>
          <div sx={{display: "grid" , padding: "5px"}}>
            <h3>{title}</h3>
            <h1 style={{color:"#46d7a6"}}>{sum}</h1>
          </div>
        </div>
    );
}

export default NumberCard;