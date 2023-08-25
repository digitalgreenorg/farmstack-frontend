import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  TextField
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import "./AllMeasuresPage.css";

const AllMeasuresPage = ({
  measures,
  setMeasures,
  deleteMeasure,
  editedSum,
  setEditedSum
}) => {
  const location = useLocation();
  const Mdata  = location.state;

  const [editModeMeasureId, setEditModeMeasureId] = useState(null);
  const [editedMeasureTitle, setEditedMeasureTitle] = useState("");
  const [editedMeasureColArray, setEditedMeasureColArray] = useState([]);
  const [editedMeasureOprArray, setEditedMeasureOprArray] = useState([]);
  const [editedMeasureValArray, setEditedMeasureValArray] = useState([]);
  // const [editedSum, setEditedSum] = useState({});

  const handleEditMeasureColChange = (value, index) => {
    const updatedEditedMeasureColArray = [...editedMeasureColArray];
    updatedEditedMeasureColArray[index] = value;
    setEditedMeasureColArray(updatedEditedMeasureColArray);
  };

  const handleEditMeasureOprChange = (value, index) => {
    const updatedEditedMeasureOprArray = [...editedMeasureOprArray];
    updatedEditedMeasureOprArray[index] = value;
    setEditedMeasureOprArray(updatedEditedMeasureOprArray);
  };

  const handleEditMeasureValChange = (value, index) => {
    const updatedEditedMeasureValArray = [...editedMeasureValArray];
    updatedEditedMeasureValArray[index] = value;
    setEditedMeasureValArray(updatedEditedMeasureValArray);
  };

  const handleCancelEdit = () => {
    setEditModeMeasureId(null);
    setEditedMeasureTitle("");
    setEditedMeasureColArray([]);
    setEditedMeasureOprArray([]);
    setEditedMeasureValArray([]);
  };

  const handleEditAccordion = (measureId) => {
    const measureToEdit = measures.find((measure) => measure.id === measureId);

    if (measureToEdit) {
      setEditModeMeasureId(measureId);
      setEditedMeasureTitle(measureToEdit.title);
      setEditedMeasureColArray(
        measureToEdit.selectedRows.map((row) => row.columnName)
      );
      setEditedMeasureOprArray(
        measureToEdit.selectedRows.map((row) => row.operator)
      );
      setEditedMeasureValArray(
        measureToEdit.selectedRows.map((row) => row.value)
      );
    }
  };
  const handleSaveAccordion = (measureId, index) => {
    const updatedMeasures = measures.map((measure, i) => {
      if (i === index) {
        return {
          ...measure,
          title: editedMeasureTitle,
          selectedRows: editedMeasureColArray.map((col, rowIndex) => ({
            columnName: col,
            operator: editedMeasureOprArray[rowIndex],
            value: editedMeasureValArray[rowIndex]
          }))
        };
      }
      return measure;
    });

    setMeasures(updatedMeasures);
    setEditModeMeasureId(null);

    const savedEditedMeasure = updatedMeasures.find(
      (measure) => measure.id === measureId
    );
    const calculatedSum = calculateEditedSum(savedEditedMeasure);
    setEditedSum((prevEditedSum) => ({
      ...prevEditedSum,
      [measureId]: calculatedSum,
    }));
  };

  const handleDeleteAccordion = (measureId) => {
    deleteMeasure(measureId);
  };
  
  const calculateEditedSum = (editedMeasure) => {
    if (editedMeasure && editedMeasure.selectedRows) {
      let calculatedSum = 0;

      editedMeasure.selectedRows.forEach((row) => {
        let numericValue = row.value;
      
        if (!isNaN(row.value)) {
          numericValue = parseFloat(row.value);
        }   

        if (row.operator === "Equal to") {
          calculatedSum += Mdata.data.content.filter(
            (item) => item[row.columnName] === numericValue
          ).length;
        } else if (row.operator === "Less than") {
          calculatedSum += Mdata.data.content.filter(
            (item) => Number(item[row.columnName]) < numericValue
          ).length;
        } else if (row.operator === "Greater than") {
          calculatedSum += Mdata.data.content.filter(
            (item) => Number(item[row.columnName]) > numericValue
          ).length;
        }
      });

      return calculatedSum;
    }

    return 0; 
  };

  useEffect(() => {
    if (editModeMeasureId !== null) {
      const editedMeasure = measures.find(
        (measure) => measure.id === editModeMeasureId
      );
      const calculatedSum = calculateEditedSum(editedMeasure);
      setEditedSum(calculatedSum);
    }
  }, [editModeMeasureId, measures]);

  return (
    <div>
      <div className="mpage" sx={{ display: "grid" }}>
        <h1 className="pgheading">List of Measures</h1>
        {measures.length===0 && 
        <h5 style={{paddingTop:"75px",color:"#445069"}}>
          There are no measures at the moment . Add some, then return here to see the list.
        </h5>}
        <ul style={{paddingLeft:"20px",paddingRight:"20px"}}>
          {measures.map((item, index) => (
            <Accordion key={item.id} className="measureblock" style={{border: "2px solid #ccc",borderRadius: "10px"}}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={item.id + "-content"}
                id={item.id}
                className="measurename"
                style={{backgroundColor: "#cccccc40"}}
              >
                {editModeMeasureId === item.id ? (
                  <TextField
                    value={editedMeasureTitle}
                    onChange={(e) => setEditedMeasureTitle(e.target.value)}
                    style={{
                      color: "#46d7a6",
                      fontWeight: "550"
                    }}
                  />
                ) : (
                  <Typography className="title" style={{color:"#46d7a6" , fontWeight:"550",fontSize:" x-large"}}>
                    {item.title}
                  </Typography>
                )}
              </AccordionSummary>
              <div className="btns">
                {editModeMeasureId === item.id ? (
                  <>
                    <IconButton
                      aria-label="save"
                      onClick={() => handleSaveAccordion(item.id, index)}
                      className="savebtn"
                      sx={{ borderRadius: "5px",gap:"5px" }}
                    >
                      <p style={{margin:"0px" , fontWeight: "700"}}>Save</p>
                      <SaveIcon />
                    </IconButton>
                    <IconButton
                      aria-label="cancel"
                      onClick={handleCancelEdit}
                      style={{
                        borderRadius: '2px',
                        width: "120px",
                        border: "1px solid white",
                        borderColor: 'white',
                        fontWeight: '700',
                        margin: '0px',
                        fontSize: '14px', 
                        fontSize: 'x-large',
                        color: "#6c757d",
                        gap:"5px"
                      }}
                    >
                      <p style={{ margin: '0px', fontWeight: '700' }}>Cancel</p>
                      <CancelIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditAccordion(item.id)}
                    style={{
                    fontWeight: '700 !important',
                    fontSize: '14px !important',
                    lineHeight: '19px !important',
                    color: '#585d60 !important',
                    display: 'grid !important',
                    gridTemplateAreas: 'eb p !important',
                    justifyContent: 'center !important',
                    alignContent: 'center !important',
                    alignItems: 'center !important',
                    justifyItems: 'center !important',
                    fontFamily: 'Montserrat !important',
                    fontStyle: 'normal !important',
                    width: '70px !important',
                    margin: '0px !important',
                    border: 'none !important',
                    padding: '5px !important',
                    gap: '5px',
                    borderRadius:'2px'
                    }}
                  >
                    <p style={{ margin: '0px', fontWeight: '700' }}>Edit</p>
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteAccordion(item.id)}
                  className="delbtn"
                  sx={{ borderRadius: "5px",gap:"5px",width:"120px" }}
                >
                  <p style={{margin:"0px" , fontWeight: "700"}}>Delete</p>
                  <DeleteIcon />
                </IconButton>
              </div>
              {item.selectedRows && (
                <AccordionDetails>
                  <h3
                    style={{
                      textAlign: "left",
                      paddingLeft: "30px",
                      marginBottom: "20px",
                      color:"#6c757d"
                    }}
                  >Conditions Applied:-</h3>
                  <ol>
                    {item.selectedRows.map((row, rowIndex) => (
                      <li key={rowIndex}>
                        <div className="measure">
                          <h5 className="condition">Condition</h5>
                          {editModeMeasureId === item.id ? (
                            <TextField
                              value={editedMeasureColArray[rowIndex]}
                              onChange={(e) =>
                                handleEditMeasureColChange(
                                  e.target.value,
                                  rowIndex
                                )
                              }
                              style={{width:"100%"}}
                              className="condition-txt"
                            />
                          ) : (
                            <h5  className="condition-txt">{row.columnName}</h5>
                          )}
                          <h5 className="operator">Operator</h5>
                          {editModeMeasureId === item.id ? (
                            <TextField
                              value={editedMeasureOprArray[rowIndex]}
                              onChange={(e) =>
                                handleEditMeasureOprChange(
                                  e.target.value,
                                  rowIndex
                                )
                              }
                              style={{width:"100%"}}
                              className="operator-txt"
                            />
                          ) : (
                            <h5 className="operator-txt">{row.operator}</h5>
                          )}
                          <h5 className="uservalue">Value</h5>
                          {editModeMeasureId === item.id ? (
                            <TextField
                              value={editedMeasureValArray[rowIndex]}
                              onChange={(e) =>
                                handleEditMeasureValChange(
                                  e.target.value,
                                  rowIndex
                                )
                              }
                              style={{width:"100%"}}
                              className="uservalue-txt"
                            />
                          ) : (
                            <h5 className="uservalue-txt">{row.value}</h5>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                  <h3 style={{paddingTop:"30px",color:"#445069"}}>
                    Number of {item.title} :{" "}
                    {editedSum[item.id] !== undefined ? editedSum[item.id] : item.sum}
                  </h3>
                </AccordionDetails>
              )}
            </Accordion>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllMeasuresPage;
