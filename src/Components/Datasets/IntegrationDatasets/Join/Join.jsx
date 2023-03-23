import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from "../dataset_integration.module.css"
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { CircularProgress } from '@mui/material';
import { Cpu } from 'react-bootstrap-icons';
import leftG from "../../../../Assets/Img/Join type/Color/Left.svg"
import leftB from "../../../../Assets/Img/Join type/Normal state/left.svg"
import rightB from "../../../../Assets/Img/Join type/Normal state/right.svg"
import rightG from "../../../../Assets/Img/Join type/Color/right.svg"
import fullB from "../../../../Assets/Img/Join type/Normal state/outer.svg"
import fullG from "../../../../Assets/Img/Join type/Color/outer.svg"
import innerB from "../../../../Assets/Img/Join type/Normal state/inner.svg"
import innerG from "../../../../Assets/Img/Join type/Color/inner.svg"

import smallG from "../../../../Assets/Img/Join type/Color/Tick icon.svg"

import CloseIcon from '@mui/icons-material/Close';
import { Button, Segmented } from 'antd';
import EachCardResult from '../EachCardsResult/EachCardResult';
const Join = (props) => {
    const { handleMoreDataShow, indexShow, result, file_right, file_left, setCompleteJoinData, right_on, left_on, completedJoinData, type, left, right, index, each, resetAll, joinType, setJoinType, connectorData, setCompleteData, completeData, listOfDatsetFileAvailableForColumn, generateData } = props
    const [joinTypeArr, setJoinTypeArr] = useState([
        { name: "left", black: leftB, green: leftG },
        { name: "right", black: rightB, green: rightG },
        { name: "inner", black: innerB, green: innerG },
        { name: "outer", black: fullB, green: fullG },
    ])
    const [value, setValue] = useState('Join by');
    console.log("RESULT OF EACH", result)
    const handleChangeJoin = (e, source) => {
        let arr = [...completeData]
        let obj1 = { ...each }
        const {
            target: { value },
        } = e;
        // On autofill we get a stringified value.
        // if (typeof value === 'string') {
        //     value.split(',')
        // }
        if (source == "join1") {
            console.log(value)
            obj1["left_on"] = [value]
            arr[index] = { ...obj1 }
        } else {
            obj1["right_on"] = [value]
            arr[index] = { ...obj1 }
        }

        setCompleteData([...arr])
    }

    const selectThisType = (name) => {
        let arr = [...completeData]
        let obj = { ...each }
        // let arr1 = [...completedJoinData]
        // let obj1 = { ...arr1[index - 1] }
        obj["type"] = name
        // arr1[index - 1] = { ...obj1 }
        // setCompleteJoinData([...arr1])
        // obj["joinTypeWithNextOrBack"] = name
        // arr[index - 1] = { ...obj }
        arr[index] = obj
        setCompleteData([...arr])
        setJoinType(name)
    }
    useEffect(() => {
        // console.log(index, "[index]", each)
    }, [])
    return (
        index == indexShow && <span className='dataset_selector_in_integration' >
            <Segmented value={value} onChange={setValue} block options={["Join by", "Integrated data"]} />

            <Row>
                <Col className={styles.select_dataset_logo} style={{ display: "flex", justifyContent: "space-between", padding: "10px 50px" }} lg={12} sm={12} sx={12}>
                    <span > {value == "Join by" ? "Join" : "Integrated data"}</span>
                    <span style={{ cursor: "pointer" }} ><CloseIcon onClick={(e) => handleMoreDataShow(indexShow, false, e)} className='deleteicon' color='secondary' /></span>
                </Col>
            </Row>

            {value == "Join by" ? <>
                <Row style={{ justifyContent: "center", width: "650px" }}>
                    <Col lg={5} sm={12} >
                        <FormControl variant="outlined" style={{ width: "100%" }}>
                            <InputLabel id="demo-simple-select-standard-label">Primary dataset column name</InputLabel>
                            {/* {console.log(each)} */}
                            <Select
                                labelId="primary_col_label_for_join"
                                id="primary_col_select_for_join"
                                value={each?.left_on ? each?.left_on[0] : ""}
                                onChange={(e) => handleChangeJoin(e, "join1")}
                                label="Primary dataset colounm name"
                            // multiple
                            >
                                {index == 0 && each.columnsSelected?.map((eachFile, ind_) => {
                                    return <MenuItem key={ind_} value={eachFile + ""}>{eachFile}</MenuItem>
                                })}
                                {index != 0 && completeData[index - 1].next_left?.map((eachFile, ind_) => {
                                    return <MenuItem key={ind_} value={eachFile + ""}>{eachFile}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        {/* </Col>
                    </Row> */}
                    </Col>
                    <Col lg={1} sm={12} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <DragHandleIcon />
                    </Col>
                    <Col lg={5} sm={12}>
                        <FormControl variant="outlined" style={{ width: "100%" }}>
                            <InputLabel id="secondary_col_label_for_join">Primary dataset column name</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="secondary_col_select_for_join"
                                value={each?.right_on ? each?.right_on[0] : ""}
                                onChange={(e) => handleChangeJoin(e, "join2")}
                                label="Primary dataset colounm name"
                            // multiple
                            >
                                {completeData[index + 1]?.columnsSelected?.map((eachFile, ind_) => {
                                    if (completeData[index + 1]?.availabeColumns.includes(eachFile)) {
                                        return <MenuItem key={ind_} value={eachFile + ""}>{eachFile}</MenuItem>
                                    }
                                })}
                            </Select>
                        </FormControl>
                    </Col>
                </Row>
                {completeData.length >= 2 && <Row style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Col lg={12}>
                        {joinTypeArr.map((eachT, ind) => {
                            return <span key={ind} onClick={() => selectThisType(eachT.name)} className={each.type == eachT.name ? styles.stypeMainBox : styles.typeMainBox}>
                                <div className={styles.selectedTypeMainBox}> {each.type == eachT.name && <img height={"20px"} width="20px" src={smallG} alt="ticked" />} </div>
                                <img className={styles.selectedTypeImage} src={each.type == eachT.name ? eachT.green : eachT.black} alt={eachT.name} />
                                <span className={styles.labelTypeJoin}> {eachT.name}</span>
                            </span>
                        })}
                    </Col> </Row>
                }

            </> : <Row style={{ justifyContent: "center", width: "650px" }}>
                <Col lg={12} sm={12} >
                    <EachCardResult result={result} />
                </Col>
            </Row>}







            <Row style={{ textAlign: "center" }}>
                <Col lg={12}>
                    {value == "Join by" ? <Button id='generate_button' disabled={each.type && each?.right_on?.length > 0 && each?.left_on?.length > 0 ? false : true} className={(each.type && each?.right_on?.length > 0 && each?.left_on?.length > 0) ? styles.generate_data_btn : styles.generate_data_btn_dis} onClick={(e) => { generateData(index, "integrate") }}>
                        Preview
                    </Button> : <Button id='generate_button' disabled={each.type && each?.right_on?.length > 0 && each?.left_on?.length > 0 ? false : true} className={(each.type && each?.right_on?.length > 0 && each?.left_on?.length > 0) ? styles.generate_data_btn : styles.generate_data_btn_dis} onClick={(e) => { generateData(index, "integrate") }}>
                        Download
                    </Button>}
                </Col>
            </Row>

        </span >
    )
}

export default Join