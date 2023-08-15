import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useLocation } from "react-router-dom";
import ColumnsSidebar from "./ColumnsSidebar";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
// import MeasuresSidebar from "./MeasuresSidebar";
import MeasureItem from "./MeasureItem";
import ResultComponent from "./ResultComponent";
import FormComponent from "./FormComponent";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import dashboardImage from '../../../Assets/Img/dashboardBuilder.jpg'; 
import "./Newpage.css";

export default function Newpage({ measures, setMeasures, createMeasure }) {
    const location = useLocation();
    const { data } = location.state;
    const columnNames = data.content?.length > 0
                ? Object.keys(data.content[0])
                : [];
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
    
    const handleColumnCheckboxChange = (columnName) => {
      if (selectedColumns.includes(columnName)) {
        setSelectedColumns(selectedColumns.filter((col) => col !== columnName));
      } else {
        setSelectedColumns((prevSelectedColumns) =>
          prevSelectedColumns.includes(columnName)
            ? prevSelectedColumns.filter((col) => col !== columnName)
            : [...prevSelectedColumns, columnName]
        );
      }
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

    const fetchDataForIdentifier = (index) => {
    
      if (typeof index === "number" && index >= 0 && index < measures.length) {
        return <h1>Content for Measure {index + 1}</h1>;
      } else {
        return <h1>Unknown identifier</h1>;
      }
    };

    const allowDrop = (ev) => {
      ev.preventDefault();
    };

    const drop = (ev) => {
      ev.preventDefault();
      // const data = ev.dataTransfer.getData("text");
      const cardContainer = document.createElement("div");
      // console.log(data);
      const identifier = ev.dataTransfer.getData("text");
      const data = JSON.parse(ev.dataTransfer.getData("text"));
      const { dropIndex,dropTitle,dropSum } = data;

      // Fetch data based on the identifier
      // const fetchedData = fetchDataForIdentifier(index);
    
  
      // Render the Card component inside the div container
      ReactDOM.render(
        <Card>
          <CardContent>
            <h1>measures[{dropIndex}].{dropTitle}</h1>
            <h3>measures[{dropIndex}].{dropSum}</h3>
          </CardContent>
        </Card>,
        cardContainer
      );
  
      // Append the div container to the DragdropArea
      ev.target.appendChild(cardContainer);
    };
  
  
    return (
        <div>
          {/* <div>
      <img src={dashboardImage} alt="Dashboard Builder" />
      </div> */}
          {/* <div className="heading" backgroundcolor="#54436B">
            <h1>Dashboard</h1>
          </div> */}
          <div className="heading">
                <div className="heading-text">
                  <h1 className="text-gradient text-primary">Unleash Dashboard</h1>
                  <h3>Build dashboards flexibly...!!!</h3>
                  <h6>Dashboard Builder empowers you to analyze and present the data in a meaningful way, facilitating informed decision-making and data-driven insights.</h6>
                </div>
                <div className="heading-img"><img src={dashboardImage} alt="Dashboard Builder" /></div>
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
                    />
                  </div>
                </div>
              ) : (
                <div className="btnwithdnd">
                  <div className="ambtn">
                  <h3>Get started,Add measures to create dashboard and analyse data.</h3>
                  <Button
                    variant="contained"
                    onClick={handleFormOpen}
                    sx={{border: "2px solid #58db58",
                          backgroundColor: "white !important",
                          color: "#58db58 !important" ,padding:"15px"
                        }}
                  >
                    <b> Add Measure</b>
                  </Button>
                  </div>
                  <div>

                  </div>
                  <div className="DragdropArea dropZone" dragend="true"
                    onDrop={(ev) => drop(ev)}
                    onDragOver={allowDrop}
                  >
                    {isMSidebarOpen ? null : (
                      <div className="looppaleDragZone">
                        <h1>Drag Measures here to create number metric</h1>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/*column2*/}
            <div className="msbar">
              {isMSidebarOpen && (
                <>
                  {selectedColumns.length > 0 ? (
                    <div>
                      <ResultComponent
                        selectedRows={selectedRows}
                        setSum={setSum}
                        Data={{data}}
                      />
                      <div className="msb">
                        <ol>
                          {measures.map((measure, index) => (
                            <li key={index}>
                              <MeasureItem key={index} title={measure.title} sum={measure.sum} index={index}/>
                            </li>
                          ))}
                        </ol>
                      </div>
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
              
              <IconButton
                onClick={toggleMSidebar}
                aria-label={
                  isMSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"
                }
                style={{ writingMode: "vertical-lr",color:"#58db58" }}
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
                />
              )}
              <IconButton
                onClick={toggleCSidebar}
                aria-label={
                  isCSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"
                }
                style={{ writingMode: "vertical-lr",color:"#58db58 "}}
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
  