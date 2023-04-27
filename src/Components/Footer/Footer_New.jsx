import React, { useEffect, useState } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import style from "./Footer_New.module.css";
import ContainedButton from "../Button/ContainedButton";
import { useHistory } from "react-router-dom";
import HTTPService from "../../Services/HTTPService";
import UrlConstant from "../../Constants/UrlConstants";
import {
  isLoggedInUserAdmin,
  isLoggedInUserCoSteward,
  isLoggedInUserParticipant,
} from "../../Utils/Common";

const FooterNew = () => {
  const handleSubscribe = () => {};
  const history = useHistory();
  const [adminData, setAdminData] = useState(null);

  const handleItemClick = (name) => {
    if (name === "datasets") {
      if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
        history.push("/datahub/new_datasets");
      } else if (isLoggedInUserParticipant()) {
        history.push("/participant/new_datasets");
      } else {
        history.push("/home/datasets");
      }
    } else if (name === "participants") {
      if (isLoggedInUserAdmin() || isLoggedInUserCoSteward()) {
        history.push("/datahub/participants");
      } else if (isLoggedInUserParticipant()) {
        history.push("/home/participants");
      } else {
        history.push("/home/participants");
      }
    }
  };

  useEffect(() => {
    let url =
      UrlConstant.base_url + UrlConstant.microsite_admin_organization + "/";
    let method = "GET";
    // let url = UrlConstant.base_url + UrlConstant.microsite_admin_organization
    HTTPService(method, url, "", false, false, false, false, false)
      .then((response) => {
        setAdminData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <Box sx={{ padding: "40px", marginLeft: "144px", marginRight: "144px" }}>
      <div className="logo_container text-left">
        <img
          style={{ height: "auto", width: "172px" }}
          src={
            UrlConstant.base_url_without_slash + adminData?.organization?.logo
          }
          alt="footerLogo"
        />
      </div>
      <div className={` ${style.footerContent} text-left`}>
        <div className={`contact`}>
          <div className={`${style.footerTitle}`}>Contacts</div>
          <div className="mb-30 mt-20">
            <div className={`${style.footerLightText} text-left`}>Email</div>
            <div className={`${style.footerDarkText} mt-2 text-left`}>
              {adminData?.user?.email ?? ""}
            </div>
          </div>
          <div className="mb-30">
            <div className={`${style.footerLightText} text-left`}>
              Datahub admin phone
            </div>
            <div className={`${style.footerDarkText} mt-2 text-left`}>
              {console.log(adminData, "adminData")}
              {adminData?.user?.phone_number ?? ""}
            </div>
          </div>
          <div>
            <div className={`${style.footerLightText} text-left`}>
              Organization Website
            </div>
            <div className={`${style.link} mt-2`}>
              {" "}
              {adminData?.organization?.website ?? ""}
            </div>
          </div>
        </div>
        <div className={`links w-25`}>
          <div className={`${style.footerTitle}`}>Quick links</div>
          <div className={`footer_link mt-20`}>
            <div className="d-flex justify-content-between w-100">
              <div
                className={`${style.footerLightText} ${style.quickLinks}`}
                onClick={() => history.push("/home")}
              >
                Home
              </div>

              <div
                onClick={() => history.push("/home/contact")}
                className={`${style.footerLightText} ${style.flexWidth} ${style.quickLinks}`}
              >
                Contact us
              </div>
            </div>
            <div className="d-flex justify-content-between w-100">
              <div
                className={`${style.footerLightText} ${style.quickLinks} mt-10`}
              >
                About {adminData?.organization?.name ?? ""}
              </div>
              <div
                className={`${style.footerLightText} ${style.quickLinks} ${style.flexWidth} mt-10`}
                onClick={() => history.push("/home/legal")}
              >
                Legal
              </div>
            </div>
            <div className="d-flex justify-content-between w-100">
              <div
                className={`${style.footerLightText} ${style.quickLinks} mt-10`}
              >
                About Farmstack
              </div>

              <div
                className={`${style.footerLightText} ${style.quickLinks} ${style.flexWidth} mt-10`}
                onClick={() => history.push("/login")}
              >
                Login
              </div>
            </div>
            <div className="d-flex justify-content-between w-100">
              <div
                className={`${style.footerLightText} ${style.quickLinks} mt-10 `}
                onClick={() => handleItemClick("datasets")}
              >
                Datasets
              </div>

              <div
                className={`${style.footerLightText} ${style.quickLinks} mt-10`}
              >
                Get started
              </div>
            </div>
            <div className="d-flex justify-content-between w-100">
              <div
                className={`${style.footerLightText} ${style.quickLinks} mt-10 `}
                onClick={() => handleItemClick("participants")}
              >
                Participants
              </div>
            </div>
          </div>
        </div>
        <div className={`staytuned`}>
          <div className={`${style.footerTitle}`}>Stay tuned</div>
          <div className={`mt-20 ${style.footerLightText}`}>
            Subscribe to our newsletter and never miss datasets,
          </div>
          <div className={`${style.footerLightText} mb-30`}>
            latest news, etc.,
          </div>
          <div className={`${style.footerLightText}`}>
            Our newsletter is sent once a month every first week.
          </div>
          <div className="mt-20 mb-20">
            <TextField
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#00AB55",
                  },
                  "&:hover fieldset": {
                    borderColor: "#00AB55",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00AB55",
                  },
                },
              }}
              className={"input_field_subscribe"}
              placeholder="Enter your e-mail id"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <ContainedButton
                      text={"Subscribe"}
                      fontWeight={"700"}
                      fontSize={"16px"}
                      width={"172px"}
                      height={"56px"}
                      handleClick={handleSubscribe}
                    />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
      </div>
    </Box>
  );
};

export default FooterNew;
