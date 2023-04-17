import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RichTextEditor from "react-rte";
import Button from "@mui/material/Button";
import "./AccountSettings.css";
import { IconButton } from "@mui/material";
import add_icon from "../../Assets/Img/Farmstack V2.0/add_icon.svg";
import FileUploaderMain from "../Generic/FileUploader";
import global_styles from "../../Assets/CSS/global.module.css";
import { useState, useEffect } from "react";
import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
import { getUserLocal, GetErrorHandlingRoute } from "../../Utils/Common";
import { useHistory } from "react-router-dom";

export default function CategorySettings(props) {
  const [categoryDetails, setCategoryDetails] = useState({});
  const [categoryDetailsErrorMessage, setCategoryDetailErrorMessage] =
    useState();
  const [newSubCat, setNewSubCat] = useState("");
  const history = useHistory()
  const [editCategory, setEditCategory] = useState(false)

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
  const getcategories = () => {
    let method = "GET";
    let url = UrlConstant.base_url + UrlConstant.add_category_edit_category;
    HTTPService(method, url, "", false, true, false, false)
      .then((response) => {
        console.log(response.data);

        setCategoryDetails(response.data);
      })
      .catch((e) => {
        console.log(e);
        history.push(GetErrorHandlingRoute(e));
      });
  };
const handleCategoryNameChange = (e, categoryKey) => {
  if (editCategory) {
    const newCategories = { ...categoryDetails };
    const value = e.target.value;
    if (categoryKey !== value) {
      // If the key has changed, delete the old key-value pair from the object
      delete newCategories[categoryKey];
    }
    // Update the key with the new value
    newCategories[value] = categoryDetails[categoryKey];
    setCategoryDetails(newCategories);
  }
};
  const deleteCategory = (key) => {
    const newCategories = { ...categoryDetails }; 
    delete newCategories[key];
    setCategoryDetails(newCategories);  
  };
  const handleAddSubCategory = (indexName) => {
    if(editCategory) {
    let tmpPolicyvalues = {...categoryDetails};
    console.log("collectionof obj", tmpPolicyvalues, indexName)
    if (tmpPolicyvalues !== ""){
   tmpPolicyvalues[indexName].push(newSubCat);
    setCategoryDetails(tmpPolicyvalues);
    setNewSubCat("");
    }
  }
  };
  const handleCancel = () => {
    getcategories()
    history.push("/datahub/settings/4");
    window.location.reload();
   
  };

  const handleSubmitCategory = () => {
    var id = getUserLocal();
    let method = "POST";
    let url = UrlConstant.base_url + UrlConstant.add_category_edit_category;
    let formData = { ...categoryDetails };
    HTTPService(method, url, formData, false, true, false, false)
      .then((response) => {
        console.log(response.data);
        let arrayValues = [...categoryDetails, response.data];
        setCategoryDetails(arrayValues);
      })
      .catch((e) => {
        console.log(e);
        history.push(GetErrorHandlingRoute(e));
      });
  };

  useEffect(() => {
    getcategories();
  }, []);
  return (
    <Container style={{"margin-top": "auto"}}>
       <div className="mainHeadSetting">
        Category settings
        </div>
      <Row style={{ margin: "20px" }}>
        <Col xs={12} sm={12} md={12} lg={12}>
          {Object.entries(categoryDetails).map(([key, valuesArray], index) => (
            <Accordion className="accordion-main-classname">
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography
                  className={global_styles.bold600 + " " + global_styles.size24}
                >
                  {key}
                </Typography>

                {/* <DeleteOutlineIcon
                  style={{ marginLeft: "auto" }}
                  onClick={() => deleteCategory(key)}
                /> */}
              </AccordionSummary>
              <AccordionDetails>
                <TextField
                  id="policy_name"
                  label="category_name"
                  variant="outlined"
                  required
                  value={key}
                  onChange={(e) => handleCategoryNameChange(e, key)}
                  style={{ width: "100%", margin: "20px", marginLeft: "auto" }}
                />
                {!editCategory ?
                 <RichTextEditor
                      dir="ltr"
                      toolbarConfig={toolbarConfig}
                      placeholder="Category description"
                      value={RichTextEditor.createValueFromString(
                        "",
                        "html"
                      )}
                      required
                      id="body-text"
                      name="bodyText"
                      type="string"
                      multiline
                      variant="filled"
                      style={{
                        minHeight: 410,
                        border: "1px solid black",
                        unicodeBidi: "plaintext",
                      }}
                      disabled
                    /> : "" }
                 {/* <Row>
                 <Col
                    lg={6}
                    sm={12}
                    style={{ marginBottom: "20px", marginTop: "20px" }}
                  >
                  {!editCategory ? 
                 <FileUploaderMain
                      fileTypes={["xls", " xlsx", "csv"]}
                      maxSize={25}
                      isMultiple={false}
                      disabled
                    />
                : "" }
                </Col>
                 </Row>  */}
                <Row>
                  <Typography
                    className={
                      global_styles.bold600 + " " + global_styles.size20
                    }
                    style={{ marginLeft: "15px" }}
                  >
                    Add sub categories
                  </Typography>
                </Row>
                <Row>
                  <Col xs={12} sm={12} md={6} xl={6}>
                    <TextField
                      id="subcategory_category"
                      label="Sub Category"
                      variant="outlined"
                      required
                      value={newSubCat}
                      onChange={(e) => setNewSubCat(e.target.value)}
                      style={{
                        width: "100%",
                        margin: "20px",
                        marginLeft: "auto",
                      }}
                    />
                  </Col>
                  <Col
                    lg={6}
                    sm={12}
                    style={{ textAlign: "left", display: "flex" }}
                  >
                    <img
                      style={{ alignSelf: "center", cursor: "pointer" }}
                      src={add_icon}
                      alt="Add icon"
                      id="addbutton_category"
                      onClick={() => handleAddSubCategory(key)}
                    />
                  </Col>
                </Row>

                <Row>
                  
                        <>
                        {valuesArray.map((value, arrIndex) => (
                            
                        <Col xs={12} sm={12} md={6} xl={6} key={value}>
                          
                        <TextField
                              InputProps={{
                                endAdornment: (
                                  <>
                                    <IconButton
                                      onClick={(e) => {
                                        const newSubcategories = {
                                          ...categoryDetails,
                                        };
                                        newSubcategories[key].splice(
                                          arrIndex,
                                          1
                                        );
                                        setCategoryDetails(newSubcategories);
                                      }}
                                    >
                                      <DeleteOutlineIcon />
                                    </IconButton>
                                  </>
                                ),
                              }}
                              id="subcategory_category"
                              label="Sub category"
                              variant="outlined"
                              value={value}
                              style={{
                                width: "100%",
                                margin: "20px",
                                marginLeft: "auto",
                              }}
                            />
                           
                         
                        </Col>
                         ))}
                        </>
                        
                </Row>
                <Row>
                  <Col style={{ textAlign: "right", margin: "20px" }}>
                  <Button
                          id="apply_policies"
                          variant="outlined"
                          style={{ margin: "20px" }}
                          className="buttonleftred"

                          onClick={() => deleteCategory(key)}
                        >
                          Delete
                        </Button>
                        <Button
                          id="apply_policies"
                          variant="outlined"
                          style={{ margin: "20px" }}
                          className="buttonrightset"
                          onClick={() => setEditCategory(true)}
                          
                        >
                          Edit
                        </Button>
                    </Col>
                    </Row>
              </AccordionDetails>
            </Accordion>
          ))}
        </Col>
      </Row>
      <Row>
        <Col style={{ textAlign: "right", margin: "20px" }}>
          <Button
            id="cancelbutton_account"
            variant="outlined"
            style={{ margin: "20px" }}
            className="buttoncancel"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            id="submitbutton_account"
            variant="outlined"
            className="buttonrightset"
            onClick={(e) => handleSubmitCategory(e)}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
