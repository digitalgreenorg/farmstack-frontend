import React, { useContext, useEffect, useState } from "react";
import styles from "./onboarding.module.css";
import { Button, Col, Row } from "react-bootstrap";
import { InputAdornment, TextField } from "@mui/material";
import global_style from "../../Assets/CSS/global.module.css";
import CancelIcon from "@mui/icons-material/Cancel";
import FileUploaderMain from "../Generic/FileUploader";
import ControlledAccordions from "../Catergories/ControlledAccordions";
import add_icon from "../../Assets/Img/Farmstack V2.0/add_icon.svg";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
import document_upload from "../../Assets/Img/Farmstack V2.0/document_upload.svg";
import { FarmStackContext } from "../Contexts/FarmStackContext";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import SaveIcon from "@mui/icons-material/Save";
import { goToTop } from "../../Utils/Common";
const CategoryDetails = (props) => {
  const { callLoader } = useContext(FarmStackContext);

  const { setActiveStep } = props;
  const [allCategories, setAllCategories] = useState([
    // { category_name: "", description: "", sub_categories: [] },
  ]);
  const [categoryNamesList, setCategoryNameList] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState(null);
  const [enableSaveButton, setEnableSaveButton] = useState(false);
  const [editHeadName, setEditHeadName] = useState("");
  const [headingEdit, setHeadingEdit] = useState({
    status: false,
    index: -1,
  });
  const [uploadedCategory, setUploadedCategory] = useState(null);
  const handleUploadCategory = (file) => {
    setUploadedCategory(file);
  };
  const handleDeleteCategory = (index) => {
    setUploadedCategory(null);
    setPreview(null);
  };
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    console.log(uploadedCategory);
    if (!uploadedCategory) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(uploadedCategory);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [uploadedCategory]);

  // const [subCategoryName, setSubCategoryName] = useState("")
  const createCategory = () => {
    if (categoryNamesList.includes(categoryName)) {
      return;
    } else {
      setCategoryNameList([...categoryNamesList, categoryName]);
    }
    setAllCategories([
      ...allCategories,
      {
        category_name: categoryName,
        description: description,
        sub_categories: [],
      },
    ]);
  };

  useEffect(() => {
    getAllCategory();
    goToTop(0);
  }, []);
  const getAllCategory = () => {
    console.log("Getting under cat");
    let method = "GET";
    let url = UrlConstant.base_url + UrlConstant.add_category_edit_category;
    HTTPService(method, url, "", false, true, false, false)
      .then((response) => {
        console.log(response);
        let categories = [];
        for (var key in response.data) {
          let obj = {
            category_name: key,
            description: "",
            sub_categories: response.data[key],
          };
          categories.push(obj);
        }
        console.log(categories);
        setAllCategories([...categories]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //accordionDelete
  const accordionDelete = (e, index) => {
    e.stopPropagation();
    let arr = [...allCategories];
    let ind = categoryNamesList.indexOf(arr[index].category_name);
    if (ind > -1) {
      let catList = [...categoryNamesList];
      catList.splice(ind);
      setCategoryNameList([...catList]);
    }
    arr.splice(index, 1);
    setAllCategories([...arr]);
  };

  //handleSubmitCategories
  const handleSubmitCategories = () => {
    //build the payload
    console.log(allCategories);
    let payload = {};
    for (let i = 0; i < allCategories.length; i++) {
      payload[allCategories[i].category_name] = allCategories[i].sub_categories;
    }
    console.log(payload);
    let url = UrlConstant.base_url + UrlConstant.add_category_edit_category;
    let method = "POST";
    callLoader(true);
    HTTPService(method, url, payload, false, true, false, true)
      .then((response) => {
        callLoader(false);
        console.log(response);
        setActiveStep((prev) => prev + 1);
      })
      .catch((e) => {
        callLoader(false);
        console.log(e);
      });
  };
  const [enableSave, setEnableSave] = useState(false);

  const handleEditHeading = (action, e, index) => {
    e.stopPropagation();
    setHeadingEdit({
      status: action,
      index: action ? index : -1,
    });
  };

  const handleChangeHeadName = (e, index) => {
    if (e.target.value) setEnableSave(true);
    else setEnableSave(false);
    let arr = [...allCategories];
    arr[index]["category_name"] = e.target.value;
    setAllCategories([...arr]);
  };

  //component to be passed into the body of the accordion
  function ParentCompoent(props) {
    const { data, index } = props;
    const [subCategoryName, setSubCategoryName] = useState("");
    const [editedValue, setEditedValue] = useState("");

    const handleChangeSubCategories = (e) => {
      setSubCategoryName(e.target.value);
    };

    const handleAddSubcategory = () => {
      if (!subCategoryName) return;
      let arr = [...allCategories];
      let obj = { ...data };
      if (
        data["sub_categories"]?.includes(subCategoryName) ||
        !subCategoryName
      ) {
        return;
      }
      data["sub_categories"].push(subCategoryName);
      arr[index] = { ...data };
      setAllCategories([...arr]);
      setEnableSave(true);
      console.log(arr, "arr");
    };

    const handleDeleteSubCategory = (ind, sub_cat_name) => {
      let arr = [...allCategories];
      // let obj = { ...data };
      data["sub_categories"].splice(ind, 1);
      console.log(data["sub_categories"], 'data["sub_categories"]');
      arr[index] = { ...data };
      setAllCategories([...arr]);
      console.log(arr, "arr");

      setEnableSave(true);
    };

    const handleEditSubcategory = (e, ind) => {
      setEnableSave(true);
      setEditedValue(e.target.value);
      console.log(editedValue);
      // console.log(e.target.value);
      // let arr = [...allCategories];
      // console.log(data["sub_categories"][ind]);
      // data["sub_categories"][ind] = e.target.value;
      // arr[index] = data;
      // setAllCategories([...arr]);
    };

    const editInputMode = (value) => {
      setEditedValue(value);
    };

    const saveChange = (ind) => {
      let arr = [...allCategories];
      data["sub_categories"][ind] = editedValue;
      arr[index] = { ...data };
      setAllCategories([...arr]);
    };
    useEffect(() => {
      // console.log("calling");
    }, []);

    return (
      <span>
        <div
          style={{ textAlign: "left" }}
          className={global_style.bold600 + " " + global_style.size20}
        >
          Add sub categories
        </div>
        <Row>
          <Col lg={6} sm={12} className={styles.margintopbottom10}>
            <TextField
              required
              fullWidth
              placeholder="Sub-category"
              label="Sub-category"
              variant="outlined"
              id="each_subcategory"
              name="each_subcategory"
              value={subCategoryName}
              onChange={(e) => handleChangeSubCategories(e)}
              // error={policyNameError ? true : false}
              // helperText={policyNameError}
            />
          </Col>
          <Col lg={6} sm={12} style={{ textAlign: "left", display: "flex" }}>
            <img
              style={{ alignSelf: "center", cursor: "pointer" }}
              src={add_icon}
              alt="Add icon"
              onClick={() => handleAddSubcategory()}
            />
          </Col>
        </Row>
        <Row>
          {data?.sub_categories?.length > 0 &&
            data?.sub_categories?.map((each_sub_category, index) => {
              return (
                <Col lg={6} sm={12} className={styles.margintopbottom10}>
                  <TextField
                    required
                    fullWidth
                    placeholder="Sub-category"
                    label="Sub-category"
                    variant="outlined"
                    id="each_subcategory"
                    name="each_subcategory"
                    value={each_sub_category}
                    onChange={(e) => handleEditSubcategory(e, index)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {/* {
                            <SaveAsIcon
                              onClick={(e) =>
                                editInputMode(each_sub_category, index, e)
                              }
                              sx={{ marginRight: "10px", cursor: "pointer" }}
                            />
                          }
                          {
                            <SaveIcon
                              onClick={() => saveChange(index)}
                              sx={{ marginRight: "10px", cursor: "pointer" }}
                            />
                          } */}
                          <DeleteOutlineIcon
                            onClick={() =>
                              handleDeleteSubCategory(index, each_sub_category)
                            }
                            style={{ color: "#212b36", cursor: "pointer" }}
                          />
                        </InputAdornment>
                      ),
                    }}
                    // error={policyNameError ? true : false}
                    // helperText={policyNameError}
                  />
                </Col>
              );
            })}
        </Row>
      </span>
    );
  }
  return (
    <div className={styles.main_box}>
      <div className={styles.main_label}>Category details</div>

      <div className={styles.sub_label}>Upload your categories</div>

      <div className={styles.all_inputs}>
        <Row>
          {false && (
            <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
              <FileUploaderMain
                isMultiple={false}
                handleChange={handleUploadCategory}
                disabled
              />
            </Col>
          )}
          {false ? (
            <Col lg={6} sm={12} style={{ marginBottom: "20px" }}>
              <div
                className={
                  global_style.bold600 +
                  " " +
                  global_style.font20 +
                  " " +
                  styles.text_left
                }
              >
                Uploaded file
              </div>
              {uploadedCategory && (
                <div className={styles.text_left + " " + styles.preview_box}>
                  {uploadedCategory && (
                    <div className={styles.each_preview_policy}>
                      <div>
                        <img
                          height={"52px"}
                          width={"42px"}
                          className={styles.document_upload_logo}
                          src={document_upload}
                        />
                        <span>
                          {uploadedCategory.name +
                            " " +
                            (uploadedCategory.size / 1024).toFixed(2)}
                        </span>
                      </div>
                      <CancelIcon
                        onClick={() => handleDeleteCategory()}
                        style={{ cursor: "pointer" }}
                        fontSize="small"
                      />
                    </div>
                  )}
                </div>
              )}
            </Col>
          ) : (
            <Col lg={12} sm={12} style={{ marginBottom: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  color: "red",
                  opacity: 0.3,
                }}
              >
                Currently disabled
              </div>
            </Col>
          )}
        </Row>
      </div>
      <hr />
      <div className={styles.main_label}>Category details</div>
      <div className={styles.sub_label}>
        Enter the categories and sub-categories, we will show to others!
      </div>
      <div className={styles.all_inputs}>
        <Row>
          <Col lg={12} sm={12} style={{ marginBottom: "20px" }}>
            <TextField
              fullWidth
              required
              placeholder="Category name"
              label="Category name"
              variant="outlined"
              id="categoryName"
              name="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              // error={policyNameError ? true : false}
              // helperText={policyNameError}
            />
          </Col>
        </Row>
        <Row>
          <Col lg={12} sm={12} style={{ marginBottom: "20px" }}>
            <TextField
              id="category_description"
              label="Category Description"
              multiline
              fullWidth
              rows={4}
              placeholder="Category Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Col>
        </Row>
      </div>
      <div className={styles.button_grp}>
        <Button
          onClick={() => createCategory()}
          className={global_style.primary_button + " " + styles.next_button}
        >
          {" "}
          Add
        </Button>
      </div>
      <div className={styles.main_label}>Categories</div>
      {allCategories.map((category, index) => {
        //accprdion in which I want to render my ParentComponent
        return (
          <ControlledAccordions
            Component={ParentCompoent}
            key={index}
            data={category}
            index={index}
            heading={
              headingEdit.status && headingEdit.index == index ? (
                <TextField
                  style={{ width: "70%", height: "8px" }}
                  value={category.category_name}
                  onChange={(e) => handleChangeHeadName(e, index)}
                  onClick={(e) => e.stopPropagation()}
                />
              ) : (
                category.category_name
              )
            }
            accordionDelete={accordionDelete}
            isHeadEditing={true}
            handleEditHeading={handleEditHeading}
          />
        );
      })}
      <div className={styles.button_grp}>
        <Button
          onClick={() => setActiveStep((prev) => prev + 1)}
          className={global_style.secondary_button}
        >
          {" "}
          Finish later
        </Button>
        <Button
          disabled={
            uploadedCategory ||
            enableSave ||
            (categoryName && description && categoryNamesList.length > 0)
              ? false
              : true
          }
          onClick={() => handleSubmitCategories()}
          className={global_style.primary_button + " " + styles.next_button}
        >
          {" "}
          Next
        </Button>
      </div>
    </div>
  );
};

export default CategoryDetails;
