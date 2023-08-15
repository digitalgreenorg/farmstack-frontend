import React from "react";

const MeasureItem = ({ title, sum,index}) => {
  const drag = (ev) => {
    ev.dataTransfer.setData("text",index.toString());
  };

  return (
    <div className="draggable dragStart" onDragStart={drag} draggable="true" style={{ cursor: 'pointer' }}>
      <h3>{title}</h3>
      <h2>{sum}</h2>
    </div>
  );
};

export default MeasureItem;
