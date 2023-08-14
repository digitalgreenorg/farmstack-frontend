import React from "react";
import MeasureItem from "./MeasureItem";

const MeasuresSidebar = ({ measures }) => {
  return (
    <div
    >
      <ol>
        {measures.map((measure, index) => (
          <li key={index}>
            <MeasureItem title={measure.title} sum={measure.sum} index={index}/>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MeasuresSidebar;
