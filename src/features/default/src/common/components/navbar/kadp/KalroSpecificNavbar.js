import React from "react";
import { Divider } from "@mui/material";
import UrlConstant from "common/constants/UrlConstants";
import moa_kenya_logo from "../../../../Assets/Img/Farmstack V2.0/moa_kenya_logo.jpg";

const KalroSpecificNavbar = (props) => {
  return (
    <div
      style={{
        backgroundImage: !props.showBanner
          ? ""
          : `url("https://www.kalro.org/wp-content/themes/mai-law-pro/band3.png)`,
        width: "100%",
        height: "100px",
        backgroundRepeat: "no-repeat",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: props.mobile ? "1px" : "50px",
      }}
    >
      <img
        style={{
          height: "auto",
          maxWidth: "300px",
          width: "auto",
          maxHeight: "100px",
        }}
        src={moa_kenya_logo}
        alt="HeaderLogo"
      />

      {props.showVerticalDivider && (
        <Divider
          sx={{ color: "#00a94f", borderColor: "rgb(0,0,0,0.03)" }}
          orientation="vertical"
          flexItem
        />
      )}
      <div>
        <img
          style={{
            height: "auto",
            maxWidth: "300px",
            width: "auto",
            maxHeight: "80px",
          }}
          src={UrlConstant.base_url_without_slash + props?.orgLogo}
          alt="HeaderLogo"
        />
      </div>
    </div>
  );
};

export default KalroSpecificNavbar;
