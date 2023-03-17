import React, { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "./DataStandardizationInAddDataset.css";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel, FormGroup } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import UrlConstant from "../../Constants/UrlConstants";
import HTTPService from "../../Services/HTTPService";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { GetErrorHandlingRoute } from "../../Utils/Common";
import { message, Space } from "antd";

const DataStandardizationInAddDataset = (props) => {

  const {datasetname} = props;

  const [keysInUploadedDataset, setKeysInUploadedDataset] = useState([]);
  const [standardColumnNames, setStandardColumnNames] = useState([]);
  const [allFileNames, setAllFileNames] = useState([])
  const [fileName, setFileName] = useState("")
  const [allStandardisedTempleteCategory, setAllStandardisedTempleteCategory] = useState([])
  const [standardisedTempleteCategory, setStandardisedTempleteCategory] = useState([])
  const [standardisedTempleteAttribute, setStandardisedTempleteAttribute] = useState([])
  const [standardisedColum, setStandardisedColumn] = useState([])

  const [checkBox, setCheckBox] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false);
  const [errorMessages, setErrorMessage] = useState("");
  
  const history = useHistory();
  const [messageApi, contextHolder] = message.useMessage();

  const success = (text, type) => {
    messageApi.open({
      type: type,
      content: text,
      duration: 5,
    });
  };
  
  


  const handleChange = (e) => {
    console.log("handle change clicked");
    // setAge(e.target.value);
  };

  const datapointCategoryChange = (value,index)=>{
    let tmpArr = [...standardisedTempleteCategory]
      tmpArr[index] = value
      setStandardisedTempleteCategory(tmpArr)
      console.log("standardisedTempleteCategory", standardisedTempleteCategory,tmpArr)

      let tmpColumn = [...standardisedTempleteAttribute]
      tmpArr.forEach((attribute,index)=>{
        console.log("attribute in for each",attribute)
        if(attribute.datapoint_attributes) tmpColumn[index] = Object.keys(attribute.datapoint_attributes) 
      })
      setStandardisedTempleteAttribute(tmpColumn)
      console.log("standardisedTempleteColumn",tmpColumn)

  }

  

  const getAllFileNames = () =>{

    let url = UrlConstant.base_url + UrlConstant.standardization_get_all_file_name + datasetname
    setIsLoading(true);
    HTTPService("GET", url, false, false, true,)
      .then((response) => {
        setIsLoading(false);
        console.log("response", response);
        setAllFileNames(response.data)
      })
      .catch((e) => {
        setIsLoading(false);
        //   success('Standardization template created successfully')
        console.log(e);
        if (
          e.response != null &&
          e.response != undefined &&
          e.response.status === 401
        ) {
          setError(true);
          history.push(GetErrorHandlingRoute(e));
        } else {
          setError(false);
          success(
            e.response.data && e.response.data.message
              ? e.response.data.message
              : "Something went wrong while getting file names.",
            "error"
          );
        }
      });
  }

  const getStandardiziedTemplate = () => {
    let url = UrlConstant.base_url + UrlConstant.standardization_get_data;

    setIsLoading(true);
    HTTPService("GET", url, false, false, true)
      .then((response) => {
        setIsLoading(false);
        console.log("response", response);
        if (response.status == 200) {
          setAllStandardisedTempleteCategory(response?.data);
          let tmpArr = new Array(response?.data.length)
          tmpArr.fill({})
          setStandardisedTempleteCategory(tmpArr)

          let tmpStandardisedColum = [...standardisedColum];
          tmpStandardisedColum.fill("");
          setStandardisedColumn(tmpStandardisedColum)

          // let tmp = { ...allAttributes };
          // let tmpDes = { ...allAttributesDes };
          // response.data.forEach((item, index) => {
          //   tmp[index] = Object.keys(item.datapoint_attributes);
          //   tmp[index].push(tmp[index]?.[0]);
          //   tmp[index][0] = "";

          //   tmpDes[index] = Object.values(item.datapoint_attributes);
          //   tmpDes[index].push(tmpDes[index]?.[0]);
          //   tmpDes[index][0] = "";
          // });
          // setAllAttributes(tmp);
          // setAllAttributesDes(tmpDes);
          // console.log("tmp in get call attributes", tmp,tmpDes, allAttributes);
        }
      })
      .catch((e) => {
        setIsLoading(false);
        //   success('Standardization template created successfully')
        console.log(e);
        if (
          e.response != null &&
          e.response != undefined &&
          e.response.status === 401
        ) {
          setError(true);
          // success(
          //   e.response.data && e.response.data.message
          //     ? e.response.data.message
          //     : "User not registered", "error"
          // );
          history.push(GetErrorHandlingRoute(e));
        } else {
          setError(false);
          success(
            e.response.data && e.response.data.message
              ? e.response.data.message
              : "Something went wrong.",
            "error"
          );
        }
      });
  };

  const getFileColumnNames = () =>{

    let url = UrlConstant.base_url + UrlConstant.standardization_get_file_columns
    let payload = {
      file_path: fileName
    }
    console.log('filename', fileName)
    setIsLoading(true);
    HTTPService("POST", url, payload, false, true)
      .then((response) => {
        setIsLoading(false);
        console.log("response", response);
        setKeysInUploadedDataset(response.data)
      })
      .catch((e) => {
        setIsLoading(false);
        //   success('Standardization template created successfully')
        console.log(e);
        if (
          e.response != null &&
          e.response != undefined &&
          e.response.status === 401
        ) {
          setError(true);
          history.push(GetErrorHandlingRoute(e));
        } else {
          setError(false);
          success(
            e.response.data && e.response.data.message
              ? e.response.data.message
              : "Something went wrong while getting file column names.",
            "error"
          );
        }
      });
  }


  useEffect(()=>{
    getAllFileNames()
    getStandardiziedTemplate()
  },[])

  useEffect(()=>{
    getFileColumnNames()
  },[fileName])
  console.log('allFileNames',allFileNames)
  console.log('all', allStandardisedTempleteCategory, standardisedTempleteAttribute, allFileNames)
  return (
    <div className="data-standardization-in-add-dataset-container">
      {contextHolder}
      <Row>
      <Col xs={12} sm={12} md={12} lg={12}>
              
              <FormControl sx={{ m: 1, minWidth: 1100, maxWidth: 1100 }} size="small">
                <InputLabel id="select-file-name-label-small">
                  Select file name
                </InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="select-file-name-small"
                  // value={age}
                  value={fileName}
                  onChange={(e)=> {
                    setFileName(e.target.value)

                    console.log('file on chnage',fileName, e.target)
                  }}
                >
                  {allFileNames?.map((item, index) => {
                    console.log('file name in loop', item)
                    return (
                      
                        <MenuItem  key={index} value={item}>{item}</MenuItem>
                      
                    );
                  })}
                </Select>
              </FormControl>
            </Col>
      </Row>
      <Row className="data_standardization_title">
      {/* <div > */}
      <Col className="uploaded-data-column-names" xs={4} sm={4} md={4} lg={4}>
        <span>Uploaded Data Column Name</span>
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <span>Standard Data Calegory</span>
      </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
        <span>Standard Data Attribute</span>
      </Col>
      <Col xs={1} sm={1} md={1} lg={1}>
        <span>Mask</span>
      </Col>
      
      {/* </div> */}

      </Row>
      <div className="data_standardization_column">

      
      
      {keysInUploadedDataset?.map((keyNames, index) => {
        return (
          <>
            <Row className="data_standardization_cloumn_container">
      <Col xs={4} sm={4} md={4} lg={4} className="uploaded_data_column_name_title_container">
                
                <span className="uploaded_data_column_name_title">
                  {keyNames}
                </span>
              </Col>
      <Col xs={3} sm={3} md={3} lg={3}>
              
                <FormControl sx={{ m: 1, minWidth: 200, maxWidth: 250 }} size="small">
                  <InputLabel id="demo-select-small">
                    Select datapoint category
                  </InputLabel>
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={standardisedTempleteCategory?.[index]}
                    onChange={(e)=> datapointCategoryChange(e.target.value, index) }
                  >
                    {allStandardisedTempleteCategory?.map((item, index) => {
                      return (
                          <MenuItem key={item} value={item}>{item.datapoint_category}</MenuItem>
                        
                      );
                    })}
                  </Select>
                </FormControl>
              </Col>

              <Col xs={3} sm={3} md={3} lg={3}>
              
              <FormControl sx={{ m: 1,  minWidth: 200, maxWidth: 250 }} size="small">
                <InputLabel id="demo-select-small">
                  Select column/key
                </InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={standardisedColum[index]}
                  onChange={(e)=> {
                    let tmpArr = [...standardisedColum]
                    tmpArr[index] = e.target.value
                    setStandardisedColumn(tmpArr)
                  }
                }
                >
                  {standardisedTempleteAttribute[index]?.map((item, index) => {
                    return (
                        <MenuItem key={item} value={item}>{item}</MenuItem>
                      
                    );
                  })}
                </Select>
              </FormControl>
            </Col>

      <Col xs={1} sm={1} md={1} lg={1}>

              <FormGroup>
                <Checkbox onChange={() => setCheckBox(true)}/>
                  {/* <FormControlLabel
                    control={<Checkbox onChange={() => setCheckBox(true)} />}

                  /> */}
                </FormGroup>
                </Col>
            </Row>
            <hr />
          </>
        );
      })}
      </div>
    </div>
  );
};

export default DataStandardizationInAddDataset;
