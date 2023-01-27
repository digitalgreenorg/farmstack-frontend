import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Admin_upload_dataset from './UploadDatasetComponent';
import Admin_add_metadata from './AddMetadata';
import "./admin-add-dataset.css"
import { TextField, Tooltip } from '@material-ui/core';
import { GetErrorHandlingRoute, GetErrorKey, getUserMapId, handleUnwantedSpace, validateInputField } from '../../Utils/Common';
import RegexConstants from '../../Constants/RegexConstants';
import ListForUploadedFiles from './ListForUploadedFiles';
import { handleDeleteFile } from './Utils';
import HTTPService from '../../Services/HTTPService';
import UrlConstant from '../../Constants/UrlConstants';
import StepperForProgressOfCreatingDataset from './StepperForProgressOfCreatingDataset';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InfoIcon from '@mui/icons-material/Info';
import { useHistory } from 'react-router-dom';
import RichTextEditor from 'react-rte';
import AddMetadata from './AddMetadata';
import $ from "jquery";
import Loader from '../Loader/Loader';
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios"
import { Avatar, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, InputAdornment, InputLabel, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, List, IconButton, Snackbar, Alert, Chip, Paper, Divider, Skeleton } from '@mui/material'
import Success from '../Success/Success';

//stepper steps label
const steps = ['Dataset name', 'Create or upload dataset', 'Create a metadata'];

const AddDataset = (props) => {
    const { isDatasetEditModeOn, datasetId, } = props
    const [uploadFile, setFile] = useState([]);
    const [progress, setProgress] = useState([])
    const [value, setValue] = React.useState('1');
    const [nameErrorMessage, setnameErrorMessage] = useState(null);
    const [datasetname, setdatasetname] = useState("");
    const [localUploaded, setLocalUploaded] = useState([])
    const [allFiles, setAllFiles] = useState([])
    const [mysqlFileList, setMysqlFileList] = useState([])
    const [postgresFileList, setPostgresFileList] = useState([])
    const [LiveApiFileList, setLiveApiFileList] = useState([])
    const [isLoading, setIsLoader] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const history = useHistory()
    const [listOfFilesExistInDbForEdit, setListOfFilesExistInDbForEdit] = useState([])
    const [key, setKey] = useState("")

    const [lengthOfSubCat, setLengthOfSubCat] = useState(0)
    const [SubCatList, setSubCatList] = React.useState([]);

    const handleChangeSubCatList = (event) => {
        const {
            target: { value },
        } = event;
        setSubCatList(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [allCatFetched, setAllCatFetched] = useState({})
    const [selectedCat, setSelectedCat] = useState({})
    const [selectedSubCat, setSelectedSubCat] = useState([])
    //states for the alert if any error occurs at any point in the form of snackbar
    const [messageForSnackBar, setMessageForSnackBar] = useState("")
    const [errorOrSuccess, setErrorOrSuccess] = useState("error") //options --> "error", "info", "success", "warning"
    const [finalJson, setMainJson] = useState({})


    //error states for the variable during the complete add dataset flow
    const [errorDatasetName, seteErrorDatasetName] = useState("")

    const [errorDatabaseNameMysql, seteErrorDatabaseNameMysql] = useState("")
    const [errorDatabaseUserNameMysql, seteErrorDatabseUserNameMysql] = useState("")
    const [errorPasswordMysql, seteErrorUserNameMysql] = useState("")
    const [errorHostMysql, seteErrorHostMysql] = useState("")
    const [errorPortMysql, seteErrorPortMysql] = useState("")

    const [errorDatabaseNamePostgres, seteErrorDatabaseNamePostgres] = useState("")
    const [errorDatabaseUserNamePostgres, seteErrorDatabseUserNamePostgres] = useState("")
    const [errorPasswordPostges, seteErrorUserNamePostgres] = useState("")
    const [errorHostPostges, seteErrorHostPostgres] = useState("")
    const [errorPortPostges, seteErrorPortPostgres] = useState("")

    //tab changer from upload dataset to add metadata
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    //dataset name handler
    const handleChangedatasetname = (e) => {
        validateInputField(e.target.value, RegexConstants.connector_name)
            ? setdatasetname(e.target.value)
            : e.preventDefault();
    };
    //datasetname no space handler
    const handledatasetnameKeydown = (e) => {
        handleUnwantedSpace(datasetname, e);
    };

    async function deleteHandlerForFile(datasetname, source, filename) {

        let payload = new FormData()
        payload.append("source", source)
        payload.append("file_name", filename)
        payload.append("dataset_name", datasetname)
        console.log("PAYLOAD CREATED", payload)

        HTTPService(
            "DELETE",
            UrlConstant.base_url + UrlConstant.dataseteth,
            payload,
            true,
            true
        ).then((response) => {
            console.log("RESPONSE", response)
            if (source == "file") {
                let filteredArray = localUploaded.filter((item) => item != filename)
                setLocalUploaded([...filteredArray])
                let updatedArray = uploadFile.filter((item) => item.name !== filename)
                setFile(updatedArray)
                
            } else if (source == "mysql") {
                let filteredArray = mysqlFileList.filter((item) => item != filename)
                setMysqlFileList([...filteredArray])
            } else if (source == "postgres") {
                let filteredArray = postgresFileList.filter((item) => item != filename)
                setPostgresFileList([...filteredArray])
            } else if (source == "liveapi"){
                 let filteredArray = LiveApiFileList.filter((item) => item != filename)
                 setLiveApiFileList([...filteredArray])
            }
            // var filteredArray = uploadFile.filter((item) => item.name !== filename)
            // setFile(filteredArray)
            // setKey(Math.random())

        }).catch((e) => {
            console.log(e);
            // var returnValues = GetErrorKey(e, payload.keys());
            // var errorKeys = returnValues[0];
            // var errorMessages = returnValues[1];
            // if (errorKeys.length > 0) {
            //   for (var i = 0; i < errorKeys.length; i++) {
            //     switch (errorKeys[i]) {
            //       case "dataset_name":
            //         setDatasetNameError(errorMessages[i]);
            //         break;
            //       case "datasets":
            //         setDataSetFileError(errorMessages[i]);
            //         break;
            //       default:
            //         history.push(GetErrorHandlingRoute(e));
            //         break;
            //     }
            //   }
            // } else {
            //   history.push(GetErrorHandlingRoute(e));
            // }
        });
    }

    //stepper code added
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === 1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    //Cancelling and deleteing the files temp stored in server
    const handleResetForm = () => {
        // setdatasetname("")
        var bodyFormData = new FormData();
        bodyFormData.append("dataset_name", datasetname)
        HTTPService(
            "DELETE",
            UrlConstant.base_url + UrlConstant.datasetethcancel,
            bodyFormData,
            true,
            true
        )
            .then((response) => {
                console.log("FILE DELETED!");
                if (response.status === 204) {
                    //   setFile(response.data)
                    setLocalUploaded([])
                    setMysqlFileList([])
                    setPostgresFileList([])
                    setdatasetname("")
                    history.push("/datahub/datasets")
                }
                // setFile(null)
            })
            .catch((e) => {
                // setloader(false);
                console.log(e);
                history.push(GetErrorHandlingRoute(e));
            }
            );
    };

    //rich text editor
    const [govLawDesc, setgovLawDesc] = useState("");

    const toolbarConfig = {
        // Optionally specify the groups to display (displayed in the order listed).
        display: [
            "INLINE_STYLE_BUTTONS",
            "BLOCK_TYPE_BUTTONS",
            //   "LINK_BUTTONS",
            "BLOCK_TYPE_DROPDOWN",
            //   "HISTORY_BUTTONS",
        ],
        INLINE_STYLE_BUTTONS: [
            { label: "Bold", style: "BOLD", className: "custom-css-class" },
            { label: "Italic", style: "ITALIC" },
            { label: "Underline", style: "UNDERLINE" },
        ],
        BLOCK_TYPE_DROPDOWN: [
            { label: "Normal", style: "unstyled" },
            { label: "Heading Large", style: "header-one" },
            { label: "Heading Medium", style: "header-two" },
            { label: "Heading Small", style: "header-three" },
        ],
        BLOCK_TYPE_BUTTONS: [
            { label: "UL", style: "unordered-list-item" },
            { label: "OL", style: "ordered-list-item" },
        ],
    };

    const [editorGovLawValue, setEditorGovLawValue] = React.useState(
        RichTextEditor.createValueFromString(govLawDesc, "html")
    );

    const handlegovLawChange = (value) => {
        setEditorGovLawValue(value);
        setgovLawDesc(value.toString("html"));
        console.log(value.toString("html"));
        console.log(govLawDesc)
    };

    // category and sub cat
    const [category, setCategory] = useState([])

    const handleChangeCategory = (event) => {
        setMainJson({})
        const {
            target: { value },
        } = event;
        setCategory(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        console.log(value)
        handleChangeCategoryForSubCategory(value)
    };


    const [categoryNameList, setCategoryNameList] = useState([])
    const [mainCategoryList, setMainCategoryList] = useState([])

    const [subCategory, setSubCategory] = useState([])

    const handleSubCategory = (event, parent) => {
        const {
            target: { value },
        } = event;
        setSubCategory(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [subCategoryNameList, setSubCategoryNameList] = useState([])



    async function getAllCategoryAndSubCategory(datasetname, source, filename) {


        HTTPService(
            "GET",
            UrlConstant.base_url + UrlConstant.add_category_edit_category,
            "",
            true,
            true
        ).then((response) => {
            // categoryCreator(response.data)

            setAllCatFetched({ ...response.data })
            let arr = Object.keys(response.data)
            setCategoryNameList([...arr])
            setMainCategoryList([...arr])
            console.log(arr, "ARR")
        }).catch((e) => {
            console.log(e);
            // var returnValues = GetErrorKey(e, payload.keys());
            // var errorKeys = returnValues[0];
            // var errorMessages = returnValues[1];
            // if (errorKeys.length > 0) {
            //   for (var i = 0; i < errorKeys.length; i++) {
            //     switch (errorKeys[i]) {
            //       case "dataset_name":
            //         setDatasetNameError(errorMessages[i]);
            //         break;
            //       case "datasets":
            //         setDataSetFileError(errorMessages[i]);
            //         break;
            //       default:
            //         history.push(GetErrorHandlingRoute(e));
            //         break;
            //     }
            //   }
            // } else {
            //   history.push(GetErrorHandlingRoute(e));
            // }
        });
    }

    const categoryCreator = (data) => {
        let arr = []
        for (let i = 0; i < data.length; i++) {
            arr.push(data[i].category)
        }
        setCategoryNameList([...arr])
    }

    function handleChangeCategoryForSubCategory(selectectedCatList) {
        // allCatFetched
        let obj = {}
        for (let i = 0; i < selectectedCatList.length; i++) {
            console.log(selectectedCatList[i])
            obj[selectectedCatList[i]] = []
        }
        console.log(selectectedCatList)

        setSelectedCat(obj)
        setMainJson({ ...obj })
        let subCatList = []

        for (let i = 0; i < selectectedCatList.length; i++) {
            // let obj = {}
            // parent: selectectedCatList[i]
            subCatList = [...subCatList, ...allCatFetched[selectectedCatList[i]]]
        }
        // for (let i = 0; i < mainCategoryList.length; i++) {
        // for (let j = 0; j < selectectedCatList.length; j++) {
        //     console.log(selectectedCatList[j], mainCategoryList[i])
        //     if (selectectedCatList[j] == mainCategoryList[i].category) {
        //         subCatList.push(...mainCategoryList[i].children);
        //         break;
        //     }
        // }
        // }
        // let subCatListForSetting = []

        // for (let i = 0; i < subCatList.length; i++) {
        //     console.log(subCatList.sub_category)
        //     subCatListForSetting.push(subCatList[i].sub_category)
        // }
        console.log(subCatList)
        setSubCategoryNameList([...subCatList])
    }


    //handle geography
    const [geography, setGeography] = React.useState('');

    const handleChangeGeography = (e) => {
        console.log(e.target.value);
        validateInputField(e.target.value, RegexConstants.connector_name)
            ? setGeography(e.target.value)
            : e.preventDefault();
    };

    const [fromdate, setfromdate] = React.useState(null);
    const [todate, settodate] = React.useState(null);
    const [CheckEndDate, setCheckEndDate] = useState(false);

    const handleChangeFromDate = (newValue) => {
        console.log(newValue);
        settodate(null);
        setfromdate(newValue);
        setTimeout(() => {
            $(".addDatasetTodate input.MuiInputBase-input").attr(
                "disabled",
                "disabled"
            );
        }, 100);
        setCheckEndDate(true);
    };

    const handleChangeToDate = (newValue) => {
        console.log(newValue);
        settodate(newValue);
        setCheckEndDate(false);
    };

    const [Switchchecked, setSwitchchecked] = React.useState(false);


    const handleChangeSwitch = (event) => {
        console.log("switch", event.target.checked);
        setSwitchchecked(event.target.checked);
        settodate(null);
        setfromdate(null);
    };

    const [conscent, setConscent] = useState(false)

    function generateCategoryAndSubCat() {
        let cat = category
        let sub_cat = subCategory
        let main_list = mainCategoryList
        console.log(cat, sub_cat, main_list)
        for (let i = 0; i < main_list.length; i++) {
            // console.log(main_list[i].category, cat, cat.includes[main_list[i].category])
            if (cat.includes(main_list[i].category)) {
                for (let j = 0; j < main_list[i].children.length; j++) {
                    if (sub_cat.includes(main_list[i].children[j].sub_category)) {
                        main_list[i].children[j].status = true
                        main_list[i].status = true
                    }

                }
            }
        }
        setMainCategoryList([...main_list])
        return main_list
    }

    const handleAddDatasetSubmit = (e) => {
        console.log(finalJson, "Main")
        let selectedCategory = generateCategoryAndSubCat()

        e.preventDefault();
        console.log("clicked on add dataset submit btn11");
        var id = getUserMapId();
        console.log("user id", id);
        console.log("CHekckmkmc", fromdate, todate);
        // setnameErrorMessage(null);
        // setDescriptionErrorMessage(null);
        // setCategoryErrorMessage(null);
        // setGeographyErrorMessage(null);
        // setCropDetailErrorMessage(null);
        // setAgeErrorMessage(null);
        // setDataCaptureStartErrorMessage(null);
        // setDataCaptureEndErrorMessage(null);
        // setfileValid(null);

        var bodyFormData = new FormData();
        bodyFormData.append("name", datasetname);
        bodyFormData.append("description", govLawDesc);
        bodyFormData.append("category", JSON.stringify(finalJson));
        bodyFormData.append("user_map", id);
        bodyFormData.append("geography", geography);
        // if (cropdetail == null) {
        // bodyFormData.append("crop_detail", "");
        //if edit mode is on then one extra key has to be apended so that they can delete the mentioned file as per the id
        if (isDatasetEditModeOn) {
            bodyFormData.append("deleted", JSON.stringify(idsForFilesDeleted))
        }
        // } else {
        // bodyFormData.append("crop_detail", cropdetail);
        // }
        bodyFormData.append("constantly_update", Switchchecked);
        bodyFormData.append("data_capture_start", fromdate ? fromdate.toISOString() : "");
        bodyFormData.append("data_capture_end", todate ? todate.toISOString() : "");
        // bodyFormData.append("age_of_date", value);
        // if (Switchchecked == true) {
        //     bodyFormData.append("age_of_date", "");
        // } else {
        //     bodyFormData.append("age_of_date", value);
        // }
        // if (fromdate != null && Switchchecked == false) {
        //     bodyFormData.append("data_capture_start", fromdate.toISOString());
        // }
        // if (todate != null && Switchchecked == false) {
        //     bodyFormData.append("data_capture_end", todate.toISOString());
        // }
        // fileUpload(bodyFormData, file, "sample_dataset");
        // bodyFormData.append("connector_availability", "availablevalue");
        // bodyFormData.append("is_public", "isPublic");
        // bodyFormData.append("dataset_size", "recordsvalue");
        // bodyFormData.append("user_map", id);
        // bodyFormData.append("approval_status", "approved");
        setIsLoader(true);
        let obj = { "name": datasetname, description: govLawDesc, category: JSON.stringify(finalJson), user_map: id, geography: geography, deleted: JSON.stringify(idsForFilesDeleted), constantly_update: Switchchecked, data_capture_start: fromdate ? fromdate.toISOString() : "", data_capture_end: todate ? todate.toISOString() : "" }

        let url = ""
        let method = ""
        if (isDatasetEditModeOn) {
            method = "PUT"
            url = UrlConstant.base_url + UrlConstant.datasetview + datasetId + "/"
        } else {
            method = "POST"
            url = UrlConstant.base_url + UrlConstant.datasetview
        }
        // axios.put(url, obj, {
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc0MTk0NzIyLCJpYXQiOjE2NzQxMDgzMjIsImp0aSI6IjhlOTQwY2E5YmQ1YTQ2Yzk4ODM1ZDg3MzJhODA2NTMxIiwidXNlcl9pZCI6IjBmNzZjYjkwLTIzOTQtNDk5Yi05YjYwLWJmNGNhZDM3NTFhNCJ9.btRvdNHElIAyCqmabsOWswS7CjtPnba_-JwqQcx6eIg",
        //     }
        // })
        HTTPService(
            method,
            url,
            bodyFormData,
            false,
            true, false
        )
            .then((response) => {
                setIsLoader(false);
                // setisSuccess(true);
                setIsSubmitted(true)
                console.log("dataset uploaded!");

                //if error occurs Success message will be shown as Snackbar
                setMessageForSnackBar("Dataset uploaded successfully")
                setErrorOrSuccess("success")
                handleClick()
            })
            .catch((e) => {
                setIsLoader(false);
                //if error occurs Alert will be shown as Snackbar
                setMessageForSnackBar("Dataset uploaded failed")
                setErrorOrSuccess("error")
                handleClick()
                console.log(e);
                //console.log(e.response.data.sample_dataset[0]);
                var returnValues = GetErrorKey(e, bodyFormData.keys());
                var errorKeys = returnValues[0];
                var errorMessages = returnValues[1];
                if (errorKeys.length > 0) {
                    for (var i = 0; i < errorKeys.length; i++) {
                        switch (errorKeys[i]) {
                            case "name":
                                // setnameErrorMessage(errorMessages[i]);
                                break;
                            case "description":
                                // setDescriptionErrorMessage(errorMessages[i]);
                                break;
                            case "category":
                                // setCategoryErrorMessage(errorMessages[i]);
                                break;
                            case "geography":
                                // setGeographyErrorMessage(errorMessages[i]);
                                break;
                            case "crop_detail":
                                // setCropDetailErrorMessage(errorMessages[i]);
                                break;
                            case "age_of_date":
                                // setAgeErrorMessage(errorMessages[i]);
                                break;
                            case "data_capture_start":
                                // setDataCaptureStartErrorMessage(errorMessages[i]);
                                break;
                            case "data_capture_end":
                                // setDataCaptureEndErrorMessage(errorMessages[i]);
                                break;
                            case "sample_dataset":
                                // setfileValid(errorMessages[i]);
                                break;
                            default:
                                history.push(GetErrorHandlingRoute(e));
                                break;
                        }
                    }
                } else {
                    history.push(GetErrorHandlingRoute(e));
                }
                //setfileValid(e.response.data.sample_dataset[0]);
                // history.push(GetErrorHandlingRoute(e));
            });
    };


    //toast for error
    const [open, setOpen] = React.useState(false);
    //handling toast
    const handleClick = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    //action for toast
    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const handleSubCategoryListForFinal = (checked, value, parent) => {
        console.log(checked, value, parent)
        // console.log(selectedCat[parent], "Selected")
        let arr = [...selectedCat[parent]]
        if (checked) {
            setLengthOfSubCat((prev) => prev + 1)
            console.log(arr)
            arr.push(value)
        } else {

            const index = arr.indexOf(value);
            if (index > -1) { // only splice array when item is found
                setLengthOfSubCat((prev) => prev - 1)
                arr.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
        setSelectedCat({ ...selectedCat, [parent]: arr })
        setMainJson({ ...selectedCat, [parent]: arr })
        console.log(finalJson, "FINAL JSON")
    }


    //Get datasetDetails to pre populate so that user can delete
    function getAllDataForTheDataset(datasetId) {
        let url = UrlConstant.base_url + UrlConstant.datasetview + datasetId + '/';
        let method = "GET"
        HTTPService(
            method,
            url,
            "",
            false,
            false
        ).then((response) => {
            console.log(response.data)
            let data = response.data
            setdatasetname(data.name)
            setgovLawDesc(data.description ? data.description : "")
            setEditorGovLawValue(
                RichTextEditor.createValueFromString(
                    data.description ?
                        data.description : "",
                    "html"
                )
            );
            console.log(new Date(data.data_capture_start), data.data_capture_start)
            setSwitchchecked(data.constantly_update)
            settodate(new Date(data.data_capture_start))
            setfromdate(new Date(data.data_capture_end))
            setGeography(data.geography)
            let completeCategoryAndSub = data.category
            let arr = Object.keys(completeCategoryAndSub)
            setMainJson({ ...completeCategoryAndSub })
            setCategory([...arr])
            console.log(data.datasets, "DATASETS")
            setListOfFilesExistInDbForEdit([...data.datasets])

            // setconstantlyupdate(response.data.constantly_update)s
            // setCategory({ ...response.data.category })
            // setGeography(response.data.geography)
            // setFromdate(response.data.data_capture_start)
            // setToDate(response.data.data_capture_end)
            // setDatasetDescription(response.data.description)
            // setfileData(response.data.datasets)
            // setOrgDetail(response.data.organization)
            // setorgdes(response.data.organization.org_description)
            // setUserDetails(response.data.user)
        }).catch((e) => {
            // setLoader(false);
            history.push(GetErrorHandlingRoute(e));
        }

        )
    }


    //
    const [idsForFilesDeleted, setIdsForFilesDeleted] = useState([])
    function handleDeleteDatasetFileInFrontend(e, id) {
        console.log(id)
        let newArr = [...listOfFilesExistInDbForEdit]

        // if (id > -1) { // only splice array when item is found
        //     newArr.splice(id, 1); // 2nd parameter means remove one item only
        // }
        newArr = newArr.filter((item) => {
            return item.id != id
        })

        setIdsForFilesDeleted([...idsForFilesDeleted, id])
        setListOfFilesExistInDbForEdit([...newArr])
    }



    useEffect(() => {

        getAllCategoryAndSubCategory()
        if (isDatasetEditModeOn) {
            getAllDataForTheDataset(datasetId)
        }
    }, [])


    return (
        <Container id='admin_add_dataset_main_container'>
            {isLoading ? <Loader /> : ""}
            {isSubmitted ? <Success
                okevent={() => history.push("/datahub/datasets")}
                route={"datahub/participants"}
                imagename={"success"}
                btntext={"ok"}
                heading={"Dataset updated Successfully"}
                imageText={"Success!"}
                msg={"Your dataset are updated."}
            ></Success> : <>
                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    onClose={handleClose}
                    action={action}
                >
                    <Alert autoHideDuration={4000} onClose={handleClose} sx={{ width: '100%' }} severity={errorOrSuccess}>{messageForSnackBar}</Alert>
                </Snackbar>
                <Row className='main_heading_row'>
                    <Col lg={3} sm={6}>
                        <span className='Main_heading_add_dataset'>Add dataset</span>
                    </Col>


                </Row>
                <Row style={{ margin: "20px 0px", padding: "0px" }}>
                    {/* <Col style={{ margin: "0px", padding: "0px" }} lg={3} sm={6}>
                    <TextField
                        value={datasetname}
                        onKeyDown={handledatasetnameKeydown}
                        onChange={handleChangedatasetname}
                        error={nameErrorMessage ? true : false}
                        helperText={nameErrorMessage}
                        label="Dataset name" variant='standard' className='dataset_name_class' id='dataset_name' placeholder='Enter the dataset name' />
                </Col> */}
                </Row>
                <Row>
                    <Col lg={12} sm={12}>

                        <Box>
                            <Stepper activeStep={activeStep}>
                                {steps.map((label, index) => {
                                    const stepProps = {};
                                    const labelProps = {};
                                    if (isStepOptional(index)) {
                                        labelProps.optional = (
                                            <Typography variant="caption">  <div> Atleast one is required </div>  </Typography>
                                        );
                                    }
                                    if (isStepSkipped(index)) {
                                        stepProps.completed = false;
                                    }
                                    return (
                                        <Step key={label} {...stepProps}>
                                            <StepLabel {...labelProps}>{label}</StepLabel>

                                        </Step>
                                    );
                                })}
                            </Stepper> {activeStep === steps.length ? (
                                <React.Fragment>
                                    <Typography sx={{ mt: 2, mb: 1 }}>
                                        All steps completed - you&apos;re finished
                                    </Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        <Button onClick={handleReset}>Reset</Button>
                                    </Box>
                                </React.Fragment>
                            ) : (
                                <React.Fragment>
                                    {/* <Typography sx={{ mt: 2, mb: 1 }}> {activeStep == 0 ? "Please provide the dataset name to enable the further steps" : ""}</Typography> */}
                                    {activeStep == 0 ? <Col style={{ margin: "50px auto 150px auto", padding: "0px" }} lg={12} sm={12}>
                                        <TextField
                                            disabled={isDatasetEditModeOn ? true : false}
                                            style={{ marginBottom: "20px" }}
                                            value={datasetname}
                                            onKeyDown={handledatasetnameKeydown}
                                            onChange={handleChangedatasetname}
                                            error={nameErrorMessage ? true : false}
                                            helperText={nameErrorMessage}
                                            label="Dataset name" variant='filled' className='dataset_name_class' id='dataset_name' placeholder='Enter the dataset name' />

                                        <div className="invite-participant-text-editor policyrte">
                                            <RichTextEditor
                                                placeholder='Dataset description'
                                                toolbarConfig={toolbarConfig}
                                                value={editorGovLawValue}
                                                onChange={handlegovLawChange}
                                                required
                                                id="body-text"
                                                name="bodyText"
                                                type="string"
                                                multiline
                                                variant="filled"
                                                style={{
                                                    minHeight: 410,
                                                    //   width: 420,
                                                    border: "1px solid black",
                                                    //   zIndex: 4,
                                                }}
                                            />
                                        </div>

                                    </Col> : ""}

                                    {activeStep == 1 ?
                                        <TabContext value={value}>
                                            <Box >
                                                <TabList style={{ display: "none" }} aria-label="lab API tabs example">
                                                    <Tab onClick={(e) => handleChange(e, '1')} label="Upload dataset" value="1" />
                                                    <Tab disabled label="Add metadata" value="2" />
                                                </TabList>
                                            </Box>
                                            <TabPanel value="1"><Admin_upload_dataset
                                                uploadFile={uploadFile}
                                                setFile={setFile}
                                                progress={progress}
                                                setProgress={setProgress}
                                                setMessageForSnackBar={setMessageForSnackBar}
                                                setErrorOrSuccess={setErrorOrSuccess}
                                                handleClick={handleClick}
                                                isDatasetEditModeOn={isDatasetEditModeOn} handleDeleteDatasetFileInFrontend={handleDeleteDatasetFileInFrontend} listOfFilesExistInDbForEdit={listOfFilesExistInDbForEdit} cancelForm={handleResetForm} deleteFunc={deleteHandlerForFile}
                                                mysqlFileList={mysqlFileList} setMysqlFileList={setMysqlFileList} postgresFileList={postgresFileList} setPostgresFileList={setPostgresFileList}
                                                setdatasetname={setdatasetname} datasetname={datasetname} setAllFiles={setAllFiles} allFiles={allFiles} localUploaded={localUploaded} setLocalUploaded={setLocalUploaded} handleMetadata={handleChange} 
                                                 key={key} setKey={setKey}
                                                LiveApiFileList={LiveApiFileList} setLiveApiFileList={setLiveApiFileList}
                                                /></TabPanel>
                                            <TabPanel value="2"></TabPanel>
                                        </TabContext>
                                        : ""}

                                    {activeStep == 2 ?
                                        <AddMetadata
                                            listOfFilesExistInDbForEdit={listOfFilesExistInDbForEdit}
                                            handleDeleteDatasetFileInFrontend={handleDeleteDatasetFileInFrontend}
                                            geography={geography}
                                            datasetname={datasetname}
                                            selectedCat={selectedCat}
                                            setSelectedCat={setSelectedCat}
                                            selectedSubCat={selectedSubCat}
                                            setSelectedSubCat={setSelectedSubCat}
                                            allCatFetched={allCatFetched}
                                            SubCatList={SubCatList}
                                            handleSubCategoryListForFinal={handleSubCategoryListForFinal}
                                            finalJson={finalJson}
                                            lengthOfSubCat={lengthOfSubCat}
                                            isSubmitted={isSubmitted}
                                            handleChangeGeography={handleChangeGeography}
                                            handleAddDatasetSubmit={handleAddDatasetSubmit}
                                            conscent={conscent}
                                            setConscent={setConscent}
                                            handleChangeSwitch={handleChangeSwitch}
                                            Switchchecked={Switchchecked}
                                            handleChangedatasetname={handleChangedatasetname}
                                            fromdate={fromdate}
                                            handleChangeFromDate={handleChangeFromDate}
                                            todate={todate}
                                            handleChangeToDate={handleChangeToDate}
                                            handleChangeSubCatList={handleChangeSubCatList}
                                            categoryNameList={categoryNameList}
                                            handleChangeCategory={handleChangeCategory}
                                            category={category}
                                            subCategoryNameList={subCategoryNameList}
                                            handleSubCategory={handleSubCategory}
                                            subCategory={subCategory} />
                                        : ""}
                                    {/* {activeStep == 2 ?
                                    <AddMetadata
                                        isSubmitted={isSubmitted}
                                        handleChangeGeography={handleChangeGeography}
                                        handleAddDatasetSubmit={handleAddDatasetSubmit}
                                        conscent={conscent}
                                        setConscent={setConscent}
                                        handleChangeSwitch={handleChangeSwitch}
                                        Switchchecked={Switchchecked}
                                        handleChangedatasetname={handleChangedatasetname}
                                        fromdate={fromdate}
                                        handleChangeFromDate={handleChangeFromDate}
                                        todate={todate}
                                        handleChangeToDate={handleChangeToDate}
                                        
                                        categoryNameList={categoryNameList} handleChangeCategory={handleChangeCategory} category={category} subCategoryNameList={subCategoryNameList} handleSubCategory={handleSubCategory} subCategory={subCategory} />
                                    : ""} */}
                                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                        <Button
                                            color="inherit"
                                            // disabled={activeStep === 0}
                                            onClick={activeStep == 0 ? () => history.push("/datahub/datasets") : handleBack}
                                            sx={{ mr: 1 }}
                                        >
                                            Back
                                        </Button>
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        {activeStep != 0 && !isSubmitted ? <Button style={{ color: "white", background: "#c09507" }} onClick={handleResetForm}>Cancel</Button> : ""}
                                        <Box sx={{ flex: '1 1 auto' }} />
                                        {/* {(isStepOptional(activeStep) && (localUploaded.length > 0 || mysqlFileList.length > 0 || postgresFileList.length > 0)) && (
                                        <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                            Add metadata
                                        </Button>
                                    )} */}

                                        {activeStep == 2 ? "" : <Button disabled={(activeStep == 0 && datasetname != "" && editorGovLawValue.getEditorState().getCurrentContent().hasText()) ? false : (activeStep == 1 && (localUploaded.length > 0 || mysqlFileList.length > 0 || postgresFileList.length > 0 || listOfFilesExistInDbForEdit.length > 0) ? false : isSubmitted ? false : true)} onClick={activeStep == 2 ? () => history.push("/datahub/datasets") : handleNext}>
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>}
                                    </Box>
                                </React.Fragment>
                            )}
                        </Box>



                    </Col>
                </Row>
                <Row>
                </Row></>}
        </Container>
    )
}

export default AddDataset