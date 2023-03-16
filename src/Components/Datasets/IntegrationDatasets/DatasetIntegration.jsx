import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import DatasetSelect from './DatasetSelect/DatasetSelect'
import Join from './Join/Join'
import Preview from './Preview/Preview'
import styles from "./dataset_integration.module.css"
import HTTPService from '../../../Services/HTTPService'
import UrlConstant from '../../../Constants/UrlConstants'
import Loader from '../../Loader/Loader'
import { Alert, Button, Collapse, Fab, IconButton, Snackbar } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { CheckLg } from 'react-bootstrap-icons'
import { GetErrorHandlingRoute, GetErrorKey, goToTop } from '../../../Utils/Common'
import { useHistory } from 'react-router-dom'
import { Affix } from 'antd'
import { AddIcCallOutlined } from '@material-ui/icons'
import ConnectorsList from '../../IntegrationConnectors/ConnectorsList'
const converter = require('json-2-csv')
const fs = require('fs')

const DatasetIntegration = (props) => {

    const { isEditModeOn, connectorIdForView } = props
    const [counterForIntegrator, setCounterForIntegration] = useState(2)
    const [isDatasetIntegrationListModeOn, setIsDatasetIntegrationListModeOn] = useState(true)
    const [top, setTop] = useState(10);
    const [orgList, setOrgList] = useState([])
    const [message, setMessage] = useState("")
    const [alertType, setAlertType] = useState("")

    const [open, setOpen] = React.useState(false);
    const [connectorId, setConnectorId] = useState("")

    const [template, setTemplate] = useState(
        { org_id: "", dataset_list: [], file_list: [], org_name: "", dataset_id: "", dataset_name: "", file_name: "", availabeColumns: [], columnsSelected: [], left: [], right: [], left_on: [], right_on: [], type: "" },

    )
    const [empty, setEmptyTemplate] = useState(
        { org_id: "", dataset_list: [], file_list: [], org_name: "", dataset_id: "", dataset_name: "", file_name: "", availabeColumns: [], columnsSelected: [], left: [], right: [], left_on: [], right_on: [], type: "" },
    )



    const [joinType, setJoinType] = useState("")

    //This is main array which will have all the data with the format of template or empty
    const [completeData, setCompleteData] = useState([

        //In dev mode this is the dummy data 
        // { org_id: "A", dataset_list: ["d1", "d2", "d3"], file_list: ["f1", "f2", "f3"], org_name: "org_nameA", dataset_id: "id", dataset_name: "dataset_name1", file_name: "file_name1", availabeColumns: ["c1", "c2", "c3"], columnsSelected: [], left: [], right: [], left_on: [], right_on: [], type: "" },
        // { org_id: "B", dataset_list: ["d1", "d2", "d3"], file_list: ["f1", "f2", "f3"], org_name: "org_nameA", dataset_id: "id", dataset_name: "dataset_name1", file_name: "file_name1", availabeColumns: ["c4", "c5", "c6"], columnsSelected: [], left: [], right: [], left_on: [], right_on: [], type: "" },
        // { org_id: "C", dataset_list: ["d1", "d2", "d3"], file_list: ["f1", "f2", "f3"], org_name: "org_nameA", dataset_id: "id", dataset_name: "dataset_name1", file_name: "file_name1", availabeColumns: ["c7", "c8", "c9"], columnsSelected: [], left: [], right: [], left_on: [], right_on: [], type: "" },

    ])

    // const [listOfDatsetFileAvailableForColumn, setListOfDatsetFileAvailableForColumn] = useState([])
    const [finalDataNeedToBeGenerated, setFinalDataNeedToBeGenerated] = useState({})
    const [integratedFilePath, setIntegratedFilePath] = useState("")
    const [finalDatasetAfterIntegration, setFinalDatasetAfterIntegration] = useState([])
    const [finalDatasetAfterSaving, setFinalDatasetAfterSaving] = useState([])

    //loader for every network request
    const [loader, setLoader] = useState(false)

    //connector data
    const [connectorData, setConnectorData] = useState({
        name: "", desc: ""
    })


    const history = useHistory();

    const handleChangeDatasetNameSelector = (event, i, source, name) => {
        if (source == "org") {
            let res = getFilesAssociatedForTheSelectedDatasets(source, [], event.target.value, i, name)
            return
        }
        else if (source == "dataset") {
            if (event.target.value) {
                let res = getFilesAssociatedForTheSelectedDatasets(source, [event.target.value], event.target.value, i)
            }
        } else if (source == "file") {
            if (event.target.value) {

                let res = getFilesAssociatedForTheSelectedDatasets(source, [event.target.value], "", i)
                res.then((res) => {
                })


            } else {
            }
        }
    };
    const handleClickSelectDataset = (source) => {
        if (source == "dataset") {
        } else {
        }
    }



    const getDataList = (source, index) => {
        setLoader(true)
        let url = ""
        let method
        if (source == "org_names") {
            url = UrlConstant.base_url + UrlConstant.get_org_name_list
            method = "GET"
        } else if (source == "dataset_names") {
            url = UrlConstant.base_url + UrlConstant.get_dataset_name_list
            method = "GET"
        }
        HTTPService(method, url, "", false, true, false).then((res) => {
            setLoader(false)
            if (source == "org_names") {
                setOrgList([...res.data])
            } else if (source == "dataset_names") {
                setTemplate({ ...template, dataset_list: [...res.data] })
            }
        }).catch((err) => {
            setAlertType("error")
            setMessage(err?.response?.data?.error ? err?.response?.data?.error : "Error occurred! Dataset could not fetched.")
            setLoader(false)
            if (err?.response.status == 401) {
                history.push(GetErrorHandlingRoute(err));
            }
        })
    }
    const getFilesAssociatedForTheSelectedDatasets = async (source, list, org, i) => {
        list = list.filter((item) => item != "")
        setLoader(true)
        let url = ""
        let payload = {}
        let method = "POST"
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
        } else if (source == "org") {
            method = "GET"
            url = UrlConstant.base_url + UrlConstant.get_dataset_name_list + "?org_id=" + org
            payload = {

            }
        }
        return await HTTPService(method, url, payload, false, true, false).then((res) => {
            setLoader(false)

            if (source == "dataset") {

                setTemplate({ ...template, dataset_name: res.data[0]?.dataset_name ? res.data[0].dataset_name : "N/A", dataset_id: org ? org : "", file_list: [...res.data] })

            }
            else if (source == "file") {
                let name = list[0]
                let resArr = []
                let fileId = res.data?.id ? res.data.id : ""
                for (var key in res.data) {
                    resArr.push(res.data[key])
                }
                setTemplate({ ...template, file_id: fileId, file_name: name, availabeColumns: [...res.data[name]] })
            } else if (source == "org") {
                setTemplate({ ...template, dataset_list: [...res.data], org_id: org, org_name: res?.data?.length > 0 ? res.data[0]?.org_name : "" })
            }
            return true
        }).catch((err) => {
            goToTop(0)
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
                            return false
                        case "files": setOpen(true);
                            setLoader(false)
                            setAlertType("error")
                            setMessage(errorMessages[i] ? errorMessages[i] : "Some error occurred while fetching files for selected dataset!")
                            id = setTimeout(() => {
                                setOpen(false);
                                return clearTimeout(id)
                            }, 2500)
                            return false
                        default:
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
    const resetAll = (main, connector, join, goback, func1, func2) => {

        goToTop()
    }
    // const deleteTable = (tableName, index) => {
    // let newArr = listOfDatsetFileAvailableForColumn.filter((each) => each.name != tableName.name)
    // setListOfDatsetFileAvailableForColumn([...newArr])

    // let list_selected = [...listOfFilesSelected]
    // //console.log(list_selected, tableName.name, index)
    // list_selected.splice(index, 1)
    // list_selected.filter((each) => {
    //     return each != tableName.name
    // })
    // //console.log(list_selected, tableName.name, index)
    // setListOfFilesSelected([...list_selected]);
    // }

    //this function is being used to generate the data at first place, Save the generated data and delete the saved connectors
    const generateData = (index, condition,) => {
        let connector_id = connectorId
        if (condition == "view_details") {
            connector_id = connectorIdForView
        }
        //condition can be ===> [integrate, delete, save] any one of the listed elements
        setLoader(true)
        let url = ""

        let payload = []



        for (let i = 0; i < completeData.length - 1; i++) {
            //Generating the payload as array of objects each object having data friom completeData and completeJoinData
            let obj = {
                left_dataset_file: completeData[i]?.file_id,
                right_dataset_file: completeData[i + 1]?.file_id,
                left_dataset_file_path: completeData[i]?.file_name,
                right_dataset_file_path: completeData[i + 1]?.file_name,
                condition: {
                    right_selected: [...completeData[i + 1]?.columnsSelected], left_selected: [...completeData[i]?.columnsSelected],
                    how: completeData[i]?.type ? completeData[i]?.type : "left",
                    left_on: completeData[i]?.left_on,
                    right_on: completeData[i]?.right_on
                }
            }
            payload.push(obj)
        }
        let finalPayload
        let method
        if (condition == "save") {
            finalPayload = { name: connectorData.name, description: connectorData.desc, maps: payload, integrated_file: integratedFilePath }
            url = UrlConstant.base_url + UrlConstant.integration_connectors // for saving
            method = "POST"
        } else if (condition == "integrate") {
            finalPayload = { name: connectorData.name, description: connectorData.desc, maps: payload }
            url = UrlConstant.base_url + UrlConstant.joining_the_table //for generating
            method = "POST"
        } else if (condition == "delete" && connector_id) {
            finalPayload = {}
            url = UrlConstant.base_url + UrlConstant.integration_connectors + connector_id + "/"
            method = "DELETE"
        } else if (condition == "view_details") {
            url = UrlConstant.base_url + UrlConstant.integration_connectors + connector_id + "/"
            method = "GET"
        }
        else {
            setLoader(false)
            return
        }
        // console.table(finalPayload, "PAYLOAD")
        HTTPService(method, url, finalPayload, false, true, false).then((res) => {

            setLoader(false)
            if (condition == "integrate") {
                console.log("inside integrate", res.data)
                setIntegratedFilePath(res?.data?.integrated_file ? res?.data?.integrated_file : "")
                setFinalDatasetAfterIntegration([...JSON.parse(res.data?.data)])
                let allKeys = JSON.parse(res.data.data)?.length > 0 ? Object.keys(JSON.parse(res.data.data)[0]) : []
                if (allKeys.length > 1) {
                    let arr = [...completeData]
                    let obj = arr[index + 1]
                    obj["left"] = [...allKeys]
                    arr[index + 1] = { ...obj }
                    setCompleteData([...arr])
                    setOpen(true);
                    setAlertType("success")
                    setMessage("Data generated successfully!")
                    let id = setTimeout(() => {
                        setOpen(false);
                        return clearTimeout(id)
                    }, 2500)
                    document.querySelector('#previewTable').scrollIntoView({ behavior: 'smooth' });
                }

            } else if (condition == "save") {
                console.log("inside save", res.data)
                setConnectorId(res?.data?.id ? res.data.id : "")
                setOpen(true);
                setAlertType("success")
                setMessage("Data saved successfully!")
                setIsDatasetIntegrationListModeOn(true)
                let id = setTimeout(() => {
                    setOpen(false);
                    return clearTimeout(id)
                }, 2500)
                document.querySelector('#previewTable').scrollIntoView({ behavior: 'smooth' });

            } else if (condition == "delete") {
                console.log("inside delete", res)
                setOpen(true);
                setAlertType("success")
                setMessage("Data deleted successfully!")
                let id = setTimeout(() => {
                    setOpen(false);
                    return clearTimeout(id)
                }, 2500)
            }

            // goToTop(2000)
        }).catch((err) => {
            setOpen(true);
            setLoader(false)
            setAlertType("error")
            setMessage(err?.response?.data?.error ? err?.response?.data?.error : "Some error occurred while generating!")
            let id = setTimeout(() => {
                setOpen(false);
                return clearTimeout(id)
            }, 2500)
            goToTop(0)
        })

    }




    //Download functionality
    const downloadDocument = () => {
        converter.json2csv(finalDatasetAfterIntegration, async (err, csv) => {
            if (err) {
                throw err
            }
            // print CSV string
            download(csv)
        })
    }

    //number of integration handler
    const integrateMore = (value) => {
        if (counterForIntegrator == completeData.length) {
            setCounterForIntegration((pre) => pre + value)
        }
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
    const deleteConnector = () => {
        setCompleteData([])
        generateData(1, "delete")
        setFinalDataNeedToBeGenerated([])
        setIsDatasetIntegrationListModeOn(true)
    }


    useEffect(() => {
        getDataList("org_names")
        // isEditModeOn ?
    }, [])


    return (
        <>
            {loader ? <Loader /> : ""}
            <Container style={{ marginTop: "0px" }}>
                <Row style={{ margin: "0px auto" }}>
                    <Col lg={12} sm={12}>
                        {open ? <Collapse in={open}  >
                            <Affix offsetTop={top}>
                                <Alert
                                    severity={alertType ? alertType : ""}
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
                                // sx={{ mb: 1 }}
                                >
                                    {message ? message : ""}
                                </Alert>
                            </Affix>
                        </Collapse>
                            : ""}
                    </Col>
                </Row>
            </Container>
            {!isDatasetIntegrationListModeOn && <DatasetSelect integrateMore={integrateMore} empty={empty} setTemplate={setTemplate} template={template} counterForIntegrator={counterForIntegrator} resetAll={resetAll} generateData={generateData} orgList={orgList} joinType={joinType} setJoinType={setJoinType} connectorData={connectorData} setConnectorData={setConnectorData} setCompleteData={setCompleteData} completeData={completeData} finalDataNeedToBeGenerated={finalDataNeedToBeGenerated} setFinalDataNeedToBeGenerated={setFinalDataNeedToBeGenerated} handleClickSelectDataset={handleClickSelectDataset} handleChangeDatasetNameSelector={handleChangeDatasetNameSelector} />}
            {!isDatasetIntegrationListModeOn && completeData.length > 0 && <  Preview generateData={generateData} setIsDatasetIntegrationListModeOn={setIsDatasetIntegrationListModeOn} deleteConnector={deleteConnector} counterForIntegrator={counterForIntegrator} completeData={completeData} isEditModeOn={isEditModeOn} integrateMore={integrateMore} resetAll={resetAll} connectorData={connectorData} downloadDocument={downloadDocument} finalDatasetAfterIntegration={finalDatasetAfterIntegration} />}
            {isDatasetIntegrationListModeOn && <span><ConnectorsList setIsDatasetIntegrationListModeOn={setIsDatasetIntegrationListModeOn} /></span>}
        </>
    )
}

export default DatasetIntegration

