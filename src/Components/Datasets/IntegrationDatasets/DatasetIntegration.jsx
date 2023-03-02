import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import DatasetSelect from './DatasetSelect/DatasetSelect'
import Join from './Join/Join'
import Preview from './Preview/Preview'
import styles from "./dataset_integration.module.css"
import { useState } from 'react'
import HTTPService from '../../../Services/HTTPService'
import UrlConstant from '../../../Constants/UrlConstants'
import Loader from '../../Loader/Loader'
import { Alert, Button, Collapse, IconButton, Snackbar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { CheckLg } from 'react-bootstrap-icons'
import { GetErrorHandlingRoute, GetErrorKey } from '../../../Utils/Common'
import { useHistory } from 'react-router-dom'
const converter = require('json-2-csv')
const fs = require('fs')

const DatasetIntegration = () => {
    const [allAvailableDatasetsAndFiles, setAllAvailableDatasetsAndFiles] = useState([])

    const [message, setMessage] = useState("")
    const [alertType, setAlertType] = useState("")

    const [open, setOpen] = React.useState(false);
    //
    const [noOfDatasetSelector, setNoOfDatasetSelector] = useState([])
    const [listOfDatasetSelected, setListOfDatasetSelected] = useState([])
    const [allDatasetNameList, setAllDatasetNameList] = useState([])

    const [noOfFileSelector, setNoOfFileSelector] = useState([])
    const [listOfFilesSelected, setListOfFilesSelected] = useState([])
    const [listOfFilesAvailableForSelect, setListOfFilesAvailableForSelect] = useState([

    ])
    const [listOfDatsetFileAvailableForColumn, setListOfDatsetFileAvailableForColumn] = useState([])
    const [finalDataNeedToBeGenerated, setFinalDataNeedToBeGenerated] = useState({})
    const [finalDatasetAfterIntegration, setFinalDatasetAfterIntegration] = useState([])

    const [finalJoin, setFinalJoin] = useState({})
    const [joinVal1, setJoinVal1] = useState("")
    const [joinVal2, setJoinVal2] = useState("")
    //loader for every network request
    const [loader, setLoader] = useState(false)
    const [circleLoad, setCircleLoad] = useState(false)

    const history = useHistory();

    const handleChangeDatasetNameSelector = (event, i, source) => {
        console.log(event.target.value, i, source)
        if (source == "dataset") {
            let list_selected = [...listOfDatasetSelected]
            list_selected[i] = event.target.value
            console.log(list_selected, "list_selected")
            setListOfDatasetSelected([...list_selected]);
            let list_selected_file = [...listOfFilesSelected]
            list_selected_file[i] = ""
            setListOfFilesSelected([...list_selected_file]);
            console.log(finalDataNeedToBeGenerated, "finalDataNeedToBeGenerated")
            // setFinalDataNeedToBeGenerated({})
            if (event.target.value) {
                getFilesAssociatedForTheSelectedDatasets(source, list_selected)
            }

        } else {
            if (event.target.value) {
                let list_selected = [...listOfFilesSelected]
                list_selected[i] = event.target.value
                let res = getFilesAssociatedForTheSelectedDatasets(source, list_selected)
                res.then((res) => {
                    console.log(res, "RESPOSE")
                    if (!res) {
                        console.log(event, "TARGET")
                        list_selected[i] = ""
                        setListOfFilesSelected([...list_selected]);
                        let data = { ...finalDataNeedToBeGenerated }
                        let obj = { ...finalJoin }
                        data[joinVal1] = []
                        data[joinVal2] = []
                        setJoinVal1("")
                        setJoinVal2("")
                        setFinalDataNeedToBeGenerated({ ...data })
                        obj.first = ""
                        obj.second = ""
                        setFinalJoin({ ...obj })

                    } else {
                        setListOfFilesSelected([...list_selected]);
                    }
                    console.log(list_selected, "list_selectedlist_selectedlist_selectedlist_selectedlist_selected")
                })


            } else {
                event.target.value = ""
                let list_selected = [...listOfFilesSelected]
                list_selected[i] = event.target.value
                setListOfFilesSelected([...list_selected]);
            }
        }
    };
    const handleChangeFileNameSelector = (event, i) => {

    };
    const handleClickSelectDataset = (source) => {
        if (source == "dataset") {
            let selector = noOfDatasetSelector.length;
            let selectedDataset = listOfDatasetSelected.length
            let availableDataset = allDatasetNameList.length
            if (selectedDataset != availableDataset) {
                let max = +selector - +selectedDataset
                console.log(max, selector, selectedDataset)
                if (max <= 0 && !listOfDatasetSelected.includes("")) {
                    setNoOfDatasetSelector([...noOfDatasetSelector, ""])
                }
            }
        } else {
            let selector = noOfFileSelector.length;
            let selectedDataset = listOfFilesSelected.length
            let availableDataset = listOfFilesAvailableForSelect.length
            if (selectedDataset != availableDataset) {
                let max = +selector - +selectedDataset
                console.log(max, selector, selectedDataset)
                if (max <= 0 && !listOfFilesSelected.includes("")) {
                    setNoOfFileSelector([...noOfFileSelector, ""])
                }
            }
        }
    }



    const getListOfDatasetNames = () => {
        setLoader(true)
        let url = UrlConstant.base_url + UrlConstant.get_dataset_name_list
        let method = "GET"
        HTTPService(method, url, "", false, true, false).then((res) => {
            setLoader(false)
            setAllDatasetNameList([...res.data])
        }).catch((err) => {
            // console.log(e.response)
            setAlertType("error")
            setMessage(err?.response?.data?.error ? err?.response?.data?.error : "Error occurred! Dataset could not fetched.")
            setLoader(false)
            if (err?.response.status == 401) {
                history.push(GetErrorHandlingRoute(err));
            }
        })
    }
    const getFilesAssociatedForTheSelectedDatasets = async (source, list) => {
        list = list.filter((item) => item != "")
        setLoader(true)
        let url = ""
        let payload = {}
        if (source == "dataset") {
            url = UrlConstant.base_url + UrlConstant.get_files_for_selected_datasets
            payload = {
                datasets: [...list]
            }
        } else if (source == "file") {
            url = UrlConstant.base_url + UrlConstant.get_columns_for_selected_files
            payload = {
                files: [...list]
            }
        }
        let method = "POST"

        return await HTTPService(method, url, payload, false, true, false).then((res) => {
            setLoader(false)
            if (source == "dataset") {
                setListOfFilesAvailableForSelect([...res.data])
            }
            else if (source == "file") {
                console.log(res.data)
                setListOfDatsetFileAvailableForColumn(
                    { ...res.data }
                )
                let obj = {}
                for (var key in res.data) {
                    obj[key] = []
                }
                setFinalDataNeedToBeGenerated({ ...obj })
            }
            return true
        }).catch((err) => {
            // setOpen(true);
            // setAlertType("error")
            setMessage(err?.response?.data?.error ? err?.response?.data?.error : "Some error occurred while generating!")
            // let id = setTimeout(() => {
            //     setOpen(false);
            //     return clearTimeout(id)
            // }, 2500)
            setLoader(false)

            var returnValues = GetErrorKey(err, ["datasets", "files"])
            var errorKeys = returnValues[0]
            var errorMessages = returnValues[1]
            if (errorKeys.length > 0) {
                for (var i = 0; i < errorKeys.length; i++) {
                    console.log(errorKeys[i], errorMessages[i])
                    let id;
                    switch (errorKeys[i]) {
                        case "datasets":
                            console.log("under datasets")
                            setOpen(true);
                            setLoader(false)
                            setAlertType("error")
                            setMessage(errorMessages[i] ? errorMessages[i] : "Some error occurred while fetching files for selected dataset!")
                            id = setTimeout(() => {
                                setOpen(false);
                                return clearTimeout(id)
                            }, 2500)
                            return false
                        case "files": setOpen(true);
                            console.log("under files")
                            setLoader(false)
                            setAlertType("error")
                            setMessage(errorMessages[i] ? errorMessages[i] : "Some error occurred while fetching files for selected dataset!")
                            id = setTimeout(() => {
                                setOpen(false);
                                return clearTimeout(id)
                            }, 2500)
                            return false
                        default:
                            console.log("under default")

                            if (err?.response?.status == 401) {
                                history.push(GetErrorHandlingRoute(err));
                            } else {
                                setOpen(true);
                                setLoader(false)
                                setAlertType("error")
                                setMessage(err?.response?.data?.error ? err?.response?.data?.error : "Some error occurred while generating!")
                                let id = setTimeout(() => {
                                    setOpen(false);
                                    return clearTimeout(id)
                                }, 2500)
                            }
                            return false

                    }
                }
            }
            else {
                console.log("under else")

                if (err?.response?.status == 401) {
                    history.push(GetErrorHandlingRoute(err));
                } else {
                    setOpen(true);
                    setLoader(false)
                    setAlertType("error")
                    setMessage(err?.response?.data?.error ? err.response.data.error : "Some error occurred while generating!")
                    let id = setTimeout(() => {
                        setOpen(false);
                        return clearTimeout(id)
                    }, 2500)
                }
            }
            return false
        })
    }
    const deleteTable = (tableName, index) => {
        let newArr = listOfDatsetFileAvailableForColumn.filter((each) => each.name != tableName.name)
        setListOfDatsetFileAvailableForColumn([...newArr])

        let list_selected = [...listOfFilesSelected]
        console.log(list_selected, tableName.name, index)
        list_selected.splice(index, 1)
        // list_selected.filter((each) => {
        //     return each != tableName.name
        // })
        console.log(list_selected, tableName.name, index)
        setListOfFilesSelected([...list_selected]);
    }
    const generateData = (left_on, right_on, joinType) => {
        setLoader(true)
        let url = UrlConstant.base_url + UrlConstant.joining_the_table
        console.log(finalDataNeedToBeGenerated, "finalDataNeedToBeGenerated")
        let arr = Object.keys(finalDataNeedToBeGenerated)
        let firstFile = arr[0]
        let secondFile = arr[1]
        let payload = {
            file_path1: firstFile,
            "columns1": [
                ...finalDataNeedToBeGenerated[firstFile]
            ],
            "file_path2": secondFile,
            "columns2": [
                ...finalDataNeedToBeGenerated[secondFile]
            ],
            "how": joinType ? joinType : "left",
            "left_on": [left_on],
            "right_on": [right_on],
        }
        let method = "POST"
        HTTPService(method, url, payload, false, true, false).then((res) => {
            setLoader(false)
            console.log(JSON.parse(res.data))
            setFinalDatasetAfterIntegration([...JSON.parse(res.data)])
            setOpen(true);
            setAlertType("success")
            setMessage("Data generated successfully!")
            let id = setTimeout(() => {
                setOpen(false);
                return clearTimeout(id)
            }, 2500)
        }).catch((err) => {
            setOpen(true);
            setLoader(false)
            setAlertType("error")
            console.log(err.response)
            setMessage(err?.response?.data?.error ? err?.response?.data?.error : "Some error occurred while generating!")
            let id = setTimeout(() => {
                setOpen(false);
                return clearTimeout(id)
            }, 2500)
        })

    }

    const downloadDocument = () => {
        converter.json2csv(finalDatasetAfterIntegration, async (err, csv) => {
            if (err) {
                throw err
            }
            // print CSV string
            console.log(csv)
            download(csv)
        })
    }

    const download = (data) => {
        const blob = new Blob([data], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '')
        a.setAttribute('href', url)
        a.setAttribute('download', "Dataset.csv");
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

    }


    useEffect(() => {
        setNoOfDatasetSelector(["", ""])
        setNoOfFileSelector(["", ""])
        getListOfDatasetNames()

    }, [])


    return (
        <>
            {loader ? <Loader /> : ""}
            <Row>
                <Col lg={9} sm={12} style={{ margin: "auto" }}>
                    {open ? <Collapse in={open} > <Alert
                        severity={alertType}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {message ? message : ""}
                    </Alert> </Collapse> : ""}
                </Col>
            </Row>
            <DatasetSelect finalDataNeedToBeGenerated={finalDataNeedToBeGenerated} setFinalDataNeedToBeGenerated={setFinalDataNeedToBeGenerated} deleteTable={deleteTable} listOfFilesSelected={listOfFilesSelected} handleChangeFileNameSelector={handleChangeFileNameSelector} noOfFileSelector={noOfFileSelector} listOfFilesAvailableForSelect={listOfFilesAvailableForSelect} listOfDatsetFileAvailableForColumn={listOfDatsetFileAvailableForColumn} handleClickSelectDataset={handleClickSelectDataset} noOfDatasetSelector={noOfDatasetSelector} listOfDatasetSelected={listOfDatasetSelected} allDatasetNameList={allDatasetNameList} handleChangeDatasetNameSelector={handleChangeDatasetNameSelector} />
            {listOfFilesSelected.length > 0 && <Join joinVal1={joinVal1} setJoinVal1={setJoinVal1} joinVal2={joinVal2} setJoinVal2={setJoinVal2} finalJoin={finalJoin} setFinalJoin={setFinalJoin} circleLoad={circleLoad} finalDataNeedToBeGenerated={finalDataNeedToBeGenerated} generateData={generateData} listOfDatsetFileAvailableForColumn={listOfDatsetFileAvailableForColumn} listOfDatasetSelected={listOfDatasetSelected} listOfFilesSelected={listOfFilesSelected} />}
            <Preview downloadDocument={downloadDocument} finalDatasetAfterIntegration={finalDatasetAfterIntegration} />
        </>
    )
}

export default DatasetIntegration