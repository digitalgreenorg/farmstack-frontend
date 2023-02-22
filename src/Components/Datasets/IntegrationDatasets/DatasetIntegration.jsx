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
import { Alert, Button, Collapse, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
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


    const handleChangeDatasetNameSelector = (event, i, source) => {
        console.log(event.target.value, i, source)
        if (source == "dataset") {
            let list_selected = [...listOfDatasetSelected]
            list_selected[i] = event.target.value
            console.log(list_selected, "list_selected")
            setListOfDatasetSelected([...list_selected]);
            getFilesAssociatedForTheSelectedDatasets(source, list_selected)
        } else {
            let list_selected = [...listOfFilesSelected]
            list_selected[i] = event.target.value
            console.log(list_selected, "file_selected")
            setListOfFilesSelected([...list_selected]);
            let newListForColumns = listOfFilesAvailableForSelect.filter((eachFile, index) => {
                return list_selected.includes(eachFile.name)
            })
            // setListOfDatsetFileAvailableForColumn([...newListForColumns])
            getFilesAssociatedForTheSelectedDatasets(source, list_selected)
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
        }).catch((e) => {
            setAlertType("error")
            setMessage("Error occurred! Dataset could not fetched.")
            setLoader(false)
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
        }).catch((e) => {
            setOpen(true);
            setAlertType("error")
            setMessage(e?.message ? e.message : "Some error occurred while generating!")
            let id = setTimeout(() => {
                setOpen(false);
                return clearTimeout(id)
            }, 2500)
            // if (source == "dataset") {
            //     setListOfFilesAvailableForSelect([
            //         { file_name: "name_of_the file1", file: "path_of_the_file1" },
            //         { file_name: "name_of_the file2", file: "path_of_the_file2" },
            //         { file_name: "name_of_the file3", file: "path_of_the_file3" },
            //         { file_name: "name_of_the file4", file: "path_of_the_file4" },
            //         { file_name: "name_of_the file5", file: "path_of_the_file5" },
            //         { file_name: "name_of_the file6", file: "path_of_the_file6" },
            //         { file_name: "name_of_the file7", file: "path_of_the_file7" },
            //         { file_name: "name_of_the file8", file: "path_of_the_file8" },
            //     ])
            // } else if (source == "file") {
            //     setListOfDatsetFileAvailableForColumn(
            //         {
            //             path_of_the_file1: ["id", "mobile_number"],
            //             path_of_the_file6: ["id", "phone_number"]
            //         }
            //     )
            // }
            setLoader(false)
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
    const generateData = (left_on, right_on) => {
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
            "how": "left",
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
            setMessage(err?.message ? err.message : "Some error occurred while generating!")
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
            <Join circleLoad={circleLoad} finalDataNeedToBeGenerated={finalDataNeedToBeGenerated} generateData={generateData} listOfDatsetFileAvailableForColumn={listOfDatsetFileAvailableForColumn} listOfDatasetSelected={listOfDatasetSelected} />
            <Preview downloadDocument={downloadDocument} finalDatasetAfterIntegration={finalDatasetAfterIntegration} />
        </>
    )
}

export default DatasetIntegration