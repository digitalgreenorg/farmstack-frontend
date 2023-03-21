import React, { useState, useRef } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from "../dataset_integration.module.css"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox, Fab, FormControlLabel, TextField } from '@mui/material';
import { CheckLg } from 'react-bootstrap-icons';
import CardDetail from '../CardDetail/CardDetail';
import { Button, Affix, Tour } from 'antd';
import { dateTimeFormat, handleUnwantedSpace, toTitleCase, validateInputField } from '../../../../Utils/Common';
import RegexConstants from '../../../../Constants/RegexConstants';
import Join from '../Join/Join';
import leftG from "../../../../Assets/Img/Join type/Color/Left.svg"
import leftB from "../../../../Assets/Img/Join type/Normal state/left.svg"
import rightB from "../../../../Assets/Img/Join type/Normal state/right.svg"
import rightG from "../../../../Assets/Img/Join type/Color/right.svg"
import fullB from "../../../../Assets/Img/Join type/Normal state/outer.svg"
import fullG from "../../../../Assets/Img/Join type/Color/outer.svg"
import innerB from "../../../../Assets/Img/Join type/Normal state/inner.svg"
import innerG from "../../../../Assets/Img/Join type/Color/inner.svg"
import analytics from "../../../../Assets/Img/analytics.png"
import settinggif from "../../../../Assets/Img/setting.gif"
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BorderColorIcon from '@mui/icons-material/BorderColor';

const DatasetSelect = (props) => {
    const { connectorTimeData, isEditModeOn, setIsConditionForConnectorDataForSaveMet, isEdited, setIsEdited, setIsEditModeOn, setIsDatasetIntegrationListModeOn, integrateMore, empty, template, setTemplate, counterForIntegrator, completedJoinData, setCompleteJoinData, resetAll, generateData, orgList, joinType, setJoinType, setCompleteData, setConnectorData, connectorData, completeData, setFinalDataNeedToBeGenerated, finalDataNeedToBeGenerated, listOfFilesSelected, allDatasetNameList, listOfDatasetSelected, handleChangeDatasetNameSelector, listOfDatsetFileAvailableForColumn, } = props
    const [errorConnectorName, setErrorConnectorName] = useState("")
    const [errorConnectorDesc, setErrorConnectorDesc] = useState("")
    const [show, setShow] = useState(false)
    const [indexShow, setIndex] = useState(-1)
    const ref1 = useRef(null);
    const ref2 = useRef(null);
    const ref3 = useRef(null);
    const handleChange = (e) => {
        let value = e.target.name
        if (e.target.value) {
            setIsConditionForConnectorDataForSaveMet(true)
        }
        if (value == "name") {
            setErrorConnectorName("")
            validateInputField(e.target.value, RegexConstants.connector_name)
                ? setConnectorData({ ...connectorData, [e.target.name]: e.target.value })
                : e.preventDefault();
        } else {
            setErrorConnectorDesc("")
            validateInputField(e.target.value, RegexConstants.connector_name)
                ? setConnectorData({ ...connectorData, [e.target.name]: e.target.value })
                : e.preventDefault();
        }

    }

    const [selectAll, setSelectAll] = useState(false)
    const [totalCounter, setTotalCounter] = useState(-1)
    const [selectedColumns, setSelectedColumns] = useState({})
    const [top, setTop] = useState(0);
    const changeAllSelect = (file) => {
        //console.log(selectedColumns)
        if (selectedColumns[file.name]) {
            let obj = { ...selectedColumns }
            delete obj[file.name];
            setSelectedColumns({ ...obj })
        } else {
            let obj = { ...selectedColumns }
            obj[file.name] = file.columns
            setSelectedColumns({ ...obj })
        }
    }
    const [joinTypeArr, setJoinTypeArr] = useState([
        { name: "left", black: leftB, green: leftG },
        { name: "right", black: rightB, green: rightG },
        { name: "inner", black: innerB, green: innerG },
        { name: "outer", black: fullB, green: fullG },
    ])
    const selectThisType = (name) => {
        setJoinType(name)
    }
    const handleChangeColumns = (e, file, col) => {
        //console.log(e.target.checked, file, col)
        let obj = { ...finalDataNeedToBeGenerated }
        if (obj[file]) {
            if (e.target.checked && !obj[file].includes(col)) {
                obj[file] = [...obj[file], col]
            } else {
                let ind = obj[file].indexOf(col)
                if (ind > -1) {
                    obj[file].splice(ind, 1)
                }
            }
        } else {
            if (e.target.checked) {
                obj[file] = [col]
            } else {
                let ind = obj[file].indexOf(col)
                obj[file].splice(ind, 1)
            }
        }
        setFinalDataNeedToBeGenerated({ ...obj })
    }


    //after all selection field is filled this func will be triggered when clicked on add
    const addNewForm = () => {
        let arr = [...completeData]
        console.log("template", template, arr)
        arr.push(template)
        setCompleteData([...arr])
        setTotalCounter((prev) => prev + 1)
        setTemplate({ ...empty })
        console.log(arr, "ARR NEW")

    }

    //datasetname no space handler
    const handleConnectorNameKeydown = (e) => {
        if (e.target.name == "name") {
            handleUnwantedSpace(connectorData.name, e);
        } else {
            handleUnwantedSpace(connectorData.desc, e);
        }
    };
    const handleMoreDataShow = (index, condition, e, whatToShow) => {
        e.stopPropagation()
        if (condition) {
            setIndex(index)
            setShow(true)
            // if(whatToShow=="table_result"){
            //     setShowTable
            // }
        }
        else {
            setIndex(-1)
            setShow(false)
        }

    }
    const [open, setOpen] = useState(true);
    const steps = [
        {
            title: 'Upload File',
            description: 'Put your files here.',
            cover: (
                <img
                    alt="tour.png"
                    src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
                />
            ),
            target: () => ref1.current,
        },
        {
            title: 'Save',
            description: 'Save your changes.',
            target: () => ref2.current,
        },
        {
            title: 'Other Actions',
            description: 'Click to see other actions.',
            target: () => ref3.current,
        },
    ];

    return (
        <Container style={{ background: "rgb(252, 252, 252)" }} className='dataset_selector_in_integration'>
            <Row style={{ marginBottom: "25px" }} >
                <Col lg={12}
                    onClick={() => {
                        resetAll()
                    }
                    }
                    className={styles.backButtonMainDiv + " backButtonMainDiv"}
                >
                    <ArrowBackIcon className={styles.backArrowIcon}></ArrowBackIcon>{" "}
                    <div className={styles.backButtonText}>
                        Back
                    </div>
                </Col>
            </Row>
            <Row className={styles.select_dataset_logo}>
                <Col lg={12}>
                    Dataset Integration details
                    {isEditModeOn && <sub className={styles.subTime}>{"Last updated on: " + dateTimeFormat(connectorTimeData.last_updated, true)}</sub>}
                </Col>
            </Row>
            <Row ref={ref1} >
                <Col lg={12}>
                    <TextField onKeyDown={handleConnectorNameKeydown} error={errorConnectorName ? true : false} disabled={isEditModeOn ? true : false}
                        helperText={errorConnectorName ? errorConnectorName : ""} style={{ marginBottom: "25px" }} value={connectorData.name} onChange={handleChange} name='name' fullWidth id="outlined-basic" label="Connector name" required autoFocus variant="outlined" />
                </Col>

            </Row>
            <Row>
                <Col lg={12}>
                    <TextField onKeyDown={handleConnectorNameKeydown} error={errorConnectorDesc ? true : false} style={{ marginBottom: "25px" }} required value={connectorData.desc} onChange={handleChange} multiline name='desc'
                        helperText={errorConnectorDesc ? errorConnectorDesc : ""} rows={4} fullWidth placeholder='Connector description not more that 512 character' id="outlined-basic" label="Connector description" variant="outlined" />
                </Col>
            </Row>

            <Row className={styles.select_dataset_logo}>
                <Col lg={12}>
                    Select datasets for connector
                </Col>

            </Row>
            {counterForIntegrator === completeData.length && <div style={{ textAlign: "left" }} >To choose other files for integration, click on integrate more datasets.</div>}
            <Row>
                <Col lg={12} sm={12} sx={12}>

                    <Affix style={{ backgrond: "white", transition: "all 2s", display: counterForIntegrator == completeData.length ? "none" : "block" }} offsetTop={top}>
                        <Row className={styles.selectors + " all_selectors_as_sticky"} ref={ref2}>
                            <Col lg={3}>
                                <FormControl variant="outlined" fullWidth style={{ cursor: completeData.length == counterForIntegrator + 1 ? "not-allowed" : "pointer" }}>
                                    <InputLabel id="org_name_label">Organization name <span className='MuiInputLabel-asterisk'>*</span></InputLabel>
                                    <Select
                                        disabled={completeData.length == counterForIntegrator + 1 ? true : false}
                                        required
                                        labelId="demo-simple-select-label"
                                        id="org_name_selector"
                                        value={template?.org_id}
                                        label="Organization name *"
                                        onChange={(e) => handleChangeDatasetNameSelector(e, completeData.length - 1, "org",)}
                                    >
                                        {orgList?.map((each_org, ind) => {
                                            return <MenuItem key={ind} value={each_org?.id}>{each_org?.name ? each_org?.name : ""}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Col>
                            <Col lg={3}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="dataset_name_label">Dataset name <span className='MuiInputLabel-asterisk'>*</span></InputLabel>
                                    <Select
                                        defaultValue=""
                                        labelId="demo-simple-select-label"
                                        id="dataset_name_selector"
                                        value={template?.dataset_id}
                                        label="Dataset name"
                                        autoFocus={template?.dataset_list?.length > 0 ? true : false}
                                        disabled={template?.dataset_list?.length > 0 ? false : true}
                                        onChange={(e) => handleChangeDatasetNameSelector(e, completeData.length - 1, "dataset",)}
                                    >
                                        {template?.dataset_list?.map((eachDatasetName, ind) => {
                                            return <MenuItem key={ind} value={`${eachDatasetName.id}`}>{eachDatasetName.name + ""}</MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                            </Col>
                            <Col lg={3}>
                                <FormControl variant="outlined" fullWidth>
                                    <InputLabel id="file_name_label">File name <span className='MuiInputLabel-asterisk'>*</span></InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="file_name_selector"
                                        value={template?.file_name ? template?.file_name : ""}
                                        label="File name"
                                        autoFocus={template?.file_list?.length > 0 ? true : false}
                                        disabled={template?.file_list?.length > 0 ? false : true}
                                        onChange={(e) => handleChangeDatasetNameSelector(e, completeData.length - 1, "file",)}
                                    >

                                        {template?.file_list?.map((eachDataset, ind) => {
                                            return <MenuItem key={ind} value={eachDataset.file}>{eachDataset.file_name}</MenuItem>
                                        })
                                        }
                                    </Select>
                                </FormControl>
                            </Col>
                            <Col lg={3}>
                                <Button id='addMoreFileButton' disabled={connectorData.name && connectorData.desc && template?.availabeColumns?.length > 0 ? false : true} onClick={addNewForm} className={styles.button}>Add</Button>
                            </Col>
                        </Row>
                    </Affix>
                    <hr />
                    {completeData?.length > 0 && completeData.map((each, index) => {
                        return <span style={{ position: "relative", }} key={index} >
                            {<CardDetail generateData={generateData} completedJoinData={completedJoinData} setCompleteJoinData={setCompleteJoinData} setTotalCounter={setTotalCounter} orgList={orgList} completeData={completeData} setCompleteData={setCompleteData} data={each} index={index} />}
                            {index < completeData.length - 1 && <span style={{ border: index == indexShow && "1.5px solid #C09507" }} class={styles.vl} ></span>}
                            {index < completeData.length - 1 &&
                                <span span id='settingIconForHover' onClick={(e) => handleMoreDataShow(index, true, e)} style={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: !show ? "pointer" : "", height: `${show && index == indexShow ? "350px" : "50px"}`, overflow: "hidden", width: `${show && index == indexShow ? "700px" : "50px"}`, margin: "auto", backgroundRepeat: "no-repeat", backgroundSize: "50px 50px", backgroundPosition: "center", }} className={index == indexShow ? styles.hoveredOne : styles.alwaysHave}>
                                    {<span ><Join handleMoreDataShow={handleMoreDataShow} indexShow={indexShow} index={index} each={each} next={completeData[index + 1]} resetAll={resetAll} joinType={joinType} setJoinType={setJoinType} connectorData={connectorData} completeData={completeData} setCompleteData={setCompleteData} finalDataNeedToBeGenerated={finalDataNeedToBeGenerated} generateData={generateData} listOfDatsetFileAvailableForColumn={listOfDatsetFileAvailableForColumn} listOfDatasetSelected={listOfDatasetSelected} listOfFilesSelected={listOfFilesSelected} />
                                        {indexShow != index && <img className={styles.settingGif} src={settinggif} alt="" />}
                                    </span>}
                                </span>}
                            {index !== indexShow && index < completeData.length - 1 && <span className={styles.eachSideJoinData} style={{ position: "absolute", left: "40px", bottom: "23px", width: "514px", height: "112px", border: "1px solid #C09507", borderRadius: "10px", padding: "10px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                <div style={{ width: "80%" }}>
                                    <div style={{ textAlign: "left", marginBottom: "20px", fontWeight: "600" }}>Joined by <BorderColorIcon onClick={(e) => handleMoreDataShow(index, true, e)} cursor="pointer" fontSize='small' /> </div>
                                    <div style={{ display: "flex", justifyContent: "left", alignItems: "center", gap: "50px", textAlign: "left" }}>
                                        <span className={styles.detail_joins}>
                                            <div > Left column </div>
                                            <div>{each?.left_on?.length > 0 ? toTitleCase(each?.left_on[0]) : "Not selected"}</div>
                                        </span>
                                        <span className={styles.detail_joins}>
                                            <div>Right column </div>
                                            <div> {each?.right_on?.length > 0 ? toTitleCase(each?.right_on[0]) : "Not selected"}</div>
                                        </span>
                                        <span className={styles.detail_joins}>
                                            <div> Join type </div>
                                            <div> {each?.type ? each?.type : "Not selected"}</div>
                                        </span>
                                    </div>
                                </div>
                                <span>
                                    <img onClick={(e) => handleMoreDataShow(index, true, e, "table_result")} style={{ cursor: "pointer" }} src={analytics} height="50px" width={"50px"} alt="" />
                                </span>
                            </span>}
                            {index < completeData.length - 1 && <span style={{ border: index == indexShow && "1.5px solid #C09507" }} class={styles.vl} ></span>}
                        </span>
                    })}
                </Col>
            </Row>
            {/* <Tour open={open} onClose={() => setOpen(false)} steps={steps} /> */}
        </Container >
    )
}

export default DatasetSelect