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

export default function CategorySettings(props) {
  const [categoryDetails, setCategoryDetails] = useState(
    {
    // category_name: "",
    // category_description: "",
    // category_files: "",
    // sub_categories:""

}
)
const [categoryDetailsErrorMessage, setCategoryDetailErrorMessage] = useState({
  category_name: "",
    // category_description: "",
    category_files: "",
    sub_categories:""
})
const [categoryDescriptionvalue, setEditorGovLawValue] = React.useState(
  RichTextEditor.createValueFromString(categoryDetails, "html")
);
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
    });
};

const deleteCategories = (id, index) => {
  let method = "DELETE";
  let url = UrlConstant.base_url + UrlConstant.add_category_edit_category;
  HTTPService(method, url, "", false, true, false, false)
   .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
}

// const handleDeleteCategory = (index)
useEffect(() => {
  getcategories();
}, []);
  return (
    <Container>
      <Row>
        <Typography
          className={global_styles.bold600 + " " + global_styles.size32}
        >
          Category Settings
        </Typography>
      </Row>
      <Row style={{ margin: "20px" }}>
        <Col xs={12} sm={12} md={12} lg={12}>
        {Object.keys(categoryDetails).map((categoryname) => (
         <Accordion className="accordion-main-classname">
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Row style={{justifyContent: "space-between"}}>
                <Col>
                  <Typography
                     className={global_styles.bold600 + " " + global_styles.size24}
                  >
                    {categoryname}
                  </Typography>
                </Col>
                <Col>
                  <IconButton>
                    <DeleteOutlineIcon />
                  </IconButton>
                </Col>
              </Row>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                id="policy_name"
                label="category_name"
                variant="outlined"
                required
                value={categoryname}
                // onChange=
                style={{ width: "100%", margin: "20px", marginLeft: "auto" }}
              />
              <Row>
              <Col lg={12} sm={12} style={{ marginBottom: "20px" }}>
                  <RichTextEditor
                    placeholder="Description"
                    toolbarConfig={toolbarConfig}
                     value={categoryDescriptionvalue}
                    // onKeyDown={handledatasetnameKeydown}
                    // onChange={handlegovLawChange}
                    required
                    id="body-text"
                    name="bodyText"
                    type="string"
                    multiline
                    variant="filled"
                    style={{
                      minHeight: 410,
                      border: "1px solid black",
                    }}
                  />
                </Col>
              </Row>
              <Row>
                <Col
                  lg={6}
                  sm={12}
                  style={{ marginBottom: "20px", marginTop: "10px" }}
                >
                  <FileUploaderMain
                    isMultiple={false}
                    //handleChange={handleUploadCategory}
                    disabled
                  />
                </Col>
              </Row>
              <Row>
                <Typography
                   className={global_styles.bold600 + " " + global_styles.size20}
                   style={{marginLeft: "15px"}}
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
                    // value={categoryDetails.sub_categories}
                    style={{ width: "98%", margin: "20px", marginLeft: "auto"}}
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
                    //onClick={() => handleAddSubcategory()}
                  />
                </Col>
              </Row>
            </AccordionDetails>
          </Accordion>))}
        </Col>
      </Row>
      <Row>
        <Col style={{ textAlign: "right", margin: "20px" }}>
          <Button
            id="cancelbutton_account"
            variant="outlined"
            style={{ margin: "20px" }}
            className="button"
          >
            Cancel
          </Button>
          <Button
            id="submitbutton_account"
            variant="outlined"
            className="button"
          >
            Submit
          </Button>
        </Col>
      </Row>
      </Container>
  );
}
