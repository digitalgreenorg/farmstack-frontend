import React, { useState, useEffect } from "react";
import AddCard from "../../../Components/AddCard/AddCard";
import Success from "../../../Components/Success/Success";
import Delete from "../../../Components/Delete/Delete";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import labels from "../../../Constants/labels";
import THEME_COLORS from "../../../Constants/ColorConstants";
import { useHistory } from "react-router-dom";
import HTTPService from "../../../Services/HTTPService";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import { TabContext } from "@mui/lab";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Button from "@mui/material/Button";
import Loader from "../../../Components/Loader/Loader";
import { GetErrorHandlingRoute } from "../../../Utils/Common";
import { useParams } from "react-router-dom";
import DepartmentSettingsCard from "./DepartmentSettingsCard";
import UrlConstant from "../../../Constants/UrlConstants";
import Footer from "../../../Components/Footer/Footer";


const useStyles = {
    btncolor: {
        color: "white",
        "text-transform": "capitalize",
        "border-color": THEME_COLORS.THEME_COLOR,
        "background-color": THEME_COLORS.THEME_COLOR,
        float: "right",
        "border-radius": 0,
    },
    btn: {
        width: "420px",
        height: "42px",
        "margin-top": "30px",
        background: "#ffffff",
        opacity: "0.5",
        border: "2px solid #c09507",
        color: "black",
    },
    marginrowtop: { "margin-top": "20px" },
    marginrowtop50px: { "margin-top": "20px" },
    marginrowtoptab50px: { "margin-top": "50px" },
    marginrowtop10px: { "margin-top": "20px" },
    marginrowtopscreen10px: { "margin-top": "10px" },
    departmentword: { "font-weight": "700", "font-size": "20px", "margin-left": "15px", "margin-top": "30px", "margin-bottom": "20px", "font-style": "normal", "font-family": "Open Sans" },
    background: { "margin-left": "70px", "margin-right": "70px", background: "#FCFCFC"},
};
function Participantsettings(props) {

    const [screenlabels, setscreenlabels] = useState(labels["en"]);
    const [getdepartmentList, setgetdepartmentList] = useState([]);
    const [istabView, setistabView] = useState(true);
    const [value, setValue] = React.useState("1");
    const [isShowLoadMoreButton, setisShowLoadMoreButton] = useState(false);
    const [isDepartmentUpdateSuccess, setisDepartnentUpdateSucess] = useState(false)
    const [isLoader, setIsLoader] = useState(false)
    const { id } = useParams();
    const [departmenturl, setdepartmenturl] = useState("")

    const history = useHistory();
    useEffect(() => {
        if (id) {
            setValue(id);
        } else {
            setValue(1);
        }
        setIsLoader(true);
        HTTPService(
            'GET',
            UrlConstant.base_url + "/participant/department/department_list/",
            "",
            false,
            true).then((response) => {
                setIsLoader(false);
                console.log("otp valid", response.data);
                //     let dataFromBackend = [...response.data] 
                // setgetdepartmentList(dataFromBackend)
                if (response.data.next == null) {
                    setisShowLoadMoreButton(false);
                } else {
                    setisShowLoadMoreButton(true);
                    console.log(response.data.next)
                    setdepartmenturl(response.data.next);
                }
                // setgetdepartmentList(response.data.results)
                let tempList = [...response.data.results];
                setgetdepartmentList(tempList);
                //1 let deptList = getdepartmentList;
                // 2let dataFromBackend = [...deptList, ...response.data.results];
                // 3setgetdepartmentList(dataFromBackend);
                // setgetdepartmentList(...eachDepartmentData)
                // let deptList = getdepartmentList();
                // let finalDeptList = [...deptList, ...response.data.results];
                // setgetdepartmentList(finalDeptList);
            }).catch((e) => {
                setIsLoader(false)
                history.push(GetErrorHandlingRoute(e))
            });
        // getDatafrombackendfordepartcard ()
       
    }, [])

    const getdepartmentcardList = () => {
        setIsLoader(true);
        HTTPService(
            'GET',
            departmenturl,
            "",
            false,
            true).then((response) => {
                setIsLoader(false);
                console.log("otp valid", response.data);
                //     let dataFromBackend = [...response.data]

                // setgetdepartmentList(dataFromBackend)
                if (response.data.next == null) {
                    setisShowLoadMoreButton(false);
                } else {
                    setisShowLoadMoreButton(true);
                    setdepartmenturl(response.data.next)
                }
                let deptList = getdepartmentList;
                let dataFromBackend = [...deptList, ...response.data.results];
                console.log(deptList)
                setgetdepartmentList(dataFromBackend);
                // setgetdepartmentList(...eachDepartmentData)
                // let deptList = getdepartmentList();
                // let finalDeptList = [...deptList, ...response.data.results];
                // setgetdepartmentList(finalDeptList);
            }).catch((e) => {
                setIsLoader(false)
                history.push(GetErrorHandlingRoute(e));
            });
        // let arr = [{1:1}, {2:1}];

        // let arr1 = [...arr];
        // console.log(arr,arr1)
        // let dataFromBackend = [...response.data]

        // setgetdepartmentList(dataFromBackend)

    }
    // useEffect(() => {
    //     getdepartmentcardList();
    //     // getDatafrombackendfordepartcard ()
    // if (id) {
    //     setValue(id);
    //   } else {
    //     setValue(1);
    //   }
    // }, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div style={useStyles.background}>
            {isLoader ? <Loader /> : ''}
            {istabView ? (
                <Row style={useStyles.marginrowtoptab50px}>
                    <Col xs={12} sm={12} md={12} lg={12} className="settingsTabs">
                        <Box>
                            <TabContext value={value} className="tabstyle">
                                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                                    <TabList
                                        onChange={handleChange}
                                        aria-label="lab API tabs example">
                                        <Tab label="Account" value="1" />
                                        <Tab label="Organization" value="2" />
                                        <Tab label="Team" value="3" />
                                        <Tab label="Department" value="4" />
                                        <Tab label="Project" value="5" />
                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                </TabPanel>
                                <TabPanel value="2">
                                </TabPanel>
                                <TabPanel value="3">
                                </TabPanel>
                                <TabPanel value="4">
                                    <Row>
                                        <span style={useStyles.departmentword}>My Departments</span>
                                    </Row>
                                    <Row>
                                        <Col
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            lg={4}
                                            style={useStyles.marginrowtop10px}>
                                            <AddCard
                                                firstText={screenlabels.department.firstText}
                                                secondText={screenlabels.department.secondText}
                                                addevent={() =>
                                                    history.push("/participant/settings/adddepartment")
                                                }>

                                            </AddCard>
                                        </Col>
                                        {getdepartmentList.map((each, index) => (
                                            // console.log(each, index)
                                            <Col xs={12} sm={6} md={4} lg={4} style={useStyles.marginrowtop10px}>
                                                <DepartmentSettingsCard
                                                    id={each.id}
                                                    // each={each}
                                                    department_name={each.department_name}
                                                    departmentdescription={each.department_discription}
                                                    index={index}
                                                ></DepartmentSettingsCard>
                                            </Col>
                                        ))}
                                    </Row>
                                    <Row style={useStyles.marginrowtop}>
                                        <Col xs={12} sm={12} md={6} lg={3}></Col>
                                        {isShowLoadMoreButton ? (
                                            <Col xs={12} sm={12} md={6} lg={6}>
                                                <Button
                                                    onClick={() => getdepartmentcardList()}
                                                    variant="outlined"
                                                    className="cancelbtn">
                                                    Load More
                          </Button>
                                            </Col>
                                        ) :
                                            <></>
                                        }
                                    </Row>
                                </TabPanel>
                                <TabPanel value="5">
                                </TabPanel>
                            </TabContext>
                        </Box>
                    </Col>
                </Row>

            ) : (
                    <></>
                )}
            {/* <Footer /> */}
        </div>
    );
}
export default Participantsettings;
