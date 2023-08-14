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
// import Papa from 'papaparse';
import "./AllMeasuresPage.css";
// import * as XLSX from 'xlsx';

const AllMeasuresPage = ({
  measures,
  setMeasures,
  deleteMeasure,
}) => {
  const location = useLocation();
  const Mdata  = location.state;
  console.log({Mdata});
  const contentValue = Mdata.data.file;
  console.log(contentValue);
  const contentArray = Mdata.data.content;
  console.log(contentArray);

  // const file = Mdata.data.file;


  // const [dataInFile, setDataInFile] = useState('');

  // const handleFileRead = async (file) => {
  //   try {
  //     const response = await fetch(file);
  //     const fileContents = await response.text();
  //     return fileContents;
  //   } catch (error) {
  //     console.error('Error reading file:', error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const content = await handleFileRead(Mdata.data.file);
  //     setDataInFile(content);
  //   };

  //   fetchData();
  // }, [Mdata.data.file]);

  // console.log(dataInFile);

// Example using papaparse for CSV files


// const csvFileURL = Mdata.data.file;

// const fetchCSVData = async () => {
//   try {
//     const response = await fetch(csvFileURL);
//     const csvText = await response.text();
//     const { data } = Papa.parse(csvText, { header: true });
//     console.log('CSV Data:', data);
//   } catch (error) {
//     console.error('Error fetching or parsing CSV:', error);
//   }
// };

// fetchCSVData();


// const excelFileURL = Mdata.data.file;

// const fetchAndParseExcel = async () => {
//   try {
//     const response = await fetch(excelFileURL);
//     const arrayBuffer = await response.arrayBuffer();

//     console.log(arrayBuffer);

//     const workbook = XLSX.read(arrayBuffer, { type: 'array' });
//     const firstSheetName = workbook.SheetNames[0];
//     const worksheet = workbook.Sheets[firstSheetName];

//     // Parsing the data
//     const data = XLSX.utils.sheet_to_json(worksheet);

//     console.log('Excel Data:', data);
//   } catch (error) {
//     console.error('Error fetching or parsing Excel file:', error);
//   }
// };

// fetchAndParseExcel();
// useEffect(() => {
//   const csvFileURL = Mdata.data.file;

//   const fetchAndParseCSV = async () => {
//     try {
//       const response = await fetch(csvFileURL);
//       const csvText = await response.text();

//       // Parsing the CSV data
//       Papa.parse(csvText, {
//         header: true,
//         dynamicTyping: true,
//         complete: (result) => {
//           console.log('CSV Data:', result.data);
//         },
//         error: (error) => {
//           console.error('Error parsing CSV:', error.message);
//         }
//       });
//     } catch (error) {
//       console.error('Error fetching CSV file:', error);
//     }
//   };

//   fetchAndParseCSV();
// }, []);


  const [editModeMeasureId, setEditModeMeasureId] = useState(null);
  const [editedMeasureTitle, setEditedMeasureTitle] = useState("");
  const [editedMeasureColArray, setEditedMeasureColArray] = useState([]);
  const [editedMeasureOprArray, setEditedMeasureOprArray] = useState([]);
  const [editedMeasureValArray, setEditedMeasureValArray] = useState([]);
  const [editedSum, setEditedSum] = useState(0);

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
    setEditedSum(calculatedSum);

  };

  const handleDeleteAccordion = (measureId) => {
    deleteMeasure(measureId);
  };
  console.log(Mdata.data.content);
  const calculateEditedSum = (editedMeasure) => {
    if (editedMeasure && editedMeasure.selectedRows) {
      let calculatedSum = 0;

      editedMeasure.selectedRows.forEach((row) => {
        if (row.operator === "Equal to") {
          calculatedSum += Mdata.data.content.filter(
            (item) => item[row.columnName] === row.value
          ).length;
        } else if (row.operator === "Less than") {
          calculatedSum += Mdata.data.content.filter(
            (item) => Number(item[row.columnName]) < Number(row.value)
          ).length;
        } else if (row.operator === "Greater than") {
          calculatedSum += Mdata.data.content.filter(
            (item) => Number(item[row.columnName]) > Number(row.value)
          ).length;
        }
      });

      return calculatedSum;
    }

    return 0; // Return 0 if no selected rows
  };

  // Inside useEffect
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
        <h1 className="pgheading">All Measures</h1>
        <ul>
          {measures.map((item, index) => (
            <Accordion key={item.id} className="measureblock">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={item.id + "-content"}
                id={item.id}
                className="measurename"
              >
                {editModeMeasureId === item.id ? (
                  <TextField
                    value={editedMeasureTitle}
                    onChange={(e) => setEditedMeasureTitle(e.target.value)}
                  />
                ) : (
                  <Typography className="title">{item.title}</Typography>
                )}
              </AccordionSummary>
              <div className="btns">
                {editModeMeasureId === item.id ? (
                  <>
                    <IconButton
                      aria-label="save"
                      onClick={() => handleSaveAccordion(item.id, index)}
                      className="savebtn"
                      sx={{ borderRadius: "5px" }}
                    >
                      <p>Save</p>
                      <SaveIcon />
                    </IconButton>
                    <IconButton
                      aria-label="cancel"
                      onClick={handleCancelEdit}
                      className="cancelbtn"
                      sx={{
                        borderRadius: "5px !important",
                        borderWidth: "10px !important",
                        width: "150px !important",
                        display: "grid !important",
                        gridTemplateAreas: "editbtn p !important" 
                      }}
                    >
                      <p>Cancel</p>
                      <CancelIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditAccordion(item.id)}
                    className="editbtn"
                    sx={{ borderRadius: "5px !important",
                        borderWidth: "10px !important",
                        width: "150px !important",
                        display: "grid !important",
                        gridTemplateAreas: "editbtn p !important" }}
                  >
                    <p>Edit</p>
                    <EditIcon />
                  </IconButton>
                )}
                <IconButton
                  aria-label="delete"
                  onClick={() => handleDeleteAccordion(item.id)}
                  className="delbtn"
                  sx={{ borderRadius: "5px" }}
                >
                  <p>Delete</p>
                  <DeleteIcon />
                </IconButton>
              </div>
              {item.selectedRows && (
                <AccordionDetails>
                  <h3>Conditions Applied:-</h3>
                  <ol>
                    {item.selectedRows.map((row, rowIndex) => (
                      <li key={rowIndex}>
                        <div className="measure">
                          <h4>Condition:</h4>
                          {editModeMeasureId === item.id ? (
                            <TextField
                              value={editedMeasureColArray[rowIndex]}
                              onChange={(e) =>
                                handleEditMeasureColChange(
                                  e.target.value,
                                  rowIndex
                                )
                              }
                            />
                          ) : (
                            <p>{row.columnName}</p>
                          )}
                        </div>
                        <div className="measure">
                          <h4>Operator:</h4>
                          {editModeMeasureId === item.id ? (
                            <TextField
                              value={editedMeasureOprArray[rowIndex]}
                              onChange={(e) =>
                                handleEditMeasureOprChange(
                                  e.target.value,
                                  rowIndex
                                )
                              }
                            />
                          ) : (
                            <p>{row.operator}</p>
                          )}
                        </div>
                        <div className="measure">
                          <h4>Value:</h4>
                          {editModeMeasureId === item.id ? (
                            <TextField
                              value={editedMeasureValArray[rowIndex]}
                              onChange={(e) =>
                                handleEditMeasureValChange(
                                  e.target.value,
                                  rowIndex
                                )
                              }
                            />
                          ) : (
                            <p>{row.value}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ol>
                  <h3>
                    Number of {item.title} :{" "}
                    {editedSum ? editedSum : item.sum}
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
