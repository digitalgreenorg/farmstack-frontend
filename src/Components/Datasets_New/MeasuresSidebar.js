import React from "react";
// import { Draggable } from "react-beautiful-dnd";

const MeasureItem = ({ title, sum, index }) => (
    <div>
      <div style={{ cursor: "pointer" }}>
        <h3>{title}</h3>
        <h2>{sum}</h2>
      </div>
      {/* Rest of the code */}
    </div>
);

const MeasuresSidebar = ({ measures }) => {
  return (
    <div
    >
      <ol>
        {measures.map((measure, index) => (
          <li key={index}>
            <MeasureItem title={measure.title} sum={measure.sum} index={index} />
          </li>
        ))}
      </ol>
    </div>
  );
};

export default MeasuresSidebar;
