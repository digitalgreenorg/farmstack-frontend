import { FormControl, InputLabel, MenuItem, TextField, Select, List, ListItem } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'

import { useHistory } from 'react-router-dom'
import UrlConstant from '../../Constants/UrlConstants'
import HTTPService from '../../Services/HTTPService'
import { GetErrorHandlingRoute } from '../../Utils/Common'
import Loader from '../Loader/Loader'
import { Button, Divider, Input } from 'antd';
import { PlusOutlined, SubnodeOutlined } from '@ant-design/icons'
import { minHeight } from '@mui/system'
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
const AddingCategory = (props) => {
    const { isOnborading, showBrandingScreen, isaccesstoken } = props
    const [catname, setCatName] = useState("")
    const [subCatname, setSubCatName] = useState("")
    const [allCat, setAllCat] = useState({})
    const [valueForEachCat, setValueForEachCat] = useState([])
    const [selectedCat, setSelectedCat] = useState("")
    const [selectCatForDelete, setSelectCatForDelete] = useState("")
    const [selectCatForDeleteSubCat, setSelectCatForDeleteSubCat] = useState("")
    const [selectSubCatForDelete, setSelectForSubCatForDelete] = useState("")

    //
    const [renamedCategoryName, setRanamedCategoryname] = useState("")

    const history = useHistory()
    const [loading, setLoading] = useState(false)
    function addCategory() {
        let isAlreadyIncluded = Object.keys(allCat).includes(catname)
        if (!isAlreadyIncluded) {
            setAllCat({ ...allCat, [catname]: [] })
            setCatName("")
        }
    }
    function addSubCategory() {
        console.log(selectedCat, subCatname, allCat[selectedCat])
        if (!allCat[selectedCat]?.includes(subCatname)) {
            setAllCat({ ...allCat, [selectedCat]: [...allCat[selectedCat], subCatname] })
            setCatName("")
            setSubCatName("")
        }
    }

    const handleSavingCategoryAndSubCat = () => {
        setLoading(true)
        let url = UrlConstant.base_url + UrlConstant.add_category_edit_category
        let method = "POST"
        let bodyFormData = JSON.stringify(allCat)
        HTTPService(method, url, bodyFormData,
            false,
            true, isaccesstoken).then((res) => {

                setLoading(false)
                setSelectedCat("")
                setCatName("")
                setSubCatName("")
                localStorage.setItem("new_cat", bodyFormData)
                console.log(res)
                if (isOnborading) {
                    showBrandingScreen()
                }
            }).catch((e) => {
                setLoading(false);
                console.log(e);
                history.push(GetErrorHandlingRoute(e))
            })
    }

    const getAllCategoryAndSubCategory = () => {
        setLoading(true)
        let url = UrlConstant.base_url + UrlConstant.add_category_edit_category
        let method = "GET"
        HTTPService(method, url, "", false, true, isaccesstoken).then((res) => {
            setLoading(false)
            console.log(res.data)
            setAllCat({ ...res.data })
        }).catch((e) => {
            setLoading(false)
            console.log(e)
            history.push(GetErrorHandlingRoute(e))
        })
    }

    const deleteCategory = () => {
        //deleting the cat ==> selectCatForDelete 
        let allCategory = { ...allCat }
        delete allCategory[selectCatForDelete]
        setSelectedCat("")
        setSelectCatForDelete("")
        setSelectCatForDeleteSubCat("")
        setSelectForSubCatForDelete("")
        setAllCat({ ...allCategory })
    }
    const deleteSubCategory = () => {
        //deleting the cat ==>   const [selectCatForDeleteSubCat, setSelectCatForDeleteSubCat] = useState("")
        // const [selectSubCatForDelete, setSelectForSubCatForDelete] = useState("")
        let arr = Object.keys(allCat)
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == selectCatForDeleteSubCat) {
                //  [...allCat[selectCatForDeleteSubCat]]
                const index = allCat[selectCatForDeleteSubCat].indexOf(selectSubCatForDelete);
                if (index > -1) { // only splice array when item is found
                    setSelectedCat("")
                    setSelectCatForDelete("")
                    allCat[selectCatForDeleteSubCat].splice(index, 1); // 2nd parameter means remove one item only
                    setSelectForSubCatForDelete("")
                    setSelectCatForDeleteSubCat("")
                    setAllCat({ ...allCat })
                }

            }
        }
        console.log(arr)
    }

    const renameCategory = () => {
        if (!selectCatForDelete) return
        let newObj = { ...allCat }
        newObj[renamedCategoryName] = newObj[selectCatForDelete]; // Assign new key 
        delete newObj[selectCatForDelete];
        setCatName("")
        setSubCatName("")
        setSelectedCat("")
        setSelectCatForDeleteSubCat("")
        setSelectForSubCatForDelete("")
        setSelectCatForDelete("")
        console.log(newObj)
        setAllCat({ ...newObj })
    }
    useEffect(() => {
        console.log("isOnboradinsdsdas", isOnborading)
        if (!isOnborading) {
            getAllCategoryAndSubCategory()
        }
    }, [])
    return (
        <>
            <Container>
                {loading ? <Loader /> : ""}
                <Row style={{ height: "300px" }}>
                    <Col lg={4} sm={12} >

                        <Row style={{ margin: "10px 20px 10px 0px" }}>
                            <label htmlFor="">Add category</label>
                            <Button style={{ background: "green", color: "white", marginLeft: "5px" }} shape="circle">
                                +
                            </Button>
                        </Row>
                        <Row style={{ margin: "10px 20px 10px 0px" }}>
                            <Input label={"Category"} placeholder="Category name" variant="filled" value={catname} onChange={(e) => setCatName(e.target.value)} />
                        </Row>
                        <Row style={{ margin: "10px 20px 10px 0px" }}>
                            <Button onClick={addCategory}>Add Category</Button>
                        </Row>

                    </Col>
                    <Col lg={4} sm={12}>
                        <Row style={{ margin: "10px 20px 10px 0px" }}>
                            <label htmlFor="">Add sub category</label>
                            <Button style={{ background: "green", color: "white", display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "5px" }} shape="circle">
                                <SubnodeOutlined />
                            </Button>
                        </Row>
                        <Row style={{ margin: "10px 20px 10px 0px" }}>
                            <FormControl variant="standard" sx={{ minWidth: "100%" }}>
                                <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                                <Select label={"Category"} name="cat" id="cat" value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)}>
                                    {/* <option value={""}>{""}</option> */}
                                    {Object.keys(allCat).map((eachCategory) => {
                                        return <MenuItem value={eachCategory}>{eachCategory}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Row>
                        <Row style={{ margin: "10px 20px 10px 0px" }}>
                            <Input label={"Sub category"} placeholder="Sub category name" variant="filled" value={subCatname} onChange={(e) => setSubCatName(e.target.value)} />
                        </Row>
                        <Row style={{ margin: "10px 20px 10px 0px" }}>
                            <Button onClick={addSubCategory}>Add Sub Category</Button>
                        </Row>

                    </Col>
                    <Col lg={3} sm={12}>
                        <label htmlFor="">Sub category list</label>
                        <List sx={{
                            width: '100%',
                            maxWidth: 360,
                            bgcolor: 'background.paper',
                            position: 'relative',
                            overflow: 'auto',
                            maxHeight: 300,

                            '& ul': { padding: 0 },
                        }} >
                            {selectedCat && allCat[selectedCat].map((eachSub) => {
                                return <ListItem>
                                    {eachSub}
                                </ListItem>
                            })}
                        </List>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} sm={12}>
                        <Row style={{ margin: "10px 20px 10px 0px" }}>
                            <label htmlFor="">Delete category</label>
                            <Button style={{ background: "red", color: "white", marginLeft: "5px" }} shape="circle">
                                -
                            </Button>
                        </Row>
                        <Row style={{ margin: "10px 20px 10px 0px" }}>
                            <FormControl variant="standard" sx={{ minWidth: "100%" }}>
                                <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                                <Select label={"Category"} name="cat" id="cat" value={selectCatForDelete} onChange={(e) => setSelectCatForDelete(e.target.value)}>
                                    {Object.keys(allCat).map((eachCategory) => {
                                        return <MenuItem value={eachCategory}>{eachCategory}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>

                        </Row>
                        <Row id='rowForRenameCategory' style={{ margin: "10px 20px 10px 0px" }}>
                            <Input label={"Sub category"} placeholder="New category name" variant="filled" value={renamedCategoryName} onChange={(e) => setRanamedCategoryname(e.target.value)} />
                        </Row>
                        <Row style={{ margin: "10px 20px 10px 0px" }}>
                            <Col lg={6} sm={6}>
                                <Button danger onClick={deleteCategory}>Delete category</Button>
                            </Col>
                            <Col lg={6} sm={6} >
                                <Button onClick={renameCategory}>Rename category</Button>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={4} sm={12}>
                        <Row style={{ margin: "10px 20px 10px 0px" }}>
                            <label htmlFor="">Delete sub category</label>
                            <Button style={{ background: "red", color: "white", marginLeft: "5px" }} shape="circle">
                                -
                            </Button>
                        </Row>
                        <Row style={{ margin: "10px 20px 10px 0px" }}>
                            <FormControl variant="standard" sx={{ minWidth: "100%" }}>
                                <InputLabel id="demo-simple-select-standard-label">Category</InputLabel>
                                <Select label={"Category"} name="cat" id="cat" value={selectCatForDeleteSubCat} onChange={(e) => setSelectCatForDeleteSubCat(e.target.value)}>
                                    {/* <option value={""}>{""}</option> */}
                                    {Object.keys(allCat).map((eachCategory) => {
                                        return <MenuItem value={eachCategory}>{eachCategory}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Row>
                        <Row style={{ margin: "10px 20px 10px 0px" }}>

                            <FormControl variant="standard" sx={{ minWidth: "100%" }}>
                                <InputLabel id="demo-simple-select-standard-label">Sub category</InputLabel>
                                <Select label={"Category"} name="cat" id="cat" value={selectSubCatForDelete} onChange={(e) => setSelectForSubCatForDelete(e.target.value)}>
                                    {selectCatForDeleteSubCat && allCat[selectCatForDeleteSubCat].map((eachSub) => {
                                        return <MenuItem value={eachSub}>
                                            {eachSub}
                                        </MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Row>
                        <Row style={{ margin: "10px 20px 10px 0px" }}>
                            <Button danger onClick={deleteSubCategory}>Delete sub category</Button>
                        </Row>
                    </Col>
                    <Col lg={3} sm={12}>
                    </Col>
                </Row>


                <Row>
                    <Col lg={9} sm={12}>
                        {/* <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-standard-label">Sub category</InputLabel>
                        <Select name="subcat" id="subcat" value={subCatname} onChange={(e) => setSelectedCat(e.target.value)}>
                            
                        </Select>
                    </FormControl> */}
                        <button className='submitbtn' onClick={handleSavingCategoryAndSubCat}>
                            Submit
                        </button>
                    </Col>
                </Row>
            </Container>

        </>

    )
}

export default AddingCategory