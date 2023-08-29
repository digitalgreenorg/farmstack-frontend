import React, { useState, useEffect } from "react";
import ReactDOM  from "react-dom";
import { useLocation } from "react-router-dom";
import ColumnsSidebar from "./ColumnsSidebar";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import MeasureItem from "./MeasureItem";
import ResultComponent from "./ResultComponent";
import FormComponent from "./FormComponent";
import dashboardImage from '../../../Assets/Img/dashboardBuilder.jpg';
import {Card,CardContent,Button} from "@mui/material";
import ChartComponent from "./ChartComponent";
import { makeStyles } from '@mui/styles';
import { CSSTransition } from 'react-transition-group';
import "./Dashboardpage.css";

const useStyles = makeStyles({
  ellipsis: {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: '100px', // Adjust this value as needed
  },
});

export default function Dashboardpage({ measures, setMeasures, createMeasure,editedSum}) {
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
    const [draggedMeasure,setDraggedMeasure]=useState([]);
    const [imageLoaded, setImageLoaded] = React.useState(false);

    const handleImageLoad = () => {
      setImageLoaded(true);
    };

    const classes = useStyles();

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
      if (selectedRowIds && rows) {
        const newSelectedRows = rows.filter((row) =>
          selectedRowIds.includes(row.id)
        );
        setSelectedRows(newSelectedRows);
      }
      
      const measuresAsString = JSON.stringify(measures);
      
      localStorage.setItem('dashboardMeasures', measuresAsString);
      
    }, [selectedRowIds, rows,measures]);


   
    const allowDrop = (ev) => {
      ev.preventDefault();
    };


    const drop = (ev) => {
      ev.preventDefault();
      const cardContainer = document.createElement("div");
      const latestDraggedMeasureIdx = draggedMeasure[draggedMeasure.length - 1];

      ReactDOM.render(
         <Card>
          <CardContent className="cell" sx={{padding: "10px"}}>
            <ChartComponent draggedMeasureIdx={latestDraggedMeasureIdx} measures={measures} Data={{data}} editedSum={{editedSum}}/>
          </CardContent>
         </Card>,
        cardContainer
      );
      ev.target.appendChild(cardContainer);
    };


    return (
        <div>
          <div className="heading">
                <div className="heading-text">
                  <h1 className="text-gradient text-primary">Unleash Dashboard</h1>
                  <h3>Build dashboards flexibly...!!!</h3>
                  <h6>Dashboard Builder empowers you to analyze and present the data in a meaningful way, facilitating informed decision-making and data-driven insights.</h6>
                </div>
                <div className="heading-img">
        <img
          src={dashboardImage}
          alt="Dashboard Builder"
          className="slide-in"
        />
                </div>
              </div>
          <div className="grid-container">


            <div className="header">
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
                      classes={classes}
                    />
                  </div>
                </div>
              ) : (
                <div className="btnwithdnd">
                  <div className="ambtn">
                    <h3 className="btntxt"><i><em>Get started ...</em></i></h3>
                    <div className="btnbox">
                      <Button
                        variant="contained"
                        onClick={handleFormOpen}
                        sx={{border: "2px solid #46d7a6",
                        backgroundColor: "#46d7a6 !important",
                        color: "white !important" ,padding:"15px"
                        }}
                        className="btn"
                      >
                        <b> Add Measure</b>
                      </Button>
                    </div>
                  </div>
                  {isMSidebarOpen ?
                    (
                      <div className="DragdropArea" dragend="true"
                        onDrop={(ev) => drop(ev)}
                        onDragOver={allowDrop}>
                      </div>
                    )
                    :
                    (
                    <div className="Dragdrop" dragend="true">
                      <div className="looppleDropZone">
                      <h1 style={{color:"#445069"}}>Drag Measures here to create & save dashboards</h1>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>


            <div className="msbar" style={{paddingLeft : isMSidebarOpen && "25px"}}>
              {isMSidebarOpen && (
                <>
                  {(selectedColumns.length > 0 || measures.length > 0) ? (
                    <div>
                      <ResultComponent
                        selectedRows={selectedRows}
                        setSum={setSum}
                        Data={{data}}
                      />
                      <div className="msb">
                        <ol style={{padding:"0px" , listStyle: "decimal",display:"grid"}}>
                          {measures.map((measure, index) => (
                            <li key={index}>
                              <MeasureItem key={index}
                              title={measure.title}
                              index={index}
                              setDraggedMeasure={setDraggedMeasure}
                              classes={classes}
                              />
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
                aria-label={isMSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                className="msbar-toggle"
              >
              {isMSidebarOpen ? (
                <KeyboardArrowUpIcon />
              ) : (
              <div className="vertical-button">
                <span className="vertical-text">Measures</span>
                <KeyboardArrowDownIcon />
              </div>
              )}
              </IconButton>
            </div>
 
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
                aria-label={isCSidebarOpen ? "Collapse Sidebar" : "Expand Sidebar"}
                className="csbar-toggle"
              >
                {isCSidebarOpen ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <div className="vertical-button">
                    <span className="vertical-text">Columns</span>
                    <KeyboardArrowDownIcon />
                  </div>
                )}
              </IconButton>
            </div>
          </div>
        </div>
    );
  }
 
