import React from "react";
import moa_kenya_logo from "../../Assets/Img/Farmstack V2.0/moa_kenya_logo.jpg";
import UrlConstant from "../../Constants/UrlConstants";

const KalroSpecificNavbar = (props) => {
  return (
    <div
      style={{
        backgroundImage: `url("https://www.kalro.org/wp-content/themes/mai-law-pro/band3.png)`,
        width: "100%",
        height: "100px",
        backgroundRepeat: "no-repeat",
        position: "sticky",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "50px",
      }}
    >
      <img
        // src={require("../../Assets/Img/footer_logo.svg")}
        style={{
          height: "auto",
          maxWidth: "300px",
          width: "auto",
          maxHeight: "100px",
        }}
        src={moa_kenya_logo}
        alt="HeaderLogo"
      />
      <img
        // src={require("../../Assets/Img/footer_logo.svg")}
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
  );
};

export default KalroSpecificNavbar;
