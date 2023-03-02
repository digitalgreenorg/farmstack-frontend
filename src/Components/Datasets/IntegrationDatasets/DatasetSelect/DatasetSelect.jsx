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
import { Checkbox, FormControlLabel } from '@mui/material';
import { CheckLg } from 'react-bootstrap-icons';
import { useEffect } from 'react';
const DatasetSelect = (props) => {
    const { setFinalDataNeedToBeGenerated, finalDataNeedToBeGenerated, deleteTable, listOfFilesSelected, handleChangeFileNameSelector, noOfFileSelector, listOfFilesAvailableForSelect, allDatasetNameList, listOfDatasetSelected, handleChangeDatasetNameSelector, noOfDatasetSelector, handleClickSelectDataset, listOfDatsetFileAvailableForColumn } = props
    const [selectAll, setSelectAll] = useState(false)
    const [selectedColumns, setSelectedColumns] = useState({})
    const changeAllSelect = (file) => {
        console.log(selectedColumns)
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
    const handleChangeColumns = (e, file, col) => {
        console.log(e.target.checked, file, col)
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

    return (
        <Container className='dataset_selector_in_integration'>
            <Row>
                <Col className={styles.select_dataset_logo} lg={6} sm={12} sx={12}>
                    <Row>
                        <Col lg="12">
                            <span >Select datasets</span>
                        </Col>
                    </Row>
                </Col>
                <Col className={styles.select_dataset_logo}>
                    <Row>
                        <Col className={styles.select_file_main_col} lg="12">
                            <span >Select files</span>
                            <span id='add_more_button' className={noOfDatasetSelector.length >= allDatasetNameList.length ? styles.add_dataset_btn_dis : styles.add_dataset_btn_dis} onClick={() => handleClickSelectDataset("dataset")}>+ Add datasets</span>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col className={styles.select_dataset_logo} lg={6} sm={12} sx={12}>

                    {noOfDatasetSelector.map((eachDatasetName, i) => {
                        return <Row>
                            <Col key={i} lg={12} sm={12} sx={12} className={styles.each_select_for_dataset}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="dataset_name_label">Dataset name</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="dataset_name_selector"
                                        value={listOfDatasetSelected[i]}
                                        label="Dataset name"
                                        onChange={(e) => handleChangeDatasetNameSelector(e, i, "dataset")}
                                    >
                                        {/* <MenuItem value="">
                                            <em>Clear</em>
                                        </MenuItem> */}
                                        {allDatasetNameList.map((eachDatasetName, index) => {
                                            // if (listOfDatasetSelected.includes(eachDatasetName.id)) {
                                            //     // console.log(eachDatasetName, "")
                                            //     return <MenuItem disabled key={index} value={eachDatasetName.id}>{eachDatasetName.name}</MenuItem>
                                            // } else {
                                            return <MenuItem key={index} value={eachDatasetName.id}>{eachDatasetName.name}</MenuItem>
                                            // }
                                        })}
                                    </Select>
                                </FormControl>
                            </Col> </Row>
                    })}
                </Col>
                <Col lg={6} sm={12} sx={12}>
                    {noOfDatasetSelector.map((eachFileName, i) => {
                        return <Row>
                            <Col key={i} lg={12} sm={12} sx={12} className={styles.each_select_for_dataset}>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel id="file_name_label">File name</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="file_name_selector"
                                        value={listOfFilesSelected[i]}
                                        label="File name"
                                        onChange={(e) => handleChangeDatasetNameSelector(e, i, "file")}
                                    >
                                        {/* <MenuItem value="">
                                            <em>Clear</em>
                                        </MenuItem> */}
                                        {listOfFilesAvailableForSelect.map((eachDataset, index) => {
                                            console.log(eachDataset, listOfDatasetSelected, "CHECK")
                                            if (listOfDatasetSelected[i] == eachDataset.dataset) {
                                                if (listOfFilesSelected.includes(eachDataset.file)) {
                                                    return <MenuItem disabled key={index} value={eachDataset.file}>{eachDataset.file_name}</MenuItem>
                                                } else {
                                                    return <MenuItem key={index} value={eachDataset.file}>{eachDataset.file_name}</MenuItem>
                                                }
                                            }
                                        })}
                                    </Select>
                                </FormControl>
                            </Col></Row>
                    })}
                </Col>
            </Row>
            {/* <Row >



            </Row> */}
            {/* <Row>
                <Col className={styles.select_dataset_logo} lg={8} sm={12} sx={12}>
                    <span>Select Files</span>
                </Col>
                <Col lg={4} sm={12} sx={12}>
                    <span className={styles.add_dataset_btn_dis} onClick={() => handleClickSelectDataset("file")}>+ Add files</span>
                    <span className={noOfFileSelector.length >= listOfFilesAvailableForSelect.length ? styles.add_dataset_btn_dis : styles.add_dataset_btn} onClick={() => handleClickSelectDataset("file")}>+ Add files</span>
                </Col>
            </Row> */}
            {/* <Row>

            </Row> */}
            {/* {listOfDatsetFileAvailableForColumn.length > 0 && */}
            {listOfFilesSelected.length > 0 && <Row>
                <Col className={styles.select_dataset_logo} lg={8} sm={12} sx={12}>
                    <span>Select columns</span>
                </Col>

                <Col lg={12} sm={12} sx={12}>
                    {Object.keys(listOfDatsetFileAvailableForColumn).map((eachDatasetFile, index) => {
                        console.log(eachDatasetFile, "eachDatasetFile", listOfDatasetSelected, listOfFilesSelected)
                        if (listOfFilesSelected.includes(eachDatasetFile)) {
                            return <Accordion defaultExpanded={true} className='accordion_for_columns_under_integration'>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="summary_id_accordion"
                                >
                                    <Typography className={styles.accordion_header} sx={{ width: '80%', flexShrink: 0, textAlign: "left" }}>{eachDatasetFile.split("/")[eachDatasetFile.split("/").length - 1]}</Typography>
                                    {/* <Typography className={styles.accordion_delete} sx={{ width: '18%', textAlign: "right" }}>
                                    <DeleteIcon onClick={() => deleteTable(eachDatasetFile, index)} />
                                </Typography> */}
                                </AccordionSummary>
                                {/* <span className={styles.select_all_btn + ' select_all_btn'}>
                                <FormControlLabel onClick={() => changeAllSelect(eachDatasetFile)} control={<Checkbox />} label={"Select all"} />
                            </span> */}
                                <AccordionDetails className={styles.accordion_detail + ' accordion_detail'}>
                                    {listOfDatsetFileAvailableForColumn[eachDatasetFile]?.length > 0 && listOfDatsetFileAvailableForColumn[eachDatasetFile]?.map((eachColumn, index) => {
                                        return <FormControlLabel id={`select_col_` + eachColumn} control={<Checkbox checked={finalDataNeedToBeGenerated[eachDatasetFile].includes(eachColumn + "")} onClick={(e) => handleChangeColumns(e, eachDatasetFile, eachColumn + "")} />} label={eachColumn} />
                                    })}
                                </AccordionDetails>
                            </Accordion>
                        }
                    })}
                </Col>
            </Row>}
            {/* } */}

        </Container>
    )
}

export default DatasetSelect