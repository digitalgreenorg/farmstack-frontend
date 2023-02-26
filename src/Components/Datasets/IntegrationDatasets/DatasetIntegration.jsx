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
            if (event.target.value) {
                getFilesAssociatedForTheSelectedDatasets(source, list_selected)
            }
        } else {
            let list_selected = [...listOfFilesSelected]
            list_selected[i] = event.target.value
            console.log(list_selected, "file_selected")
            setListOfFilesSelected([...list_selected]);
            // let newListForColumns = listOfFilesAvailableForSelect.filter((eachFile, index) => {
            //     return list_selected.includes(eachFile.name)
            // })
            // setListOfDatsetFileAvailableForColumn([...newListForColumns])
            if (event.target.value) {
                getFilesAssociatedForTheSelectedDatasets(source, list_selected)
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
            setMessage("Error occurred! Dataset could not fetched.")
            setLoader(false)
            if (err?.response.status == 401) {
                history.push(GetErrorHandlingRoute(err));
            }
        })
    }
    const getFilesAssociatedForTheSelectedDatasets = (source, list) => {
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

        HTTPService(method, url, payload, false, true, false).then((res) => {
            setLoader(false)
            if (source == "dataset") {
                setListOfFilesAvailableForSelect([...res.data])
            }
            else if (source == "file") {
                // let allColumnsOfResponse = Object.keys(res?.data)
                // let listForColumnsAvailable = []
                // for (let i = 0; i < allColumnsOfResponse.length; i++) {
                //     listForColumnsAvailable.push(...res.data[allColumnsOfResponse[i]])
                // }
                // setListOfFilesAvailableForSelect([
                //     { name: res.data?.files1[0], columns: [] },
                //     { name: res.data?.files2[0], columns: [] }
                // ])
                console.log(res.data)
                setListOfDatsetFileAvailableForColumn(
                    { ...res.data }
                )
            }
        }).catch((err) => {
            setOpen(true);
            setAlertType("error")
            setMessage(err?.message ? err.message : "Some error occurred while generating!")
            let id = setTimeout(() => {
                setOpen(false);
                return clearTimeout(id)
            }, 2500)
            setLoader(false)

            var returnValues = GetErrorKey(err, ["datasets", "files"])
            var errorKeys = returnValues[0]
            var errorMessages = returnValues[1]
            if (errorKeys.length > 0) {
                for (var i = 0; i < errorKeys.length; i++) {
                    console.log(errorKeys[i])
                    let id;
                    switch (errorKeys[i]) {
                        case "datasets":
                            setOpen(true);
                            setLoader(false)
                            setAlertType("error")
                            setMessage(errorMessages[i] ? errorMessages[i] : "Some error occurred while fetching files for selected dataset!")
                            id = setTimeout(() => {
                                setOpen(false);
                                return clearTimeout(id)
                            }, 2500)
                            break;
                        case "files": setOpen(true);
                            setLoader(false)
                            setAlertType("error")
                            setMessage(errorMessages[i] ? errorMessages[i] : "Some error occurred while fetching files for selected dataset!")
                            id = setTimeout(() => {
                                setOpen(false);
                                return clearTimeout(id)
                            }, 2500)
                            break;
                        default:
                            if (err?.response?.status == 401) {
                                history.push(GetErrorHandlingRoute(err));
                            } else {
                                setOpen(true);
                                setLoader(false)
                                setAlertType("error")
                                // setMessage(err?.res ? err.message : "Some error occurred while generating!")
                                let id = setTimeout(() => {
                                    setOpen(false);
                                    return clearTimeout(id)
                                }, 2500)
                            }

                    }
                }
            }
            else {
                if (err?.response?.status == 401) {
                    history.push(GetErrorHandlingRoute(err));
                } else {
                    setOpen(true);
                    setLoader(false)
                    setAlertType("error")
                    setMessage("Some error occurred while generating!")
                    let id = setTimeout(() => {
                        setOpen(false);
                        return clearTimeout(id)
                    }, 2500)
                }
            }
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
            // setMessage(err?.res ? err.message : "Some error occurred while generating!")
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
            {listOfFilesSelected.length > 0 && <Join circleLoad={circleLoad} finalDataNeedToBeGenerated={finalDataNeedToBeGenerated} generateData={generateData} listOfDatsetFileAvailableForColumn={listOfDatsetFileAvailableForColumn} listOfDatasetSelected={listOfDatasetSelected} listOfFilesSelected={listOfFilesSelected} />}
            <Preview downloadDocument={downloadDocument} finalDatasetAfterIntegration={finalDatasetAfterIntegration} />
        </>
    )
}

export default DatasetIntegration