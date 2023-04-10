import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "../dataset_integration.module.css";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { Box, Button, CircularProgress } from "@mui/material";
import { Cpu } from "react-bootstrap-icons";
import leftG from "../../../../Assets/Img/Join type/Color/left_selected.svg";
import leftB from "../../../../Assets/Img/Join type/Normal state/left_unselected.svg";
import rightB from "../../../../Assets/Img/Join type/Normal state/right_unselected.svg";
import rightG from "../../../../Assets/Img/Join type/Color/right_selected.svg";
import fullB from "../../../../Assets/Img/Join type/Normal state/outer_unselected.svg";
import fullG from "../../../../Assets/Img/Join type/Color/outer_selected.svg";
import innerB from "../../../../Assets/Img/Join type/Normal state/inner_unselected.svg";
import innerG from "../../../../Assets/Img/Join type/Color/inner_selected.svg";

import smallG from "../../../../Assets/Img/Join type/check_circle.svg";

import CloseIcon from "@mui/icons-material/Close";
import { Segmented } from "antd";
import EachCardResult from "../EachCardsResult/EachCardResult";
import EachCardResultN from "../EachCardsResult/EachCardResultN";
import { downloadDocument } from "./utils";
import ContainedButton from "../../../Button/ContainedButton";
import OutlinedButton from "../../../Button/OutlinedButton";

const selectStyle = {
  textAlign: "left",
  ".MuiOutlinedInput-notchedOutline": {
    borderColor: "#919EAB",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#919EAB",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#919EAB",
  },
  ".MuiSvgIcon-root": {
    fill: "#637381 !important",
  },
};

const Join = (props) => {
  const {
    value,
    setValue,
    handleMoreDataShow,
    indexShow,
    result,
    file_right,
    file_left,
    setCompleteJoinData,
    right_on,
    left_on,
    completedJoinData,
    type,
    left,
    right,
    index,
    each,
    resetAll,
    joinType,
    setJoinType,
    connectorData,
    setCompleteData,
    completeData,
    listOfDatsetFileAvailableForColumn,
    generateData,
  } = props;
  const [joinTypeArr, setJoinTypeArr] = useState([
    { name: "left", black: leftB, green: leftG },
    { name: "right", black: rightB, green: rightG },
    { name: "inner", black: innerB, green: innerG },
    { name: "outer", black: fullB, green: fullG },
  ]);
  console.log("RESULT OF EACH", result);
  console.log(each);
  const handleChangeJoin = (e, source) => {
    let arr = [...completeData];
    let obj1 = { ...each };
    const {
      target: { value },
    } = e;
    // On autofill we get a stringified value.
    // if (typeof value === 'string') {
    //     value.split(',')
    // }
    if (source == "join1") {
      console.log(value);
      obj1["left_on"] = [value];
      arr[index] = { ...obj1 };
    } else {
      obj1["right_on"] = [value];
      arr[index] = { ...obj1 };
    }

    setCompleteData([...arr]);
  };

  const selectThisType = (name) => {
    let arr = [...completeData];
    let obj = { ...each };
    // let arr1 = [...completedJoinData]
    // let obj1 = { ...arr1[index - 1] }
    obj["type"] = name;
    // arr1[index - 1] = { ...obj1 }
    // setCompleteJoinData([...arr1])
    // obj["joinTypeWithNextOrBack"] = name
    // arr[index - 1] = { ...obj }
    arr[index] = obj;
    setCompleteData([...arr]);
    setJoinType(name);
  };

  const handleMoreJoinFields = () => {};
  useEffect(() => {
    // console.log(index, "[index]", each)
  }, []);
  return (
    index == indexShow && (
      <span
        className="dataset_selector_in_integration"
        style={{
          width: "100%",
          //   margin: "50px 98px 50px 98px",
        }}
      >
        <div style={{ display: "flex" }}>
          <Segmented
            style={{ flex: 3.5 }}
            value={value}
            onChange={setValue}
            block
            options={["Join by", "Integrated data"]}
            size="large"
          />
          {/* <span style={{ cursor: "pointer", flex: 0.5, textAlign: "right" }}>
            <CloseIcon
              sx={{
                fill: "#000000 !important",
                ".MuiSvgIcon-root": {
                  fill: "#000000 !important",
                },
              }}
              onClick={(e) => handleMoreDataShow(indexShow, false, e)}
            />
          </span> */}
        </div>
        {value == "Join by" && (
          <Box className="d-flex justify-content-between align-items-center">
            <Box
              className={`${styles.select_dataset_logo} mt-20 w-50`}
              sx={
                {
                  // display: "flex",
                  // justifyContent: "space-between",
                }
              }
            >
              {value == "Join by" ? "Join" : "Integrated data preview"}
            </Box>
            <Box>
              <OutlinedButton
                text={
                  <>
                    <span style={{ marginRight: "5px" }}>+</span>
                    Join more
                  </>
                }
                fontWeight={"700"}
                fontSize={"13px"}
                handleClick={handleMoreJoinFields}
              />
            </Box>
          </Box>
        )}

        {value == "Join by" ? (
          <>
            <Box className="d-flex align-items-center">
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel id="demo-simple-select-standard-label">
                  Join column (left)
                </InputLabel>
                {/* {console.log(each)} */}
                <Select
                  labelId="primary_col_label_for_join"
                  id="primary_col_select_for_join"
                  required
                  value={each?.left_on?.length > 0 ? each?.left_on[0] : ""}
                  onChange={(e) => handleChangeJoin(e, "join1")}
                  label="Join column (left)"
                  sx={selectStyle}
                  // multiple
                >
                  {index == 0 &&
                    each.columnsSelected?.map((eachFile, ind_) => {
                      return (
                        <MenuItem key={ind_} value={eachFile + ""}>
                          {eachFile}
                        </MenuItem>
                      );
                    })}
                  {index != 0 &&
                    completeData[index - 1].next_left?.map((eachFile, ind_) => {
                      return (
                        <MenuItem key={ind_} value={eachFile + ""}>
                          {eachFile}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
              <DragHandleIcon
                sx={{
                  fontSize: "30px !important",
                  fill: "#000000 !important",
                  ".MuiSvgIcon-root": {
                    fill: "#000000 !important",
                  },
                  marginLeft: "18px",
                  marginRight: "18px",
                }}
              />
              <FormControl variant="outlined" style={{ width: "100%" }}>
                <InputLabel id="secondary_col_label_for_join">
                  Join column (right)
                </InputLabel>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="secondary_col_select_for_join"
                  required
                  sx={selectStyle}
                  value={each?.right_on ? each?.right_on[0] : ""}
                  onChange={(e) => handleChangeJoin(e, "join2")}
                  label="Join column (right)"
                  // multiple
                >
                  {completeData[index + 1]?.columnsSelected?.map(
                    (eachFile, ind_) => {
                      if (
                        completeData[index + 1]?.availabeColumns.includes(
                          eachFile
                        )
                      ) {
                        return (
                          <MenuItem key={ind_} value={eachFile + ""}>
                            {eachFile}
                          </MenuItem>
                        );
                      }
                    }
                  )}
                </Select>
              </FormControl>
            </Box>
            {value == "Join by" && (
              <Box className={`${styles.select_dataset_logo} mt-20`}>
                <span>Join type</span>
              </Box>
            )}
            {completeData.length >= 2 && (
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {joinTypeArr.map((eachT, ind) => {
                  return (
                    <span
                      key={ind}
                      onClick={() => selectThisType(eachT.name)}
                      className={
                        each.type == eachT.name
                          ? styles.stypeMainBox
                          : styles.typeMainBox
                      }
                    >
                      <div className={styles.selectedTypeMainBox}>
                        {" "}
                        {each.type == eachT.name && (
                          <img
                            style={{ marginRight: "4px" }}
                            height={"20px"}
                            width="20px"
                            src={smallG}
                            alt="ticked"
                          />
                        )}{" "}
                      </div>
                      <div
                        style={{
                          flex: "0 0 65%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          className={styles.selectedTypeImage}
                          src={
                            each.type == eachT.name ? eachT.green : eachT.black
                          }
                          alt={eachT.name}
                        />
                      </div>
                      <span
                        className={
                          each.type == eachT.name
                            ? styles.SlabelTypeJoin
                            : styles.labelTypeJoin
                        }
                      >
                        {" "}
                        {eachT.name}
                      </span>
                    </span>
                  );
                })}
              </Box>
            )}
          </>
        ) : (
          <Row
            style={{
              justifyContent: "center",
              width: "100%",
              marginLeft: "0px",
            }}
          >
            <Col lg={12} sm={12} style={{ padding: "0px" }}>
              <EachCardResultN result={result} />
            </Col>
          </Row>
        )}
        <Box className="text-right mt-50">
          {value == "Join by" ? (
            <>
              <Button
                id="generate_button"
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: "16px",
                  width: "171px",
                  height: "48px",
                  border: "1px solid rgba(0, 171, 85, 0.48)",
                  borderRadius: "8px",
                  color: "#00AB55",
                  textTransform: "none",
                  marginRight: "50px",
                  "&:hover": {
                    background: "none",
                    border: "1px solid rgba(0, 171, 85, 0.48)",
                  },
                }}
                variant="outlined"
                onClick={(e) => handleMoreDataShow(indexShow, false, e)}
              >
                Cancel
              </Button>
              <Button
                id="generate_button"
                sx={{
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: "16px",
                  width: "171px",
                  height: "48px",
                  background: "#00AB55",
                  borderRadius: "8px",
                  textTransform: "none",
                  color: "white !important",
                  "&:hover": {
                    backgroundColor: "#00AB55",
                    color: "#fffff",
                  },
                }}
                disabled={
                  each.type &&
                  each?.right_on?.length &&
                  connectorData.name &&
                  connectorData.desc &&
                  each?.left_on?.length > 0
                    ? false
                    : true
                }
                onClick={(e) => {
                  generateData(index, "integrate");
                }}
              >
                Apply
              </Button>
            </>
          ) : (
            <Button
              sx={{
                fontFamily: "Montserrat",
                fontWeight: 700,
                fontSize: "16px",
                width: "171px",
                height: "48px",
                background: "#00AB55",
                borderRadius: "8px",
                textTransform: "none",
                color: "white !important",
                "&:hover": {
                  backgroundColor: "#00AB55",
                  color: "#fffff",
                },
              }}
              id="generate_button"
              disabled={
                each.type &&
                each?.right_on?.length > 0 &&
                each?.left_on?.length > 0 &&
                result?.length
                  ? false
                  : true
              }
              onClick={(e) => {
                downloadDocument(result);
                handleMoreDataShow(indexShow, false, e);
              }}
            >
              Download
            </Button>
          )}
        </Box>
        {/* <Row style={{ textAlign: "center" }}>
          <Col lg={12}>
            {value == "Join by" ? (
              <Button
                id="generate_button"
                disabled={
                  each.type &&
                  each?.right_on?.length &&
                  connectorData.name &&
                  connectorData.desc &&
                  each?.left_on?.length > 0
                    ? false
                    : true
                }
                className={
                  each.type &&
                  each?.right_on?.length > 0 &&
                  each?.left_on?.length > 0
                    ? styles.generate_data_btn
                    : styles.generate_data_btn_dis
                }
                onClick={(e) => {
                  generateData(index, "integrate");
                }}
              >
                Preview
              </Button>
            ) : (
              <Button
                id="generate_button"
                disabled={
                  each.type &&
                  each?.right_on?.length > 0 &&
                  each?.left_on?.length > 0 &&
                  result?.length
                    ? false
                    : true
                }
                className={
                  each.type &&
                  each?.right_on?.length > 0 &&
                  each?.left_on?.length > 0
                    ? styles.generate_data_btn
                    : styles.generate_data_btn_dis
                }
                onClick={(e) => {
                  downloadDocument(result);
                  handleMoreDataShow(indexShow, false, e);
                }}
              >
                Download
              </Button>
            )}
          </Col>
        </Row> */}
      </span>
    )
  );
};

export default Join;
