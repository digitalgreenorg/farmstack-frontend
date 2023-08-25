import React from "react";
import { Tooltip } from '@mui/material';

const MeasureItem = ({ title,index,setDraggedMeasure,classes}) => {
  const drag = (ev) => {
    const measureId={index}
    setDraggedMeasure((prevDraggedMeasure) => [...prevDraggedMeasure, measureId]);
    const customEvent = new CustomEvent("dragData", { detail: measureId });
    ev.target.dispatchEvent(customEvent);
  };

  return (
    <Tooltip title={title}>
      <div
        className="draggable dragStart ${classes.ellipsis}"
        onDragStart={drag}
        draggable="true"
        style={{
          cursor: "pointer"
        }}
      >
        <h3>{title}</h3>
      </div>
    </Tooltip>
  );
};

export default MeasureItem;
