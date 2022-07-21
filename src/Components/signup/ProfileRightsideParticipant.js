import React, { useState, useRef, useEffect } from "react";
import "./ProfileRightsideParticipant.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MuiPhoneNumber from "material-ui-phone-number";
import Footerimg from "./Footerimg";
import axios from 'axios'

import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
import { FileUploader } from "react-drag-drop-files";
import UploadProfileImageParticipant from "./UploadProfileImageParticipant";
import { LinearProgress } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel'
import { useHistory } from "react-router-dom";
import Loader from "../Loader/Loader";
import GetErrorHandlingRoute, { getUserLocal, isLoggedInUserParticipant } from "../../Utils/Common";

const fileTypes = ['JPEG', 'PNG', 'jpg']

// import "react-phone-input-2/lib/material.css";

// import PhoneInput from "react-phone-input-2";
// import "react-phone-input-2/lib/style.css";

export default function ProfileRightsideParticipant(props) {

  const [profileImageUploadProgress, setProfileImageUploadProgress] = useState(0)
  const [profileImageFile, setProfileImageFile] = useState(null)

  const[isLoader, setIsLoader] = useState(false)

  let history = useHistory();

  useEffect(() => {
    if (isLoggedInUserParticipant())
    {
      var id = props.userid;
      setIsLoader(true);
      HTTPService('GET', UrlConstant.base_url + UrlConstant.participant + id + '/', '', false, true, props.isaccesstoken)
      .then((response) => {
          setIsLoader(false);
          console.log("otp valid", response.data);
          if (response.data.user)
          {
            // let addressdata=JSON.parse(response.data.organization.address)
            props.profilefirstname.current = response.data.user.first_name;
            props.profilelastname.current = response.data.user.last_name;
            props.profileemail.current = response.data.user.email;
            props.profilephone.current = response.data.user.phone;
          }
          
      }).catch((e) => {
          setIsLoader(false);
          history.push(GetErrorHandlingRoute(e));
      });
    }
}, []);

  const handleProfileImageUploadCancel = async (e) => {

    console.log('clicked on profile upload cancel btn')
    let url = UrlConstant.base_url + UrlConstant.delete_policies_drop_document
  
    await axios
      .delete(url, {
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer '+ props.isaccesstoken },
        data: { id: 'profile_image' },
      })
      .then((response) => {
        console.log('response')
        console.log('tos', response.data)
        //   console.log(response.json());
        console.log(response.status)
        if (response.status === 204) {
          console.log('gov law delete success')
          setProfileImageFile(null)
          setProfileImageUploadProgress(0)
          // setEmail(false);
          // setError(false);
        } else {
          // setError(true);
        }
      })
      .catch((e) => {
        console.log(e)
        //   setError(true);
      })
  }
  
  const handleProfileImageFileChange = async (file) => {
    setProfileImageFile(file)
    console.log(file)
  
    const options = {
      onUploadProgress: (progressEvent) => {
        console.log(progressEvent.loaded)
        const { loaded, total } = progressEvent
        let percent = Math.floor((loaded * 100) / total)
        console.log(`${loaded}kb of ${total}kb | ${percent}%`)
        setProfileImageUploadProgress(percent)
      },
        headers: { 'content-type': 'multipart/form-data', 'Authorization': 'Bearer '+ props.isaccesstoken}
      }
  
    var bodyFormData = new FormData()
    bodyFormData.append('profile_image', file)
  
    console.log('profile_image data', bodyFormData)
    let url = UrlConstant.base_url + UrlConstant.policies_files_upload
  
    if (file.size < 2097152) {
      await axios
        .post(url, bodyFormData, options)
        .then((response) => {
          console.log('response')
          console.log('profile_image details', response.data)
          //   console.log(response.json());
          console.log(response.status)
          if (response.status === 201) {
            // setEmail(false);
            // setError(false);
          } else {
            // setError(true);
          }
        })
        .catch((e) => {
          console.log(e)
          //   setError(true);
        })
    }
  }

  return (
    <>
    {isLoader? <Loader /> : ''}
    <Footerimg />
      <div className="profileheader">Profile Details</div>
      <div>
        <form
          noValidate
          autoComplete="off"
          onSubmit={props.handleprofileSubmit}>
          <div className="profilefirstname">
            <TextField
            required
              id="filled-basic"
              label="First Name"
              variant="filled"
              style={{ width: "420px" }}
              //   className="profilefirstname"
              onChange={props.handleprofilfirstename}
              inputRef={props.profilefirstname}
              error={props.ispropfilefirstnameerror}
              helperText={
                props.ispropfilefirstnameerror ? "Enter Valid Name" : ""
              }
              defaultValue={props.profilefirstname.current}
            />
          </div>
          <div className="profilelastname">
            <TextField
              id="filled-basic"
              label="Last Name"
              variant="filled"
              style={{ width: "420px" }}
              //   className="profilelastname"
              onChange={props.handleprofilelastname}
              inputRef={props.profilelastname}
              error={props.ispropfilelastnameerror}
              helperText={
                props.ispropfilelastnameerror ? "Enter Valid last name" : ""
              }
              defaultValue={props.profilelastname.current}
            />
          </div>
          <div className="profileemail">
            <TextField
              id="filled-basic"
              label="Email"
              variant="filled"
              style={{ width: "420px" }}
              //   className="profileemail"
              onChange={props.handleprofileemail}
              inputRef={props.profileemail}
              inputProps={{ readOnly: true }}
              defaultValue={props.validemail}
              disabled
              // error={props.ispropfileemailerror}
              // helperText={
              //   props.ispropfileemailerror ? "Enter Valid Email id" : ""
              // }
            />
          </div>
          <div className="profilenumber">
            <MuiPhoneNumber
              defaultCountry={"in"}
              style={{ width: "420px" }}
              id="filled-basic"
              label="Contact Number"
              variant="filled"
              onChange={props.handleprofilenumber}
              defaultValue={props.profilephone.current}
              // error={ispropfilenumbererror}
              // helperText={ispropfilenumbererror ? "Enter Valid Email id" : ""}
            />
          </div>
          <div className="profileimg">
            <FileUploader
              //   multiple={true}
              handleChange={handleProfileImageFileChange}
              name="file"
              types={fileTypes}
              children={
                <UploadProfileImageParticipant
                  uploaddes="Supports: JPEG, PNG not more than 2MB file size"
                  uploadtitle="Upload Profile image (Mandatory)"
                />
              }
              //   maxSize={2}
            />
            <p className="filename">
              {profileImageFile
                ? profileImageFile.size
                  ? `File name: ${profileImageFile.name}`
                  : ''
                : 'No file uploaded yet'}
            </p>
            <p className="oversizemb">
              {profileImageFile != null && profileImageFile.size > 2097152
                ? 'File uploaded is more than 2MB!'
                : ''}
            </p>
            <div className="profileimgprogress">
              <LinearProgress
                variant="determinate"
                value={profileImageUploadProgress}
                color="success"
              />
              <p className="profileimageprogresstext">Uploading {profileImageUploadProgress}%</p>
            </div>
            <p className="profileimageuploadclosebutton">
              {profileImageFile && <CancelIcon onClick={handleProfileImageUploadCancel} />}
            </p>
          </div>
          <div>
            {props.profilenextbutton && profileImageFile? (
              <Button variant="contained" className="profilebtn" type="submit">
                <span className="signupbtnname">Next</span>
              </Button>
            ) : (
              <Button variant="outlined" disabled className="disableprofilebtn">
                Next
              </Button>
            )}
          </div>

          <div>
            <Button variant="outlined" className="finishlaterbtn" type="button" onClick={props.finishLaterProfileScreen}>
              Finish Later
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
