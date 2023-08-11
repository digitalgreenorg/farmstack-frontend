import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ColumnsSidebar from "./ColumnsSidebar";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import MeasuresSidebar from "./MeasuresSidebar";
import ResultComponent from "./ResultComponent";
import FormComponent from "./FormComponent";
// import {Droppable} from "react-beautiful-dnd";
// import MeasureCard from "./MeasureCard";
import "./Newpage.css";
// import Dragndrop from "./Dragndrop";

export default function Newpage({ measures, setMeasures, createMeasure }) {
    const location = useLocation();
    const { data } = location.state;
    console.log({data});
    // const columnNames = data && data.length > 0 ? Object.keys(data[0]) : [];
    const columnNames = data.content?.length > 0
                ? Object.keys(data.content[0])
                : [];
    console.log(columnNames);
    const [isMSidebarOpen, setIsMSidebarOpen] = useState(false);
    const [isCSidebarOpen, setIsCSidebarOpen] = useState(false);
    const [selectedColumns, setSelectedColumns] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [sum, setSum] = useState(0);
    const [title, setTitle] = useState("");
    const [selectedRowIds, setSelectedRowIds] = useState([]);
    const [rows, setRows] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
  
    const toggleMSidebar = () => {
      setIsMSidebarOpen(!isMSidebarOpen);
  
      if (!isMSidebarOpen) {
        setIsCSidebarOpen(false);
      }
    };
    const toggleCSidebar = () => {
      setIsCSidebarOpen(!isCSidebarOpen);
  
      if (!isCSidebarOpen) {
        setIsMSidebarOpen(false);
      }
    };
  
    const handleFormOpen = () => {
      setIsFormOpen(true);
      setIsMSidebarOpen(true);
      setIsCSidebarOpen(false);
    };
  
    const handleCreateMeasureClick = (measureData) => {
      console.log("Creating measure with data:", measureData);
      if (measureData) {
        const newMeasure = { ...measureData, id: Date.now() };
        setMeasures([...measures, newMeasure]);
        console.log("New measure:", newMeasure);
      }
    };

    // const addNewMeasure = (newMeasure) => {
    //   setMeasures((prevMeasures) => [...prevMeasures, newMeasure]);
    // };

    
    // const handleMeasureDrop = (result) => {
    //   if (!result.destination) return;
    
    //   const droppedMeasureIndex = result.source.index;
    //   const newMeasure = measures[droppedMeasureIndex];
    
    //   addNewMeasure(newMeasure);
    // };
    
  
    const handleColumnCheckboxChange = (columnName) => {
      if (selectedColumns.includes(columnName)) {
        setSelectedColumns(selectedColumns.filter((col) => col !== columnName));
      } else {
        // setSelectedColumns([columnName]);
        setSelectedColumns((prevSelectedColumns) =>
  prevSelectedColumns.includes(columnName)
    ? prevSelectedColumns.filter((col) => col !== columnName)
    : [...prevSelectedColumns, columnName]
);

        console.log(selectedColumns);
      }
    };
  
    const handleSelectedColumns = (selectedColumns) => {
      setSelectedColumns(selectedColumns);
    };
  
    useEffect(() => {
      // Check if 'rows' is defined before filtering
      if (selectedRowIds && rows) {
        const newSelectedRows = rows.filter((row) =>
          selectedRowIds.includes(row.id)
        );
        setSelectedRows(newSelectedRows);
      }
    }, [selectedRowIds, rows]);
  
    // const handleMeasureDrop = (item) => {
    //   // You can handle the dropped measure here
    //   // For example, you can add the measure to the measures state
    //   const newMeasure = { title: item.title, sum: item.sum, id: Date.now() };
    //   setMeasures([...measures, newMeasure]);
    // };
  
    return (
        <div>
          <div className="heading" backgroundcolor="#54436B">
            <h1>Dashboard</h1>
          </div>
          <div className="grid-container">
            {/*grid columns*/}
  
            {/*column1*/}
            <div className="header">
              {/*row1*/}
  
              {/*row2*/}
              {isFormOpen ? (
                <div className="formwithbtn" sx={{ backgroundColor: "#7AD9F5" }}>
                  <div className="form">
                    <FormComponent
                      isOpen={isFormOpen}
                      onClose={() => setIsFormOpen(false)}
                      //onMClose={()=>setIsMSidebarOpen(true)}
                      onCreateMeasure={createMeasure}
                      selectedColumns={selectedColumns}
                      title={title}
                      setTitle={setTitle}
                      selectedRowIds={selectedRowIds}
                      setSelectedRowIds={setSelectedRowIds}
                      rows={rows}
                      setRows={setRows}
                      selectedRows={selectedRows}
                      setSelectedRows={setSelectedRows}
                      sum={sum}
                      setMeasures={setMeasures}
                      //inpval={inpVal}
                      //setinpval={setInpVal}
                    />
                  </div>
                </div>
              ) : (
                <div className="ambtnp">
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "green" }}
                    onClick={handleFormOpen}
                    className="ambtn"
                  >
                    <b> Add Measure</b>
                  </Button>
                  {/* <Droppable droppableId="measure-dropzone" direction="vertical" onDragEnd={handleMeasureDrop}>
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="measure-dropzone"
                      >
                        <div className="droppable-content">
                          {measures.map((measure, index) => (
                            <MeasureCard
                              key={measure.id}
                              title={measure.title}
                              sum={measure.sum}
                            />
                          ))}
                        </div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable> */}
                  {/* <Dragndrop/> */}
                </div>
              )}
            </div>
  
            <div className="msbar">
              {isMSidebarOpen && (
                <>
                  {selectedColumns.length > 0 ? (
                    <div>
                      <ResultComponent
                        measures={measures}
                        onCreateMeasure={handleCreateMeasureClick}
                        title={title}
                        selectedRows={selectedRows}
                        sum={sum}
                        setSum={setSum}
                        Data={{data}}
                      />
                      <MeasuresSidebar measures={measures} />
                    </div>
                  ) : (
                    <div
                      sx={{
                        justifyContent: "center",
                        textAlign: "center",
                        padding: "5px"
                      }}
                    >
                      NO MEASURES
                    </div>
                  )}
                </>
              )}
              {/*}: (
            <div>NO MEASURES</div>
          )}*/}
              <IconButton
                onClick={toggleMSidebar}
                aria-label={
                  isMSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"
                }
                style={{ writingMode: "vertical-lr" }}
              >
                {isMSidebarOpen ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <>
                    Measures
                    <KeyboardArrowDownIcon />
                  </>
                )}
              </IconButton>
            </div>
  
            {/*column3*/}
  
            <div className="csbar">
              {isCSidebarOpen && (
                <ColumnsSidebar
                  columns={columnNames}
                  selectedColumns={selectedColumns}
                  onColumnCheckboxChange={handleColumnCheckboxChange}
                  onSelectColumns={handleSelectedColumns}
                />
              )}
              <IconButton
                onClick={toggleCSidebar}
                aria-label={
                  isCSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"
                }
                style={{ writingMode: "vertical-lr" }}
              >
                {isCSidebarOpen ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <>
                    Columns
                    <KeyboardArrowDownIcon />
                  </>
                )}
              </IconButton>
            </div>
          </div>
        </div>
    );
  }
  