import React, { useState } from 'react'
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
import { Button, Affix } from 'antd';
import { handleUnwantedSpace, validateInputField } from '../../../../Utils/Common';
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
import settinggif from "../../../../Assets/Img/setting.gif"
const DatasetSelect = (props) => {
    const { integrateMore, empty, template, setTemplate, counterForIntegrator, completedJoinData, setCompleteJoinData, resetAll, generateData, orgList, joinType, setJoinType, setCompleteData, setConnectorData, connectorData, completeData, setFinalDataNeedToBeGenerated, finalDataNeedToBeGenerated, listOfFilesSelected, allDatasetNameList, listOfDatasetSelected, handleChangeDatasetNameSelector, listOfDatsetFileAvailableForColumn, } = props
    const [errorConnectorName, setErrorConnectorName] = useState("")
    const [errorConnectorDesc, setErrorConnectorDesc] = useState("")
    const [show, setShow] = useState(false)
    const [indexShow, setIndex] = useState(-1)
    const handleChange = (e) => {
        let value = e.target.name
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
    const handleMoreDataShow = (index, condition, e) => {
        e.stopPropagation()
        if (condition) {
            setIndex(index)
            setShow(true)
        }
        else {
            setIndex(-1)
            setShow(false)
        }

    }

    return (
        <Container className='dataset_selector_in_integration'>

            <Row className={styles.select_dataset_logo}>
                <Col lg={12}>
                    Dataset Integration details
                </Col>
            </Row>
            <Row >
                <Col lg={12}>
                    <TextField onKeyDown={handleConnectorNameKeydown} error={errorConnectorName ? true : false}
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
            {counterForIntegrator === completeData.length && <div style={{ textAlign: "left" }} >Click on integrate more datasets to select files for integration.</div>}
            <Row>
                <Col lg={12} sm={12} sx={12}>

                    <Affix style={{ backgrond: "white", transition: "all 2s", display: counterForIntegrator == completeData.length ? "none" : "block" }} offsetTop={top}>
                        <Row className={styles.selectors + " all_selectors_as_sticky"}>
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
                                <Button id='addMoreFileButton' disabled={template?.availabeColumns?.length > 0 ? false : true} onClick={addNewForm} className={styles.button}>Add</Button>
                            </Col>
                        </Row>
                    </Affix>
                    <hr />
                    {/* {completeData?.length > 0 && completeData.map((each, index) => {
                        //console.log(show, indexShow)
                        if (totalCounter >= index && index < counterForIntegrator) {
                            return <span >
                                {index != 0 && <span id='settingIconForHover' onMouseLeave={() => handleMoreDataShow(index, false)} onMouseOver={() => handleMoreDataShow(index, true)} style={{ height: `${show && index == indexShow ? "300px" : "50px"}`, overflow: "hidden", width: `${show && index == indexShow ? "700px" : "50px"}`, margin: "auto", backgroundImage: index != indexShow ? `url(${settinggif})` : "none", backgroundRepeat: "no-repeat", backgroundSize: "50px 50px", backgroundPosition: "center", boxShadow: "0 3px 10px #ab840574", }} className={index == indexShow ? styles.hoveredOne : styles.alwaysHave}>
                                    {index == indexShow ? <Join file_left={completeData[index - 1].file_name} file_right={completeData[index].file_name} setCompleteJoinData={setCompleteJoinData} left_on={completedJoinData[index - 1]?.left_on} right_on={completedJoinData[index - 1]?.right_on} completedJoinData={completedJoinData} left={completedJoinData[index - 1]?.left} type={completedJoinData[index - 1]?.type} right={completedJoinData[index - 1]?.right} index={index} each={each} resetAll={resetAll} joinType={joinType} setJoinType={setJoinType} connectorData={connectorData} completeData={completeData} setCompleteData={setCompleteData} finalDataNeedToBeGenerated={finalDataNeedToBeGenerated} generateData={generateData} listOfDatsetFileAvailableForColumn={listOfDatsetFileAvailableForColumn} listOfDatasetSelected={listOfDatasetSelected} listOfFilesSelected={listOfFilesSelected} /> : <img src={settinggif} alt="" />}
                                </span>}
                                {index != 0 && <span style={{ border: index == indexShow && "1.5px solid #C09507" }} class={styles.vl} ></span>}
                                {each?.availabeColumns?.length > 0 && <CardDetail completedJoinData={completedJoinData} setCompleteJoinData={setCompleteJoinData} setTotalCounter={setTotalCounter} orgList={orgList} completeData={completeData} setCompleteData={setCompleteData} data={each} index={index} />}
                                {index != totalCounter && <span onMouseOver={() => handleMoreDataShow(index, true)} style={{ border: index == indexShow - 1 && "1.5px solid #C09507" }} class={styles.vl} ></span>}
                            </span>
                        }
                    })} */}
                    {completeData?.length > 0 && completeData.map((each, index) => {
                        return <span key={index} >
                            {<CardDetail completedJoinData={completedJoinData} setCompleteJoinData={setCompleteJoinData} setTotalCounter={setTotalCounter} orgList={orgList} completeData={completeData} setCompleteData={setCompleteData} data={each} index={index} />}
                            {index < completeData.length - 1 && <span style={{ border: index == indexShow && "1.5px solid #C09507" }} class={styles.vl} ></span>}
                            {index < completeData.length - 1 &&
                                <span span id='settingIconForHover' onClick={(e) => handleMoreDataShow(index, true, e)} style={{ display: "flex", justifyContent: "center", alignItems: "center", cursor: !show ? "pointer" : "", height: `${show && index == indexShow ? "350px" : "50px"}`, overflow: "hidden", width: `${show && index == indexShow ? "700px" : "50px"}`, margin: "auto", backgroundRepeat: "no-repeat", backgroundSize: "50px 50px", backgroundPosition: "center", boxShadow: "0 3px 10px #ab840574", }} className={index == indexShow ? styles.hoveredOne : styles.alwaysHave}>
                                    {<span>
                                        {/* <ClickAwayListener onClickAway={(e) => handleMoreDataShow(index, false, e)} > */}
                                        <Join handleMoreDataShow={handleMoreDataShow} indexShow={indexShow} index={index} each={each} next={completeData[index + 1]} resetAll={resetAll} joinType={joinType} setJoinType={setJoinType} connectorData={connectorData} completeData={completeData} setCompleteData={setCompleteData} finalDataNeedToBeGenerated={finalDataNeedToBeGenerated} generateData={generateData} listOfDatsetFileAvailableForColumn={listOfDatsetFileAvailableForColumn} listOfDatasetSelected={listOfDatasetSelected} listOfFilesSelected={listOfFilesSelected} />
                                        {/* </ClickAwayListener> */}
                                        {indexShow != index && <img className={styles.settingGif} src={settinggif} alt="" />}
                                    </span>
                                    }
                                </span>
                            }
                            {index < completeData.length - 1 && <span onMouseOver={() => handleMoreDataShow(index, true)} style={{ border: index == indexShow && "1.5px solid #C09507" }} class={styles.vl} ></span>}
                        </span>
                    })}


                </Col>
            </Row>
        </Container >
    )
}

export default DatasetSelect