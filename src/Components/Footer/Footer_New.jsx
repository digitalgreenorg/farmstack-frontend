import React, { useState } from "react";
import { Box, Button, InputAdornment, TextField } from "@mui/material";
import style from "./Footer_New.module.css";
import ContainedButton from "../Button/ContainedButton";

const FooterNew = () => {
  const handleSubscribe = () => {};

  return (
    <Box sx={{ padding: "40px", marginLeft: "144px", marginRight: "144px" }}>
      <div className="logo_container text-left">
        <img
          src={require("../../Assets/Img/footer_logo.svg")}
          alt="footerLogo"
        />
      </div>
      <div className={` ${style.footerContent} text-left`}>
        <div className={`contact`}>
          <div className={`${style.footerTitle}`}>Contacts</div>
          <div className="mb-30 mt-20">
            <div className={`${style.footerLightText} text-left`}>Email</div>
            <div className={`${style.footerDarkText} mt-2 text-left`}>
              info@ata.org
            </div>
          </div>
          <div className="mb-30">
            <div className={`${style.footerLightText} text-left`}>
              Datahub admin phone
            </div>
            <div className={`${style.footerDarkText} mt-2 text-left`}>
              +91 98765 43210
            </div>
          </div>
          <div>
            <div className={`${style.footerLightText} text-left`}>
              Organization Website
            </div>
            <div className={`${style.link} mt-2`}>www.ethopianata.com</div>
          </div>
        </div>
        <div className={`links w-25`}>
          <div className={`${style.footerTitle}`}>Quick links</div>
          <div className={`footer_link mt-20`}>
            <div className="d-flex justify-content-between w-100">
              <div className={`${style.footerLightText}`}>Home</div>
              <div className={`${style.footerLightText} ${style.flexWidth}`}>
                Contact us
              </div>
            </div>
            <div className="d-flex justify-content-between w-100">
              <div className={`${style.footerLightText} mt-10`}>
                About Farmstack
              </div>
              <div
                className={`${style.footerLightText} ${style.flexWidth} mt-10`}
              >
                Legal
              </div>
            </div>
            <div className="d-flex justify-content-between w-100">
              <div className={`${style.footerLightText} mt-10 `}>Datasets</div>
              <div
                className={`${style.footerLightText} ${style.flexWidth} mt-10`}
              >
                Login
              </div>
            </div>
            <div className="d-flex justify-content-between w-100">
              <div className={`${style.footerLightText} mt-10 `}>
                Participants
              </div>
              <div className={`${style.footerLightText} mt-10`}>
                Get started
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
