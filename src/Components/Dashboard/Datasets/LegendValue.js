import React, { useState } from "react";

const LegendValue = ({ data, COLORS }) => {
  // const [total, setTotal] = useState(0)
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    // console.log(data)
    sum += +data[i].value;
  }

  // setTotal(sum)
  return (
    <div style={{ marginRight: "50px" }}>
      {data.map((entry, index) => (
        <div
          style={{
            display: "flex",
            justifyContent: "left",
            alignItems: "left",
          }}
        >
          <div
            style={{
              height: "20px",
              width: "20px",
              background: `${COLORS[index]}`,
              marginRight: "14px",
              // marginLeft: "1px",
              marginBottom: "20px",
            }}
          ></div>
          <div key={`item-${index}`}>
            {Math.round((+entry.value / sum) * 100)}% {entry.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LegendValue;
